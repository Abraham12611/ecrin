import { chromium } from '@playwright/test';
import sharp from 'sharp';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const shots = [];
for (const s of ['voyage', 'horlogerie']) {
  await page.goto(`http://127.0.0.1:4173/?skin=${s}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => { const v = document.querySelector('video'); v.currentTime = 62; });
  await page.waitForTimeout(1800);
  shots.push(await page.locator('.ecrin').screenshot());
}
await browser.close();
const bg = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#120d0b' } }).png().toBuffer();
const a = await sharp(shots[0]).resize({ width: 760 }).toBuffer();
const b = await sharp(shots[1]).resize({ width: 560 }).toBuffer();
await sharp(bg).composite([{ input: b, left: 600, top: 150 }, { input: a, left: 40, top: 60 }]).jpeg({ quality: 86 }).toFile('public/assets/og.jpg');
console.log('og ok');
