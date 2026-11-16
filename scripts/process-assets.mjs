import sharp from 'sharp';
import fs from 'node:fs';
fs.mkdirSync('public/assets', { recursive: true });
const objs = { 'voyage-corner':256, 'voyage-zipper-pull':256, 'voyage-clasp':256, 'bridle-buckle':256, 'horlogerie-crown':256, 'gt-knob':256 };
for (const [n, size] of Object.entries(objs)) {
  const buf = await sharp(`raw/${n}.png`).trim().resize(size, size, { fit: 'inside' }).webp({ quality: 88, alphaQuality: 100 }).toBuffer({ resolveWithObject: true });
  fs.writeFileSync(`public/assets/${n}.webp`, buf.data);
  console.log(n, buf.info.width, buf.info.height, buf.data.length);
}
const texs = { 'tex-voyage':'leather-espresso','tex-bridle':'leather-saddle','tex-champagne':'metal-champagne','tex-folio':'leather-walnut','tex-walnut':'veneer-walnut','tex-onyx':'leather-onyx','tex-bordeaux':'enamel-bordeaux' };
for (const [n, out] of Object.entries(texs)) {
  const buf = await sharp(`raw/${n}.jpg`).resize(512, 512).webp({ quality: 78 }).toBuffer();
  fs.writeFileSync(`public/assets/${out}.webp`, buf);
  console.log(out, buf.length);
}
// card preview thumbnails are built in CSS; favicon + OG later
