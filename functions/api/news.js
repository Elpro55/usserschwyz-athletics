// GET  /api/news            -> alle News (öffentlich)
// POST /api/news  (Admin)   -> neue News { title, date, place, text, image? (data:URL) }
import { isAdmin, noStore, kvMissing, kvError, unauthorized } from './_auth.js';

async function readNews(env) {
  const raw = await env.UA_DATA.get('news');
  return raw ? JSON.parse(raw) : [];
}

export async function onRequestGet({ env }) {
  if (kvMissing(env)) return Response.json([], { headers: noStore() });
  const list = await readNews(env);
  list.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.created - a.created);
  return Response.json(list, { headers: { 'Cache-Control': 'public, max-age=30' } });
}

export async function onRequestPost({ request, env }) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request, env))) return unauthorized();
  let b;
  try { b = await request.json(); } catch (e) { return Response.json({ error: 'Ungültige Daten.' }, { status: 400 }); }
  const title = String(b.title || '').trim().slice(0, 160);
  const text = String(b.text || '').trim().slice(0, 4000);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : new Date().toISOString().slice(0, 10);
  const place = String(b.place || '').trim().slice(0, 80);
  if (!title || !text) return Response.json({ error: 'Titel und Text sind nötig.' }, { status: 400 });

  const id = crypto.randomUUID();
  let image = null;
  if (b.image) {
    const m = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(b.image);
    if (!m) return Response.json({ error: 'Bildformat nicht unterstützt (JPG, PNG oder WebP).' }, { status: 400 });
    const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
    if (bytes.length > 5 * 1024 * 1024) return Response.json({ error: 'Bild ist grösser als 5 MB.' }, { status: 400 });
    await env.UA_DATA.put('img:' + id, bytes, { metadata: { type: m[1] } });
    image = '/api/img/' + id;
  }

  const item = { id, title, text, date, place, image, created: Date.now() };
  const list = await readNews(env);
  list.push(item);
  await env.UA_DATA.put('news', JSON.stringify(list));
  return Response.json(item, { status: 201, headers: noStore() });
}
