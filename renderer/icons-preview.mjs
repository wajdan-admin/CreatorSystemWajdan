import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node-tools/node_modules/playwright');
import fs from 'fs'; import path from 'path';
import { fileURLToPath } from 'url';
const __dir = path.dirname(fileURLToPath(import.meta.url));

const icons  = JSON.parse(fs.readFileSync(path.join(__dir,'icons.json'),'utf8'));
const T      = JSON.parse(fs.readFileSync(path.join(__dir,'..','brand','tokens.json'),'utf8'));
const names  = Object.keys(icons).filter(k => k[0] !== '_');
const COLS = 6, CELL = 190;
const rows = Math.ceil(names.length / COLS);

const cells = names.map(n => {
  const ic = icons[n];
  const acc = new Set(ic.accent || []);
  const paths = ic.p.map((d,i) =>
    `<path d="${d}" fill="none" stroke="${acc.has(i)?T.accent:T.text}" stroke-width="3"
       stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  return `<div class="c">
    <svg viewBox="-4 -4 108 108" width="120" height="120">${paths}</svg>
    <div class="n">${n}</div></div>`;
}).join('');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
 body{margin:0;background:${T.bg};font-family:Inter,sans-serif;}
 .g{display:grid;grid-template-columns:repeat(${COLS},${CELL}px);}
 .c{height:${CELL}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;}
 .n{color:${T.secondary};font-size:12px;letter-spacing:.5px;}
</style></head><body><div class="g">${cells}</div></body></html>`;

const f = path.join(__dir,'_preview.html');
fs.writeFileSync(f, html);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:COLS*CELL, height:rows*CELL}, deviceScaleFactor:2 });
await p.goto('file://'+f); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({ path: path.join(__dir,'..','out','_icons.png') });
await b.close();
console.log(`${names.length} icons -> out/_icons.png`);
