const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const publicDir = path.join(projectDir, 'public');
const srcDir = path.join(projectDir, 'src');
const dataFile = path.join(projectDir, 'data', 'cms_store.json');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        getAllFiles(full, fileList);
      }
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

const sourceFiles = getAllFiles(srcDir);
if (fs.existsSync(dataFile)) sourceFiles.push(dataFile);

const imgRefRegex = /["'`](\/(images|uploads)\/[^"'`\s>]+)["'`]/g;
const foundPaths = new Set();

for (const sf of sourceFiles) {
  const content = fs.readFileSync(sf, 'utf8');
  let match;
  while ((match = imgRefRegex.exec(content)) !== null) {
    const url = match[1];
    // filter out non-image assets if any
    if (url.match(/\.(webp|png|jpg|jpeg|svg|gif|pdf)$/i)) {
      foundPaths.add({ url, file: path.relative(projectDir, sf).replace(/\\/g, '/') });
    }
  }
}

console.log(`=== CHECKING ${foundPaths.size} UNIQUE IMAGE REFERENCES ===`);
let missingCount = 0;
for (const item of foundPaths) {
  const cleanPath = item.url.split('?')[0].split('#')[0];
  const diskPath = path.join(publicDir, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath);
  if (!fs.existsSync(diskPath)) {
    console.error(`[MISSING] ${item.url} referenced in ${item.file}`);
    missingCount++;
  }
}

if (missingCount === 0) {
  console.log(`[PASS] All referenced images exist on disk in public/!`);
} else {
  console.error(`[FAIL] Found ${missingCount} missing image files!`);
}

// Check <img> tags for alt attributes
console.log(`\n=== CHECKING <img> TAGS FOR SEO ALT ATTRIBUTES ===`);
let imgTagCount = 0;
let missingAltCount = 0;

for (const sf of sourceFiles) {
  if (!sf.endsWith('.tsx') && !sf.endsWith('.jsx')) continue;
  const content = fs.readFileSync(sf, 'utf8');
  const relFile = path.relative(projectDir, sf).replace(/\\/g, '/');

  // Match <img ... />
  const imgTagRegex = /<img\s+([^>]+)>/g;
  let tagMatch;
  while ((tagMatch = imgTagRegex.exec(content)) !== null) {
    imgTagCount++;
    const attrs = tagMatch[1];
    if (!attrs.includes('alt=')) {
      console.warn(`[MISSING ALT] in ${relFile}: <img ${attrs.substring(0, 50)}...>`);
      missingAltCount++;
    }
  }
}

console.log(`Checked ${imgTagCount} <img> tags. Missing alt tags: ${missingAltCount}`);
