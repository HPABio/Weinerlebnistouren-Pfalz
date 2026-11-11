/**
 * Register der austauschbaren Foto-Plätze (Inhaltsfotos, nicht Design-Grafiken).
 *
 * Logos, Karten und Illustrationen bleiben Teil des Designs im Repo.
 * Echte Fotos (Touren, Gäste, Porträts) liegen in der Directus-Mediathek und
 * werden hier über einen festen Schlüssel einem Platz auf der Website
 * zugeordnet. `seed` = heutige Datei im Repo, wird von scripts/cms-setup.ts
 * einmalig hochgeladen.
 */

export interface ImageDef {
  group: string;
  label: string;
  /** Pfad relativ zu src/assets/images/ (nur für die Erstbefüllung). */
  seed: string;
  /** Ziel-Ordner in der Mediathek für die Erstbefüllung. */
  folder: string;
  alt: string;
}

export const IMAGES = {
  "home.timeline.photo1": {
    group: "Startseite · 4 Ablauf",
    label: "Foto links (Rolle)",
    seed: "compressed/webP/Maja-Nett-als-Napoleon.webp",
    folder: "Allgemein",
    alt: "Ein Gast in der Rolle Napoleons am Napoleonsbänkel in den Weinbergen",
  },
  "home.timeline.photo2": {
    group: "Startseite · 4 Ablauf",
    label: "Foto rechts (Runde)",
    seed: "tours/bacchus/IMG_4770_bacchus.webp",
    folder: "Bacchus",
    alt: "Gruppe stößt mit Weingläsern über den Weinbergen an",
  },
} satisfies Record<string, ImageDef>;

export type ImageKey = keyof typeof IMAGES;
