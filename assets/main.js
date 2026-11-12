// Usserschwyz Athletics – Kopf- und Fusszeile, Inhalte aus data.js
(function () {
  var S = window.SITE;
  var page = document.body.getAttribute('data-page');

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function initials(name) { return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2); }
  function media(src, name, cls) {
    var m = el('div', 'media' + (cls ? ' ' + cls : ''));
    if (src) { var i = el('img'); i.src = src; i.alt = name || ''; i.loading = 'lazy'; m.appendChild(i); }
    else if (name) { m.appendChild(el('span', 'initials', initials(name))); }
    return m;
  }
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  function fmtDate(iso) { var d = iso.split('-'); return parseInt(d[2], 10) + '. ' + MONTHS[parseInt(d[1], 10) - 1] + ' ' + d[0]; }

  // ---------- Kopfzeile ----------
  var NAV = [['index.html', 'Start', 'start'], ['verein.html', 'Verein & Training', 'verein'], ['athleten.html', 'Athleten', 'athleten'], ['news.html', 'News', 'news'], ['kontakt.html', 'Kontakt', 'kontakt']];
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site';
    header.innerHTML =
      '<div class="wrap"><div class="nav">' +
      '<a class="brand" href="index.html"><span class="mark">UA</span><span><b>Usserschwyz Athletics</b><small>Leichtathletik · Ausserschwyz</small></span></a>' +
      '<button class="menu-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      '<nav class="menu" aria-label="Hauptnavigation">' +
      NAV.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>'; }).join('') +
      '</nav></div></div>';
    var t = header.querySelector('.menu-toggle'), m = header.querySelector('.menu');
    t.addEventListener('click', function () { var o = m.classList.toggle('open'); t.setAttribute('aria-expanded', o); });
  }

  // ---------- Fusszeile ----------
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site';
    footer.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
      '<div><a class="brand" href="index.html"><span class="mark">UA</span><span><b>Usserschwyz Athletics</b><small>seit 2013</small></span></a>' +
      '<p>Leichtathletik-Trainingsgruppe aus Ausserschwyz für Sprint, Sprung und Mittelstrecke.</p></div>' +
      '<div><h4>Seiten</h4><ul>' + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Training</h4><ul>' + S.training.map(function (d) { return '<li>' + d.day + ' ' + d.time + '</li>'; }).join('') + '</ul></div>' +
      '<div><h4>Folge uns</h4><ul><li><a href="https://www.instagram.com/' + S.contact.instagram + '/" target="_blank" rel="noopener">Instagram @' + S.contact.instagram + '</a></li>' +
      '<li><a href="kontakt.html">Kontakt</a></li></ul></div>' +
      '</div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Usserschwyz Athletics</span><a href="impressum.html">Impressum</a></div></div>';
  }

  // ---------- Athleten-Karte & Profil ----------
  function athleteCard(a, idx) {
    var b = el('button', 'athlete'); b.type = 'button';
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
    var mc = modal.querySelector('#d-media'); mc.innerHTML = '';
    var mm = media(a.photo, a.name); mc.replaceWith(mm); mm.id = 'd-media';
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
    modal.querySelector('.close').focus();
  }
  function closeProfile() { modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }

  // ---------- News-Karte ----------
  function newsCard(n) {
    var a = el('article', 'news-card');
    a.appendChild(media(n.photo, null));
    var t = el('div', 'txt');
    var time = el('time', null, fmtDate(n.date) + (n.place ? ' · ' + n.place : '')); time.setAttribute('datetime', n.date);
    t.appendChild(time); t.appendChild(el('h3', null, n.title)); t.appendChild(el('p', null, n.text));
    a.appendChild(t); return a;
  }

  // ---------- Seiteninhalte ----------
  function fill(id, fn) { var n = document.getElementById(id); if (n) fn(n); }

  fill('home-athletes', function (g) { S.athletes.slice(0, 4).forEach(function (a, i) { g.appendChild(athleteCard(a, i)); }); });
  fill('home-news', function (g) { S.news.slice(0, 3).forEach(function (n) { g.appendChild(newsCard(n)); }); });
  fill('all-news', function (g) { S.news.forEach(function (n) { g.appendChild(newsCard(n)); }); });
  fill('athlete-count', function (n) { n.textContent = S.athletes.length; });

  fill('training-days', function (g) {
    S.training.forEach(function (d) {
      var c = el('div', 'day'); c.appendChild(el('span', 'd', d.day)); c.appendChild(el('span', 't', d.time)); c.appendChild(el('span', 'p', d.place)); g.appendChild(c);
    });
  });
  fill('trainers', function (g) {
    S.trainers.forEach(function (p) {
      var c = el('div', 'person'); c.appendChild(media(p.photo, p.name));
      var t = el('div'); t.appendChild(el('h3', null, p.name)); t.appendChild(el('p', 'muted', p.role)); c.appendChild(t); g.appendChild(c);
    });
  });
  fill('insta-grid', function (g) {
    if (!S.instagram.length) { g.hidden = true; return; }
    S.instagram.slice(0, 6).forEach(function (p) { var a = el('a'); a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; var i = el('img'); i.src = p.image; i.alt = 'Instagram-Post'; i.loading = 'lazy'; a.appendChild(i); g.appendChild(a); });
  });
  fill('contact-email', function (n) { n.textContent = S.contact.email; n.href = 'mailto:' + S.contact.email; });

  // Athletenseite mit Filter und Suche
  fill('all-athletes', function (g) {
    var chips = document.getElementById('group-chips'), search = document.getElementById('athlete-search'), empty = document.getElementById('athlete-empty');
    var active = 'Alle';
    var groups = ['Alle'];
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
        g.appendChild(athleteCard(a, i)); n++;
      });
      empty.hidden = n > 0;
    }
    render();
  });
})();
