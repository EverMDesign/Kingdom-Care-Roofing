/**
 * Schema Builder — Schema.org JSON-LD Generator
 * Optimized for geo-targeted local SEO for service businesses.
 *
 * Data-source agnostic: pass in plain objects, get back schema blocks.
 * No external imports — pure functions only.
 *
 * Two public generators, one set of shared internals:
 *
 *   generateServicePageSchema(service, business, options?)
 *     For service offering pages (e.g. /services/roof-repair)
 *     Breadcrumb: Home > Services > Service Name
 *     Pass { includeSitewide: false } once the root layout owns #business/#website.
 *
 *   generateBusinessSchema(business)
 *     For the root layout only — builds #business + #website once, sitewide.
 *     Every other page references #business by @id instead of calling this.
 *
 * Project (completed job / case study) pages are NOT handled here — that
 * logic lives in workpress-schema.ts, which builds Service/BreadcrumbList/
 * WebPage from live WorkPress project data against the real app routes
 * (/projects/{slug}, /service-areas/{slug}), importing BUSINESS from
 * schema-business.ts for the same #business reference used everywhere else.
 *
 * Geo-targeting design decisions:
 *   - provider.serviceArea is intentionally omitted on project pages.
 *     Coverage claims belong in GBP, not structured data.
 *   - service.areaServed = City object with geo nested inside (not a sibling).
 *     GeoCoordinates is not a valid standalone areaServed type.
 *   - containedInPlace nests city inside state for hierarchical geo confidence.
 *   - Consistent provider.@id across ALL pages = entity consolidation.
 *   - Per-page service.@id = each page is its own distinct service entity.
 *   - Description truncated to last full word + ellipsis (no mid-word cuts).
 *
 * To strengthen further (add to your data source):
 *   - aggregateRating  -> reviews (single biggest local SEO lever)
 *   - sameAs           -> Google Business Profile URL, BBB, social profiles
 *   - openingHoursSpecification -> business hours
 *   - hasMap            -> Google Maps listing URL
 */

import type {
  SchemaBusiness,
  SchemaServicePage,
  SchemaImage,
  SchemaOffers,
  SchemaOptions,
} from './schema-types';

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED INTERNALS — used by all generators, never exported
// ═══════════════════════════════════════════════════════════════════════════════

function parseAddress(addressFull: string) {
  const parts = addressFull.split(',').map((p) => p.trim());
  if (parts.length >= 3) {
    const street = parts[0];
    const city = parts[1];
    const stateZipStr = parts[2].trim();
    const stateZipMatch = stateZipStr.match(/^(.+?)\s+(\d{5}(?:-\d{4})?)$/);
    const state = stateZipMatch ? stateZipMatch[1] : stateZipStr;
    const zip = stateZipMatch
      ? stateZipMatch[2]
      : parts[3]?.trim().match(/\d{5}/)?.[0] || '';
    return { streetAddress: street, addressLocality: city, addressRegion: state, postalCode: zip };
  }
  return { streetAddress: addressFull, addressLocality: '', addressRegion: '', postalCode: '' };
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.substring(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.substring(0, lastSpace) : cut) + '...';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function normalizePhone(raw: string): string {
  if (raw.startsWith('+')) return raw;
  const digits = raw.replace(/\D/g, '');
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

function normalizeCoords(coords?: { lat: number; lon: number }) {
  if (!coords) return null;
  return {
    latitude: typeof coords.lat === 'string'
      ? parseFloat(coords.lat as unknown as string)
      : coords.lat,
    longitude: typeof coords.lon === 'string'
      ? parseFloat(coords.lon as unknown as string)
      : coords.lon,
  };
}

/** Validate serviceType isn't duplicating the business @type */
function warnIfServiceMatchesBusinessType(
  primaryService: string,
  businessType: string | string[],
) {
  const types = Array.isArray(businessType) ? businessType : [businessType];
  if (types.some((bt) => bt.toLowerCase() === primaryService.toLowerCase())) {
    console.warn(
      `[Schema] serviceType "${primaryService}" matches the business @type. ` +
      `serviceType should describe the service performed (e.g. "Roof Repair"), ` +
      `not the business classification (e.g. "RoofingContractor"). ` +
      `The business type is already in the provider entity.`
    );
  }
}

/** Build the LocalBusiness entity — identical across all page types */
function buildBusinessEntity(
  business: SchemaBusiness,
  domain: string,
  phone: string,
  parsedAddress: ReturnType<typeof parseAddress>,
  businessType: string | string[],
  serviceTypes: string[],
): Record<string, unknown> {
  const entity: Record<string, unknown> = {
    '@type': businessType,
    '@id': `${domain}/#business`,
    'name': business.name,
    'url': domain,
    'telephone': phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': parsedAddress.streetAddress,
      'addressLocality': parsedAddress.addressLocality,
      'addressRegion': parsedAddress.addressRegion,
      'postalCode': parsedAddress.postalCode,
      'addressCountry': 'US',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': phone,
      'contactType': 'customer service',
      'availableLanguage': business.languages || ['English'],
    },
    'knowsAbout': serviceTypes,
  };
  if (business.logo) {
    entity['logo'] = { '@type': 'ImageObject', 'url': business.logo };
  }
  if (business.geo) {
    entity['geo'] = {
      '@type': 'GeoCoordinates',
      'latitude': business.geo.latitude,
      'longitude': business.geo.longitude,
    };
  }
  return entity;
}

/** Build an ImageObject from SchemaImage fields */
function buildImageObject(
  image: SchemaImage | undefined,
  name: string,
  fallbackDescription: string,
): Record<string, unknown> | null {
  if (!image?.url) {
    console.warn(
      `[Schema] No image provided for "${name}". ` +
      `Schema will omit image — this reduces rich result eligibility.`
    );
    return null;
  }
  return {
    '@type': 'ImageObject',
    'url': image.url,
    'name': name,
    'description': image.alt || fallbackDescription,
    'width': image.width || 1200,
    'height': image.height || 630,
  };
}

/** Build an Offer block from SchemaOffers */
function buildOffersBlock(offers: SchemaOffers | undefined): Record<string, unknown> | null {
  if (!offers) return null;
  const block: Record<string, unknown> = { '@type': 'Offer' };
  if (offers.priceRange) {
    block['priceSpecification'] = {
      '@type': 'PriceSpecification',
      'price': offers.priceRange,
    };
  }
  if (offers.availability) {
    block['availability'] = `https://schema.org/${offers.availability}`;
  }
  if (offers.description) {
    block['description'] = offers.description;
  }
  return block;
}

/** Build areaServed from a list of city names + optional coordinates + optional state */
function buildAreaServed(
  cities: string[],
  stateName: string,
  coordinates: ReturnType<typeof normalizeCoords>,
  includeState?: boolean,
): unknown {
  if (cities.length === 0) return undefined;

  const cityObjects = cities.map((cityName, i) => {
    const city: Record<string, unknown> = {
      '@type': 'City',
      'name': cityName,
      'containedInPlace': { '@type': 'State', 'name': stateName },
    };
    // First city gets coordinates (if available)
    if (i === 0 && coordinates) {
      city['geo'] = {
        '@type': 'GeoCoordinates',
        'latitude': coordinates.latitude,
        'longitude': coordinates.longitude,
      };
    }
    return city;
  });

  if (includeState && stateName) {
    cityObjects.push({ '@type': 'State', 'name': stateName } as Record<string, unknown>);
  }

  return cityObjects.length === 1 ? cityObjects[0] : cityObjects;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC: generateServicePageSchema — service offering / marketing pages
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate Service + BreadcrumbList + WebPage for a service offering page.
 * Breadcrumb: Home > Services > Service Name  (customizable via breadcrumbParent)
 * URL default: /services/{slug}
 */
export function generateServicePageSchema(
  service: SchemaServicePage,
  business: SchemaBusiness,
  options?: SchemaOptions,
) {
  const parsedAddress = parseAddress(business.fullAddress);
  const domain = business.websiteUrl.replace(/\/$/, '');
  const phone = normalizePhone(business.phone);
  const businessType = business.type || ['LocalBusiness', 'HomeAndConstructionBusiness'];
  const stateName = service.state || parsedAddress.addressRegion;
  const coordinates = normalizeCoords(service.coordinates);

  const serviceTypes =
    service.serviceTypes?.length > 0 ? service.serviceTypes : ['Professional Services'];
  warnIfServiceMatchesBusinessType(serviceTypes[0], businessType);

  const shortDesc = service.metaDescription || truncate(service.description, 160);

  const pattern = options?.urlPattern || '/services/{slug}';
  const pageUrl = `${domain}${pattern.replace('{slug}', service.slug)}`;

  // includeSitewide: false means the root layout already built the full
  // #business node once — this page only ever references it by @id, so a
  // second independently-built version (with its own phone format, @type)
  // never has the chance to disagree with the layout's.
  const businessRef = options?.includeSitewide === false
    ? { '@id': `${domain}/#business` }
    : buildBusinessEntity(business, domain, phone, parsedAddress, businessType, serviceTypes);
  const imageObj = buildImageObject(service.image, service.name, shortDesc);
  const offersObj = buildOffersBlock(service.offers);

  // areaServed: all service areas
  const areaServed = buildAreaServed(
    service.serviceAreas, stateName, coordinates, options?.includeStateArea,
  );

  // ── Service ───────────────────────────────────────────────────────────────
  const serviceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    'name': service.name,
    'description': service.description,
    'serviceType': serviceTypes[0],
    ...(serviceTypes.length > 1 ? { 'additionalType': serviceTypes.slice(1) } : {}),
    'provider': businessRef,
    'url': pageUrl,
  };
  if (areaServed) serviceSchema['areaServed'] = areaServed;
  if (imageObj) serviceSchema['image'] = imageObj;
  if (service.dateModified) serviceSchema['dateModified'] = service.dateModified;
  if (offersObj) serviceSchema['offers'] = offersObj;

  // ── Breadcrumb: Home > Services > Name ────────────────────────────────────
  const parent = service.breadcrumbParent || { name: 'Services', path: '/services' };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': domain },
      { '@type': 'ListItem', 'position': 2, 'name': parent.name, 'item': `${domain}${parent.path}` },
      { '@type': 'ListItem', 'position': 3, 'name': service.name, 'item': pageUrl },
    ],
  };

  // ── WebPage ───────────────────────────────────────────────────────────────
  const webPageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    'url': pageUrl,
    'name': service.name,
    'description': shortDesc,
    'isPartOf': { '@id': `${domain}/#website` },
    'about': { '@id': `${pageUrl}#service` },
    'breadcrumb': { '@id': `${pageUrl}#breadcrumb` },
    'publisher': { '@id': `${domain}/#business` },
  };
  if (imageObj) {
    webPageSchema['primaryImageOfPage'] = {
      '@type': 'ImageObject',
      'url': imageObj.url,
      'width': imageObj.width,
      'height': imageObj.height,
    };
  }
  if (service.datePublished) webPageSchema['datePublished'] = service.datePublished;
  if (service.dateModified) webPageSchema['dateModified'] = service.dateModified;

  return [serviceSchema, breadcrumbSchema, webPageSchema];
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC: generateBusinessSchema — homepage / static pages
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate LocalBusiness + WebSite for a homepage or static page.
 * No service or project context — just the business entity.
 */
export function generateBusinessSchema(business: SchemaBusiness) {
  const parsedAddress = parseAddress(business.fullAddress);
  const domain = business.websiteUrl.replace(/\/$/, '');
  const phone = normalizePhone(business.phone);
  const businessType = business.type || ['LocalBusiness', 'HomeAndConstructionBusiness'];

  const entity = buildBusinessEntity(
    business, domain, phone, parsedAddress, businessType, [],
  );
  // Wrap with @context for standalone use
  const localBusinessSchema = { '@context': 'https://schema.org', ...entity };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    'url': domain,
    'name': business.name,
    'publisher': { '@id': `${domain}/#business` },
  };

  return [localBusinessSchema, webSiteSchema];
}
