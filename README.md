# Usserschwyz Athletics

Webseite der Leichtathletik-Trainingsgruppe Usserschwyz Athletics: https://usserschwyz-athletics.com

## Aufbau
- `index.html`, `verein.html`, `training.html`, `athleten.html`, `news.html`, `instagram.html`, `kontakt.html`, `impressum.html` – die Seiten
- `admin.html` – Login zum Verwalten von News und Instagram-Posts
- `data.js` – Kontakt, Trainer, Trainingszeiten, Athleten
- `assets/` – Design (`style.css`), Logik und Animationen (`main.js`), Favicon
- `functions/api/` – Cloudflare Pages Functions für Login, News, Bilder und Instagram

## Einrichtung in Cloudflare Pages (einmalig)
1. Workers & Pages → KV → Namespace `ua-data` erstellen.
2. Im Pages-Projekt → Settings → Bindings → KV namespace: Variable `UA_DATA` → `ua-data`.
3. Settings → Variables and Secrets → Secret `ADMIN_PASSWORD` mit dem Admin-Passwort.
4. Neu deployen. Danach unter `/admin.html` anmelden.
