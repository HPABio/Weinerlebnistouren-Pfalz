/**
 * Holt die Google-Rezensionen über die Business Profile API und schreibt sie
 * nach src/data/google-reviews.json.
 *
 *   bun run reviews:fetch
 *
 * Das Ergebnis wird bewusst als Datei eingecheckt: der Astro-Build bleibt so
 * offline reproduzierbar, und es landen keine Zugangsdaten im Client-Bundle.
 * Skript einfach erneut laufen lassen, wenn neue Bewertungen da sind.
 *
 * ── Voraussetzungen ────────────────────────────────────────────────────────
 * Die Business Profile APIs sind NICHT frei nutzbar. Nötig sind:
 *   1. Google-Cloud-Projekt
 *   2. Organisationskonto im Google Unternehmensprofil
 *   3. Freischaltung über das GBP-API-Kontaktformular — die Standardquote ist
 *      0, ohne Freigabe antwortet die API mit 403.
 *      https://developers.google.com/my-business/content/prereqs
 *   4. OAuth-Client (Webanwendung) + einmalig `bun run reviews:auth`
 *
 * ── .env ───────────────────────────────────────────────────────────────────
 *   GOOGLE_CLIENT_ID=…apps.googleusercontent.com
 *   GOOGLE_CLIENT_SECRET=…
 *   GOOGLE_REFRESH_TOKEN=…            (aus `bun run reviews:auth`)
 *   GOOGLE_ACCOUNT_ID=1234567890      (aus accounts.list)
 *   GOOGLE_LOCATION_ID=9876543210     (aus locations.list)
 *
 * Account- und Location-ID lassen sich mit `bun run reviews:fetch --list`
 * ermitteln.
 */

export {}; // Datei als Modul markieren (Top-Level-await, eigener Scope)

const {
  GOOGLE_CLIENT_ID: CLIENT_ID,
  GOOGLE_CLIENT_SECRET: CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: REFRESH_TOKEN,
  GOOGLE_ACCOUNT_ID: ACCOUNT_ID,
  GOOGLE_LOCATION_ID: LOCATION_ID,
} = process.env;

const OUT = "src/data/google-reviews.json";
const listOnly = process.argv.includes("--list");

/** Sterne-Enum der API → Zahl. */
const STAR: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

interface ApiReview {
  reviewId?: string;
  reviewer?: { displayName?: string; isAnonymous?: boolean };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
}

function bail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

/** Refresh-Token → kurzlebiges Access-Token. */
async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      refresh_token: REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });

  const body = (await res.json()) as {
    access_token?: string;
    error_description?: string;
    error?: string;
  };

  if (!res.ok || !body.access_token) {
    bail(
      `Access-Token konnte nicht geholt werden (${res.status}): ` +
        `${body.error_description ?? body.error ?? "unbekannter Fehler"}`,
    );
  }
  return body.access_token;
}

async function apiGet<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 403) {
      bail(
        "403 von der API. Meist fehlt die Freischaltung der Business Profile " +
          "APIs für das Cloud-Projekt (Standardquote ist 0).\n" +
          `Antwort: ${text.slice(0, 400)}`,
      );
    }
    bail(`${res.status} ${res.statusText} bei ${url}\n${text.slice(0, 400)}`);
  }
  return (await res.json()) as T;
}

/** Hilfsmodus: vorhandene Accounts und Standorte auflisten. */
async function listAccountsAndLocations(token: string) {
  const accounts = await apiGet<{
    accounts?: { name: string; accountName?: string }[];
  }>("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", token);

  if (!accounts.accounts?.length) {
    bail("Keine Accounts gefunden — ist das Konto ein Organisationskonto?");
  }

  for (const account of accounts.accounts) {
    console.log(`\nAccount: ${account.name}  (${account.accountName ?? "–"})`);
    const locations = await apiGet<{
      locations?: { name: string; title?: string }[];
    }>(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title&pageSize=100`,
      token,
    );
    for (const loc of locations.locations ?? []) {
      console.log(`  Location: ${loc.name}  (${loc.title ?? "–"})`);
    }
  }

  console.log(
    "\nDie reinen Ziffern aus 'accounts/<id>' bzw. 'locations/<id>' gehören " +
      "als GOOGLE_ACCOUNT_ID / GOOGLE_LOCATION_ID in die .env.",
  );
}

async function fetchAllReviews(token: string) {
  const base =
    `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT_ID}` +
    `/locations/${LOCATION_ID}/reviews`;

  const collected: ApiReview[] = [];
  let averageRating: number | null = null;
  let totalReviewCount: number | null = null;
  let pageToken: string | undefined;
  let page = 0;

  do {
    const params = new URLSearchParams({
      pageSize: "50", // Maximum laut API-Referenz
      orderBy: "updateTime desc",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const data = await apiGet<{
      reviews?: ApiReview[];
      averageRating?: number;
      totalReviewCount?: number;
      nextPageToken?: string;
    }>(`${base}?${params}`, token);

    collected.push(...(data.reviews ?? []));
    averageRating ??= data.averageRating ?? null;
    totalReviewCount ??= data.totalReviewCount ?? null;
    pageToken = data.nextPageToken;
    page++;
  } while (pageToken && page < 40); // Sicherheitsnetz gegen Endlosschleifen

  return { collected, averageRating, totalReviewCount };
}

// ── Ablauf ──────────────────────────────────────────────────────────────────

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  bail(
    "GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET und GOOGLE_REFRESH_TOKEN müssen " +
      "in der .env stehen. Refresh-Token holen: bun run reviews:auth",
  );
}

const token = await getAccessToken();

if (listOnly) {
  await listAccountsAndLocations(token);
  process.exit(0);
}

if (!ACCOUNT_ID || !LOCATION_ID) {
  bail(
    "GOOGLE_ACCOUNT_ID und GOOGLE_LOCATION_ID fehlen. " +
      "IDs anzeigen: bun run reviews:fetch --list",
  );
}

const { collected, averageRating, totalReviewCount } =
  await fetchAllReviews(token);

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
});

const reviews = collected
  // Reine Sterne-Bewertungen ohne Text bringen auf der Seite nichts.
  .filter((r) => r.comment?.trim())
  .map((r) => ({
    author: r.reviewer?.isAnonymous
      ? "Google-Nutzer"
      : (r.reviewer?.displayName?.trim() ?? "Google-Nutzer"),
    rating: STAR[r.starRating ?? ""] ?? 0,
    date: r.createTime ? dateFormat.format(new Date(r.createTime)) : undefined,
    text: r.comment!.trim(),
  }))
  .filter((r) => r.rating > 0);

await Bun.write(
  OUT,
  JSON.stringify(
    {
      fetchedAt: new Date().toISOString(),
      averageRating: averageRating ?? null,
      totalReviewCount: totalReviewCount ?? null,
      reviews,
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `✓ ${reviews.length} Rezension(en) mit Text nach ${OUT} geschrieben ` +
    `(${collected.length} insgesamt geladen, Ø ${averageRating ?? "–"}).`,
);
