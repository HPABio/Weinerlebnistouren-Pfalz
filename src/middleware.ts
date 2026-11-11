/**
 * Nur für edit.weinerlebnistouren-pfalz.de (CMS_EDIT_MODE=1) aktiv:
 *
 *   ▸ Zugang nur mit Schlüssel: Directus öffnet die Seite als
 *     /?key=<EDIT_ACCESS_KEY>; danach merkt sich ein Cookie den Zugang.
 *   ▸ Jeder Seitenaufruf liest die aktuellen CMS-Inhalte (Cache leeren).
 *   ▸ Nicht indexierbar, nicht cachebar, nur im CMS einbettbar.
 *
 * Im statischen Build der öffentlichen Website tut diese Middleware nichts.
 */
import { defineMiddleware } from "astro:middleware";
import { timingSafeEqual } from "node:crypto";
import { CMS_URL, isEditMode, resetCmsCache } from "@/lib/cms/client";

const COOKIE = "wet_edit";
const ACCESS_KEY = process.env.EDIT_ACCESS_KEY ?? "";

const sameKey = (given: string | undefined): boolean => {
  if (!given || !ACCESS_KEY) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(ACCESS_KEY);
  return a.length === b.length && timingSafeEqual(a, b);
};

const PRIVATE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
  "Content-Security-Policy": `frame-ancestors 'self' ${CMS_URL}`,
};

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (!isEditMode) return next();

  if (sameKey(ctx.url.searchParams.get("key") ?? undefined)) {
    ctx.cookies.set(COOKIE, ACCESS_KEY, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 });
  } else if (!sameKey(ctx.cookies.get(COOKIE)?.value)) {
    // Direkt im Browser aufgerufen → zum Visual Editor im CMS weiterleiten.
    if (ctx.request.method === "GET" && ctx.request.headers.get("accept")?.includes("text/html") && CMS_URL) {
      return new Response(null, { status: 302, headers: { Location: `${CMS_URL}/admin/visual`, ...PRIVATE_HEADERS } });
    }
    return new Response(
      "Diese Seite ist nur zum Bearbeiten gedacht. Bitte im CMS anmelden: https://cms.weinerlebnistouren-pfalz.de/admin",
      { status: 401, headers: { "Content-Type": "text/plain; charset=utf-8", ...PRIVATE_HEADERS } },
    );
  }

  resetCmsCache();
  const res = await next();
  for (const [k, v] of Object.entries(PRIVATE_HEADERS)) res.headers.set(k, v);
  return res;
});
