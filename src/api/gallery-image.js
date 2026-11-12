export async function onRequestGet({env,params}) {
  if(!env.UA_DATA)return new Response('Not found',{status:404});
  const obj=await env.UA_DATA.getWithMetadata('gallery-img:'+params.id,'arrayBuffer');
  if(!obj.value)return new Response('Not found',{status:404});
  return new Response(obj.value,{headers:{'Content-Type':obj.metadata?.type||'image/jpeg','Cache-Control':'public, max-age=300','X-Content-Type-Options':'nosniff'}});
}
