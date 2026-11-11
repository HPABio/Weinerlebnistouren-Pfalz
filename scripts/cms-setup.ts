/**
 * Richtet das Directus-CMS ein (Schema als Code) und befüllt es mit den
 * heutigen Inhalten der Website. Beliebig oft ausführbar:
 *
 *   ▸ fehlende Collections/Felder/Rechte werden angelegt
 *   ▸ Labels, Hinweise und Gruppen der Texte werden aktualisiert
 *   ▸ vorhandene Inhalte werden NIE überschrieben (Änderungen der Inhaberin bleiben)
 *
 *   DIRECTUS_URL=… DIRECTUS_TOKEN=<Admin-Token> BUILD_TOKEN_FILE=./build-token.txt bun run cms:setup
 *
 * Beim ersten Lauf wird ein Lese-Token für den Website-Build erzeugt und in
 * BUILD_TOKEN_FILE geschrieben (nicht ins Terminal) → in Coolify als CMS_TOKEN.
 */
import { join } from "node:path";
import { TEXTS } from "../src/lib/cms/texts";
import { IMAGES } from "../src/lib/cms/images";
import { BRAND_COLORS } from "../src/lib/cms/rich";
import { fallbackSettings, fallbackSteps } from "../src/lib/cms/content";
import { seasonTours, faqs } from "../src/data/landingPage";

const BASE = process.env.DIRECTUS_URL?.replace(/\/+$/, "");
const TOKEN = process.env.DIRECTUS_TOKEN;
const BUILD_TOKEN_FILE = process.env.BUILD_TOKEN_FILE;
if (!BASE || !TOKEN) throw new Error("DIRECTUS_URL und DIRECTUS_TOKEN (Admin) setzen");

const ASSETS = join(import.meta.dir, "..", "src/assets/images");

/* ── HTTP ──────────────────────────────────────────────────────────── */

async function api<T = any>(method: string, path: string, body?: unknown): Promise<T> {
  const isForm = body instanceof FormData;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
    },
    body: body == null ? undefined : isForm ? body : JSON.stringify(body),
  });
  if (res.status === 204) return undefined as T;
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${JSON.stringify(json.errors ?? json)}`);
  return json.data as T;
}

const exists = async (path: string) =>
  (await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${TOKEN}` } })).ok;

const log = (msg: string) => console.log(`  ${msg}`);

/* ── Feld-Bausteine ────────────────────────────────────────────────── */

const richOptions = {
  toolbar: ["bold", "italic", "underline", "forecolor", "bullist", "numlist", "blockquote", "customLink", "unlink", "removeformat", "undo", "redo"],
  tinymceOverrides: {
    color_map: Object.entries(BRAND_COLORS).flat(),
    custom_colors: false,
    color_cols: 3,
    valid_styles: { span: "color" },
    entity_encoding: "raw",
  },
};

type Field = Record<string, any>;
interface FieldOpts {
  note?: string;
  width?: "half" | "full";
  required?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  conditions?: unknown[];
}

const de = (label: string) => [{ language: "de-DE", translation: label }];

const base = (field: string, type: string, iface: string, label: string, o: FieldOpts, extra: Field = {}): Field => ({
  field,
  type,
  schema: { is_nullable: true },
  meta: {
    interface: iface,
    translations: de(label),
    note: o.note ?? null,
    width: o.width ?? "full",
    required: o.required ?? false,
    hidden: o.hidden ?? false,
    readonly: o.readonly ?? false,
    conditions: o.conditions ?? null,
    ...extra,
  },
});

const text = (f: string, l: string, o: FieldOpts = {}) => base(f, "string", "input", l, o);
const longText = (f: string, l: string, o: FieldOpts = {}) => base(f, "text", "input-multiline", l, o);
const rich = (f: string, l: string, o: FieldOpts = {}) => base(f, "text", "input-rich-text-html", l, o, { options: richOptions });
const image = (f: string, l: string, o: FieldOpts = {}) => base(f, "uuid", "file-image", l, o, { special: ["file"] });

const sortField: Field = { field: "sort", type: "integer", schema: { is_nullable: true }, meta: { interface: "input", hidden: true } };

const statusField: Field = {
  field: "status",
  type: "string",
  schema: { default_value: "published", is_nullable: false },
  meta: {
    interface: "select-dropdown",
    width: "half",
    display: "labels",
    translations: de("Status"),
    options: { choices: [{ text: "Sichtbar", value: "published" }, { text: "Ausgeblendet", value: "draft" }] },
  },
};

/* ── Collections ───────────────────────────────────────────────────── */

interface CollectionDef {
  collection: string;
  label: string;
  icon: string;
  note: string;
  singleton?: boolean;
  pk: Field;
  fields: Field[];
  display?: string;
  sort?: boolean;
  files?: string[];
}

const intPk: Field = { field: "id", type: "integer", schema: { is_primary_key: true, has_auto_increment: true }, meta: { hidden: true } };
const keyPk: Field = { field: "key", type: "string", schema: { is_primary_key: true, length: 128 }, meta: { readonly: true, hidden: true } };

const COLLECTIONS: CollectionDef[] = [
  {
    collection: "site_settings",
    label: "Einstellungen",
    icon: "tune",
    note: "Buchungslink, Kontaktdaten und welche Tour auf der Startseite „Als Nächstes“ erscheint.",
    singleton: true,
    pk: intPk,
    fields: [
      text("booking_calendar_url", "Link zum Buchungskalender", { note: "Wird auf allen Seiten für „Termine & Buchung“ verwendet." }),
      text("voucher_url", "Link für „Tour verschenken“", { width: "half" }),
      text("email", "E-Mail-Adresse", { width: "half" }),
      text("phone", "Telefon (für Anruf-Links)", { width: "half", note: "Ohne Leerzeichen, z. B. +491707110535" }),
      text("phone_display", "Telefon (Anzeige)", { width: "half", note: "So, wie es auf der Website stehen soll" }),
      base("featured_tour", "string", "select-dropdown", "„Als Nächstes“ auf der Startseite", { note: "Leer lassen = automatisch nach Jahreszeit." }, {
        options: { allowNone: true, choices: seasonTours.map((t) => ({ text: `${t.season}: ${t.title}`, value: t.id })) },
      }),
    ],
  },
  {
    collection: "tours",
    label: "Touren",
    icon: "hiking",
    note: "Die vier Touren. Galerie-Fotos: Mediathek › Touren › <Tour> — einfach dort hochladen.",
    pk: { field: "id", type: "string", schema: { is_primary_key: true, length: 32 }, meta: { readonly: true, width: "half", translations: de("Kennung") } },
    display: "{{season}} – {{title}}",
    sort: true,
    files: ["spotlight_image"],
    fields: [
      sortField,
      text("season", "Jahreszeit", { width: "half", required: true }),
      text("months", "Zeitraum", { width: "half", note: "z. B. „März – April“" }),
      text("title", "Titel", { required: true, note: "Bitte kein „ß“ — die Überschriften-Schrift hat dafür keine saubere Glyphe." }),
      longText("claim", "Kurzbeschreibung (Startseite)"),
      base("facts", "json", "tags", "Eckdaten", { note: "Je Angabe Enter drücken, z. B. „ca. 4 Stunden“" }, { special: ["cast-json"], options: { alphabetize: false } }),
      text("price_from", "Preis ab", { width: "half", note: "z. B. „49 €“ — leer lassen, wenn der Preis nur im Buchungskalender steht." }),
      text("price_includes", "Was im Preis steckt", { width: "half" }),
      text("date_hint", "Termin-Hinweis", { width: "half" }),
      text("booking_url", "Buchungslink dieser Tour", { width: "half" }),
      image("spotlight_image", "Foto für „Als Nächstes“", { width: "half" }),
      text("spotlight_image_alt", "Bildbeschreibung (für Blinde & Google)", { width: "half" }),
    ],
  },
  {
    collection: "faqs",
    label: "Häufige Fragen",
    icon: "quiz",
    note: "FAQ auf der Startseite. Reihenfolge per Ziehen ändern.",
    pk: intPk,
    display: "{{question}}",
    sort: true,
    fields: [sortField, statusField, text("question", "Frage", { required: true, note: "Bitte kein „ß“ in Fragen." }), rich("answer", "Antwort", { required: true })],
  },
  {
    collection: "timeline_steps",
    label: "Tour-Ablauf",
    icon: "timeline",
    note: "„So fühlt sich eine Tour an“ auf der Startseite. Reihenfolge per Ziehen ändern.",
    pk: intPk,
    display: "{{title}}",
    sort: true,
    fields: [sortField, text("title", "Station", { required: true, note: "Bitte kein „ß“." }), rich("text", "Beschreibung", { required: true })],
  },
  {
    collection: "text_blocks",
    label: "Texte",
    icon: "edit_note",
    note: "Überschriften, Absätze und Buttons der Website. Über „Bereich“ finden Sie die Stelle auf der Seite.",
    pk: keyPk,
    display: "{{group}} › {{label}}",
    fields: [
      text("group", "Bereich", { readonly: true, width: "half" }),
      text("label", "Text", { readonly: true, width: "half" }),
      { field: "kind", type: "string", schema: { is_nullable: false, default_value: "text" }, meta: { hidden: true } },
      text("note", "Hinweis", { readonly: true }),
      text("text", "Inhalt", { conditions: [{ name: "nur einfache Texte", rule: { kind: { _eq: "rich" } }, hidden: true }] }),
      rich("rich", "Inhalt", { conditions: [{ name: "nur formatierte Texte", rule: { kind: { _eq: "text" } }, hidden: true }] }),
    ],
  },
  {
    collection: "image_slots",
    label: "Fotos auf der Website",
    icon: "photo_library",
    note: "Feste Foto-Plätze. Zum Austauschen ein anderes Bild aus der Mediathek wählen oder neu hochladen.",
    pk: keyPk,
    display: "{{group}} › {{label}}",
    files: ["image"],
    fields: [
      text("group", "Bereich", { readonly: true, width: "half" }),
      text("label", "Platz", { readonly: true, width: "half" }),
      image("image", "Foto"),
      text("alt", "Bildbeschreibung (für Blinde & Google)"),
    ],
  },
];

const CONTENT = COLLECTIONS.map((c) => c.collection);

async function ensureCollections() {
  console.log("Collections & Felder");
  for (const c of COLLECTIONS) {
    const meta = {
      icon: c.icon,
      note: c.note,
      singleton: c.singleton ?? false,
      sort_field: c.sort ? "sort" : null,
      display_template: c.display ?? null,
      translations: [{ language: "de-DE", translation: c.label, singular: c.label, plural: c.label }],
    };
    if (!(await exists(`/collections/${c.collection}`))) {
      await api("POST", "/collections", { collection: c.collection, meta, schema: {}, fields: [c.pk] });
      log(`+ ${c.collection}`);
    } else {
      await api("PATCH", `/collections/${c.collection}`, { meta });
    }
    for (const f of c.fields) {
      if (await exists(`/fields/${c.collection}/${f.field}`)) {
        await api("PATCH", `/fields/${c.collection}/${f.field}`, { meta: f.meta });
      } else {
        await api("POST", `/fields/${c.collection}`, f);
        log(`+ ${c.collection}.${f.field}`);
      }
    }
    for (const field of c.files ?? []) {
      if (!(await exists(`/relations/${c.collection}/${field}`))) {
        await api("POST", "/relations", { collection: c.collection, field, related_collection: "directus_files", schema: { on_delete: "SET NULL" } });
        log(`+ Relation ${c.collection}.${field} → Dateien`);
      }
    }
  }
}

/* ── Rollen & Rechte ───────────────────────────────────────────────── */

async function ensurePolicy(name: string, icon: string, appAccess: boolean, description: string): Promise<string> {
  const [found] = await api<{ id: string }[]>("GET", `/policies?filter[name][_eq]=${encodeURIComponent(name)}&fields=id`);
  if (found) return found.id;
  const created = await api<{ id: string }>("POST", "/policies", { name, icon, description, admin_access: false, app_access: appAccess });
  log(`+ Richtlinie ${name}`);
  return created.id;
}

async function ensurePermission(policy: string, collection: string, action: string, fields: string[] = ["*"]) {
  const filter = `filter[policy][_eq]=${policy}&filter[collection][_eq]=${collection}&filter[action][_eq]=${action}`;
  const [found] = await api<{ id: number }[]>("GET", `/permissions?${filter}&fields=id`);
  if (!found) await api("POST", "/permissions", { policy, collection, action, fields, permissions: {}, validation: {} });
}

async function ensureRole(name: string, icon: string, policy: string): Promise<string> {
  const [found] = await api<{ id: string }[]>("GET", `/roles?filter[name][_eq]=${encodeURIComponent(name)}&fields=id`);
  if (found) return found.id;
  const role = await api<{ id: string }>("POST", "/roles", { name, icon, policies: [{ policy }] });
  log(`+ Rolle ${name}`);
  return role.id;
}

async function ensureAccess() {
  console.log("Rollen & Rechte");

  // Redaktion (Inhaberin): Inhalte bearbeiten, Bilder verwalten — keine Schema-Änderungen.
  const editor = await ensurePolicy("Redaktion", "edit", true, "Inhalte und Bilder pflegen");
  for (const c of CONTENT) {
    await ensurePermission(editor, c, "read");
    await ensurePermission(editor, c, "update");
  }
  // Listen darf sie erweitern und kürzen; feste Texte, Foto-Plätze & Touren nicht.
  for (const c of ["faqs", "timeline_steps"]) {
    await ensurePermission(editor, c, "create");
    await ensurePermission(editor, c, "delete");
  }
  for (const action of ["create", "read", "update", "delete"]) await ensurePermission(editor, "directus_files", action);
  for (const action of ["create", "read"]) await ensurePermission(editor, "directus_folders", action);
  await ensureRole("Redaktion", "edit", editor);

  // Website-Build: nur lesen.
  const build = await ensurePolicy("Website-Build", "build", false, "Liest Inhalte beim Bauen der Website");
  for (const c of [...CONTENT, "directus_files", "directus_folders"]) await ensurePermission(build, c, "read");
  const buildRole = await ensureRole("Website-Build", "build", build);

  // Öffentlich: nur Bilddateien (für /assets/<id> im Browser der Besucher).
  const [pub] = await api<{ id: string }[]>("GET", `/policies?filter[name][_eq]=${encodeURIComponent("$t:public_label")}&fields=id`);
  if (pub) await ensurePermission(pub.id, "directus_files", "read", ["id", "type", "width", "height", "filename_download"]);
  else console.warn("  ! Öffentliche Richtlinie nicht gefunden — Bilder evtl. nicht öffentlich abrufbar");

  return { buildRole };
}

async function ensureBuildUser(role: string) {
  const email = "website-build@weinerlebnistouren-pfalz.de";
  const [found] = await api<{ id: string }[]>("GET", `/users?filter[email][_eq]=${encodeURIComponent(email)}&fields=id`);
  if (found) return;
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, "0")).join("");
  await api("POST", "/users", { email, first_name: "Website", last_name: "Build", role, token, status: "active" });
  if (BUILD_TOKEN_FILE) {
    await Bun.write(BUILD_TOKEN_FILE, token + "\n");
    log(`+ Build-Benutzer angelegt, Token gespeichert in ${BUILD_TOKEN_FILE}`);
  } else {
    console.log(`\n  ▶ Build-Token (einmalig, als CMS_TOKEN in Coolify hinterlegen): ${token}\n`);
  }
}

/* ── Inhalte ───────────────────────────────────────────────────────── */

async function folderId(name: string): Promise<string> {
  const [f] = await api<{ id: string }[]>("GET", `/folders?filter[name][_eq]=${encodeURIComponent(name)}&fields=id`);
  return f ? f.id : (await api<{ id: string }>("POST", "/folders", { name })).id;
}

/** Datei im Ordner per Dateiname finden oder aus dem Repo hochladen. */
async function fileFor(relPath: string, folderName: string, title: string): Promise<string> {
  const folder = await folderId(folderName);
  const name = relPath.split("/").pop()!;
  const [found] = await api<{ id: string }[]>(
    "GET",
    `/files?filter[folder][_eq]=${folder}&filter[filename_download][_eq]=${encodeURIComponent(name)}&fields=id`,
  );
  if (found) return found.id;
  const form = new FormData();
  form.append("folder", folder);
  form.append("title", title);
  form.append("file", Bun.file(join(ASSETS, relPath)), name);
  log(`↑ ${relPath}`);
  return (await api<{ id: string }>("POST", "/files", form)).id;
}

const SPOTLIGHT: Record<string, { file: string; alt: string }> = {
  mandelbluete: { file: "tours/mandelbluete/Brigitta lacht_mandelbluete.webp", alt: "Gästegruppe lacht gemeinsam mit Gästeführerin Brigitta Heyl zwischen blühenden Mandelbäumen" },
  mussbach: { file: "tours/mussbach/IMG_0968_mussbach.webp", alt: "Der schattige Mussbach fließt durch den sommerlichen Wald" },
  bacchus: { file: "tours/bacchus/ANETTE_IMG_4666_bacchus.webp", alt: "Große Gruppe lauscht der Gästeführerin an Picknickbänken in den Weinbergen" },
  gluehwein: { file: "tours/gluehwein/IMG_1837_gluehwein.webp", alt: "Winterliche Glühwein-Station im Lichterglanz von Gimmeldingen" },
};
const TOUR_FOLDER: Record<string, string> = { mandelbluete: "Mandelblüte", mussbach: "Mussbach", bacchus: "Bacchus", gluehwein: "Glühwein" };

const isEmpty = async (collection: string) => (await api<unknown[]>("GET", `/items/${collection}?limit=1&fields=*`)).length === 0;

async function seed() {
  console.log("Inhalte");

  const settings = await api<Record<string, unknown> | null>("GET", "/items/site_settings");
  if (!settings?.booking_calendar_url) {
    await api("PATCH", "/items/site_settings", fallbackSettings);
    log("Einstellungen übernommen");
  }

  if (await isEmpty("tours")) {
    for (const [i, t] of seasonTours.entries()) {
      const s = SPOTLIGHT[t.id];
      await api("POST", "/items/tours", {
        id: t.id,
        sort: i + 1,
        season: t.season,
        months: t.months,
        title: t.title,
        claim: t.claim,
        facts: t.facts,
        price_from: t.priceFrom,
        price_includes: t.priceIncludes,
        date_hint: t.dateHint,
        booking_url: t.bookingUrl,
        spotlight_image: await fileFor(s.file, TOUR_FOLDER[t.id], t.title),
        spotlight_image_alt: s.alt,
      });
    }
    log(`${seasonTours.length} Touren übernommen`);
  }

  if (await isEmpty("faqs")) {
    await api("POST", "/items/faqs", faqs.map((f, i) => ({ sort: i + 1, status: "published", question: f.question, answer: `<p>${f.answer}</p>` })));
    log(`${faqs.length} Fragen übernommen`);
  }

  if (await isEmpty("timeline_steps")) {
    await api("POST", "/items/timeline_steps", fallbackSteps.map((s, i) => ({ sort: i + 1, title: s.title, text: `<p>${s.text}</p>` })));
    log(`${fallbackSteps.length} Stationen übernommen`);
  }

  const have = new Set((await api<{ key: string }[]>("GET", "/items/text_blocks?limit=-1&fields=key")).map((r) => r.key));
  const missing = Object.entries(TEXTS).filter(([k]) => !have.has(k));
  if (missing.length) {
    await api(
      "POST",
      "/items/text_blocks",
      missing.map(([key, d]) => ({
        key,
        group: d.group,
        label: d.label,
        kind: d.kind,
        note: "note" in d ? d.note : null,
        text: d.kind === "text" ? d.default : null,
        rich: d.kind === "rich" ? `<p>${d.default}</p>` : null,
      })),
    );
    log(`${missing.length} Texte übernommen`);
  }
  // Labels/Gruppen dürfen sich im Code ändern — der Inhalt bleibt unberührt.
  for (const [key, d] of Object.entries(TEXTS).filter(([k]) => have.has(k))) {
    await api("PATCH", `/items/text_blocks/${encodeURIComponent(key)}`, { group: d.group, label: d.label, note: "note" in d ? d.note : null });
  }

  const haveSlots = new Set((await api<{ key: string }[]>("GET", "/items/image_slots?limit=-1&fields=key")).map((r) => r.key));
  for (const [key, d] of Object.entries(IMAGES)) {
    if (haveSlots.has(key)) {
      await api("PATCH", `/items/image_slots/${encodeURIComponent(key)}`, { group: d.group, label: d.label });
      continue;
    }
    const file = await fileFor(d.seed, d.folder, d.label);
    await api("POST", "/items/image_slots", { key, group: d.group, label: d.label, image: file, alt: d.alt });
    log(`+ Foto-Platz ${key}`);
  }
}

/* ── Start ─────────────────────────────────────────────────────────── */

await ensureCollections();
const { buildRole } = await ensureAccess();
await ensureBuildUser(buildRole);
await seed();
console.log("\nFertig.");
