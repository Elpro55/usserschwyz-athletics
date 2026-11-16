// Prüft public/data.js gegen das einheitliche System für Bestleistungen und Erfolge.
// Aufruf: node tools/check-data.mjs
import fs from 'node:fs';
import vm from 'node:vm';

const win = {};
vm.runInNewContext(fs.readFileSync(new URL('../public/data.js', import.meta.url), 'utf8'), { window: win });
const S = win.SITE;
const problems = [];
const mark = /^(\d+:)?\d{1,2}\.\d{2}$|^\d+:\d{2}$|^\d+\.\d{2} m$/;        // 11.59 · 2:11.48 · 2:53 · 1.80 m
const result = /^$|^(\d× )?(Gold|Silber|Bronze|Medaille|Final|Qualifikation|Teilnahme|Mitglied|\d+\. Rang|in mehreren Disziplinen)(, .+)?$/;

for (const a of S.athletes) {
  const bad = (m) => problems.push(`${a.name}: ${m}`);
  if (!a.club) bad('Verein fehlt');
  if (!a.groups?.length || a.groups.some((g) => !S.groups.includes(g))) bad(`Gruppe muss eine von ${S.groups.join(' / ')} sein`);
  if (!a.pbs?.length) bad('mindestens eine Bestleistung');
  if (a.pbs?.length > 3) bad('höchstens drei Bestleistungen');
  for (const [d, v] of a.pbs ?? []) {
    if (!mark.test(v)) bad(`Leistung «${v}» (${d}): Zeiten ohne Einheit, Höhen und Weiten als «1.80 m»`);
    if (/\d(m|mH)\b/.test(d)) bad(`Disziplin «${d}»: mit Leerschlag und ausgeschrieben, z. B. «100 m Hürden»`);
  }
  for (const w of a.wins ?? []) {
    if (!Array.isArray(w) || w.length !== 3) { bad(`Erfolg ${JSON.stringify(w)}: muss [Jahr, 'Wettkampf', 'Resultat'] sein`); continue; }
    if (!(w[0] === null || (Number.isInteger(w[0]) && w[0] > 2000))) bad(`Erfolg «${w[1]}»: Jahr als Zahl oder null`);
    if (!w[1]) bad('Erfolg ohne Wettkampf');
    if (!result.test(w[2])) bad(`Resultat «${w[2]}»: Gold/Silber/Bronze, «2. Rang», Final, Qualifikation oder Teilnahme, Disziplin nach Komma`);
  }
  if (a.photo && !fs.existsSync(new URL('../public/' + a.photo, import.meta.url))) bad(`Foto ${a.photo} fehlt`);
}
const clubs = [...new Set(S.athletes.map((a) => a.club))].sort();
console.log(`${S.athletes.length} Athleten, ${clubs.length} Vereine: ${clubs.join(', ')}`);
if (problems.length) { console.log('\nProbleme:\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('Alles einheitlich.');
