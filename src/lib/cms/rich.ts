import sanitizeHtml from "sanitize-html";

/**
 * Markenfarben, die im CMS-Editor zur Auswahl stehen (siehe tailwind.config.js).
 * Nur diese Farben werden beim Rendern durchgelassen — so bleibt das Design
 * auch dann stimmig, wenn im Editor kopierter Text mit fremden Farben landet.
 */
export const BRAND_COLORS: Record<string, string> = {
  "#4B3A2B": "Text (Braun)",
  "#C8A974": "Gold",
  "#8A2D52": "Weinrot",
  "#B46B54": "Ziegel",
  "#55354E": "Pflaume",
  "#FFFFFF": "Weiß",
};

const allowedColors = new Set(Object.keys(BRAND_COLORS).map((c) => c.toLowerCase()));

const hexOf = (value: string): string | null => {
  const v = value.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(v)) return v;
  const rgb = v.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (!rgb) return null;
  return "#" + rgb.slice(1, 4).map((n) => Number(n).toString(16).padStart(2, "0")).join("");
};

/** Säubert Editor-HTML: nur Grundformatierung, Listen, Links und Markenfarben. */
export function sanitizeRich(html: string): string {
  return sanitizeHtml(html ?? "", {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "a", "span", "blockquote"],
    allowedAttributes: { a: ["href", "target", "rel"], span: ["style"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    transformTags: {
      b: "strong",
      i: "em",
      a: (_tag, attribs) => {
        const external = /^https?:\/\//.test(attribs.href ?? "");
        return {
          tagName: "a",
          attribs: external
            ? { href: attribs.href, target: "_blank", rel: "noopener noreferrer" }
            : { href: attribs.href ?? "#" },
        };
      },
      // Farbe nur behalten, wenn sie zur Markenpalette gehört; Text bleibt immer.
      span: (_tag, attribs) => {
        const color = attribs.style?.match(/color\s*:\s*([^;]+)/i)?.[1];
        const hex = color ? hexOf(color) : null;
        return hex && allowedColors.has(hex)
          ? { tagName: "span", attribs: { style: `color:${hex}` } }
          : { tagName: "span", attribs: {} };
      },
    },
    // Style-Werte prüft transformTags selbst; hier nur color als Attributinhalt zulassen.
    allowedStyles: { span: { color: [/^#[0-9a-f]{6}$/i] } },
  }).trim();
}

/**
 * Für Texte, die in ein bestehendes Absatz-Element gerendert werden:
 * entfernt umschließende <p>, damit kein <p> in <p> entsteht.
 * Mehrere Absätze werden zu einem doppelten Zeilenumbruch.
 */
export function inlineRich(html: string): string {
  const clean = sanitizeRich(html);
  const paragraphs = [...clean.matchAll(/<p>([\s\S]*?)<\/p>/g)];
  const onlyParagraphs = paragraphs.length > 0 && clean.replace(/<p>[\s\S]*?<\/p>/g, "").trim() === "";
  return onlyParagraphs ? paragraphs.map((m) => m[1]).join("<br /><br />") : clean;
}
