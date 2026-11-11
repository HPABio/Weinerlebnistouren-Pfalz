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

const TIMEOUT_MS = 15_000;

/** Ein Request pro Pfad und Build — viele Komponenten teilen sich die Daten. */
const memo = new Map<string, Promise<unknown>>();

export function cmsFetch<T>(path: string): Promise<T> {
  if (!cmsEnabled) {
    return Promise.reject(new Error("CMS_URL ist nicht gesetzt"));
  }
  let pending = memo.get(path) as Promise<T> | undefined;
  if (!pending) {
    pending = (async () => {
      const res = await fetch(`${CMS_URL}${path}`, {
        headers: CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {},
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) {
        throw new Error(`CMS ${path} → HTTP ${res.status}: ${await res.text()}`);
      }
      return ((await res.json()) as { data: T }).data;
    })();
    memo.set(path, pending);
  }
  return pending;
}

/**
 * Holt Daten aus dem CMS; ohne konfiguriertes CMS kommt `fallback` zurück.
 * Ist das CMS konfiguriert, aber kaputt, wird der Fehler weitergereicht.
 */
export async function cmsOr<T>(path: string, fallback: T): Promise<T> {
  if (!cmsEnabled) return fallback;
  return cmsFetch<T>(path);
}
