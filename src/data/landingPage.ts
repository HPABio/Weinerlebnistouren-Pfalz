/**
 * Zentrale Datenquelle für die Conversion-Sektionen der Startseite
 * („Als Nächstes", Jahreszeiten-Überblick, FAQ).
 *
 * ▸ Alles hier ist reiner Inhalt — Preise, Termine-Hinweise und FAQ-Antworten
 *   lassen sich anpassen, ohne die Komponenten anzufassen.
 *
 * ▸ WICHTIG (Preise): `priceFrom` nur eintragen, wenn der Wert mit dem
 *   Buchungskalender übereinstimmt. Steht dort `null`, zeigt die Startseite
 *   stattdessen den Hinweis auf den Buchungskalender — es wird nie ein
 *   Preis erfunden.
 */

export type TourId = "mandelbluete" | "mussbach" | "bacchus" | "gluehwein";

export interface SeasonTour {
  id: TourId;
  season: string;
  /** Zeitfenster der öffentlichen Termine, z. B. "September – Oktober". */
  months: string;
  title: string;
  /** Ein Satz für die Spotlight-Karte („Als Nächstes"). */
  claim: string;
  /** Kurze Eckdaten-Chips. */
  facts: string[];
  /**
   * „ab"-Preis pro Person als Anzeigestring (z. B. "45 €") — oder `null`,
   * solange der Preis nicht sicher bekannt ist.
   */
  priceFrom: string | null;
  /** Was im Preis steckt — macht den Preis sofort besser verständlich. */
  priceIncludes: string | null;
  /** Optionaler Termin-Hinweis, z. B. "Termine meist freitags & samstags". */
  dateHint: string | null;
  /** Direktlink zu den Terminen dieser Tour. */
  bookingUrl: string;
  /** Anker auf der Touren-Übersichtsseite. */
  tourenHref: string;
  /* Saisonale Akzentfarben als vollständige Klassennamen (kein dynamisches
     Zusammensetzen, damit Tailwind sie beim Build nicht wegpurged). */
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentLine: string;
}

export const seasonTours: SeasonTour[] = [
  {
    id: "mandelbluete",
    season: "Frühling",
    months: "März – April",
    title: "Mandelblüte, Meerspinne und Monarchen",
    claim:
      "Wenn die Mandelbäume rosa blühen: fünf Frühlingsweine, feine Mandelköstlichkeiten und 700 Jahre Wittelsbacher Geschichte zum Mitspielen.",
    facts: ["ca. 4 Stunden", "ca. 4 km", "5 Weine & Mandel-Snacks"],
    priceFrom: "49 €",
    priceIncludes: "pro Person · inkl. 5 Weine & Mandel-Snacks",
    dateHint: "Öffentliche Termine rund um die Mandelblüte",
    bookingUrl: "https://eveeno.com/Mandelbluete",
    tourenHref: "/touren#mandelbluete",
    accentText: "text-accent2-wine",
    accentBg: "bg-accent2-wine hover:bg-accent2-wine/90",
    accentBorder: "border-accent2-wine/30",
    accentLine: "bg-accent2-wine/40",
  },
  {
    id: "mussbach",
    season: "Sommer",
    months: "Mai – August",
    title: "Magischer Mussbach",
    claim:
      "Sommerlich-erfrischend am Wasser entlang: schattige Pfade, historische Mühlen, fünf regionale Weine — und zum Abschluss pflanzt jeder Gast einen Baum.",
    facts: ["ca. 6 Stunden", "4, 8 oder 12 km", "5 Weine & Baumpflanzung"],
    priceFrom: null,
    priceIncludes: null,
    dateHint: "Termine in den Sommermonaten",
    bookingUrl: "https://eveeno.com/mussbach",
    tourenHref: "/touren#mussbach",
    accentText: "text-accent1",
    accentBg: "bg-accent1 hover:bg-accent1/90",
    accentBorder: "border-accent1/40",
    accentLine: "bg-accent1/50",
  },
  {
    id: "bacchus",
    season: "Herbst",
    months: "September – Oktober",
    title: "Von Bacchus bis Christophorus",
    claim:
      "Durch Weinberge und malerische Gassen zu drei historischen Weingütern — eine interaktive Zeitreise durch die pfälzische Weingeschichte, bei der jeder Gast selbst mitspielt.",
    facts: ["ca. 4 Stunden", "ca. 4 km", "5 Weine & 5 Häppchen"],
    priceFrom: "45 €",
    priceIncludes: "pro Person · inkl. 5 Weine & 5 Häppchen",
    dateHint: "Termine zur Weinlese — meist freitags & samstags",
    bookingUrl: "https://eveeno.com/bacchus",
    tourenHref: "/touren#bacchus",
    accentText: "text-accent2-brick",
    accentBg: "bg-accent2-brick hover:bg-accent2-brick/90",
    accentBorder: "border-accent2-brick/30",
    accentLine: "bg-accent2-brick/40",
  },
  {
    id: "gluehwein",
    season: "Winter",
    months: "November – Dezember",
    title: "Geheimnisvolles Gimmeldingen",
    claim:
      "Gimmeldingen im Lichterglanz: wärmende Glühweine, weihnachtliche Köstlichkeiten, geheimnisvolle Keller und alte Maskenbräuche — ein Wintermärchen zum Mitspielen.",
    facts: ["ca. 4 Stunden", "ca. 4 km", "5 Glühweine & Co."],
    priceFrom: null,
    priceIncludes: null,
    dateHint: "Termine in der Adventszeit",
    bookingUrl: "https://eveeno.com/gluehwein",
    tourenHref: "/touren#gluehwein",
    accentText: "text-accent2-plum",
    accentBg: "bg-accent2-plum hover:bg-accent2-plum/90",
    accentBorder: "border-accent2-plum/30",
    accentLine: "bg-accent2-plum/40",
  },
];

/**
 * Manuelles Override für die Spotlight-Tour auf der Startseite.
 * `null` = automatisch nach Kalendermonat wählen (siehe unten).
 */
const FEATURED_TOUR_OVERRIDE: TourId | null = null;

/**
 * Welche Tour steht gerade (bzw. als Nächstes) an?
 *
 * Wird beim Build ausgewertet — die Auswahl aktualisiert sich also mit jedem
 * Deploy. Die Fenster sind bewusst auf „Vorverkauf" ausgelegt: Ende August
 * z. B. läuft bereits der Verkauf der Herbsttour, im Januar der Vorverkauf
 * für die Mandelblüte.
 */
export function getFeaturedTour(date: Date = new Date()): SeasonTour {
  const byId = (id: TourId) => seasonTours.find((t) => t.id === id)!;
  if (FEATURED_TOUR_OVERRIDE) return byId(FEATURED_TOUR_OVERRIDE);

  const month = date.getMonth() + 1;
  if (month <= 4) return byId("mandelbluete"); // Jan – Apr
  if (month <= 7) return byId("mussbach"); // Mai – Jul
  if (month <= 10) return byId("bacchus"); // Aug – Okt (Herbstserie startet Ende August)
  return byId("gluehwein"); // Nov – Dez
}

/* ────────────────────────────────────────────────────────────────────────────
 * FAQ — beantwortet die häufigsten Fragen VOR der Buchung.
 *
 * Die Antworten bewusst ehrlich und knapp halten; bei allem, was nicht
 * pauschal zusagbar ist (Hunde, Barrierefreiheit), wird auf eine kurze
 * Rückfrage verwiesen statt etwas zu versprechen.
 * ──────────────────────────────────────────────────────────────────────────── */

export interface FaqItem {
  /** Hinweis: kein „ß" in Fragen — Bona Nova SC hat keine saubere ß-Glyphe. */
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "Was passiert bei Regen?",
    answer:
      "Die Touren finden bei jedem Wetter statt — die Pfalz gehört schließlich zu den sonnigsten Regionen Deutschlands. Denken Sie einfach an wetterfeste Kleidung. Sollte ein Termin ausnahmsweise nicht stattfinden können, werden Sie rechtzeitig informiert.",
  },
  {
    question: "Brauche ich festes Schuhwerk?",
    answer:
      "Empfehlenswert, ja: Die Route führt teils über unbefestigte Weinbergswege. Bequeme, feste Schuhe genügen völlig — Wanderstiefel braucht es nicht.",
  },
  {
    question: "Kann ich alkoholfrei teilnehmen?",
    answer:
      "Ja, auf Wunsch gibt es die Tour auch als alkoholfreie Variante — geben Sie das einfach bei der Buchung an.",
  },
  {
    question: "Gibt es vegetarische Snacks?",
    answer:
      "Ja, eine vegetarische Variante der Snacks ist möglich. Bitte bei der Buchung angeben, dann wird alles passend vorbereitet.",
  },
  {
    question: "Können Kinder mitkommen?",
    answer:
      "Ja — bei den öffentlichen Touren sind Kinder bis 12 Jahre kostenlos dabei.",
  },
  {
    question: "Darf mein Hund mitkommen?",
    answer:
      "Das klären wir am besten kurz vorab — je nach Tour und Gruppengröße. Schreiben Sie mir einfach eine kurze Nachricht.",
  },
  {
    question: "Wie komme ich hin — und wo parke ich?",
    answer:
      "Die Touren starten in Gimmeldingen bei Neustadt an der Weinstraße; der genaue Treffpunkt steht in Ihrer Buchungsbestätigung. Im Ort gibt es Parkmöglichkeiten, und Neustadt ist gut mit der Bahn erreichbar.",
  },
  {
    question: "Ist die Tour barrierefrei?",
    answer:
      "Leider nur eingeschränkt — die Wege führen teils über unbefestigte Weinbergspfade. Sprechen Sie mich vor der Buchung gerne an, dann finden wir gemeinsam heraus, ob die Route passt oder sich anpassen lässt.",
  },
  {
    question: "Kann ich eine gebuchte Tour stornieren?",
    answer:
      "Die Stornierungsbedingungen finden Sie beim jeweiligen Termin im Buchungskalender. Bei Fragen helfe ich gerne persönlich weiter.",
  },
  {
    question: "Kann ich eine Tour verschenken?",
    answer:
      "Sehr gerne — eine Weinerlebnistour ist ein beliebtes Geschenk für Geburtstage, Weihnachten oder Pfalz-Besucher. Schreiben Sie mir kurz über das Kontaktformular, dann kümmern wir uns um einen Gutschein.",
  },
];
