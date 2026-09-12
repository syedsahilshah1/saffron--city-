const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const projectDir = path.join(__dirname, '..');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        getAllFiles(fullPath, fileList);
      }
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const publicFiles = getAllFiles(publicDir).map(p => path.relative(publicDir, p).replace(/\\/g, '/'));
const allSourceFiles = getAllFiles(projectDir).filter(p => {
  const rel = path.relative(projectDir, p).replace(/\\/g, '/');
  return !rel.startsWith('public/') && !rel.startsWith('node_modules/') && !rel.startsWith('.next/') && !rel.startsWith('.git/');
});

console.log(`Found ${publicFiles.length} files in public/`);
console.log(`Found ${allSourceFiles.length} source/data files to check`);

const sourceContents = allSourceFiles.map(f => ({
  file: f,
  content: fs.readFileSync(f, 'utf8')
}));

const fileUsage = {};
for (const pubFile of publicFiles) {
  fileUsage[pubFile] = [];
  const baseName = path.basename(pubFile);
  const withoutExt = baseName.substring(0, baseName.lastIndexOf('.'));
  
  for (const src of sourceContents) {
    if (src.content.includes(pubFile) || src.content.includes(baseName)) {
      fileUsage[pubFile].push(path.relative(projectDir, src.file).replace(/\\/g, '/'));
    }
  }
}

console.log("\n=== USAGE AUDIT ===");
const unused = [];
const used = [];

for (const [file, refs] of Object.entries(fileUsage)) {
  const fullP = path.join(publicDir, file);
  const size = fs.statSync(fullP).size;
  if (refs.length === 0) {
    unused.push({ file, size });
    console.log(`[UNUSED] ${file} (${(size / 1024).toFixed(1)} KB)`);
  } else {
    used.push({ file, size, refsCount: refs.length, sampleRef: refs[0] });
    console.log(`[USED]   ${file} (${(size / 1024).toFixed(1)} KB) -> referenced in ${refs.length} files (${refs[0]})`);
  }
}

console.log(`\nSummary: ${used.length} used files, ${unused.length} unused files.`);
