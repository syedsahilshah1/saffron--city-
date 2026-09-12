const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');

function getFiles(dir, list = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getFiles(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

async function run() {
  const files = getFiles(publicDir);
  console.log(`Processing remaining files in public/ (${files.length} total files)`);

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const rel = path.relative(publicDir, filePath).replace(/\\/g, '/');

    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const dir = path.dirname(filePath);
    const baseWithoutExt = path.basename(filePath, ext);
    const targetWebp = path.join(dir, `${baseWithoutExt}.webp`);

    try {
      const fileBuffer = fs.readFileSync(filePath);
      let pipeline = sharp(fileBuffer);
      const meta = await pipeline.metadata();

      if (meta.width && meta.width > 2000) {
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
      }

      const webpBuf = await pipeline
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      // Write temp then atomic rename or overwrite
      const tempPath = path.join(dir, `__temp_${baseWithoutExt}.webp`);
      fs.writeFileSync(tempPath, webpBuf);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn(`Could not unlink original ${filePath}:`, e.message);
        }
      }

      fs.renameSync(tempPath, targetWebp);

      console.log(`[OPTIMIZED] ${rel} -> ${path.relative(publicDir, targetWebp).replace(/\\/g, '/')} (${(webpBuf.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error optimizing ${rel}:`, err.message);
    }
  }

  console.log('All image optimizations completed!');
}

run();
