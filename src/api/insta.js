// GET    /api/insta                 -> Liste der Instagram-Post-Links (öffentlich)
// POST   /api/insta  { url } (Admin) -> Post hinzufügen
// DELETE /api/insta?url=…   (Admin) -> Post entfernen
import { isAdmin, noStore, kvMissing, kvError, unauthorized } from './_auth.js';

const RE = /^https:\/\/(www\.)?instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+\/?/;

async function read(env) {
  const raw = await env.UA_DATA.get('insta');
  return raw ? JSON.parse(raw) : [];
}

export async function onRequestGet({ env }) {
  if (kvMissing(env)) return Response.json([], { headers: noStore() });
  return Response.json(await read(env), { headers: { 'Cache-Control': 'public, max-age=30' } });
}

export async function onRequestPost({ request, env }) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request, env))) return unauthorized();
  let b = {};
  try { b = await request.json(); } catch (e) {}
  const m = RE.exec(String(b.url || '').trim());
  if (!m) return Response.json({ error: 'Bitte einen Link zu einem Instagram-Post oder Reel einfügen.' }, { status: 400 });
  const url = m[0].endsWith('/') ? m[0] : m[0] + '/';
  const list = (await read(env)).filter((u) => u !== url);
  list.unshift(url);
  await env.UA_DATA.put('insta', JSON.stringify(list.slice(0, 24)));
  return Response.json({ ok: true, url }, { status: 201, headers: noStore() });
}

export async function onRequestDelete({ request, env }) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request, env))) return unauthorized();
  const url = new URL(request.url).searchParams.get('url');
  const list = await read(env);
  await env.UA_DATA.put('insta', JSON.stringify(list.filter((u) => u !== url)));
  return Response.json({ ok: true }, { headers: noStore() });
}
