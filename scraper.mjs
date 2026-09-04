import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const BASE_URL = 'https://kingdomcareroofingandconstruction.com';
const OUT_DIR = './scraped';

const visited = new Set();
const savedAssets = new Set();
const queue = [BASE_URL + '/'];

mkdirSync(OUT_DIR, { recursive: true });

// Flat filename: /about-us → about-us.html, /projects/my-slug → projects__my-slug.html
function urlToFilename(url) {
  const u = new URL(url);
  let p = u.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (!p) p = 'index';
  p = p.replace(/\//g, '__');
  return join(OUT_DIR, p + '.html');
}

function saveFile(filePath, data) {
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, data);
}

function extractPageLinks(html, base) {
  const links = [];
  const regex = /href=["']([^"'#?]+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const abs = new URL(match[1], base).href.split('?')[0].split('#')[0];
      if (abs.startsWith(BASE_URL) && !abs.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|pdf)$/i)) {
        links.push(abs);
      }
    } catch {}
  }
  return [...new Set(links)];
}

const browser = await chromium.launch({ headless: false, slowMo: 200 });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});

// Intercept and save CSS, JS, fonts, images
context.on('response', async (response) => {
  const url = response.url().split('?')[0];
  if (!url.startsWith(BASE_URL)) return;
  if (savedAssets.has(url)) return;

  const ct = response.headers()['content-type'] || '';
  const isAsset = ct.includes('css') || ct.includes('javascript') ||
    ct.includes('font') || ct.includes('image') ||
    url.match(/\.(css|js|woff2?|ttf|eot|png|jpg|jpeg|gif|svg|ico|webp)(\?|$)/i);

  if (!isAsset) return;
  savedAssets.add(url);

  try {
    const body = await response.body();
    const u = new URL(url);
    const filePath = join(OUT_DIR, u.pathname);
    saveFile(filePath, body);
  } catch {}
});

let scraped = 0;
let skipped = 0;

while (queue.length > 0) {
  const url = queue.shift();
  if (visited.has(url)) continue;
  visited.add(url);

  const filePath = urlToFilename(url);

  // Skip if already scraped
  if (existsSync(filePath)) {
    console.log(`Skip (exists): ${filePath}`);
    skipped++;
    // Still need to extract links from existing file to keep crawling
    // Re-fetch links by reading the file... but easier to just re-visit quickly
    // Actually: re-add to queue is fine since visited.has() will catch it later
    // We just won't re-download. But we need its links — so fetch without saving.
    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(500);
      const html = await page.content();
      const links = extractPageLinks(html, url);
      for (const link of links) {
        if (!visited.has(link)) queue.push(link);
      }
      await page.close();
    } catch {}
    continue;
  }

  console.log(`Fetching: ${url}`);
  try {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    const html = await page.content();
    saveFile(filePath, Buffer.from(html));
    scraped++;
    console.log(`  Saved: ${filePath}`);

    const links = extractPageLinks(html, url);
    for (const link of links) {
      if (!visited.has(link)) queue.push(link);
    }

    await page.close();
    await new Promise(r => setTimeout(r, 1000));
  } catch (err) {
    console.error(`  Error on ${url}: ${err.message}`);
  }
}

await browser.close();
console.log(`\n✅ Done! Scraped ${scraped} new pages, skipped ${skipped} existing. Assets: ${savedAssets.size}`);
