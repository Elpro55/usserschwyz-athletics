// GET    /api/events                (öffentlich) -> Termine
// POST   /api/events  (Admin)       -> { from, to?, title, time?, place? }
// DELETE /api/events?id=…  (Admin)
import { isAdmin, noStore, kvMissing, kvError, unauthorized } from './_auth.js';

const D = /^\d{4}-\d{2}-\d{2}$/;
async function read(env) { const r = await env.UA_DATA.get('events'); return r ? JSON.parse(r) : []; }

export async function onRequestGet({ env }) {
  if (kvMissing(env)) return Response.json([], { headers: noStore() });
  const list = await read(env);
  list.sort((a, b) => a.from.localeCompare(b.from));
  return Response.json(list, { headers: { 'Cache-Control': 'public, max-age=30' } });
}

export async function onRequestPost({ request, env }) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request, env))) return unauthorized();
  let b = {};
  try { b = await request.json(); } catch (e) {}
  const title = String(b.title || '').trim().slice(0, 140);
  if (!title || !D.test(b.from || '')) return Response.json({ error: 'Titel und Datum sind nötig.' }, { status: 400 });
  const to = D.test(b.to || '') && b.to > b.from ? b.to : '';
  const item = { id: crypto.randomUUID(), from: b.from, to, title,
    time: String(b.time || '').trim().slice(0, 40), place: String(b.place || '').trim().slice(0, 80) };
  const list = await read(env); list.push(item);
  await env.UA_DATA.put('events', JSON.stringify(list));
  return Response.json(item, { status: 201, headers: noStore() });
}

export async function onRequestDelete({ request, env }) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request, env))) return unauthorized();
  const id = new URL(request.url).searchParams.get('id');
  const list = await read(env);
  await env.UA_DATA.put('events', JSON.stringify(list.filter((e) => e.id !== id)));
  return Response.json({ ok: true }, { headers: noStore() });
}
