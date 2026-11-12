// Worker für usserschwyz-athletics.com
// /api/* wird hier beantwortet, alles andere kommt aus dem Ordner public/.
import * as login from './api/login.js';
import * as news from './api/news.js';
import * as newsItem from './api/news-item.js';
import * as img from './api/img.js';
import * as insta from './api/insta.js';

function pick(mod, method) {
  const name = 'onRequest' + method.charAt(0) + method.slice(1).toLowerCase();
  return mod[name];
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '');
    let mod = null, params = {};

    if (path === '/api/login') mod = login;
    else if (path === '/api/news') mod = news;
    else if (path === '/api/insta') mod = insta;
    else if (path.startsWith('/api/news/')) { mod = newsItem; params.id = decodeURIComponent(path.slice(10)); }
    else if (path.startsWith('/api/img/')) { mod = img; params.id = decodeURIComponent(path.slice(9)); }

    if (mod) {
      const handler = pick(mod, request.method);
      if (!handler) return new Response('Method not allowed', { status: 405 });
      try {
        return await handler({ request, env, params, ctx });
      } catch (e) {
        return Response.json({ error: 'Serverfehler.' }, { status: 500 });
      }
    }
    if (path.startsWith('/api/')) return Response.json({ error: 'Nicht gefunden.' }, { status: 404 });
    return env.ASSETS.fetch(request);
  }
};
