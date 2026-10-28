/**
 * WorkPress Schema Adapter
 * Thin wrapper that maps WorkPress project data to the generic
 * schema-builder (schema.ts / schema-common.ts). Business identity comes
 * from BUSINESS_CONFIG (schema-business.ts) — this file is project-data
 * only, and never builds #business itself.
 */

import { Project } from './workpress-types';
import { BUSINESS_CONFIG } from './schema-business';
import { buildProjectSchema } from './schema';
import type { ProjectConfig } from './schema';
import type { JsonLdDocument } from './schema-common';
import { serviceAreas } from './service-areas-data';

// Minimal US state abbreviation -> full name lookup. WorkPress only returns
// a 2-letter `address.state`, but ProjectConfig needs both the full name
// (for the City/State place node) and the code.
const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
};

function stateNameFromCode(code: string): string {
  return STATE_NAMES[code.toUpperCase()] ?? code;
}

/**
 * service-areas-data.ts uses hand-curated slugs (e.g. "burleson-tx") that
 * aren't derivable from the city name alone — look up the real hub page
 * URL, falling back to the /service-areas index (a real page) rather than
 * guessing a slug that might 404.
 */
function cityUrlFor(city: string): string {
  const domain = BUSINESS_CONFIG.url.replace(/\/$/, '');
  const match = serviceAreas.find((a) => a.city.toLowerCase() === city.toLowerCase());
  return match ? `${domain}/service-areas/${match.slug}` : `${domain}/service-areas`;
}

/** Map a WorkPress Project to the generic ProjectConfig. */
function toProjectConfig(project: Project): ProjectConfig {
  const stateCode = project.address.state;
  return {
    title: project.seoTitle,
    description: project.description,
    slug: project.slug,
    city: project.address.city,
    state: stateNameFromCode(stateCode),
    stateCode,
    serviceTypes: project.services ?? [],
    image: project.cover_photo_url
      ? { url: project.cover_photo_url, name: project.seoTitle }
      : undefined,
    metaDescription: project.metaDescription,
    coordinates: project.coordinates
      ? {
          latitude:
            typeof project.coordinates.lat === 'string'
              ? parseFloat(project.coordinates.lat)
              : project.coordinates.lat,
          longitude:
            typeof project.coordinates.lon === 'string'
              ? parseFloat(project.coordinates.lon)
              : project.coordinates.lon,
        }
      : undefined,
    datePublished: project.created_at,
    dateModified: project.updated_at,
    // Matches the real site structure: Home > Projects > City > Title
    breadcrumbParent: { name: 'Projects', path: '/projects' },
    cityUrl: cityUrlFor(project.address.city),
  };
}

/**
 * Generate the JSON-LD graph for a WorkPress project detail page
 * (Service + BreadcrumbList + WebPage nodes in one `@graph`).
 * Returns an array so callers can `.map()` over it into `<script>` tags —
 * today that array always has exactly one document.
 */
export async function generateProjectSchema(
  project: Project,
  // Kept for call-site compatibility with the [city]/[slug] route;
  // project.address.city is the authoritative value used below.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  city: string,
): Promise<JsonLdDocument[]> {
  const projectConfig = toProjectConfig(project);

  // #business is built once, in the root layout, from BUSINESS_CONFIG —
  // reference it by @id here rather than rebuilding it a second time.
  const { jsonLd, issues } = buildProjectSchema(BUSINESS_CONFIG, projectConfig, {
    strict: false,
    includeSitewide: false,
  });

  if (issues.length > 0) {
    console.warn('[WorkPress Schema] buildProjectSchema issues:', issues);
  }

  return [jsonLd];
}
