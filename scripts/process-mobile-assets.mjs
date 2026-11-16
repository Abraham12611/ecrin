import sharp from 'sharp';
import fs from 'node:fs';
async function bbox(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}
const jobs = { 'm-voyage-corner': ['mobile-voyage-corner', 240], 'm-voyage-plate': ['mobile-voyage-plate', 640], 'm-bridle-dring': ['mobile-bridle-dring', 200], 'm-horl-corner': ['mobile-horlogerie-corner', 240], 'm-folio-ribbon': ['mobile-folio-ribbon', 520], 'm-gt-corner': ['mobile-gt-corner', 240] };
for (const [src, [out, size]] of Object.entries(jobs)) {
  const box = await bbox(`raw/${src}.png`);
  const buf = await sharp(`raw/${src}.png`).extract(box).resize(size, size, { fit: 'inside' }).webp({ quality: 88, alphaQuality: 100 }).toBuffer({ resolveWithObject: true });
  fs.writeFileSync(`public/assets/${out}.webp`, buf.data);
  console.log(out, buf.info.width + 'x' + buf.info.height, buf.data.length);
}

