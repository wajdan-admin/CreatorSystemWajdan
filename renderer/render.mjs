/* Wajdan faceless motion renderer — frame exporter.
   Deterministic: steps t by a fixed timestep and pulls each frame
   straight off the canvas. Renders at fps*subframes so ffmpeg can
   average them into real motion blur.

   usage: node render.mjs <scene.json> <outDir>
*/
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node-tools/node_modules/playwright');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const scenePath = process.argv[2];
const outDir    = process.argv[3];

const scene  = JSON.parse(fs.readFileSync(scenePath, 'utf8'));
const tokens = JSON.parse(fs.readFileSync(path.join(__dir, '..', 'brand', 'tokens.json'), 'utf8'));
scene.tokens = tokens;

const fps  = tokens.fps;
const sub  = tokens.subframes;
const step = 1 / (fps * sub);
const total = Math.round(scene.duration * fps * sub);

fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) fs.unlinkSync(path.join(outDir, f));

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: tokens.width, height: tokens.height },
  deviceScaleFactor: 1
});

await page.addInitScript(s => { window.SCENE = s; }, scene);
await page.goto('file://' + path.join(__dir, 'engine.html'));
await page.waitForFunction(() => window.__ready === true);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400); // let the webfont settle before frame 0

process.stdout.write(`rendering ${total} subframes @ ${fps * sub}fps ... `);
for (let i = 0; i < total; i++) {
  const t = i * step;
  const b64 = await page.evaluate(tt => {
    window.draw(tt);
    return document.getElementById('c').toDataURL('image/png').slice(22);
  }, t);
  fs.writeFileSync(path.join(outDir, `f${String(i).padStart(5, '0')}.png`), Buffer.from(b64, 'base64'));
  if (i % 100 === 0) process.stdout.write('.');
}
console.log(' done');

await browser.close();
