/**
 * Zentrale Datenquelle für die Social-Proof-Komponenten
 * (Google Reviews, Tripadvisor, LinkedIn-Artikel).
 *
 * ▸ Alles hier ist reiner Inhalt — die Komponenten selbst müssen nicht angefasst
 *   werden, wenn neue Bewertungen oder Artikel dazukommen.
 *
 * ▸ Solange `reviews` bzw. `articles` leer sind, rendern die Komponenten
 *   automatisch eine schlanke "Jetzt ansehen"-Variante, die nur auf das jeweilige
 *   Profil verlinkt. Es wird nie etwas erfunden oder als Platzhalter angezeigt.
 *
 * ▸ WICHTIG: Hier ausschließlich echte, tatsächlich abgegebene Bewertungen
 *   eintragen (wortgetreu kopiert). Erfundene Bewertungen sind wettbewerbs-
 *   rechtlich unzulässig.
 */

export interface Review {
  /** Anzeigename wie auf der Plattform, z. B. "Sabine K." */
  author: string;
  /** 1–5 */
  rating: number;
  /** Freitext, z. B. "März 2026" oder "vor 2 Wochen" */
  date?: string;
  /** Der Bewertungstext, wortgetreu von der Plattform übernommen. */
  text: string;
  /** Optionaler Direktlink zur einzelnen Bewertung. */
  url?: string;
}

export interface ReviewSource {
  /** Öffentliches Profil, auf das "Alle Bewertungen ansehen" verlinkt. */
  profileUrl: string;
  /** Durchschnittsbewertung, z. B. 4.9 — leer lassen, wenn unbekannt. */
  rating?: number;
  /** Gesamtzahl der Bewertungen auf der Plattform. */
  reviewCount?: number;
  /** Ausgewählte Bewertungen, die auf der Seite gezeigt werden. */
  reviews: Review[];
}

export interface LinkedInArticle {
  title: string;
  url: string;
  /** Kurzer Teaser (2–3 Zeilen). */
  description?: string;
  /** Freitext, z. B. "Februar 2026". */
  publishedAt?: string;
  /**
   * Optional: URN des LinkedIn-Beitrags für die echte Einbettung, z. B.
   * "urn:li:share:7161234567890123456" oder "urn:li:ugcPost:...".
   *
   * So kommt man dran: Beitrag auf LinkedIn öffnen → "…" → "Beitrag einbetten"
   * → im ausgegebenen iframe-Code steht die URN in der src-URL.
   *
   * Ist eine URN hinterlegt, zeigt die Komponente einen datenschutzkonformen
   * Zwei-Klick-Einbettungs-Button ("Beitrag laden"). Ohne URN wird eine
   * schlichte Artikel-Karte mit Link gerendert.
   */
  embedUrn?: string;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Google
 *
 * Zwei Wege — der automatische hat Vorrang:
 *
 * 1. Business Profile API (empfohlen):  `bun run reviews:fetch` holt die
 *    Rezensionen und schreibt sie nach google-reviews.json. Sobald dort
 *    Einträge stehen, werden sie hier automatisch verwendet.
 *    Einrichtung: siehe scripts/fetch-google-reviews.ts
 *
 * 2. Manuell: Bewertungen unten in `manualGoogleReviews` eintragen. Wird nur
 *    genutzt, solange die API-Datei leer ist.
 *
 * Profil-URL ermitteln: Google-Maps-Eintrag öffnen → "Rezensionen" → Teilen →
 * Link kopieren. Ein Link der Form https://g.page/r/<ID>/review führt Besucher
 * direkt zum Bewertungsformular.
 * ──────────────────────────────────────────────────────────────────────────── */
import googleApiCache from "./google-reviews.json";

const googleProfileUrl =
  "https://www.google.com/maps/search/?api=1&query=Weinerlebnistouren+Heyl+Gimmeldingen";

/** Fallback, solange die API nicht angebunden ist. */
const manualGoogleReviews: Review[] = [];

const apiReviews = googleApiCache.reviews as Review[];
const useApi = apiReviews.length > 0;

export const googleReviews: ReviewSource = {
  profileUrl: googleProfileUrl,
  rating: useApi ? (googleApiCache.averageRating ?? undefined) : undefined,
  reviewCount: useApi
    ? (googleApiCache.totalReviewCount ?? undefined)
    : undefined,
  reviews: useApi ? apiReviews : manualGoogleReviews,
};

/* ────────────────────────────────────────────────────────────────────────────
 * Tripadvisor
 *
 * Profil-URL: die öffentliche "Attraction_Review"-Seite des Eintrags.
 * ──────────────────────────────────────────────────────────────────────────── */
export const tripadvisorReviews: ReviewSource = {
  profileUrl: "https://www.tripadvisor.de/",
  // rating: 5.0,
  // reviewCount: 12,
  reviews: [],
};

/* ────────────────────────────────────────────────────────────────────────────
 * LinkedIn
 * ──────────────────────────────────────────────────────────────────────────── */
export const linkedInProfileUrl =
  "https://www.linkedin.com/in/dr-brigitta-heyl-frank-85603036a/";

export const linkedInArticles: LinkedInArticle[] = [];
