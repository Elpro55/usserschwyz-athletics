# Usserschwyz Athletics

Webseite der Leichtathletik-Trainingsgruppe Usserschwyz Athletics: https://usserschwyz-athletics.com

## Aufbau
- `public/` – die Webseite: `index.html` (Start mit Terminen, Fotos, «Wer wir sind»), `training.html`, `athleten.html`, `news.html`, `partner.html`, `kontakt.html`, `impressum.html`, `admin.html`, `404.html`
- `public/data.js` – Kontakt, Trainingszeiten und Athleten. Das Format für Bestleistungen und Erfolge steht oben in der Datei.
- `public/img/` – Porträts der Athleten (Hochformat 4:5, 560×700, `vorname-nachname.jpg`)
- `src/index.js`, `src/api/` – Cloudflare Worker für Login, Termine, News, Fotos und Instagram
- `tools/check-data.mjs` – prüft, ob `data.js` das einheitliche Format einhält

Jeder Push auf `main` wird von Cloudflare automatisch gebaut und veröffentlicht.

## Neues Athletenprofil (aus der Tally-Umfrage)
1. Foto zuschneiden (4:5, 560×700) und als `public/img/vorname-nachname.jpg` ablegen.
2. Eintrag in `public/data.js` nach dem System oben in der Datei: `pbs` als `['Disziplin', 'Leistung']`, `wins` als `[Jahr, 'Wettkampf', 'Resultat']`.
3. `node tools/check-data.mjs` ausführen. Es meldet jede Abweichung vom Format.
4. Pushen. Die Seite sortiert selbst (mit Foto zuerst, dann nach Nachname).

## Adressen
- `athleten.html#sprint` / `#sprung` – Liste nach Gruppe gefiltert
- `athleten.html#vorname-nachname` – öffnet direkt ein Profil

## Login für News einrichten (einmalig)
1. Storage & databases → Workers KV → Namespace `ua-data` erstellen und die ID kopieren.
2. In `wrangler.jsonc` den Block `kv_namespaces` mit dieser ID eintragen.
3. Im Worker → Settings → Variables and Secrets → Secret `ADMIN_PASSWORD` setzen.
4. Danach unter `/admin.html` anmelden.
