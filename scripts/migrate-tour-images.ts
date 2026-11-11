/**
 * Einmalige Migration: Tour-Galeriebilder aus src/assets/images/tours/<tourId>/
 * in die Directus-Mediathek hochladen (Ordner "Touren/<Tour>", Tag = tourId).
 *
 * Idempotent: Dateien, die im Zielordner unter demselben Dateinamen schon
 * existieren, werden übersprungen.
 *
 *   DIRECTUS_URL=… DIRECTUS_TOKEN=… bun scripts/migrate-tour-images.ts [--dry]
 */
import { readdir } from "node:fs/promises";
import { join, extname } from "node:path";

const URL_ = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;
const DRY = process.argv.includes("--dry");
if (!URL_ || !TOKEN) throw new Error("DIRECTUS_URL und DIRECTUS_TOKEN setzen");

const ROOT = join(import.meta.dir, "..", "src/assets/images/tours");
const EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const TOUR_FOLDER_NAME: Record<string, string> = {
  mandelbluete: "Mandelblüte",
  mussbach: "Mussbach",
  bacchus: "Bacchus",
  gluehwein: "Glühwein",
};

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${URL_}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${TOKEN}`, ...(init.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${await res.text()}`);
  return (await res.json()).data as T;
}

const folders = await api<{ id: string; name: string }[]>("/folders?limit=-1&fields=id,name");
const folderId = (name: string) => {
  const f = folders.find((x) => x.name === name);
  if (!f) throw new Error(`Ordner "${name}" fehlt in Directus`);
  return f.id;
};

let uploaded = 0;
let skipped = 0;
for (const [tourId, folderName] of Object.entries(TOUR_FOLDER_NAME)) {
  const folder = folderId(folderName);
  const existing = new Set(
    (
      await api<{ filename_download: string }[]>(
        `/files?limit=-1&fields=filename_download&filter[folder][_eq]=${folder}`,
      )
    ).map((f) => f.filename_download),
  );
  const files = (await readdir(join(ROOT, tourId))).filter((f) => EXT.has(extname(f).toLowerCase())).sort();

  for (const [i, name] of files.entries()) {
    if (existing.has(name)) {
      skipped++;
      continue;
    }
    if (DRY) {
      console.log(`[dry] ${tourId}/${name}`);
      continue;
    }
    const form = new FormData();
    // Metadaten-Felder MÜSSEN vor der Datei im Multipart-Body stehen.
    form.append("folder", folder);
    form.append("title", `${folderName} ${i + 1}`);
    form.append("tags", JSON.stringify([tourId]));
    form.append("file", Bun.file(join(ROOT, tourId, name)), name);
    await api("/files", { method: "POST", body: form });
    uploaded++;
    if (uploaded % 20 === 0) console.log(`… ${uploaded} hochgeladen`);
  }
}
console.log(`Fertig: ${uploaded} hochgeladen, ${skipped} übersprungen${DRY ? " (dry run)" : ""}.`);
