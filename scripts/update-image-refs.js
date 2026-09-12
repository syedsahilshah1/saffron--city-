const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
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

const files = getAllFiles(srcDir);
if (fs.existsSync(dataFile)) {
  files.push(dataFile);
}

// Replacements map for extensions
let totalReplacements = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace /images/...png or /images/...jpg or /images/...jpeg with .webp
  content = content.replace(/(\/images\/[a-zA-Z0-9_\-\/]+)\.(jpg|jpeg|png)/g, (match, p1) => {
    return `${p1}.webp`;
  });

  // Replace /uploads/...png or /uploads/...jpg with .webp
  content = content.replace(/(\/uploads\/[a-zA-Z0-9_\-\/]+)\.(jpg|jpeg|png)/g, (match, p1) => {
    return `${p1}.webp`;
  });

  // Specifically fix logo references if any e.g. /images/logo.png -> /images/saffron-city-logo.webp
  content = content.replace(/\/images\/logo\.(png|jpg|webp)/g, '/images/saffron-city-logo.webp');
  content = content.replace(/\/images\/chairman_official_clean\.(png|jpg|webp)/g, '/images/chairman_portrait_hd.webp');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements++;
    console.log(`Updated paths to .webp in: ${path.relative(projectDir, filePath)}`);
  }
}

console.log(`Updated image extensions in ${totalReplacements} files.`);
