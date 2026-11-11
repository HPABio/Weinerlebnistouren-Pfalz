/**
 * Directus-Client für den Build.
 *
 * Die Website bleibt statisch: alle Inhalte werden beim `astro build` einmal
 * geholt und ins HTML geschrieben. Ein Klick auf „Website veröffentlichen" im
 * CMS stößt den Neubau in Coolify an.
 *
 * Verhalten bei Fehlern:
 *   ▸ CMS_URL nicht gesetzt (z. B. lokal ohne CMS) → Fallback auf die
 *     Standardtexte im Code, die Seite sieht aus wie bisher.
 *   ▸ CMS_URL gesetzt, aber CMS nicht erreichbar → Build bricht ab.
 *     Coolify lässt dann die alte, funktionierende Version online, statt
 *     stillschweigend die Änderungen der Inhaberin zu überschreiben.
 */

const env = (key: string): string | undefined =>
  (import.meta.env?.[key] as string | undefined) ?? process.env[key];

export const CMS_URL = (env("CMS_URL") ?? "").replace(/\/+$/, "");
const CMS_TOKEN = env("CMS_TOKEN");
export const cmsEnabled = CMS_URL.length > 0;

/**
 * Bearbeitungs-Modus (edit.weinerlebnistouren-pfalz.de): dieselbe Website,
 * aber serverseitig gerendert mit den jeweils aktuellen CMS-Inhalten und
 * Klick-zum-Bearbeiten-Markierungen für den Visual Editor von Directus.
 * Die öffentliche Website wird nie in diesem Modus gebaut.
 */
export const isEditMode = env("CMS_EDIT_MODE") === "1";

const TIMEOUT_MS = 15_000;

/**
 * Zwischenspeicher: beim statischen Build ein Request pro Pfad für alle
 * Seiten; im Bearbeitungs-Modus wird er pro Seitenaufruf geleert
 * (src/middleware.ts), damit jede gespeicherte Änderung sofort sichtbar ist.
 */
const memo = new Map<string, Promise<unknown>>();

export function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  let pending = memo.get(key) as Promise<T> | undefined;
  if (!pending) {
    pending = load();
    memo.set(key, pending);
    // Fehlgeschlagene Requests nicht dauerhaft merken.
    pending.catch(() => memo.delete(key));
  }
  return pending;
}

export function resetCmsCache(): void {
  memo.clear();
}

export function cmsFetch<T>(path: string): Promise<T> {
  if (!cmsEnabled) {
    return Promise.reject(new Error("CMS_URL ist nicht gesetzt"));
  }
  return cached(`GET ${path}`, async () => {
    const res = await fetch(`${CMS_URL}${path}`, {
      headers: CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {},
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      throw new Error(`CMS ${path} → HTTP ${res.status}: ${await res.text()}`);
    }
    return ((await res.json()) as { data: T }).data;
  });
}

/**
 * Holt Daten aus dem CMS; ohne konfiguriertes CMS kommt `fallback` zurück.
 * Ist das CMS konfiguriert, aber kaputt, wird der Fehler weitergereicht.
 */
export async function cmsOr<T>(path: string, fallback: T): Promise<T> {
  if (!cmsEnabled) return fallback;
  return cmsFetch<T>(path);
}
