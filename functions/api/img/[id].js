// GET /api/img/:id -> Bild einer News
export async function onRequestGet({ env, params }) {
  if (!env.UA_DATA) return new Response('Not found', { status: 404 });
  const { value, metadata } = await env.UA_DATA.getWithMetadata('img:' + params.id, { type: 'arrayBuffer' });
  if (!value) return new Response('Not found', { status: 404 });
  return new Response(value, {
    headers: { 'Content-Type': (metadata && metadata.type) || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' }
  });
}
