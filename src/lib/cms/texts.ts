/**
 * Register aller im CMS pflegbaren Einzeltexte.
 *
 *   ▸ `default` ist der heutige Text — er wird beim ersten Einrichten ins CMS
 *     übernommen (scripts/cms-setup.ts) und dient ohne CMS als Fallback.
 *   ▸ `kind: "text"`  → einzeiliges Feld, ohne Formatierung (Überschriften, Buttons)
 *     `kind: "rich"`  → Editor mit Fett, Kursiv, Listen, Links und Markenfarben
 *   ▸ Gruppe + Label erscheinen so im CMS; Gruppen sortieren nach Seite.
 *
 * Neuen Text pflegbar machen: Eintrag hier ergänzen, im Markup
 * <CmsText k="…" /> verwenden, `bun run cms:setup` ausführen.
 */

export type TextKind = "text" | "rich";

export interface TextDef {
  group: string;
  label: string;
  kind: TextKind;
  default: string;
  /** Hinweis für die Redaktion, erscheint unter dem Feld. */
  note?: string;
}

const NO_SZ = "Bitte kein „ß“ in Überschriften — die Schrift hat dafür keine saubere Glyphe.";

export const TEXTS = {
  // ── Startseite › Hero ────────────────────────────────────────────────
  "home.hero.intro": {
    group: "Startseite · 1 Hero",
    label: "Einleitungstext",
    kind: "rich",
    default:
      "Wandern Sie durch die Weinberge rund um Gimmeldingen, verkosten Sie fünf Pfälzer Weine mit passenden Snacks — und werden Sie auf einer interaktiven Zeitreise selbst Teil der Geschichte.",
  },
  "home.hero.facts": {
    group: "Startseite · 1 Hero",
    label: "Eckdaten-Zeile",
    kind: "text",
    default: "ca. 4 Stunden · ca. 4 km · 5 Weine & Snacks",
    note: "Einzelne Angaben mit „·“ trennen.",
  },
  "home.hero.ctaPrimary": {
    group: "Startseite · 1 Hero",
    label: "Button: Buchung",
    kind: "text",
    default: "Termine & Buchung",
  },
  "home.hero.ctaSecondary": {
    group: "Startseite · 1 Hero",
    label: "Button: Touren",
    kind: "text",
    default: "Die vier Touren",
  },

  // ── Startseite › Als Nächstes ────────────────────────────────────────
  "home.spotlight.kicker": {
    group: "Startseite · 2 Als Nächstes",
    label: "Überschrift (Schreibschrift)",
    kind: "text",
    default: "Als Nächstes im Weinjahr",
  },
  "home.spotlight.noPrice": {
    group: "Startseite · 2 Als Nächstes",
    label: "Hinweis, wenn kein Preis hinterlegt ist",
    kind: "rich",
    default: "Alle Preise finden Sie direkt beim jeweiligen Termin im Buchungskalender.",
  },
  "home.spotlight.ctaPrimary": {
    group: "Startseite · 2 Als Nächstes",
    label: "Button: Buchung",
    kind: "text",
    default: "Jetzt Platz sichern",
  },
  "home.spotlight.ctaSecondary": {
    group: "Startseite · 2 Als Nächstes",
    label: "Link: Mehr zur Tour",
    kind: "text",
    default: "Mehr zur Tour erfahren",
  },

  // ── Startseite › Ablauf ──────────────────────────────────────────────
  "home.timeline.kicker": {
    group: "Startseite · 4 Ablauf",
    label: "Überschrift (Schreibschrift)",
    kind: "text",
    default: "So fühlt sich eine Tour an",
  },
  "home.timeline.title": {
    group: "Startseite · 4 Ablauf",
    label: "Hauptüberschrift",
    kind: "text",
    default: "Vier Stunden, die schneller vergehen als gedacht",
    note: NO_SZ,
  },
  "home.timeline.intro": {
    group: "Startseite · 4 Ablauf",
    label: "Einleitungstext",
    kind: "rich",
    default:
      "Keine Tour gleicht der anderen — aber so ungefähr dürfen Sie sich den Nachmittag vorstellen. Den Rest verrate ich unterwegs.",
  },
  "home.timeline.caption1": {
    group: "Startseite · 4 Ablauf",
    label: "Bildunterschrift Foto links",
    kind: "text",
    default: "Heute mal Napoleon sein",
  },
  "home.timeline.caption2": {
    group: "Startseite · 4 Ablauf",
    label: "Bildunterschrift Foto rechts",
    kind: "text",
    default: "Auf die Pfalz!",
  },
  "home.timeline.watermark": {
    group: "Startseite · 4 Ablauf",
    label: "Wasserzeichen im Hintergrund",
    kind: "text",
    default: "vier Stunden",
  },

  // ── Startseite › FAQ ─────────────────────────────────────────────────
  "home.faq.kicker": {
    group: "Startseite · 5 FAQ",
    label: "Überschrift (Schreibschrift)",
    kind: "text",
    default: "Gut zu wissen",
  },
  "home.faq.title": {
    group: "Startseite · 5 FAQ",
    label: "Hauptüberschrift",
    kind: "text",
    default: "Alles Wichtige vor Ihrer Tour",
    note: NO_SZ,
  },
  "home.faq.intro": {
    group: "Startseite · 5 FAQ",
    label: "Einleitungstext",
    kind: "rich",
    default:
      'Die häufigsten Fragen auf einen Blick — alles Weitere beantworte ich gerne <a href="/kontakt">persönlich</a>.',
  },

  // ── Startseite › Abschluss ───────────────────────────────────────────
  "home.cta.kicker": {
    group: "Startseite · 7 Abschluss",
    label: "Überschrift (Schreibschrift)",
    kind: "text",
    default: "Auf bald in Gimmeldingen!",
  },
  "home.cta.title": {
    group: "Startseite · 7 Abschluss",
    label: "Hauptüberschrift",
    kind: "text",
    default: "Sichern Sie sich Ihren Platz",
    note: NO_SZ,
  },
  "home.cta.text": {
    group: "Startseite · 7 Abschluss",
    label: "Text",
    kind: "rich",
    default:
      "Alle Termine für jede Jahreszeit finden Sie im Buchungskalender — oder Sie verschenken eine Weinerlebnistour an Ihre Liebsten.",
  },
  "home.cta.ctaPrimary": {
    group: "Startseite · 7 Abschluss",
    label: "Button: Buchung",
    kind: "text",
    default: "Zum Buchungskalender",
  },
  "home.cta.ctaSecondary": {
    group: "Startseite · 7 Abschluss",
    label: "Button: Verschenken",
    kind: "text",
    default: "Tour verschenken",
  },
  "home.cta.groups": {
    group: "Startseite · 7 Abschluss",
    label: "Zeile mit Gruppen-Links",
    kind: "rich",
    default:
      'Sie planen mit Team, Verein oder Familie? <a href="/gruppen">Gruppen & private Touren</a> · <a href="/firmen-events">Firmen-Events</a>',
  },
} satisfies Record<string, TextDef>;

export type TextKey = keyof typeof TEXTS;
