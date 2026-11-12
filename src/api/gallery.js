// Homepage gallery: public list, admin-only uploads and removal.
import { isAdmin, noStore, kvMissing, kvError, unauthorized } from './_auth.js';
const KEY = 'gallery';
async function list(env) { const raw = await env.UA_DATA.get(KEY); return raw ? JSON.parse(raw) : []; }
export async function onRequestGet({env}) {
  if (kvMissing(env)) return Response.json([], {headers:noStore()});
  return Response.json(await list(env), {headers:noStore()});
}
export async function onRequestPost({request,env}) {
  if (kvMissing(env)) return kvError();
  if (!(await isAdmin(request,env))) return unauthorized();
  let body; try {body=await request.json();}catch(e){return Response.json({error:'Ungültige Daten.'},{status:400});}
  const m=/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(body.image||'');
  if(!m)return Response.json({error:'Bitte JPG, PNG oder WebP hochladen.'},{status:400});
  if(m[2].length>7*1024*1024)return Response.json({error:'Bild zu gross (max. 5 MB).'},{status:400});
  const bytes=Uint8Array.from(atob(m[2]),c=>c.charCodeAt(0));
  if(bytes.length>5*1024*1024)return Response.json({error:'Bild zu gross (max. 5 MB).'},{status:400});
  const entries=await list(env);
  if(entries.length>=20)return Response.json({error:'Maximal 20 Fotos. Bitte zuerst eines entfernen.'},{status:400});
  const id=crypto.randomUUID();
  await env.UA_DATA.put('gallery-img:'+id,bytes,{metadata:{type:m[1]}});
  const item={id,url:'/api/gallery/image/'+id,caption:String(body.caption||'').trim().slice(0,300),created:Date.now()};
  entries.push(item); await env.UA_DATA.put(KEY,JSON.stringify(entries));
  return Response.json(item,{status:201,headers:noStore()});
}
export async function onRequestDelete({request,env}) {
  if(kvMissing(env))return kvError();
  if(!(await isAdmin(request,env)))return unauthorized();
  const id=new URL(request.url).searchParams.get('id');
  const entries=await list(env), index=entries.findIndex(x=>x.id===id);
  if(index<0)return Response.json({error:'Bild nicht gefunden.'},{status:404});
  entries.splice(index,1);
  await env.UA_DATA.put(KEY,JSON.stringify(entries));
  await env.UA_DATA.delete('gallery-img:'+id);
  return Response.json({ok:true},{headers:noStore()});
}
export async function onRequestPut({request,env}) {
  if(kvMissing(env))return kvError();
  if(!(await isAdmin(request,env)))return unauthorized();
  let b;try{b=await request.json()}catch(e){return Response.json({error:'Ungültige Daten.'},{status:400})}
  const entries=await list(env), from=entries.findIndex(x=>x.id===b.id);
  if(from<0)return Response.json({error:'Bild nicht gefunden.'},{status:404});
  if(b.caption!==undefined){
    entries[from].caption=String(b.caption||'').trim().slice(0,300);
    await env.UA_DATA.put(KEY,JSON.stringify(entries));
    return Response.json(entries[from],{headers:noStore()});
  }
  const to=Number(b.to);
  if(from<0||!Number.isInteger(to)||to<0||to>=entries.length)return Response.json({error:'Ungültige Reihenfolge.'},{status:400});
  entries.splice(to,0,entries.splice(from,1)[0]);
  await env.UA_DATA.put(KEY,JSON.stringify(entries));
  return Response.json(entries,{headers:noStore()});
}
