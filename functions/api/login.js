// POST /api/login  { password }  ->  { token }
// Das Passwort ist in Cloudflare als Secret ADMIN_PASSWORD hinterlegt.

const enc = new TextEncoder();

async function sign(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, '');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_PASSWORD) return Response.json({ error: 'ADMIN_PASSWORD ist in Cloudflare nicht gesetzt.' }, { status: 503 });
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const pw = String(body.password || '');
  // kleine Bremse gegen Durchprobieren
  await new Promise((r) => setTimeout(r, 400));
  if (!safeEqual(pw, env.ADMIN_PASSWORD)) return Response.json({ error: 'Falsches Passwort.' }, { status: 401 });
  const exp = Date.now() + 1000 * 60 * 60 * 12; // 12 Stunden gültig
  const token = exp + '.' + (await sign(env.ADMIN_PASSWORD, String(exp)));
  return Response.json({ token, exp });
}
