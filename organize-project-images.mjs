import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync, readdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { createWriteStream } from 'fs';
import https from 'https';

const SCRAPED_DIR  = './scraped';
const PROJECTS_DIR = './images/projects';
const HOMEPAGE_DIR = './images/homepage';
const OUTPUT_CSV   = './images/projects/projects-gallery-map.csv';

// Build lookup: original imagekit filename → current file path
const existingFiles = new Map();

for (const f of readdirSync(HOMEPAGE_DIR)) {
  if (f === 'image-map.csv') continue;
  existingFiles.set(f, join(HOMEPAGE_DIR, f));
}
// Also flat cover files still in projects root
for (const f of readdirSync(PROJECTS_DIR)) {
  if (f.endsWith('.csv') || !f.startsWith('kingdom-care-')) continue;
  existingFiles.set(f, join(PROJECTS_DIR, f));
}

console.log(`Found ${existingFiles.size} existing images\n`);

function extractImageURLs(html) {
  const seen = new Set();
  const urls = [];

  // Next.js encoded: /_next/image?url=ENCODED_URL&amp;w=...
  for (const m of html.matchAll(/\/_next\/image\?url=([^&"]+)/g)) {
    try {
      const decoded = decodeURIComponent(m[1].replace(/&amp;/g, '&'));
      const clean = decoded.split('?')[0];
      if (clean.includes('ik.imagekit') && !seen.has(clean)) {
        seen.add(clean);
        urls.push(clean);
      }
    } catch {}
  }

  // Also raw background-image imagekit URLs
  for (const m of html.matchAll(/url\((https:\/\/ik\.imagekit\.io\/[^)]+)\)/g)) {
    const clean = m[1].replace(/\/tr:[^/]+\//, '/').split('?')[0];
    if (!seen.has(clean)) { seen.add(clean); urls.push(clean); }
  }

  return urls;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { file.close(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => { file.close(); reject(err); });
  });
}

const csvRows = [];
const files = readdirSync(SCRAPED_DIR).filter(f => f.startsWith('projects__') && f.endsWith('.html'));
console.log(`Processing ${files.length} project pages...\n`);

let totalMoved = 0, totalDownloaded = 0, totalMissing = 0;

for (const file of files) {
  const slug = file.replace('projects__', '').replace('.html', '');
  const html = readFileSync(join(SCRAPED_DIR, file), 'utf8');
  const urls = extractImageURLs(html);

  // Skip logo/nav images (very small, typically .png with long ID)
  // Filter to just project images by checking alt text context
  const logoFilename = (() => {
    const m = html.match(/alt="[^"]*Kingdom Care[^"]*Logo[^"]*"[^>]*src="[^"]*url=([^&"]+)/i)
              || html.match(/src="[^"]*url=([^&"]+)[^"]*"[^>]*alt="[^"]*logo[^"]*"/i);
    if (!m) return null;
    try { return basename(decodeURIComponent(m[1]).split('?')[0]); } catch { return null; }
  })();

  const projectUrls = urls.filter(u => {
    const fn = basename(u);
    return fn !== logoFilename;
  });

  // Create subfolder
  const projectDir = join(PROJECTS_DIR, slug);
  mkdirSync(projectDir, { recursive: true });

  let photoIndex = 0;
  for (const url of projectUrls) {
    const originalFilename = basename(url);
    const ext = extname(originalFilename) || '.jpg';
    const role = photoIndex === 0 ? 'cover' : `gallery-${photoIndex}`;
    const destFilename = `${role}${ext}`;
    const destPath = join(projectDir, destFilename);

    if (existsSync(destPath)) {
      csvRows.push({ slug, role, filename: destFilename, original: originalFilename, url });
      photoIndex++;
      continue;
    }

    // Check existing files by original filename OR by kingdom-care-slug pattern
    const coverKey = `kingdom-care-${slug}${ext}`;
    const matchKey = existingFiles.has(originalFilename) ? originalFilename
                   : existingFiles.has(coverKey) ? coverKey
                   : null;

    if (matchKey) {
      renameSync(existingFiles.get(matchKey), destPath);
      existingFiles.delete(matchKey);
      totalMoved++;
      csvRows.push({ slug, role, filename: destFilename, original: originalFilename, url });
    } else {
      try {
        await download(url, destPath);
        totalDownloaded++;
        csvRows.push({ slug, role, filename: destFilename, original: originalFilename, url });
        await new Promise(r => setTimeout(r, 200));
      } catch (err) {
        totalMissing++;
        csvRows.push({ slug, role: `${role}_MISSING`, filename: '', original: originalFilename, url });
      }
    }
    photoIndex++;
  }

  console.log(`✅ ${slug} — ${photoIndex} images`);
}

const header = 'slug,role,filename,original_filename,url\n';
const body = csvRows.map(r =>
  `"${r.slug}","${r.role}","${r.filename}","${r.original}","${r.url}"`
).join('\n');
writeFileSync(OUTPUT_CSV, header + body);

console.log(`\n✅ Done!`);
console.log(`  Moved from existing: ${totalMoved}`);
console.log(`  Downloaded fresh:    ${totalDownloaded}`);
console.log(`  Missing:             ${totalMissing}`);
console.log(`  CSV → ${OUTPUT_CSV}`);
