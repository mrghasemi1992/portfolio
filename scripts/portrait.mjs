// Bakes the hero portrait into the site's palette: a tone map from the page ground,
// through deep brand blue, to a cool light. Baked once, so the browser pays nothing.
//
//   node scripts/portrait.mjs <source> <output.webp> [--mask mask.png] [--crop x,y,w,h] [--falloff]
//
// --mask     greyscale subject mask (white = person, see scripts/subject-mask.swift);
//            everything outside it becomes the page ground, for photos with a busy or
//            bright background.
// --crop     crop rectangle in source pixels, applied to the photo and the mask alike.
// --falloff  darkens the frame gently from mid-height down, so a light shirt doesn't
//            outshine the face.
import sharp from "sharp";

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  if (i === -1) return undefined;
  const value = argv[i + 1];
  return value && !value.startsWith("--") ? value : true;
};
const [src, out] = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--"));
if (!src || !out) {
  console.error("usage: node scripts/portrait.mjs <source> <output.webp> [--mask m.png] [--crop x,y,w,h] [--falloff]");
  process.exit(1);
}
const maskPath = flag("--mask");
const crop = flag("--crop")?.split(",").map(Number);
const falloff = Boolean(flag("--falloff"));

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const GROUND = hex("#0a0b0f");

// Shadows land exactly on the page ground (--bg), so the photo's backdrop disappears.
// The blue lives in the shadows and lower mids; highlights stay a near-neutral cool light.
const STOPS = [
  [0, GROUND],
  [0.3, hex("#1b2250")],
  [0.72, hex("#9aa2c2")],
  [1, hex("#eef0f7")],
];
const BLACK = 24; // input level treated as pure black (the studio backdrop)
const WHITE = 228; // input level treated as full highlight
const GAMMA = 0.88; // lifts the midtones so the face reads, not just the highlights

const lut = Array.from({ length: 256 }, (_, v) => {
  const x = Math.min(1, Math.max(0, (v - BLACK) / (WHITE - BLACK))) ** GAMMA;
  let i = 0;
  while (i < STOPS.length - 2 && x > STOPS[i + 1][0]) i++;
  const [p0, c0] = STOPS[i];
  const [p1, c1] = STOPS[i + 1];
  const t = (x - p0) / (p1 - p0);
  return c0.map((c, k) => Math.round(c + (c1[k] - c) * t));
});

const prepare = (path) => {
  let img = sharp(path);
  if (crop) img = img.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] });
  return img;
};

// A light blur softens compression texture in the source.
const { data, info } = await prepare(src)
  .blur(0.6)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height } = info;

// The mask is pulled in a few pixels (blur, then a high threshold), so no background
// light survives along the outline, then softened so the edge doesn't look cut out.
const mask = maskPath
  ? (
      await sharp(await prepare(maskPath).greyscale().blur(3).threshold(230).png().toBuffer())
        .blur(1.4)
        .greyscale()
        .raw()
        .toBuffer({ resolveWithObject: true })
    ).data
  : null;

const rgb = Buffer.alloc(width * height * 3);
for (let y = 0; y < height; y++) {
  const dim = falloff ? 1 - 0.6 * Math.min(1, Math.max(0, (y / height - 0.42) / 0.58)) ** 0.8 : 1;
  for (let x = 0; x < width; x++) {
    const i = y * width + x;
    const v = Math.round(data[i * info.channels] * dim);
    const c = lut[v];
    const a = mask ? mask[i] / 255 : 1;
    for (let k = 0; k < 3; k++) rgb[i * 3 + k] = Math.round(GROUND[k] + (c[k] - GROUND[k]) * a);
  }
}

await sharp(rgb, { raw: { width, height, channels: 3 } }).webp({ quality: 84 }).toFile(out);
console.log(`wrote ${out} (${width}×${height})`);
