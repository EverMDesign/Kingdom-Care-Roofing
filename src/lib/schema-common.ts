/**
 * Schema Common — Shared foundation for all schema generators.
 *
 * Imported by schema.ts which contains all four generators:
 *   buildProjectSchema       — completed job / case study pages
 *   buildServicePageSchema   — service offering pages
 *   buildBusinessSchema      — homepage / static pages
 *   buildServiceAreaSchema   — city / service area pages
 *
 * Contains:
 *   Types        — BusinessConfig, FaqItem, ImageConfig, BuildResult, etc.
 *   Helpers      — clean(), slugify(), truncate(), fill(), naturalList(), etc.
 *   Validation   — placeholder detection, URL checks, @id resolution, FAQ checks
 *   Node builders — LocalBusiness, WebSite, FAQPage, service resolution
 *   Utilities    — toScriptTag(), verifyImageUrls()
 */

// ── Types ────────────────────────────────────────────────────────────────────

/** Common schema.org LocalBusiness subtypes. Any valid subtype string is allowed. */
export type BusinessType =
  | "LocalBusiness"
  | "HomeAndConstructionBusiness"
  | "RoofingContractor"
  | "GeneralContractor"
  | "Electrician"
  | "Plumber"
  | "HVACBusiness"
  | "HousePainter"
  | "Locksmith"
  | "MovingCompany"
  | "ProfessionalService"
  | "AutomotiveBusiness"
  | "EntertainmentBusiness"
  | (string & {});

export interface PostalAddressConfig {
  street: string;
  city: string;
  stateCode: string;
  postalCode: string;
  country?: string; // defaults to "US"
}

export interface ServiceDef {
  /** Stable key, e.g. "roof-replacement" */
  id: string;
  /** Title-case name, e.g. "Roof Replacement" */
  name: string;
  /** Sentence-case phrase for descriptions, e.g. "roof replacement". Keeps acronyms like "HVAC" intact. */
  phrase?: string;
}

export interface BusinessConfig {
  name: string;
  /** Root URL, no trailing slash (e.g. "https://example.com") */
  url: string;
  type: BusinessType;
  telephone?: string;
  email?: string;
  logo?: string;
  image?: string;
  priceRange?: string;
  /** Omit for service-area businesses with no public address. */
  address?: PostalAddressConfig;
  geo?: { latitude: number; longitude: number };
  /** GBP, Facebook, Yelp, BBB, etc. */
  sameAs?: string[];
  /** e.g. ["Mo-Fr 08:00-17:00", "Sa 09:00-13:00"] */
  openingHours?: string[];
  /** Business-level coverage list. */
  areaServed?: { city: string; state: string }[];
  language?: string; // defaults to "en-US"
  services: ServiceDef[];

  // ── Service area page options (used by buildServiceAreaSchema) ───────────

  /** URL prefix for city pages. Defaults to "/areas". */
  areaPathPrefix?: string;
  /** Hub page for area breadcrumbs. Set to null to skip. */
  areasHub?: { name: string; path: string } | null;
  /**
   * Text templates for area pages.
   * Tokens: {city} {state} {stateCode} {business} {primaryService} {services}
   * {services} renders as "roof replacement, roof repair, and storm damage restoration".
   */
  templates?: {
    pageTitle: string;
    pageDescription: string;
    serviceName: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ImageConfig {
  url: string;
  name: string;
  width?: number;
  height?: number;
}

export interface BuildOptions {
  /** Include LocalBusiness + WebSite nodes so @id references always resolve. Default true. */
  includeSitewide?: boolean;
  /** Throw on validation issues. Default true. If false, issues are returned instead. */
  strict?: boolean;
}

export interface BuildResult {
  jsonLd: JsonLdDocument;
  issues: string[];
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };
export type Node = { [k: string]: JsonValue };

export interface JsonLdDocument {
  "@context": "https://schema.org";
  "@graph": Node[];
}

export class SchemaValidationError extends Error {
  constructor(public issues: string[]) {
    super(`Schema validation failed:\n- ${issues.join("\n- ")}`);
    this.name = "SchemaValidationError";
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export const trimSlash = (s: string) => s.replace(/\/+$/, "");
export const ensureLeadingSlash = (s: string) => (s.startsWith("/") ? s : `/${s}`);

export function joinUrl(base: string, ...parts: string[]): string {
  const path = parts
    .map((p) => p.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
  return path ? `${trimSlash(base)}/${path}` : trimSlash(base);
}

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));
}

export function naturalList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export const capitalizeFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.substring(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.substring(0, lastSpace) : cut) + "...";
}

/** Removes undefined values and empty arrays/objects so the output stays clean. */
export function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(clean).filter((v) => v !== undefined) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      const c = clean(v);
      if (Array.isArray(c) && c.length === 0) continue;
      if (c && typeof c === "object" && !Array.isArray(c) && Object.keys(c).length === 0) continue;
      out[k] = c;
    }
    return out as T;
  }
  return value;
}

export const cityPlace = (city: string, state: string, sameAs?: string[]): Node =>
  clean({
    "@type": "City",
    name: city,
    containedInPlace: { "@type": "State", name: state },
    sameAs: sameAs as JsonValue,
  }) as Node;

// ── Validation ───────────────────────────────────────────────────────────────

const PLACEHOLDER_PATTERNS: [RegExp, string][] = [
  [/\.\.\.|\u2026/, 'contains "..." (truncated or placeholder text)'],
  [/\bTBD\b|\bTODO\b|\bFIXME\b/, "contains TBD/TODO/FIXME"],
  [/lorem ipsum/i, "contains lorem ipsum"],
  [/\{\{|\}\}|\{[a-zA-Z]+\}/, "contains an unfilled template token"],
  [/\bexample\.com\b/i, "points to example.com"],
];

const URL_KEYS = new Set(["url", "item", "logo", "image", "@id", "sameAs"]);

export function validateGraph(graph: Node[]): string[] {
  const issues: string[] = [];

  const walk = (value: JsonValue, path: string, parentKey?: string) => {
    if (typeof value === "string") {
      if (value.trim() === "") issues.push(`${path}: empty string`);
      for (const [re, msg] of PLACEHOLDER_PATTERNS) {
        if (re.test(value)) issues.push(`${path}: ${msg} -> "${value.slice(0, 60)}"`);
      }
      if (parentKey && URL_KEYS.has(parentKey) && !/^https:\/\/[^\s]+$/.test(value)) {
        issues.push(`${path}: must be an absolute https URL -> "${value}"`);
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${path}[${i}]`, parentKey));
      return;
    }
    if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, k);
    }
  };

  graph.forEach((node) => walk(node, String(node["@type"])));

  // @id references must resolve inside the graph
  const ids = new Set(graph.map((n) => n["@id"]).filter(Boolean));
  const checkRefs = (value: JsonValue, path: string) => {
    if (Array.isArray(value)) return value.forEach((v, i) => checkRefs(v, `${path}[${i}]`));
    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 1 && keys[0] === "@id" && !ids.has(value["@id"] as string)) {
        issues.push(`${path}: references ${value["@id"]} but no node with that @id is in the graph`);
      }
      for (const [k, v] of Object.entries(value)) if (k !== "@id") checkRefs(v, `${path}.${k}`);
    }
  };
  graph.forEach((node) => checkRefs(node, String(node["@type"])));

  return issues;
}

export function validateBusinessConfig(business: BusinessConfig): string[] {
  const issues: string[] = [];
  if (!/^https:\/\//.test(business.url)) issues.push(`business.url must start with https:// -> "${business.url}"`);
  if (business.services.length === 0) issues.push("business.services is empty");
  return issues;
}

export function validateFaqs(faqs: FaqItem[]): string[] {
  const issues: string[] = [];
  faqs.forEach((f, i) => {
    const letters = f.question.replace(/[^A-Za-z]/g, "");
    if (letters.length > 3 && letters === letters.toUpperCase()) {
      issues.push(`faqs[${i}].question is ALL CAPS; use sentence-case text -> "${f.question}"`);
    }
    if (f.answer.trim().length < 20) issues.push(`faqs[${i}].answer looks too short to match the page`);
  });
  return issues;
}

export function validateServiceIds(business: BusinessConfig, serviceIds?: string[]): string[] {
  if (!serviceIds?.length) return [];
  const known = new Set(business.services.map((s) => s.id));
  return serviceIds.filter((id) => !known.has(id)).map((id) => `unknown service id "${id}"`);
}

// ── Shared Node Builders ─────────────────────────────────────────────────────

export function buildBusinessNode(business: BusinessConfig): Node {
  const base = trimSlash(business.url);
  const a = business.address;
  return clean({
    "@type": business.type,
    "@id": `${base}/#business`,
    name: business.name,
    url: base,
    telephone: business.telephone,
    email: business.email,
    logo: business.logo,
    image: business.image,
    priceRange: business.priceRange,
    address: a && {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.stateCode,
      postalCode: a.postalCode,
      addressCountry: a.country ?? "US",
    },
    geo: business.geo && {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHours: business.openingHours,
    areaServed: business.areaServed?.map((c) => cityPlace(c.city, c.state)),
    sameAs: business.sameAs,
  } as Node);
}

export function buildWebsiteNode(business: BusinessConfig): Node {
  const base = trimSlash(business.url);
  return {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: business.name,
    publisher: { "@id": `${base}/#business` },
    inLanguage: business.language ?? "en-US",
  };
}

export function buildFaqNode(faqs: FaqItem[], faqId: string): Node {
  return {
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
    })),
  };
}

export function buildImageNode(
  image: ImageConfig | undefined,
  name: string,
  fallbackDesc: string,
): Node | undefined {
  if (!image?.url) return undefined;
  return clean({
    "@type": "ImageObject",
    url: image.url,
    name: name,
    description: image.name || fallbackDesc,
    width: image.width,
    height: image.height,
  } as Node);
}

export function resolveServices(business: BusinessConfig, serviceIds?: string[]): ServiceDef[] {
  if (!serviceIds?.length) return business.services;
  const byId = new Map(business.services.map((s) => [s.id, s]));
  return serviceIds.map((sid) => byId.get(sid)).filter((s): s is ServiceDef => !!s);
}

/** Wrap graph nodes into a BuildResult. Throws if strict and issues exist. */
export function buildResult(graph: Node[], issues: string[], strict: boolean): BuildResult {
  if (strict && issues.length) throw new SchemaValidationError(issues);
  return { jsonLd: { "@context": "https://schema.org", "@graph": graph }, issues };
}

// ── Utilities ────────────────────────────────────────────────────────────────

/** Serialize for a <script> tag. Escapes "<" so content can't break out of the tag. */
export function toScriptTag(doc: JsonLdDocument, pretty = false): string {
  const json = JSON.stringify(doc, null, pretty ? 2 : 0).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

/**
 * Build-time check: confirms every image/logo URL in the graph returns 200.
 * Run in CI or a prebuild script (needs network access; Node 18+).
 */
export async function verifyImageUrls(doc: JsonLdDocument): Promise<string[]> {
  const urls = new Set<string>();
  const collect = (v: JsonValue, key?: string) => {
    if (
      typeof v === "string" &&
      (key === "logo" || key === "image" || key === "url") &&
      /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(v)
    ) {
      urls.add(v);
    } else if (Array.isArray(v)) v.forEach((x) => collect(x, key));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) collect(x, k);
  };
  doc["@graph"].forEach((n) => collect(n));

  const broken: string[] = [];
  await Promise.all(
    [...urls].map(async (u) => {
      try {
        const res = await fetch(u, { method: "HEAD" });
        if (!res.ok) broken.push(`${u} -> ${res.status}`);
      } catch (e) {
        broken.push(`${u} -> ${(e as Error).message}`);
      }
    })
  );
  return broken;
}
