/**
 * Schema.ts — All four Schema.org JSON-LD generators.
 *
 * Every generator returns BuildResult { jsonLd, issues }.
 * Every generator uses @graph to link nodes by @id.
 * Every generator shares one BusinessConfig for the business entity.
 *
 *   buildProjectSchema(business, project, options?)
 *     For completed job / case study pages (e.g. /dallas/roof-replacement-oak-lawn)
 *     Breadcrumb: Home > City > Project Title
 *
 *   buildServicePageSchema(business, service, options?)
 *     For service offering pages (e.g. /services/roof-repair)
 *     Breadcrumb: Home > Services > Service Name
 *
 *   buildBusinessSchema(business, options?)
 *     For homepage / static pages — LocalBusiness + WebSite only
 *
 *   buildServiceAreaSchema(business, area, options?)
 *     For city / service area pages (e.g. /areas/crowley)
 *     Breadcrumb: Home > [Hub] > City
 *     Uses templates from BusinessConfig to generate titles and descriptions
 */

import {
  type BusinessConfig,
  type FaqItem,
  type ImageConfig,
  type ServiceDef,
  type BuildOptions,
  type BuildResult,
  type Node,
  SchemaValidationError,
  trimSlash,
  ensureLeadingSlash,
  joinUrl,
  fill,
  naturalList,
  capitalizeFirst,
  slugify,
  truncate,
  clean,
  cityPlace,
  validateGraph,
  validateBusinessConfig,
  validateFaqs,
  validateServiceIds,
  buildBusinessNode,
  buildWebsiteNode,
  buildFaqNode,
  buildImageNode,
  resolveServices,
  buildResult,
} from './schema-common';

export type {
  BusinessConfig,
  BusinessType,
  PostalAddressConfig,
  ServiceDef,
  FaqItem,
  ImageConfig,
  BuildOptions,
  BuildResult,
  JsonLdDocument,
} from './schema-common';
export { SchemaValidationError, toScriptTag, verifyImageUrls } from './schema-common';

// ═══════════════════════════════════════════════════════════════════════════════
// Config types — one per generator (BusinessConfig is shared)
// ═══════════════════════════════════════════════════════════════════════════════

// ── Project (completed job / case study) ──────────────────────────────────────

export interface ProjectConfig {
  /** SEO title, e.g. "Roof Replacement in Dallas, TX" */
  title: string;
  /** Project description / body content */
  description: string;
  /** URL-safe slug */
  slug: string;
  /** City where the work was done */
  city: string;
  /** State full name, e.g. "Texas" */
  state: string;
  /** State code, e.g. "TX" */
  stateCode: string;
  /**
   * Service type strings describing WHAT was done, not WHO did it.
   * Correct: ["Roof Replacement", "Leak Repair"]
   * Wrong:   ["Roofing Contractor"]
   * First entry is the primary serviceType.
   */
  serviceTypes: string[];
  /** Project image */
  image?: ImageConfig;
  /** Meta description — falls back to truncated description */
  metaDescription?: string;
  /** Approximate coordinates (offset for privacy) */
  coordinates?: { latitude: number; longitude: number };
  /** Additional cities relevant to this project */
  additionalCities?: string[];
  /** ISO date — when published */
  datePublished?: string;
  /** ISO date — when last updated */
  dateModified?: string;
  /** FAQ items for the page */
  faqs?: FaqItem[];
  /** URL pattern. Tokens: {city}, {slug}. Default: "/{city}/{slug}" */
  urlPattern?: string;
  /**
   * Optional intermediate breadcrumb crumb between Home and the city
   * (e.g. a "/projects" index page). Omit for a flat Home > City > Title
   * breadcrumb — most sites with no projects hub page want that default.
   */
  breadcrumbParent?: { name: string; path: string } | null;
  /**
   * Overrides the city breadcrumb item's URL. Use this when the site's
   * city hub pages don't follow business.areaPathPrefix + slugify(city)
   * (e.g. hand-curated slugs like "burleson-tx"). Pass the full URL,
   * including the business's own domain.
   */
  cityUrl?: string;
}

// ── Service Page (service offering / marketing page) ──────────────────────────

export interface ServicePageConfig {
  /** Service name as page heading, e.g. "Roof Repair" */
  name: string;
  /** Page description / body content */
  description: string;
  /** URL-safe slug */
  slug: string;
  /**
   * Service type strings. Same rules as ProjectConfig.serviceTypes.
   * First entry is the primary serviceType.
   */
  serviceTypes: string[];
  /** Cities where this service is offered */
  serviceAreas: { city: string; state: string }[];
  /** Service page image */
  image?: ImageConfig;
  /** Meta description — falls back to truncated description */
  metaDescription?: string;
  /** Coordinates for the primary service area */
  coordinates?: { latitude: number; longitude: number };
  /** ISO date — when published */
  datePublished?: string;
  /** ISO date — when last updated */
  dateModified?: string;
  /** FAQ items for the page */
  faqs?: FaqItem[];
  /** Breadcrumb parent. Default: { name: "Services", path: "/services" } */
  breadcrumbParent?: { name: string; path: string };
  /** URL pattern. Tokens: {slug}. Default: "/services/{slug}" */
  urlPattern?: string;
}

// ── Service Area (city page) ──────────────────────────────────────────────────

export interface AreaConfig {
  city: string;
  state: string; // "Texas"
  stateCode: string; // "TX"
  slug: string; // "crowley"
  /** Service ids offered in this area. Defaults to all business services. First is the primary. */
  services?: string[];
  /** Overrides the pageDescription template. */
  description?: string;
  /** Overrides the pageTitle template. */
  pageTitle?: string;
  image?: { url: string; name: string };
  /** Wikipedia/Wikidata URLs to disambiguate the city. */
  citySameAs?: string[];
  faqs?: FaqItem[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// buildProjectSchema — completed job / case study pages
// ═══════════════════════════════════════════════════════════════════════════════

export function buildProjectSchema(
  business: BusinessConfig,
  project: ProjectConfig,
  options: BuildOptions = {},
): BuildResult {
  const { includeSitewide = true, strict = true } = options;
  const base = trimSlash(business.url);
  const pattern = project.urlPattern ?? "/{city}/{slug}";
  const pageUrl = `${base}${pattern
    .replace("{city}", slugify(project.city))
    .replace("{slug}", project.slug)}`;
  const shortDesc = project.metaDescription || truncate(project.description, 160);
  const serviceTypes =
    project.serviceTypes.length > 0 ? project.serviceTypes : ["Professional Services"];

  // areaServed: primary city (with coords) + additional cities
  const allCities = [project.city, ...(project.additionalCities || [])];
  const areaServed = allCities.map((city, i) => {
    const place: Record<string, unknown> = {
      ...(cityPlace(city, project.state) as Record<string, unknown>),
    };
    if (i === 0 && project.coordinates) {
      place["geo"] = {
        "@type": "GeoCoordinates",
        latitude: project.coordinates.latitude,
        longitude: project.coordinates.longitude,
      };
    }
    return place;
  });

  const imageNode = buildImageNode(project.image, project.title, shortDesc);

  // ── Service ─────────────────────────────────────────────────────────────
  const service: Node = clean({
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: project.title,
    description: project.description,
    serviceType: serviceTypes[0],
    ...(serviceTypes.length > 1 ? { additionalType: serviceTypes.slice(1) } : {}),
    provider: { "@id": `${base}/#business` },
    areaServed: areaServed.length === 1 ? areaServed[0] : areaServed,
    url: pageUrl,
    image: imageNode,
    dateModified: project.dateModified,
  } as Node);

  // ── Breadcrumb: Home > [Parent] > City > Title ───────────────────────────
  // City links through business.areaPathPrefix (e.g. "/areas") so this
  // points at the real per-city hub page instead of a bare, unrouted
  // "/{city}" segment. breadcrumbParent is opt-in for sites with a
  // projects index page.
  const cityItemUrl = project.cityUrl ?? `${base}${business.areaPathPrefix ?? ""}/${slugify(project.city)}`;
  const parent = project.breadcrumbParent;
  const breadcrumbItems: Node[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: base },
    ...(parent
      ? [{ "@type": "ListItem", position: 2, name: parent.name, item: `${base}${parent.path}` }]
      : []),
    {
      "@type": "ListItem",
      position: parent ? 3 : 2,
      name: project.city,
      item: cityItemUrl,
    },
    {
      "@type": "ListItem",
      position: parent ? 4 : 3,
      name: project.title,
      item: pageUrl,
    },
  ];
  const breadcrumb: Node = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  // ── WebPage ─────────────────────────────────────────────────────────────
  const faqs = project.faqs ?? [];
  const webpage: Node = clean({
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: project.title,
    description: shortDesc,
    inLanguage: business.language ?? "en-US",
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${pageUrl}#service` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    publisher: { "@id": `${base}/#business` },
    primaryImageOfPage: imageNode
      ? { "@type": "ImageObject", url: imageNode.url, width: imageNode.width, height: imageNode.height }
      : undefined,
    datePublished: project.datePublished,
    dateModified: project.dateModified,
    hasPart: faqs.length ? { "@id": `${pageUrl}#faq` } : undefined,
  } as Node);

  const nodes: Node[] = [service, breadcrumb, webpage];
  if (faqs.length) nodes.push(buildFaqNode(faqs, `${pageUrl}#faq`));

  const graph: Node[] = [
    ...(includeSitewide ? [buildBusinessNode(business), buildWebsiteNode(business)] : []),
    ...nodes,
  ];

  const issues = [
    ...validateBusinessConfig(business),
    ...validateFaqs(faqs),
    ...validateGraph(graph).filter(
      (i) => includeSitewide || !i.includes("no node with that @id"),
    ),
  ];

  return buildResult(graph, issues, strict);
}

// ═══════════════════════════════════════════════════════════════════════════════
// buildServicePageSchema — service offering / marketing pages
// ═══════════════════════════════════════════════════════════════════════════════

export function buildServicePageSchema(
  business: BusinessConfig,
  service: ServicePageConfig,
  options: BuildOptions = {},
): BuildResult {
  const { includeSitewide = true, strict = true } = options;
  const base = trimSlash(business.url);
  const pattern = service.urlPattern ?? "/services/{slug}";
  const pageUrl = `${base}${pattern.replace("{slug}", service.slug)}`;
  const shortDesc = service.metaDescription || truncate(service.description, 160);
  const serviceTypes =
    service.serviceTypes.length > 0 ? service.serviceTypes : ["Professional Services"];

  // areaServed: all service areas, first gets coords
  const areaServed = service.serviceAreas.map((a, i) => {
    const place: Record<string, unknown> = {
      ...(cityPlace(a.city, a.state) as Record<string, unknown>),
    };
    if (i === 0 && service.coordinates) {
      place["geo"] = {
        "@type": "GeoCoordinates",
        latitude: service.coordinates.latitude,
        longitude: service.coordinates.longitude,
      };
    }
    return place;
  });

  const imageNode = buildImageNode(service.image, service.name, shortDesc);

  // ── Service ─────────────────────────────────────────────────────────────
  const serviceNode: Node = clean({
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.name,
    description: service.description,
    serviceType: serviceTypes[0],
    ...(serviceTypes.length > 1 ? { additionalType: serviceTypes.slice(1) } : {}),
    provider: { "@id": `${base}/#business` },
    areaServed:
      areaServed.length === 1
        ? areaServed[0]
        : areaServed.length > 0
          ? areaServed
          : undefined,
    url: pageUrl,
    image: imageNode,
    dateModified: service.dateModified,
  } as Node);

  // ── Breadcrumb: Home > Parent > Name ────────────────────────────────────
  const parent = service.breadcrumbParent ?? { name: "Services", path: "/services" };
  const breadcrumb: Node = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: parent.name,
        item: `${base}${parent.path}`,
      },
      { "@type": "ListItem", position: 3, name: service.name, item: pageUrl },
    ],
  };

  // ── WebPage ─────────────────────────────────────────────────────────────
  const faqs = service.faqs ?? [];
  const webpage: Node = clean({
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: service.name,
    description: shortDesc,
    inLanguage: business.language ?? "en-US",
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${pageUrl}#service` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    publisher: { "@id": `${base}/#business` },
    primaryImageOfPage: imageNode
      ? { "@type": "ImageObject", url: imageNode.url, width: imageNode.width, height: imageNode.height }
      : undefined,
    datePublished: service.datePublished,
    dateModified: service.dateModified,
    hasPart: faqs.length ? { "@id": `${pageUrl}#faq` } : undefined,
  } as Node);

  const nodes: Node[] = [serviceNode, breadcrumb, webpage];
  if (faqs.length) nodes.push(buildFaqNode(faqs, `${pageUrl}#faq`));

  const graph: Node[] = [
    ...(includeSitewide ? [buildBusinessNode(business), buildWebsiteNode(business)] : []),
    ...nodes,
  ];

  const issues = [
    ...validateBusinessConfig(business),
    ...validateFaqs(faqs),
    ...validateGraph(graph).filter(
      (i) => includeSitewide || !i.includes("no node with that @id"),
    ),
  ];

  return buildResult(graph, issues, strict);
}

// ═══════════════════════════════════════════════════════════════════════════════
// buildBusinessSchema — homepage / static pages
// ═══════════════════════════════════════════════════════════════════════════════

export function buildBusinessSchema(
  business: BusinessConfig,
  options: BuildOptions = {},
): BuildResult {
  const { strict = true } = options;

  const graph: Node[] = [buildBusinessNode(business), buildWebsiteNode(business)];

  const issues = [
    ...validateBusinessConfig(business),
    ...validateGraph(graph),
  ];

  return buildResult(graph, issues, strict);
}

// ═══════════════════════════════════════════════════════════════════════════════
// buildServiceAreaSchema — city / service area pages
// ═══════════════════════════════════════════════════════════════════════════════

function areaIds(business: BusinessConfig, area: AreaConfig) {
  const base = trimSlash(business.url);
  const prefix = ensureLeadingSlash(business.areaPathPrefix ?? "/areas");
  const pageUrl = joinUrl(base, prefix, area.slug);
  return {
    base,
    business: `${base}/#business`,
    website: `${base}/#website`,
    pageUrl,
    service: `${pageUrl}#service`,
    breadcrumb: `${pageUrl}#breadcrumb`,
    webpage: `${pageUrl}#webpage`,
    faq: `${pageUrl}#faq`,
  };
}

function areaTemplateVars(business: BusinessConfig, area: AreaConfig, services: ServiceDef[]) {
  return {
    city: area.city,
    state: area.state,
    stateCode: area.stateCode,
    business: business.name,
    primaryService: services[0]?.name ?? "",
    services: naturalList(services.map((s) => s.phrase ?? s.name)),
  };
}

function buildAreaNodes(business: BusinessConfig, area: AreaConfig): Node[] {
  const id = areaIds(business, area);
  const services = resolveServices(business, area.services);
  const vars = areaTemplateVars(business, area, services);
  const templates = business.templates;

  const description = area.description
    ?? (templates ? capitalizeFirst(fill(templates.pageDescription, vars)) : `Services in ${area.city}, ${area.stateCode}`);
  const pageTitle = area.pageTitle
    ?? (templates ? fill(templates.pageTitle, vars) : `${area.city}, ${area.stateCode}`);
  const serviceName = templates
    ? fill(templates.serviceName, vars)
    : `Services in ${area.city}, ${area.stateCode}`;

  const place = cityPlace(area.city, area.state, area.citySameAs);

  const service: Node = clean({
    "@type": "Service",
    "@id": id.service,
    name: serviceName,
    description,
    serviceType: services.map((s) => s.name),
    provider: { "@id": id.business },
    areaServed: place,
    url: id.pageUrl,
    image: area.image && {
      "@type": "ImageObject",
      url: area.image.url,
      name: area.image.name,
    },
  } as Node);

  const crumbs: { name: string; item: string }[] = [{ name: "Home", item: id.base }];
  const hub = business.areasHub === undefined ? null : business.areasHub;
  if (hub) crumbs.push({ name: hub.name, item: joinUrl(id.base, hub.path) });
  crumbs.push({ name: area.city, item: id.pageUrl });

  const breadcrumb: Node = {
    "@type": "BreadcrumbList",
    "@id": id.breadcrumb,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };

  const faqs = area.faqs ?? [];

  const webpage: Node = clean({
    "@type": "WebPage",
    "@id": id.webpage,
    url: id.pageUrl,
    name: pageTitle,
    description,
    inLanguage: business.language ?? "en-US",
    isPartOf: { "@id": id.website },
    about: { "@id": id.service },
    breadcrumb: { "@id": id.breadcrumb },
    publisher: { "@id": id.business },
    hasPart: faqs.length ? { "@id": id.faq } : undefined,
  } as Node);

  const nodes = [service, breadcrumb, webpage];
  if (faqs.length) nodes.push(buildFaqNode(faqs, id.faq));

  return nodes;
}

export function buildServiceAreaSchema(
  business: BusinessConfig,
  area: AreaConfig,
  options: BuildOptions = {},
): BuildResult {
  const { includeSitewide = true, strict = true } = options;

  const graph: Node[] = [
    ...(includeSitewide ? [buildBusinessNode(business), buildWebsiteNode(business)] : []),
    ...buildAreaNodes(business, area),
  ];

  const issues = [
    ...validateBusinessConfig(business),
    ...validateServiceIds(business, area.services),
    ...(area.slug && /\s|\//.test(area.slug)
      ? [`area.slug must be a single URL segment -> "${area.slug}"`]
      : []),
    ...(area.city && /,/.test(area.city)
      ? [`area.city should be the city name only -> "${area.city}"`]
      : []),
    ...validateFaqs(area.faqs ?? []),
    ...validateGraph(graph).filter(
      (i) => includeSitewide || !i.includes("no node with that @id"),
    ),
  ];

  return buildResult(graph, issues, strict);
}

/** Build every area page at once. Returns a map of slug -> result. */
export function buildAllAreas(
  business: BusinessConfig,
  areas: AreaConfig[],
  options: BuildOptions = {},
): Map<string, BuildResult> {
  const slugs = areas.map((a) => a.slug);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) {
    throw new SchemaValidationError([
      `duplicate area slugs: ${[...new Set(dupes)].join(", ")}`,
    ]);
  }
  return new Map(
    areas.map((a) => [a.slug, buildServiceAreaSchema(business, a, options)]),
  );
}
