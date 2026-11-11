/**
 * Inhalte aus dem CMS — eine Stelle für alle Komponenten.
 *
 * Collections in Directus (angelegt durch scripts/cms-setup.ts):
 *   site_settings   Singleton: Buchungslink, Kontakt, „Als Nächstes"-Override
 *   tours           die vier Touren (eine Quelle statt bisher 3–4 Kopien)
 *   faqs            Fragen & Antworten (sortierbar)
 *   timeline_steps  „So fühlt sich eine Tour an"
 *   text_blocks     alle übrigen Einzeltexte, siehe ./texts.ts
 *   image_slots     austauschbare Fotos, siehe ./images.ts
 *   directus_files  Galerien: Ordner „Touren/<Tour>" in der Mediathek
 */
import { CMS_URL, cmsEnabled, cmsFetch, cmsOr } from "./client";
import { sanitizeRich } from "./rich";
import { TEXTS, type TextKey } from "./texts";
import { IMAGES, type ImageKey } from "./images";
import { seasonTours as fallbackTours, faqs as fallbackFaqs, type TourId } from "@/data/landingPage";

export type { TourId };

/* ── Bilder ─────────────────────────────────────────────────────────── */

export interface CmsFile {
  id: string;
  width: number | null;
  height: number | null;
  title: string | null;
  description: string | null;
  filename_download: string;
}

const FILE_FIELDS = ["id", "width", "height", "title", "description", "filename_download"];
const fileFields = (prefix?: string) => FILE_FIELDS.map((f) => (prefix ? `${prefix}.${f}` : f)).join(",");

/** Bild-URL mit serverseitiger Skalierung durch Directus (WebP, gecacht). */
export function assetUrl(id: string, width?: number, quality = 72): string {
  const params = new URLSearchParams({ format: "webp", quality: String(quality) });
  if (width) params.set("width", String(width));
  return `${CMS_URL}/assets/${id}?${params}`;
}

export function assetSrcset(id: string, widths: number[], quality = 72): string {
  return widths.map((w) => `${assetUrl(id, w, quality)} ${w}w`).join(", ");
}

/* ── Einstellungen ──────────────────────────────────────────────────── */

export interface SiteSettings {
  booking_calendar_url: string;
  voucher_url: string;
  phone: string;
  phone_display: string;
  email: string;
  featured_tour: TourId | null;
}

/** Heutige Werte der Website — Fallback ohne CMS und Erstbefüllung. */
export const fallbackSettings: SiteSettings = {
  booking_calendar_url: "https://eveeno.com/de/event-cal/34263?style=grid",
  voucher_url: "/kontakt",
  phone: "+491707110535",
  phone_display: "+49 170 7110535",
  email: "weinerlebnistouren.pfalz@gmail.com",
  featured_tour: null,
};

let settingsPromise: Promise<SiteSettings> | undefined;

export function getSettings(): Promise<SiteSettings> {
  settingsPromise ??= cmsOr<Partial<SiteSettings>>("/items/site_settings", fallbackSettings).then((s) => ({
    ...fallbackSettings,
    ...Object.fromEntries(Object.entries(s).filter(([, v]) => v != null && v !== "")),
  }));
  return settingsPromise;
}

/* ── Texte ──────────────────────────────────────────────────────────── */

interface TextRow {
  key: string;
  kind: "text" | "rich";
  text: string | null;
  rich: string | null;
}

let textMap: Promise<Map<string, string>> | undefined;

function loadTexts(): Promise<Map<string, string>> {
  textMap ??= cmsOr<TextRow[]>("/items/text_blocks?limit=-1&fields=key,kind,text,rich", []).then(
    (rows) => new Map(rows.map((r) => [r.key, ((r.kind === "rich" ? r.rich : r.text) ?? "").trim()])),
  );
  return textMap;
}

/**
 * Text für einen Schlüssel. Leere oder fehlende CMS-Einträge fallen auf den
 * Standardtext zurück — eine versehentlich geleerte Überschrift reißt also
 * kein Loch ins Layout. Rich-Texte kommen gesäubert zurück (HTML).
 */
export async function getText(key: TextKey): Promise<string> {
  const def = TEXTS[key];
  const value = (await loadTexts()).get(key) || def.default;
  return def.kind === "rich" ? sanitizeRich(value) : value;
}

/* ── Foto-Plätze ────────────────────────────────────────────────────── */

export interface SlotImage {
  file: CmsFile;
  alt: string;
}

let slotMap: Promise<Map<string, SlotImage>> | undefined;

export async function getSlotImage(key: ImageKey): Promise<SlotImage | null> {
  if (!cmsEnabled) return null;
  slotMap ??= cmsFetch<{ key: string; alt: string | null; image: CmsFile | null }[]>(
    `/items/image_slots?limit=-1&fields=key,alt,${fileFields("image")}`,
  ).then(
    (rows) =>
      new Map(
        rows
          .filter((r) => r.image)
          .map((r) => [r.key, { file: r.image!, alt: r.alt || IMAGES[r.key as ImageKey]?.alt || "" }]),
      ),
  );
  return (await slotMap).get(key) ?? null;
}

/* ── Touren ─────────────────────────────────────────────────────────── */

type Accents = Pick<Tour, "accentText" | "accentBg" | "accentBorder" | "accentLine">;

/** Saisonfarben bleiben im Code: vollständige Klassennamen, damit Tailwind sie findet. */
const ACCENTS = Object.fromEntries(
  fallbackTours.map((t) => [
    t.id,
    { accentText: t.accentText, accentBg: t.accentBg, accentBorder: t.accentBorder, accentLine: t.accentLine },
  ]),
) as Record<TourId, Accents>;

export interface Tour extends Accents {
  id: TourId;
  season: string;
  months: string;
  title: string;
  claim: string;
  facts: string[];
  priceFrom: string | null;
  priceIncludes: string | null;
  dateHint: string | null;
  bookingUrl: string;
  tourenHref: string;
  spotlightImage: SlotImage | null;
}

interface TourRow {
  id: TourId;
  season: string;
  months: string;
  title: string;
  claim: string;
  facts: string[] | null;
  price_from: string | null;
  price_includes: string | null;
  date_hint: string | null;
  booking_url: string;
  spotlight_image: CmsFile | null;
  spotlight_image_alt: string | null;
}

let toursPromise: Promise<Tour[]> | undefined;

export function getTours(): Promise<Tour[]> {
  toursPromise ??= (async () => {
    if (!cmsEnabled) return fallbackTours.map((t) => ({ ...t, spotlightImage: null }));
    const rows = await cmsFetch<TourRow[]>(
      `/items/tours?sort=sort&limit=-1&fields=*,${fileFields("spotlight_image")}`,
    );
    return rows.map((r) => ({
      id: r.id,
      season: r.season,
      months: r.months,
      title: r.title,
      claim: r.claim,
      facts: r.facts ?? [],
      priceFrom: r.price_from || null,
      priceIncludes: r.price_includes || null,
      dateHint: r.date_hint || null,
      bookingUrl: r.booking_url,
      tourenHref: `/touren#${r.id}`,
      spotlightImage: r.spotlight_image ? { file: r.spotlight_image, alt: r.spotlight_image_alt ?? "" } : null,
      ...ACCENTS[r.id],
    }));
  })();
  return toursPromise;
}

/**
 * „Als Nächstes"-Tour: manuell in den Einstellungen festgelegt oder nach
 * Kalendermonat (Vorverkaufs-Fenster). Wird beim Build ausgewertet; der
 * nächtliche Neubau hält die Auswahl aktuell.
 */
export async function getFeaturedTour(date = new Date()): Promise<Tour> {
  const [tours, settings] = await Promise.all([getTours(), getSettings()]);
  const byId = (id: TourId) => tours.find((t) => t.id === id) ?? tours[0];
  if (settings.featured_tour) return byId(settings.featured_tour);
  const month = date.getMonth() + 1;
  if (month <= 4) return byId("mandelbluete");
  if (month <= 7) return byId("mussbach");
  if (month <= 10) return byId("bacchus");
  return byId("gluehwein");
}

/** Galeriebilder einer Tour = alle Bilder im Mediathek-Ordner „Touren/<Tour>". */
export const TOUR_FOLDERS: Record<TourId, string> = {
  mandelbluete: "Mandelblüte",
  mussbach: "Mussbach",
  bacchus: "Bacchus",
  gluehwein: "Glühwein",
};

export async function getTourGallery(id: TourId): Promise<CmsFile[]> {
  if (!cmsEnabled) return [];
  const folder = encodeURIComponent(TOUR_FOLDERS[id]);
  return cmsFetch<CmsFile[]>(
    `/files?limit=-1&sort=filename_download&fields=${fileFields()}` +
      `&filter[folder][name][_eq]=${folder}&filter[type][_starts_with]=image`,
  );
}

/* ── FAQ & Ablauf ───────────────────────────────────────────────────── */

export interface Faq {
  question: string;
  /** gesäubertes HTML */
  answer: string;
  /** reiner Text für das FAQPage-JSON-LD */
  answerText: string;
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export async function getFaqs(): Promise<Faq[]> {
  const rows = await cmsOr<{ question: string; answer: string }[]>(
    "/items/faqs?sort=sort&limit=-1&fields=question,answer&filter[status][_eq]=published",
    fallbackFaqs,
  );
  return rows.map((r) => {
    const answer = sanitizeRich(r.answer);
    return { question: r.question, answer, answerText: stripTags(answer) };
  });
}

export interface TimelineStep {
  title: string;
  text: string;
}

export const fallbackSteps: TimelineStep[] = [
  { title: "Willkommen im Weingut", text: "Ankommen, anstoßen: Begrüßung mit dem ersten Glas und einem Pfälzer Häppchen." },
  { title: "Hinaus in die Weinberge", text: "Ausblicke über das Rebenmeer — und Einblicke, warum genau hier besondere Weine wachsen." },
  { title: "Die Geschichte erwacht", text: "Aus „Napoleon war einmal hier“ wird: Jemand von uns ist Napoleon — und plötzlich wird die Geschichte lebendig." },
  { title: "Wein & Food-Pairing", text: "Fünf Weine lokaler Winzer, jeder mit einem eigens abgestimmten, liebevoll gemachten Snack." },
  { title: "Historisches Gimmeldingen", text: "Durch malerische Gassen und Höfe — weitere Kapitel der Pfälzer Weingeschichte inklusive." },
  { title: "Gemeinsamer Abschluss", text: "Ein letztes Glas, viele Anekdoten und Erinnerungen, die noch lange Gesprächsstoff bleiben." },
];

export async function getTimelineSteps(): Promise<TimelineStep[]> {
  const rows = await cmsOr<TimelineStep[]>("/items/timeline_steps?sort=sort&limit=-1&fields=title,text", fallbackSteps);
  return rows.map((r) => ({ title: r.title, text: sanitizeRich(r.text) }));
}
