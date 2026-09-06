import { Project } from './workpress-types';
import { CompanySettings, getCompanySettings } from './workpress-api';

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
 *   - Consistent provider.@id across ALL pages = entity consolidation.
 *   - Per-project service.@id = each page is its own distinct service entity.
 *   - Description truncated to last full word + ellipsis (no mid-word cuts).
 *
 * To strengthen further (requires additional WorkPress dashboard fields):
 *   - aggregateRating  → reviews (single biggest local SEO lever)
 *   - sameAs           → Google Business Profile URL, BBB, social profiles
 *   - logo             → company logo URL
 *   - openingHoursSpecification → business hours
 *   - geo              → business's own coordinates (for GeoCircle serviceArea)
 *   - hasMap           → Google Maps listing URL
 *   - priceRange       → "$" / "$$" / "$$$"
 *
 * Note on CompanyCam image URLs: these may be signed/tokenized CDN links that
 * expire. Verify longevity — a dead image URL in structured data wastes rich-result
 * opportunities months down the line.
 */

const FALLBACK_COMPANY: CompanySettings = {
  company_name: 'Your Company Name',
  company_phone: '+1-214-555-0100',
  company_address: '123 Main Street, Dallas, Texas 75201, United States',
  website_url: 'https://yoursite.com',
};

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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function generateProjectSchema(project: Project, city: string) {
  const company = await getCompanySettings();
  const companyInfo = company || FALLBACK_COMPANY;
  const parsedAddress = parseAddress(companyInfo.company_address);

  // Guard: warn if website_url is missing — all @id values will be invalid without it
  const domain = companyInfo.website_url.replace(/\/$/, '');
  if (!domain || domain === 'https://yoursite.com') {
    console.warn('[WorkPress Schema] website_url is not set in Organization Settings. Schema @id values will be relative/invalid. Set it in the WorkPress dashboard.');
  }

  const projectUrl = `${domain}/${slugify(city)}/${project.slug}`;

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

  // ── LocalBusiness entity ────────────────────────────────────────────────────
  // serviceArea = business home city only — NOT the whole state.
  // Claiming statewide reach on a city case-study page is too broad and generic.
  // contactPoint.areaServed matches serviceArea (same scope = coherent signals).
  // Customize @type per client: RoofingContractor, GeneralContractor, Plumber, etc.
  const businessEntity = {
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${domain}/#business`,
    'name': companyInfo.company_name,
    'url': domain,
    'telephone': companyInfo.company_phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': parsedAddress.streetAddress,
      'addressLocality': parsedAddress.addressLocality,
      'addressRegion': parsedAddress.addressRegion, // from company address parse — reliable
      'postalCode': parsedAddress.postalCode,
      'addressCountry': 'US',
    },
    // serviceArea intentionally omitted — coverage claims belong in GBP, not schema.
    // Embedding a serviceArea here creates a contradiction on project pages where
    // the job was done in a different city than the business's home address.
    // contactPoint.areaServed omitted — no accurate scope to assert here.
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': companyInfo.company_phone,
      'contactType': 'customer service',
      'availableLanguage': 'English',
    },
    'knowsAbout': serviceTypes,
  };

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
    'serviceType': serviceTypes,
    'provider': businessEntity,
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
    'dateCreated': project.created_at,
    ...(project.updated_at ? { 'dateModified': project.updated_at } : {}),
  };

  // ── 2. Breadcrumb schema ────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${projectUrl}#breadcrumb`,
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': domain },
      { '@type': 'ListItem', 'position': 2, 'name': city, 'item': `${domain}/${slugify(city)}` },
      { '@type': 'ListItem', 'position': 3, 'name': project.seoTitle, 'item': projectUrl },
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
