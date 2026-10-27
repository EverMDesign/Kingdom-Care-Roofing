/**
 * Kingdom Care — the single source of business-identity facts for schema.org.
 *
 * This is the only place #business should ever be built from. The root
 * layout builds the full node once, from BUSINESS below; every other page
 * (homepage, service pages, project pages) references it by @id instead of
 * rebuilding it — otherwise two independently-built versions of the same
 * @id can quietly disagree (different @type, different phone format), which
 * is exactly the bug this file exists to prevent.
 *
 * Business identity changes on the order of once a year for a local
 * contractor — far less often than projects get published — and
 * WorkPress's public settings API has no fields for geo, @type, or logo at
 * all, so a static file is the only place this data can live correctly.
 */

import type { SchemaBusiness } from './schema-types';

export const BUSINESS: SchemaBusiness = {
  name: 'Kingdom Care Roofing & Construction',
  websiteUrl: 'https://www.kingdomcareroofingandconstruction.com',
  phone: '817-888-8282',
  fullAddress: '1133 Cardinal Ridge Road, Burleson, Texas 76028, United States',
  type: ['RoofingContractor', 'HomeAndConstructionBusiness'],
  logo: 'https://www.kingdomcareroofingandconstruction.com/images/homepage/kingdom-care-logo.webp',
  // Shop's own location (not a job-site address) — verified against the
  // Google Maps pin for the address above. GeoCoordinates for a customer
  // job site come from project.coordinates instead; never conflate the two.
  geo: { latitude: 32.5214881, longitude: -97.2979779 },
};
