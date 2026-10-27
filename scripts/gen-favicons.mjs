// Regenerate raster favicons/app icons from public/favicon.svg.
// The previous PNG/ICO files were blank white, so Google showed an empty
// circle. Run: `node scripts/gen-favicons.mjs`
import { readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public");
const svg = readFileSync(path.join(ROOT, "favicon.svg"));
const BRAND_ORANGE = { r: 0xf1, g: 0x5b, b: 0x2a, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function render(size, outFile, { flatten = false } = {}) {
  let img = sharp(svg, { density: 300 }).resize(size, size, {
    fit: "contain",
    background: TRANSPARENT,
  });
  if (flatten) img = img.flatten({ background: BRAND_ORANGE });
  await img.png().toFile(path.join(ROOT, outFile));
  console.log(`  wrote ${outFile} (${size}x${size}${flatten ? ", flattened" : ""})`);
}

console.log("Generating favicons from public/favicon.svg…");
// favicon.ico is served as a PNG (browsers accept it); 48px is Google's minimum.
await render(48, "favicon.ico");
await render(48, "icon-48.png");
await render(96, "icon-96.png");
await render(192, "icon-192.png");
await render(512, "icon-512.png");
// Apple masks corners, so flatten onto brand orange for a solid tile.
await render(180, "apple-touch-icon.png", { flatten: true });
console.log("Done.");
