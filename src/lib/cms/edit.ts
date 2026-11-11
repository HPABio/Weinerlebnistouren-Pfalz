/**
 * Klick-zum-Bearbeiten-Markierungen für den Visual Editor von Directus.
 *
 * Nur im Bearbeitungs-Modus (edit.weinerlebnistouren-pfalz.de) wird ein
 * `data-directus`-Attribut gesetzt; im öffentlichen Build kommt ein leeres
 * Objekt zurück — das HTML der Live-Website bleibt unverändert.
 *
 *   <h2 {...editAttr("tours", tour.id, "title")}>{tour.title}</h2>
 */
import { setAttr } from "@directus/visual-editing";
import { isEditMode } from "./client";

type Mode = "popover" | "modal" | "drawer";

export function editAttr(
  collection: string,
  item: string | number | null | undefined,
  fields: string | string[],
  mode: Mode = "popover",
): Record<string, string> {
  if (!isEditMode || item == null) return {};
  return { "data-directus": setAttr({ collection, item, fields, mode }) };
}
