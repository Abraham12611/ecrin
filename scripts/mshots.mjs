import { chromium } from '@playwright/test';
const skins = ['voyage','bridle','horlogerie','folio','grand-tourer'];
const w = Number(process.argv[2] || 390), h = Number(process.argv[3] || 844);
const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errs = [];
page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
page.on('pageerror', e => errs.push('pageerror: ' + e.message));
for (const s of skins) {
  await page.goto(`http://127.0.0.1:5173/?skin=${s}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const v = document.querySelector('video'); v.currentTime = 4; });
  await page.waitForTimeout(900);
  const over = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log(s, w, 'overflow:', over, 'media:', await page.locator('.ecrin').getAttribute('data-media'));
  await page.locator('.ecrin').screenshot({ path: `tmp/shots/m-${s}-${w}.png` });
}
console.log(errs.join('\n') || 'no console errors');
await browser.close();
