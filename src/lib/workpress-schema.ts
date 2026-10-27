import { Project } from './workpress-types';
import { serviceAreas } from './service-areas-data';
import { BUSINESS } from './schema-business';

/**
 * WorkPress Schema.org Generator
 * Optimized for geo-targeted local SEO.
 *
 * Produces three schema blocks per project page:
 *   1. Service        — the job performed, where, and by whom
 *   2. BreadcrumbList — page hierarchy for Google navigation
 *   3. WebPage        — links page → service → business in a knowledge graph
 *
 * Geo-targeting design decisions:
 *   - provider.serviceArea = business home city only (NOT the whole state).
 *     Claiming statewide reach on a city-specific case-study page dilutes the
 *     local relevance signal you're trying to build. Local authority > generic reach.
 *   - provider.contactPoint.areaServed matches serviceArea scope (consistent).
 *     Mixing scopes (city serviceArea + US contactPoint) creates coherence problems.
 *   - service.areaServed = City object with geo nested inside (not a sibling array).
 *     GeoCoordinates is not a valid standalone areaServed type — coordinates belong
 *     as `geo` inside the City/Place object.
 *   - containedInPlace nests city inside state for hierarchical geo confidence.
 *   - State names use the value from company address parsing (not project.address.state)
 *     to avoid DB truncation issues with that field.
 *   - #business is referenced by @id, never rebuilt — the root layout
 *     builds the full node once from src/lib/schema-business.ts. Rebuilding
 *     it here from a second source is exactly how a page ends up with a
 *     #business that disagrees with the layout's (different @type, phone
 *     format, etc.) — see src/lib/schema-business.ts for the full rationale.
 *   - Per-project service.@id = each page is its own distinct service entity.
 *   - Description truncated to last full word + ellipsis (no mid-word cuts).
 *
 * To strengthen further (requires additional WorkPress dashboard fields):
 *   - aggregateRating  → reviews (single biggest local SEO lever)
 *   - sameAs           → Google Business Profile URL, BBB, social profiles
 *   - hasMap           → Google Maps listing URL
 *   - priceRange       → "$" / "$$" / "$$$"
 *
 * Note on CompanyCam image URLs: these may be signed/tokenized CDN links that
 * expire. Verify longevity — a dead image URL in structured data wastes rich-result
 * opportunities months down the line.
 */

/**
 * Parse "Street, City, State ZIP[, Country]" into components.
 * Always use this for state values — do not use project.address.state
 * directly as that DB field can be truncated or inconsistently formatted.
 */
function parseAddress(addressFull: string) {
  const parts = addressFull.split(',').map((p) => p.trim());
  if (parts.length >= 3) {
    const street = parts[0];
    const city = parts[1];
    // Match everything before the zip as the state — handles "TX", "Texas", "New Mexico", etc.
    const stateZipStr = parts[2].trim();
    const stateZipMatch = stateZipStr.match(/^(.+?)\s+(\d{5}(?:-\d{4})?)$/);
    const state = stateZipMatch ? stateZipMatch[1] : stateZipStr;
    const zip = stateZipMatch
      ? stateZipMatch[2]
      : parts[3]?.trim().match(/\d{5}/)?.[0] || '';
    return { streetAddress: street, addressLocality: city, addressRegion: state, postalCode: zip };
  }
  return { streetAddress: addressFull, addressLocality: 'Dallas', addressRegion: 'TX', postalCode: '75201' };
}

/**
 * Truncate text to maxLength, cutting at the last full word boundary.
 * Appends ellipsis if truncated — never cuts mid-word.
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.substring(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.substring(0, lastSpace) : cut) + '…';
}

export async function generateProjectSchema(project: Project, city: string) {
  // Business facts (name, phone, address, @type, geo) come from the static
  // BUSINESS config — the same one the root layout builds #business from —
  // never from a live WorkPress fetch. Only state-name parsing reuses
  // parseAddress() here; the business node itself is referenced, not rebuilt.
  const parsedAddress = parseAddress(BUSINESS.fullAddress);
  const domain = BUSINESS.websiteUrl.replace(/\/$/, '');

  // Real route is app/projects/[slug]/page.tsx — no city segment in the URL.
  // (See canonical in that page's generateMetadata: `/projects/${slug}`.)
  const projectUrl = `${domain}/projects/${project.slug}`;

  // The city hub page is app/service-areas/[slug]/page.tsx, keyed by a
  // hand-curated slug (e.g. "burleson-tx") that can't be derived from the
  // city name alone — look it up by city, falling back to the
  // /service-areas index (a real page) rather than guessing a slug that
  // might 404.
  const matchedServiceArea = serviceAreas.find(
    (a) => a.city.toLowerCase() === city.toLowerCase()
  );
  const cityHubUrl = matchedServiceArea
    ? `${domain}/service-areas/${matchedServiceArea.slug}`
    : `${domain}/service-areas`;

  const coordinates = project.coordinates
    ? {
        latitude: typeof project.coordinates.lat === 'string'
          ? parseFloat(project.coordinates.lat)
          : project.coordinates.lat,
        longitude: typeof project.coordinates.lon === 'string'
          ? parseFloat(project.coordinates.lon)
          : project.coordinates.lon,
      }
    : null;

  const serviceTypes =
    project.services && project.services.length > 0
      ? project.services
      : ['Professional Services'];

  const shortDescription = project.metaDescription
    ? project.metaDescription
    : truncate(project.description, 160);

  // #business is built once, in the root layout, from src/lib/schema-business.ts —
  // reference it by @id here rather than rebuilding it a second time.
  const businessRef = { '@id': `${domain}/#business` };

  // ── 1. Service schema ───────────────────────────────────────────────────────
  // areaServed = single City object with geo nested inside.
  // GeoCoordinates is NOT a valid standalone areaServed type — nest as `geo`.
  // containedInPlace (city → state) adds hierarchical confidence.
  // State name comes from parsedAddress, not project.address.state (avoid DB truncation).
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${projectUrl}#service`,
    'name': project.seoTitle,
    'description': project.description,
    'serviceType': serviceTypes[0],
    ...(serviceTypes.length > 1 ? { 'additionalType': serviceTypes.slice(1) } : {}),
    'provider': businessRef,
    'areaServed': {
      '@type': 'City',
      'name': city,
      'containedInPlace': {
        '@type': 'State',
        'name': parsedAddress.addressRegion,
      },
      ...(coordinates ? {
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': coordinates.latitude,
          'longitude': coordinates.longitude,
        },
      } : {}),
    },
    'image': {
      '@type': 'ImageObject',
      'url': project.cover_photo_url,
      'name': project.seoTitle,
      'description': shortDescription,
      'width': 1200,
      'height': 630,
    },
    'url': projectUrl,
    ...(project.updated_at ? { 'dateModified': project.updated_at } : {}),
  };

  // ── 2. Breadcrumb schema ────────────────────────────────────────────────────
  // Matches the real visible breadcrumb on the page: Projects > {city} (see
  // app/projects/[slug]/page.tsx). Home is added as the schema root per
  // convention even though it isn't a separate visible crumb.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${projectUrl}#breadcrumb`,
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': domain },
      { '@type': 'ListItem', 'position': 2, 'name': 'Projects', 'item': `${domain}/projects` },
      { '@type': 'ListItem', 'position': 3, 'name': city, 'item': cityHubUrl },
      { '@type': 'ListItem', 'position': 4, 'name': project.seoTitle, 'item': projectUrl },
    ],
  };

  // ── 3. WebPage schema ───────────────────────────────────────────────────────
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${projectUrl}#webpage`,
    'url': projectUrl,
    'name': project.seoTitle,
    'description': shortDescription,
    'isPartOf': { '@id': `${domain}/#website` },
    'about': { '@id': `${projectUrl}#service` },
    'breadcrumb': { '@id': `${projectUrl}#breadcrumb` },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': project.cover_photo_url,
    },
    'publisher': { '@id': `${domain}/#business` },
    'datePublished': project.created_at,
    ...(project.updated_at ? { 'dateModified': project.updated_at } : {}),
  };

  return [serviceSchema, breadcrumbSchema, webPageSchema];
}
