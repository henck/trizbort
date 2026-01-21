import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDir = path.join(__dirname, '..', 'svg');
const outputFile = path.join(__dirname, '..', 'public', 'icons.svg');

const svgFiles = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));

let symbols = '';

for (const file of svgFiles) {
  const id = path.basename(file, '.svg');
  const content = fs.readFileSync(path.join(svgDir, file), 'utf8');

  // Extract viewBox from original SVG
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 1792 1792';

  // Extract the inner content (path elements, etc.)
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const inner = innerMatch ? innerMatch[1] : '';

  symbols += `  <symbol id="${id}" viewBox="${viewBox}">${inner}</symbol>\n`;
}

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
${symbols}</svg>
`;

fs.writeFileSync(outputFile, sprite);
console.log(`Generated ${outputFile} with ${svgFiles.length} icons`);
