// DELETE /api/news/:id  (Admin) -> News löschen
import { isAdmin, noStore, kvMissing, kvError, unauthorized } from '../_auth.js';

export async function onRequestDelete({ request, env, params }) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request, env))) return unauthorized();
  const raw = await env.UA_DATA.get('news');
  const list = raw ? JSON.parse(raw) : [];
  const next = list.filter((n) => n.id !== params.id);
  if (next.length === list.length) return Response.json({ error: 'Nicht gefunden.' }, { status: 404 });
  await env.UA_DATA.put('news', JSON.stringify(next));
  await env.UA_DATA.delete('img:' + params.id);
  return Response.json({ ok: true }, { headers: noStore() });
}
