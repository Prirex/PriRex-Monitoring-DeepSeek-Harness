// Builds client.js from client.template.js.
// The template is copied verbatim: styling uses host theme tokens and inline
// SVG icons, so there is nothing to inline or rewrite at build time.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = path.join(root, 'client.template.js');
const target = path.join(root, 'client.js');

const src = fs.readFileSync(template, 'utf8');

if (src.includes('__LOGO_SVG_JSON__')) {
  throw new Error('stale logo placeholder in client.template.js');
}

fs.writeFileSync(target, src);
console.log('client.js written:', Buffer.byteLength(src), 'bytes');
