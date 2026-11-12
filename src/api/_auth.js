// Gemeinsame Hilfsfunktionen für die API (wird nicht als eigene Route ausgeliefert).
const enc = new TextEncoder();

async function sign(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, '');
}

export async function isAdmin(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const h = request.headers.get('Authorization') || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = await sign(env.ADMIN_PASSWORD, exp);
  if (good.length !== sig.length) return false;
  let r = 0;
  for (let i = 0; i < good.length; i++) r |= good.charCodeAt(i) ^ sig.charCodeAt(i);
  return r === 0;
}

export function noStore() {
  return { 'Cache-Control': 'no-store' };
}

export function kvMissing(env) {
  return !env.UA_DATA;
}

export function kvError() {
  return Response.json({ error: 'Der Speicher UA_DATA ist in Cloudflare noch nicht verbunden.' }, { status: 503 });
}

export function unauthorized() {
  return Response.json({ error: 'Bitte zuerst anmelden.' }, { status: 401 });
}
