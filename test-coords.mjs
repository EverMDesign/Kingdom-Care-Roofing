import { chromium } from 'playwright';

const SLUG = '250-squares-of-roofing-underway-in-dallas';
const URL = `https://kingdomcareroofingandconstruction.com/projects/${SLUG}`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let coords = null;

// Intercept ALL responses and search for lat/lng
page.on('response', async res => {
  const url = res.url();
  try {
    const text = await res.text();
    if ((text.includes('latitude') || text.includes('"lat"')) && text.includes(SLUG)) {
      console.log(`\nHit in: ${url.slice(0, 120)}`);
      // Try to find coordinate values
      const latMatch = text.match(/"latitude"\s*[":]+\s*(-?\d+\.\d+)/);
      const lngMatch = text.match(/"longitude"\s*[":]+\s*(-?\d+\.\d+)/);
      if (latMatch && lngMatch) {
        coords = { latitude: latMatch[1], longitude: lngMatch[1] };
        console.log(`  lat=${latMatch[1]} lng=${lngMatch[1]}`);
      } else {
        // Print surrounding context
        const idx = text.indexOf('latitude');
        if (idx >= 0) console.log('  context:', text.slice(Math.max(0, idx-50), idx+100));
      }
    }
  } catch {}
});

console.log(`Navigating to ${URL}...`);
await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

// Also check window.__NEXT_DATA__ and page content
const nextData = await page.evaluate(() => {
  const el = document.getElementById('__NEXT_DATA__');
  return el ? el.textContent : null;
});

if (nextData && nextData.includes('latitude')) {
  console.log('\nFound coordinates in __NEXT_DATA__!');
  const latMatch = nextData.match(/"latitude"\s*:\s*(-?\d+\.\d+)/);
  const lngMatch = nextData.match(/"longitude"\s*:\s*(-?\d+\.\d+)/);
  if (latMatch && lngMatch) {
    coords = { latitude: latMatch[1], longitude: lngMatch[1] };
  }
}

// Check page HTML for any embedded coordinate data
const bodyText = await page.evaluate(() => document.body.innerHTML);
const latInPage = bodyText.match(/"latitude"\s*:\s*(-?\d+\.\d+)/);
const lngInPage = bodyText.match(/"longitude"\s*:\s*(-?\d+\.\d+)/);
if (latInPage && lngInPage && !coords) {
  coords = { latitude: latInPage[1], longitude: lngInPage[1] };
  console.log('\nFound in page body!');
}

await browser.close();

if (coords) {
  console.log(`\nResult: lat=${coords.latitude} lng=${coords.longitude}`);
} else {
  console.log('\nNo coordinates found anywhere.');
}
