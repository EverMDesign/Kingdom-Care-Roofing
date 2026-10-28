/**
 * Kingdom Care — the single source of business-identity facts for schema.org.
 *
 * This is the only place #business should ever be built from. The root
 * layout builds the full node once, from BUSINESS_CONFIG below; every other
 * page (homepage, service pages, project pages) references it by @id
 * instead of rebuilding it.
 *
 * Business identity changes on the order of once a year for a local
 * contractor — far less often than projects get published — and
 * WorkPress's public settings API has no fields for geo, @type, or logo at
 * all, so a static file is the only place this data can live correctly.
 */

import type { BusinessConfig } from './schema-common';
import { SERVICES_NAV } from './services-data';

export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'Kingdom Care Roofing & Construction',
  url: 'https://www.kingdomcareroofingandconstruction.com',
  type: 'RoofingContractor',
  telephone: '817-888-8282',
  logo: 'https://www.kingdomcareroofingandconstruction.com/images/homepage/kingdom-care-logo.webp',
  address: {
    street: '1133 Cardinal Ridge Road',
    city: 'Burleson',
    stateCode: 'TX',
    postalCode: '76028',
    country: 'US',
  },
  // Shop's own location (not a job-site address) — verified against the
  // Google Maps pin for the address above. GeoCoordinates for a customer
  // job site come from project.coordinates instead; never conflate the two.
  geo: { latitude: 32.5214881, longitude: -97.2979779 },
  services: SERVICES_NAV.map((s) => ({ id: s.slug, name: s.title })),
  // Service-area hub pages use hand-curated slugs (e.g. "burleson-tx"),
  // not business.areaPathPrefix + slugify(city) — see cityUrlFor() in
  // workpress-schema.ts, which looks them up from service-areas-data.ts
  // instead of relying on this prefix.
  areaPathPrefix: '/service-areas',
};
