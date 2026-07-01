import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";

const DIR = "public/events/drive-download-20260628T203409Z-3-001";
const MAX_W = 1920;
const QUALITY = 82;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else if ([".jpg", ".jpeg"].includes(extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

const files = await walk(DIR);
console.log(`Found ${files.length} images`);

let saved = 0;
for (const f of files) {
  const before = (await stat(f)).size;
  const img = sharp(f);
  const meta = await img.metadata();
  if (meta.width <= MAX_W && before < 500_000) { process.stdout.write("."); continue; }
  const buf = await img
    .resize({ width: MAX_W, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  if (buf.length < before) {
    const { writeFile } = await import("fs/promises");
    await writeFile(f, buf);
    saved += before - buf.length;
    process.stdout.write("✓");
  } else {
    process.stdout.write("=");
  }
}
console.log(`\nSaved ${(saved / 1024 / 1024).toFixed(1)} MB`);
