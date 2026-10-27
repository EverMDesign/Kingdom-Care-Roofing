/**
 * Schema Builder — Generic types for Schema.org JSON-LD generation.
 * Data-source agnostic: populate these from WorkPress, a CMS, or static data.
 *
 * Three generators share these types:
 *   generateProjectSchema      — completed job / case study pages
 *   generateServicePageSchema  — service offering pages
 *   generateBusinessSchema     — homepage / static pages
 */

// ── Business (shared by all generators) ──────────────────────────────────────

export interface SchemaBusiness {
  /** Business name */
  name: string;
  /** Full website URL, no trailing slash (e.g. "https://www.example.com") */
  websiteUrl: string;
  /** Phone number — any format, normalized to E.164 internally */
  phone: string;
  /** Full address string: "Street, City, State ZIP" */
  fullAddress: string;
  /**
   * Schema.org @type for the business.
   * Examples: "RoofingContractor", "Plumber", "GeneralContractor",
   * "Electrician", "MovingCompany", "LocksmithService"
   * Can be a string or array: ["LocalBusiness", "HomeAndConstructionBusiness"]
   * @default ["LocalBusiness", "HomeAndConstructionBusiness"]
   */
  type?: string | string[];
  /** Logo URL */
  logo?: string;
  /** Available languages for contact — @default ["English"] */
  languages?: string[];
  /**
   * The business's own location (not a job-site address) — a GeoCoordinates
   * node on the business entity. Get this from the business's real address,
   * never reuse a project's (offset, customer) coordinates.
   */
  geo?: { latitude: number; longitude: number };
}

// ── Shared image + offers fields ─────────────────────────────────────────────

export interface SchemaImage {
  /** Image URL — must match the page content (not a generic or reused image) */
  url?: string;
  /**
   * Alt text describing what the image actually shows.
   * Used in schema image description. Helps catch mismatches between
   * image content and page topic (e.g. a replacement photo on a repair page).
   */
  alt?: string;
  /** Image width in pixels — @default 1200 */
  width?: number;
  /** Image height in pixels — @default 630 */
  height?: number;
}

export interface SchemaOffers {
  /** Price range indicator: "$", "$$", "$$$" */
  priceRange?: string;
  /** Schema.org availability value, e.g. "InStock", "OnlineOnly" */
  availability?: string;
  /** Human-readable offer description, e.g. "Free estimates available" */
  description?: string;
}

// ── Project (completed job / case study) ─────────────────────────────────────

export interface SchemaProject {
  /** SEO display title — "Service City" format (e.g. "Roof Replacement Dallas") */
  title: string;
  /** Project description / body content */
  description: string;
  /** URL-safe slug for the project */
  slug: string;
  /** City where the service was performed */
  city: string;
  /** State where the service was performed (abbreviation or full name) */
  state: string;
  /**
   * The service(s) performed on this project — NOT the business classification.
   * These describe WHAT was done, not WHO did it.
   *
   * Correct: ["Roof Repair", "Leak Repair", "Shingle Replacement"]
   * Wrong:   ["Roofing Contractor", "General Contractor"]
   *
   * The business classification belongs in SchemaBusiness.type instead.
   * First entry becomes the primary serviceType in schema output.
   */
  serviceTypes: string[];
  /** Image for this project */
  image?: SchemaImage;
  /** Meta description — if not provided, description is truncated to 160 chars */
  metaDescription?: string;
  /** Approximate coordinates (should be offset for privacy) */
  coordinates?: {
    lat: number;
    lon: number;
  };
  /**
   * Additional cities relevant to this project.
   * When provided, areaServed becomes an array of City objects.
   * The primary city gets coordinates; these are name-only.
   */
  additionalCities?: string[];
  /** ISO date string — when the project was published */
  datePublished?: string;
  /** ISO date string — when the project was last updated */
  dateModified?: string;
  /** Optional pricing/availability — adds Offer block to Service schema */
  offers?: SchemaOffers;
}

// ── Service Page (service offering / marketing page) ─────────────────────────

export interface SchemaServicePage {
  /** Service name as page heading (e.g. "Roof Repair") */
  name: string;
  /** Page description / body content */
  description: string;
  /** URL-safe slug for the page */
  slug: string;
  /**
   * The service(s) this page is about — NOT the business classification.
   * Same rules as SchemaProject.serviceTypes.
   * First entry becomes the primary serviceType.
   */
  serviceTypes: string[];
  /**
   * All cities where this service is offered.
   * Becomes the areaServed array in the Service schema.
   * First city is treated as primary (gets coordinates if provided).
   */
  serviceAreas: string[];
  /** State for all service areas — @default derived from business address */
  state?: string;
  /** Image for this service page */
  image?: SchemaImage;
  /** Meta description — if not provided, description is truncated to 160 chars */
  metaDescription?: string;
  /** Coordinates for the primary service area (optional) */
  coordinates?: {
    lat: number;
    lon: number;
  };
  /** ISO date string — when the page was published */
  datePublished?: string;
  /** ISO date string — when the page was last updated */
  dateModified?: string;
  /** Optional pricing/availability — adds Offer block to Service schema */
  offers?: SchemaOffers;
  /**
   * Breadcrumb parent label and path.
   * @default { name: "Services", path: "/services" }
   */
  breadcrumbParent?: {
    name: string;
    path: string;
  };
}

// ── Options (shared) ─────────────────────────────────────────────────────────

export interface SchemaOptions {
  /**
   * URL pattern for pages. Use {city} and {slug} as placeholders.
   * Project default: "/{city}/{slug}"
   * Service default: "/services/{slug}"
   */
  urlPattern?: string;
  /**
   * When true, adds a State-level entry to areaServed for broader
   * geographic coverage alongside city-level entries.
   * @default false
   */
  includeStateArea?: boolean;
  /**
   * When false, `provider` is a bare `{"@id": ".../#business"}` reference
   * instead of the full business entity — use this on every page except
   * wherever the full node is actually built once (the root layout).
   * Building it more than once risks two different versions of the same
   * @id disagreeing with each other.
   * @default true
   */
  includeSitewide?: boolean;
}
