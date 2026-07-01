import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDir = path.join(__dirname, '../app/api');

// Regex to find things like: import { ... } from "../../../../lib/something.js"
// We want to replace all the ../ with @/
const regex = /from\s+['"](?:\.\.\/)+lib\/(.*?)['"]/g;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      content = content.replace(regex, (match, p1) => {
        modified = true;
        // p1 is something like "models/index.js" or "middleware/auth.js"
        return `from "@/lib/${p1}"`;
      });

      // Also clean up any messy multiple imports from the same file that my last script caused!
      // This is a bit complex for a simple script, but we can at least do the alias.
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated aliases in: ${fullPath}`);
      }
    }
  }
}

console.log('Starting alias refactoring...');
processDirectory(apiDir);
console.log('Finished alias refactoring!');
