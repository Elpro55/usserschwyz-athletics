// Usserschwyz Athletics – Kopf- und Fusszeile, Inhalte, Animationen
(function () {
  var S = window.SITE;
  var page = document.body.getAttribute('data-page');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function initials(name) { return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2); }
  function media(src, name, cls) {
    var m = el('div', 'media' + (cls ? ' ' + cls : ''));
    if (src) { var i = el('img'); i.src = src; i.alt = name || ''; i.loading = 'lazy'; m.appendChild(i); }
    else if (name) { m.appendChild(el('span', 'initials', initials(name))); }
    return m;
  }
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  function fmtDate(iso) { var d = (iso || '').split('-'); if (d.length < 3) return ''; return parseInt(d[2], 10) + '. ' + MONTHS[parseInt(d[1], 10) - 1] + ' ' + d[0]; }

  // ---------- Kopfzeile ----------
  var NAV = [
    ['index.html', 'Start', 'start'], ['verein.html', 'Verein', 'verein'], ['training.html', 'Training', 'training'],
    ['athleten.html', 'Athleten', 'athleten'], ['news.html', 'News', 'news'], ['partner.html', 'Partner', 'partner'], ['kontakt.html', 'Kontakt', 'kontakt']
  ];
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site';
    header.innerHTML =
      '<div class="wrap"><div class="nav">' +
      '<a class="brand" href="index.html"><img class="logo" src="assets/logo-160.png" width="48" height="48" alt=""><span><b>Usserschwyz Athletics</b><small>Leichtathletik · Sprint &amp; Sprung</small></span></a>' +
      '<button class="menu-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      '<nav class="menu" aria-label="Hauptnavigation">' +
      NAV.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>'; }).join('') +
      '</nav></div></div>';
    var t = header.querySelector('.menu-toggle'), m = header.querySelector('.menu');
    t.addEventListener('click', function () { var o = m.classList.toggle('open'); t.setAttribute('aria-expanded', o); });
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // ---------- Seitenkopf: Tartanbahn mit Bahnnummer ----------
  var LANE = { verein: 1, training: 2, athleten: 3, news: 4, partner: 5, kontakt: 6, impressum: 7, admin: 8 };
  var hero = document.querySelector('.page-hero');
  if (hero && LANE[page]) {
    var n = LANE[page], ns = 'http://www.w3.org/2000/svg';
    var band = document.createElement('div'); band.className = 'lane-band'; band.setAttribute('aria-hidden', 'true');
    var svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 1600 160'); svg.setAttribute('preserveAspectRatio', 'xMinYMid slice');
    var bg = document.createElementNS(ns, 'rect'); bg.setAttribute('class', 'lb-tartan'); bg.setAttribute('x', 0); bg.setAttribute('y', 0); bg.setAttribute('width', 1600); bg.setAttribute('height', 160); svg.appendChild(bg);
    [0, 80, 160].forEach(function (y, i) {
      var l = document.createElementNS(ns, 'line'); l.setAttribute('class', 'lb-line'); l.setAttribute('x1', 0); l.setAttribute('x2', 1600); l.setAttribute('y1', y || 2); l.setAttribute('y2', y || 2);
      if (y === 160) { l.setAttribute('y1', 158); l.setAttribute('y2', 158); }
      l.style.animationDelay = (0.15 + i * 0.12) + 's'; svg.appendChild(l);
    });
    var start = document.createElementNS(ns, 'line'); start.setAttribute('class', 'lb-line lb-start'); start.setAttribute('x1', 260); start.setAttribute('x2', 260); start.setAttribute('y1', 0); start.setAttribute('y2', 160); svg.appendChild(start);
    [n, n + 1].forEach(function (k, i) {
      if (k > 8) return;
      var t = document.createElementNS(ns, 'text'); t.setAttribute('class', 'lb-num' + (i ? ' other' : '')); t.setAttribute('x', 190); t.setAttribute('y', i ? 140 : 60); t.setAttribute('text-anchor', 'middle'); t.textContent = k; svg.appendChild(t);
    });
    var dot = document.createElementNS(ns, 'circle'); dot.setAttribute('class', 'lb-runner'); dot.setAttribute('r', 13); dot.setAttribute('cy', 40); dot.setAttribute('cx', 260); svg.appendChild(dot);
    var trailL = document.createElementNS(ns, 'line'); trailL.setAttribute('class', 'lb-trail'); trailL.setAttribute('x1', 260); trailL.setAttribute('y1', 40); trailL.setAttribute('x2', 260); trailL.setAttribute('y2', 40); svg.insertBefore(trailL, dot);
    band.appendChild(svg); hero.appendChild(band);
    var tag = document.createElement('span'); tag.className = 'lane-tag'; tag.textContent = 'Bahn ' + n; hero.querySelector('.wrap').insertBefore(tag, hero.querySelector('h1'));

    // Läufer in der eigenen Bahn = Lesefortschritt
    if (!reduceMotion) {
      var tk = false;
      var move = function () {
        tk = false;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        var x = 260 + p * 1280;
        dot.setAttribute('cx', x); trailL.setAttribute('x2', x);
        band.style.setProperty('--shift', (-window.scrollY * 0.15) + 'px');
      };
      window.addEventListener('scroll', function () { if (!tk) { tk = true; requestAnimationFrame(move); } }, { passive: true });
      move();
    }
  }

  // ---------- Fusszeile ----------
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site';
    footer.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
      '<div><a class="brand" href="index.html"><img class="logo" src="assets/logo-160.png" width="48" height="48" alt=""><span><b>Usserschwyz Athletics</b><small>seit 2013</small></span></a>' +
      '<p>Trainingsgruppe für leistungsorientierte Leichtathletinnen und Leichtathleten in Sprint und Sprung.</p></div>' +
      '<div><h4>Seiten</h4><ul>' + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Training</h4><ul>' + S.training.map(function (d) { return '<li>' + d.day + ' ' + d.time + '</li>'; }).join('') + '</ul></div>' +
      '<div><h4>Folge uns</h4><ul><li><a href="https://www.instagram.com/' + S.contact.instagram + '/" target="_blank" rel="noopener">Instagram @' + S.contact.instagram + '</a></li>' +
      '<li><a href="kontakt.html">Kontakt</a></li></ul></div>' +
      '</div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Usserschwyz Athletics</span><span><a href="impressum.html">Impressum</a> · <a href="admin.html">Login</a></span></div></div>';
  }

  // ---------- Athleten ----------
  function athleteCard(a, idx) {
    var b = el('button', 'athlete'); b.type = 'button'; b.setAttribute('data-reveal', '');
    b.appendChild(media(a.photo, a.name));
    var info = el('div'); info.style.cssText = 'display:flex;flex-direction:column;gap:4px';
    info.appendChild(el('h3', null, a.name));
    info.appendChild(el('span', 'club', a.club));
    b.appendChild(info);
    if (a.pbs && a.pbs[0]) { var pb = el('div', 'pb-main'); pb.appendChild(el('span', null, a.pbs[0][0])); pb.appendChild(el('b', null, a.pbs[0][1])); b.appendChild(pb); }
    b.addEventListener('click', function () { openProfile(idx, b); });
    return b;
  }

  var modal, lastFocus;
  function buildModal() {
    modal = el('div', 'modal'); modal.hidden = true;
    modal.innerHTML =
      '<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="d-name">' +
      '<div class="media" id="d-media"></div>' +
      '<div class="d-body"><div class="d-top"><div><h2 id="d-name"></h2><span class="club" id="d-club"></span></div>' +
      '<button class="close" type="button" aria-label="Profil schliessen"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<p class="lead" id="d-bio" hidden></p>' +
      '<div class="block"><span class="lbl">Bestleistungen</span><div class="pb-table" id="d-pbs"></div></div>' +
      '<div class="block" id="d-wins-b" hidden><span class="lbl">Erfolge</span><ul class="wins" id="d-wins"></ul></div>' +
      '<a class="wa-btn" id="d-wa" target="_blank" rel="noopener" hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></svg>Profil auf World Athletics</a>' +
      '</div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.close').addEventListener('click', closeProfile);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeProfile(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeProfile(); });
  }
  function openProfile(i, from) {
    if (!modal) buildModal();
    var a = S.athletes[i]; lastFocus = from;
    var mm = media(a.photo, a.name); mm.id = 'd-media'; modal.querySelector('#d-media').replaceWith(mm);
    modal.querySelector('#d-name').textContent = a.name;
    modal.querySelector('#d-club').textContent = a.club;
    var bio = modal.querySelector('#d-bio'); bio.textContent = a.bio || ''; bio.hidden = !a.bio;
    var pbs = modal.querySelector('#d-pbs'); pbs.innerHTML = '';
    (a.pbs || []).forEach(function (p) { var r = el('div', 'pb-row'); r.appendChild(el('span', null, p[0])); r.appendChild(el('b', null, p[1])); pbs.appendChild(r); });
    var wl = modal.querySelector('#d-wins'); wl.innerHTML = '';
    (a.wins || []).forEach(function (w) { wl.appendChild(el('li', null, w)); });
    modal.querySelector('#d-wins-b').hidden = !(a.wins && a.wins.length);
    var wa = modal.querySelector('#d-wa');
    if (a.wa) { wa.href = 'https://worldathletics.org/athletes/switzerland/' + a.wa; wa.hidden = false; } else wa.hidden = true;
    modal.hidden = false; document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { modal.classList.add('open'); });
    modal.querySelector('.close').focus();
  }
  function closeProfile() { modal.classList.remove('open'); modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }

  // ---------- News (aus dem Admin-Bereich) ----------
  function newsCard(n) {
    var a = el('article', 'news-card'); a.setAttribute('data-reveal', '');
    a.appendChild(media(n.image, n.image ? n.title : null));
    var t = el('div', 'txt');
    var time = el('time', null, fmtDate(n.date) + (n.place ? ' · ' + n.place : '')); time.setAttribute('datetime', n.date);
    t.appendChild(time); t.appendChild(el('h3', null, n.title));
    String(n.text || '').split(/\n{2,}/).forEach(function (para) { t.appendChild(el('p', null, para)); });
    a.appendChild(t); return a;
  }
  function loadNews(target, limit, emptyEl, wrapperToHide) {
    fetch('/api/news').then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }).then(function (list) {
      target.innerHTML = '';
      (limit ? list.slice(0, limit) : list).forEach(function (n) { target.appendChild(newsCard(n)); });
      if (emptyEl) emptyEl.hidden = list.length > 0;
      if (wrapperToHide) wrapperToHide.hidden = list.length === 0;
      observe(target);
    });
  }

  // ---------- Instagram (offizielle Einbettung einzelner Posts) ----------
  function loadInsta(target, limit, emptyEl) {
    fetch('/api/insta').then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }).then(function (list) {
      target.innerHTML = '';
      if (emptyEl) emptyEl.hidden = list.length > 0;
      if (!list.length) return;
      (limit ? list.slice(0, limit) : list).forEach(function (url) {
        var cell = el('div', 'insta-cell');
        var bq = el('blockquote', 'instagram-media');
        bq.setAttribute('data-instgrm-permalink', url); bq.setAttribute('data-instgrm-version', '14');
        var a = el('a', null, 'Post auf Instagram ansehen'); a.href = url; a.target = '_blank'; a.rel = 'noopener';
        bq.appendChild(a); cell.appendChild(bq); target.appendChild(cell);
      });
      if (window.instgrm) window.instgrm.Embeds.process();
      else { var s = el('script'); s.async = true; s.src = 'https://www.instagram.com/embed.js'; document.body.appendChild(s); }
    });
  }

  // ---------- Seiteninhalte ----------
  function fill(id, fn) { var n = document.getElementById(id); if (n) fn(n); }

  fill('home-news', function (g) { loadNews(g, 3, null, document.getElementById('home-news-section')); });
  fill('all-news', function (g) { loadNews(g, 0, document.getElementById('news-empty')); });
  fill('insta-feed', function (g) {
    var empty = document.getElementById('insta-empty');
    if (!S.instagramFeedUrl) { loadInsta(g, 0, empty); return; }
    // Live-Feed (behold.so): alle neuen Posts erscheinen automatisch
    fetch(S.instagramFeedUrl).then(function (r) { return r.json(); }).then(function (data) {
      var posts = Array.isArray(data) ? data : (data.posts || []);
      if (!posts.length) throw new Error('leer');
      g.className = 'insta-live'; g.innerHTML = '';
      posts.slice(0, 12).forEach(function (p, i) {
        var a = el('a'); a.href = p.permalink; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('data-reveal', '');
        a.style.setProperty('--d', (i % 4) * 70 + 'ms');
        var src = (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) || p.thumbnailUrl || p.mediaUrl;
        var im = el('img'); im.src = src; im.loading = 'lazy'; im.alt = (p.prunedCaption || p.caption || 'Instagram-Post').slice(0, 120);
        a.appendChild(im);
        if (p.mediaType === 'VIDEO') a.appendChild(el('span', 'insta-badge', 'Video'));
        g.appendChild(a);
      });
      if (empty) empty.hidden = true;
      observe(g);
    }).catch(function () { loadInsta(g, 0, empty); });
  });
  fill('home-insta', function (g) { loadInsta(g, 3, null); });
  fill('athlete-count', function (n) { n.textContent = S.athletes.length; });
  fill('contact-email', function (n) { n.textContent = S.contact.email; n.href = 'mailto:' + S.contact.email; });

  // Termine (Startseite): aus dem Admin-Bereich plus data.js
  fill('events-table', function (tb) {
    var WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    function d(iso) { var p = iso.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
    function short(x) { return WD[x.getDay()] + ' ' + x.getDate() + '.' + (x.getMonth() + 1) + '.'; }
    var today = new Date(); today.setHours(0, 0, 0, 0);
    function render(all) {
      tb.innerHTML = '';
      var list = all.filter(function (e) { return e.from && d(e.to || e.from) >= today; })
        .sort(function (a, b) { return a.from.localeCompare(b.from); });
      list.forEach(function (e) {
        var a = d(e.from), b = e.to ? d(e.to) : null;
        var tr = el('tr'); tr.setAttribute('data-reveal', '');
        if ((a - today) / 864e5 <= 7) tr.classList.add('soon');
        tr.appendChild(el('td', 'date', short(a) + (b ? ' – ' + short(b) : '') + ' ' + (b || a).getFullYear()));
        tr.appendChild(el('td', 'title', e.title));
        var tt = el('td', e.time ? null : 'muted', e.time || 'folgt'); tt.setAttribute('data-label', 'Zeit'); tr.appendChild(tt);
        var tp = el('td', e.place ? null : 'muted', e.place || 'folgt'); tp.setAttribute('data-label', 'Ort'); tr.appendChild(tp);
        tb.appendChild(tr);
      });
      var empty = document.getElementById('events-empty'); if (empty) empty.hidden = list.length > 0;
      tb.closest('.table-scroll').hidden = !list.length;
      observe(tb);
    }
    render(S.events || []);
    fetch('/api/events').then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })
      .then(function (api) { if (api.length) render((S.events || []).concat(api)); });
  });

  // Trainingstabelle und nächstes Training
  var DAYNUM = { Sonntag: 0, Montag: 1, Dienstag: 2, Mittwoch: 3, Donnerstag: 4, Freitag: 5, Samstag: 6 };
  function nextTraining() {
    var now = new Date(), best = null;
    S.training.forEach(function (d) {
      var end = d.time.split(/[–-]/)[1] || '23:59', hm = end.split(':');
      for (var add = 0; add < 8; add++) {
        var c = new Date(now); c.setDate(now.getDate() + add);
        if (c.getDay() !== DAYNUM[d.day]) continue;
        c.setHours(parseInt(hm[0], 10), parseInt(hm[1], 10), 0, 0);
        if (c < now) continue;
        if (!best || c < best.when) best = { when: c, d: d, add: add };
        break;
      }
    });
    return best;
  }
  fill('next-training', function (box) {
    var n = nextTraining(); if (!n) { box.hidden = true; return; }
    box.querySelector('.v').textContent = (n.add === 0 ? 'Heute' : n.add === 1 ? 'Morgen' : n.d.day) + ', ' + n.d.time.split(/[–-]/)[0] + ' Uhr';
    box.querySelector('.p').textContent = n.d.place;
  });
  fill('training-table', function (tb) {
    var today = new Date().getDay();
    S.training.forEach(function (d) {
      var tr = el('tr'); if (DAYNUM[d.day] === today) tr.className = 'today';
      tr.appendChild(el('td', null, d.day)); tr.appendChild(el('td', 'num', d.time)); tr.appendChild(el('td', null, d.place));
      tb.appendChild(tr);
    });
  });
  fill('marks-table', function (tb) {
    S.athletes.forEach(function (a, i) {
      if (!a.pbs || !a.pbs[0]) return;
      var tr = el('tr');
      var td = el('td'); var b = el('a', null, a.name); b.href = 'athleten.html#' + i; td.appendChild(b); td.appendChild(el('div', 'sub', a.club)); tr.appendChild(td);
      tr.appendChild(el('td', null, a.pbs[0][0])); tr.appendChild(el('td', 'num', a.pbs[0][1]));
      tb.appendChild(tr);
    });
  });

  fill('training-days', function (g) {
    S.training.forEach(function (d) {
      var c = el('div', 'day'); c.setAttribute('data-reveal', '');
      c.appendChild(el('span', 'd', d.day)); c.appendChild(el('span', 't', d.time)); c.appendChild(el('span', 'p', d.place)); g.appendChild(c);
    });
  });
  fill('trainers', function (g) {
    S.trainers.forEach(function (p) {
      var c = el('div', 'person'); c.setAttribute('data-reveal', ''); c.appendChild(media(p.photo, p.name));
      var t = el('div'); t.appendChild(el('h3', null, p.name)); t.appendChild(el('p', 'muted', p.role)); c.appendChild(t); g.appendChild(c);
    });
  });

  fill('all-athletes', function (g) {
    var chips = document.getElementById('group-chips'), search = document.getElementById('athlete-search'), empty = document.getElementById('athlete-empty');
    var active = 'Alle', groups = ['Alle'].concat(S.groups || []);
    S.athletes.forEach(function (a) { (a.groups || []).forEach(function (x) { if (groups.indexOf(x) < 0) groups.push(x); }); });
    groups.forEach(function (gname) {
      var c = el('button', 'chip', gname); c.type = 'button'; c.setAttribute('aria-pressed', gname === active);
      c.addEventListener('click', function () { active = gname; chips.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x.textContent === active); }); render(); });
      chips.appendChild(c);
    });
    search.addEventListener('input', render);
    function render() {
      g.innerHTML = ''; var q = search.value.trim().toLowerCase(), n = 0;
      S.athletes.forEach(function (a, i) {
        if (active !== 'Alle' && (a.groups || []).indexOf(active) < 0) return;
        if (q && (a.name + ' ' + a.club).toLowerCase().indexOf(q) < 0) return;
        var c = athleteCard(a, i); c.style.setProperty('--d', (n % 4) * 70 + 'ms'); g.appendChild(c); n++;
      });
      empty.hidden = n > 0;
      observe(g);
    }
    render();
    var h = parseInt((location.hash || '').slice(1), 10);
    if (!isNaN(h) && S.athletes[h]) openProfile(h, null);
  });

  // ---------- Scroll-Animationen ----------
  var io = null;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('anim');
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  function observe(root) {
    var nodes = (root || document).querySelectorAll('[data-reveal]:not(.in)');
    if (!io) { nodes.forEach(function (n) { n.classList.add('in'); }); return; }
    // Geschwister gestaffelt einblenden
    nodes.forEach(function (n) {
      if (!n.style.getPropertyValue('--d') && n.parentElement) {
        var sib = Array.prototype.filter.call(n.parentElement.children, function (c) { return c.hasAttribute('data-reveal'); });
        n.style.setProperty('--d', Math.min(sib.indexOf(n), 5) * 80 + 'ms');
      }
      io.observe(n);
    });
  }
  observe(document);

  // Zahlen hochzählen
  function countUp(node) {
    var target = parseInt(node.getAttribute('data-count'), 10), pre = node.getAttribute('data-prefix') || '', suf = node.getAttribute('data-suffix') || '';
    if (reduceMotion || !target) { node.textContent = pre + target + suf; return; }
    var start = null, dur = 1200, from = target > 100 ? target - 40 : 0;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      node.textContent = pre + Math.round(from + (target - from) * e) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (io) {
      var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } }); }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    } else counters.forEach(countUp);
  }

  // Bahnlinien im Kopfbereich bewegen sich leicht beim Scrollen
  var lanes = document.querySelector('.lanes');
  if (lanes && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { lanes.style.transform = 'translate3d(' + (-window.scrollY * 0.25) + 'px,' + (window.scrollY * 0.12) + 'px,0)'; ticking = false; });
    }, { passive: true });
  }
})();
