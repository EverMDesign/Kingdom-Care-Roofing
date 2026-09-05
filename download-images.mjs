import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { createWriteStream } from 'fs';
import https from 'https';

const OUT_DIR = './images/homepage';
mkdirSync(OUT_DIR, { recursive: true });

const html = readFileSync('./scraped/index.html', 'utf8');

// Extract and clean ImageKit URLs
const raw = [...html.matchAll(/https:\/\/ik\.imagekit\.io\/[^\s"'\\<>)]+/g)].map(m => m[0]);

const seen = new Set();
const urls = [];

for (let u of raw) {
  // Remove CSS junk after the URL
  u = u.replace(/\);.*$/, '').replace(/['"\\>]+$/, '').trim();
  // Remove ImageKit transform prefix (tr:...) to get original
  u = u.replace(/\/tr:[^/]+\//, '/');
  // Only images/video — skip SVG duplicates, pick clean extensions
  if (!u.match(/\.(jpg|jpeg|png|webp|gif|mp4|svg)(\?|$)/i)) continue;
  // Strip query strings
  u = u.split('?')[0];
  if (!seen.has(u)) {
    seen.add(u);
    urls.push(u);
  }
}

console.log(`Found ${urls.length} unique images/videos\n`);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

let success = 0, failed = 0;

for (const url of urls) {
  const ext = url.match(/\.(jpg|jpeg|png|webp|gif|mp4|svg)/i)?.[0] || '.jpg';
  const name = basename(url).replace(/[^a-zA-Z0-9._-]/g, '_');
  const dest = join(OUT_DIR, name);

  try {
    await download(url, dest);
    console.log(`✅ ${name}`);
    success++;
  } catch (err) {
    console.log(`❌ ${name} — ${err.message}`);
    failed++;
  }

  await new Promise(r => setTimeout(r, 200));
}

console.log(`\nDone: ${success} downloaded, ${failed} failed → ${OUT_DIR}`);
