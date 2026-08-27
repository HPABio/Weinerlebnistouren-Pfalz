/**
 * Einmalige OAuth-Einrichtung für die Google Business Profile API.
 *
 *   bun run reviews:auth
 *
 * Das Skript startet einen lokalen Server auf http://localhost:5789, öffnet die
 * Google-Zustimmungsseite und tauscht den zurückgegebenen Code gegen ein
 * Refresh-Token. Dieses Token gehört anschließend in die `.env`:
 *
 *   GOOGLE_REFRESH_TOKEN=1//0g...
 *
 * Voraussetzungen (siehe README-Abschnitt in scripts/fetch-google-reviews.ts):
 *   • Cloud-Projekt mit freigeschaltetem Zugriff auf die Business Profile APIs
 *   • OAuth-Client vom Typ "Webanwendung"
 *   • Autorisierter Redirect-URI: http://localhost:5789/oauth2callback
 *
 * Die Anmeldung passiert ausschließlich im Browser bei Google — das Skript
 * sieht weder Passwort noch Zugangsdaten, nur den zurückgegebenen Code.
 */

export {}; // Datei als Modul markieren (Top-Level-await, eigener Scope)

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const PORT = 5789;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPE = "https://www.googleapis.com/auth/business.manage";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "✗ GOOGLE_CLIENT_ID und GOOGLE_CLIENT_SECRET müssen in der .env stehen.",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    // erzwingt ein Refresh-Token, auch wenn die App schon einmal erlaubt wurde
    prompt: "consent",
  }).toString();

const done = Promise.withResolvers<void>();

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname !== "/oauth2callback") {
      return new Response("Warte auf /oauth2callback …", { status: 404 });
    }

    const error = url.searchParams.get("error");
    if (error) {
      console.error(`✗ Google meldet: ${error}`);
      done.resolve();
      return new Response(`Fehler: ${error}`, { status: 400 });
    }

    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Kein Code erhalten.", { status: 400 });
    }

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const body = (await res.json()) as {
      refresh_token?: string;
      error_description?: string;
    };

    if (!res.ok || !body.refresh_token) {
      console.error(
        `✗ Token-Austausch fehlgeschlagen: ${body.error_description ?? res.status}`,
      );
      done.resolve();
      return new Response("Token-Austausch fehlgeschlagen.", { status: 500 });
    }

    console.log("\n✓ Refresh-Token erhalten. Bitte in die .env eintragen:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${body.refresh_token}\n`);
    done.resolve();

    return new Response(
      "<h1>Fertig.</h1><p>Das Refresh-Token steht im Terminal. Dieses Fenster kann geschlossen werden.</p>",
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  },
});

console.log("Bitte diese URL im Browser öffnen und die Freigabe bestätigen:\n");
console.log(authUrl + "\n");

await done.promise;
server.stop();
