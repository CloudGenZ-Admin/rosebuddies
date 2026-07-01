import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to scan
const targetDirs = [
  path.join(__dirname, '../app/api'),
  path.join(__dirname, '../scripts') // e.g. init-db.js
];

// Regex to find things like: import { User, Event } from "../../../../lib/models/user.js";
// We want to replace the exact filename (e.g., user.js, eventAttendance.js) with index.js
const regex = /from\s+['"]([^'"]*?\/lib\/models\/)[a-zA-Z0-9_]+\.js['"]/g;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') && file !== 'refactor-imports.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      content = content.replace(regex, (match, p1) => {
        modified = true;
        // p1 is something like "../../../../lib/models/"
        // We replace it with index.js
        return `from "${p1}index.js"`;
      });

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in: ${fullPath}`);
      }
    }
  }
}

console.log('Starting import refactoring...');
targetDirs.forEach(dir => processDirectory(dir));
console.log('Finished refactoring imports!');
