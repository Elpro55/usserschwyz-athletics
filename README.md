# Usserschwyz Athletics

Webseite der Leichtathletik-Trainingsgruppe Usserschwyz Athletics: https://usserschwyz-athletics.com

## Aufbau
- `public/` – die Webseite: Seiten (`index.html`, `verein.html`, `training.html`, `athleten.html`, `news.html`, `instagram.html`, `kontakt.html`, `impressum.html`), `admin.html`, `data.js` und `assets/`
- `public/data.js` – Kontakt, Trainer, Trainingszeiten, Athleten (optional pro Athlet: `photo`, `bio`, `wins`; ohne Foto zeigt die Kachel die Bestleistung)
- `public/img/` – Porträts der Athleten (Hochformat 4:5, ca. 560×700)
- `public/404.html`, `robots.txt`, `sitemap.xml` – Fehlerseite und Suchmaschinen
- Profil-Direktlink: `athleten.html#vorname-nachname`
- `src/index.js` – Cloudflare Worker: beantwortet `/api/*`, liefert sonst die Dateien aus `public/`
- `src/api/` – Login, News, Bilder und Instagram
- `wrangler.jsonc` – Worker-Konfiguration

Jeder Push auf `main` wird von Cloudflare automatisch gebaut und veröffentlicht.

## Login für News einrichten (einmalig)
1. Storage & databases → Workers KV → Namespace `ua-data` erstellen und die ID kopieren.
2. In `wrangler.jsonc` den Block `kv_namespaces` mit dieser ID eintragen.
3. Im Worker → Settings → Variables and Secrets → Secret `ADMIN_PASSWORD` setzen.
4. Danach unter `/admin.html` anmelden.
