# WorkPress Standards

Rules that govern every WorkPress-connected website. Follow these when building pages, adding features, or modifying data logic.

---

## 1. Rendering

**All project pages must be server components with ISR.** No client components for data fetching on project-related pages.

| Page type | Cache duration | Revalidates on |
|---|---|---|
| List pages (homepage, `/projects`, `/service-map`) | 5 min | Background ISR |
| Detail pages (`/[city]/[slug]`) | 1 hour | Webhook from WorkPress |

```ts
export const revalidate = 300; // list pages
export const revalidate = 3600; // detail pages
```

Non-project pages (about, contact, static marketing pages) may be fully static — no ISR required. Rules in this section apply to pages that display WorkPress data.

**Never fetch project data client-side.** All project data must be in the static HTML for Google to index.

---

## 2. URL Structure

**All project URLs follow this exact pattern:**

```
/[city-slug]/[project-slug]
```

- City slug: `address.city.toLowerCase().replace(/\s+/g, '-')`
- Project slug: comes from WorkPress as-is, never transform it
- Example: `/fort-worth/roof-replacement-oak-lawn`

**URL-based filtering only.** Never use `useState` for city/service filters — use URL search params so filtered views are indexable.

```ts
// Correct
const { city } = await searchParams; // /projects?city=dallas

// Wrong
const [city, setCity] = useState(null);
```

---

## 3. Data

### Required fields — every project must have these

| Field | Type | Rule |
|---|---|---|
| `slug` | string | URL-safe, lowercase, hyphens — never transform |
| `seoTitle` | string | "Service City" format — see Section 5 |
| `address.city` | string | Used for URL routing and city grouping |
| `cover_photo_url` | string | Full URL, not relative |
| `is_published` | boolean | Only render published projects |

### Coordinates

Coordinates may arrive as strings from the API. Always coerce:

```ts
const lat = typeof project.coordinates.lat === 'string'
  ? parseFloat(project.coordinates.lat)
  : project.coordinates.lat;
```

Check for `NaN` before passing to maps.

### API functions

Always use the library functions — never fetch directly in components:

```ts
import { getProjects, getProject, getProjectPhotos, getCompanySettings } from '@/lib/workpress-api';
```

All functions return `null` or `[]` on failure — never throw. Handle accordingly.

### Do not

- Transform or rename fields from the API
- Duplicate data-fetching logic across components
- Cache data in component state
- Hardcode sample/placeholder project data

---

## 4. Company Information

**All company details come from WorkPress — never hardcode them.**

Fetch via `getCompanySettings()`. This returns:

- `company_name`
- `company_phone`
- `company_address` — full string, comma-separated
- `website_url` — no trailing slash

These populate schema.org markup on every project page. If the API fails, schema falls back to the placeholders in `src/lib/workpress-schema.ts` — update those placeholders per client.

---

## 5. SEO Titles

**Format: `[Service] [City]` — nothing else.**

- `Roof Replacement Dallas` — correct
- `Foundation Repair Fort Worth` — correct
- `Professional Roof Replacement in Dallas` — wrong (generic prefix)
- `John Smith's Roof` — wrong (homeowner name)
- `123 Oak Lane Roof Job` — wrong (street address)

`seoTitle` is used as the page `<h1>`, project card title, map pin popup, breadcrumb label, and `<title>` tag. Use it everywhere the project is named publicly. Never display `project.name` (the internal name) on the frontend.

---

## 6. Privacy

- **Never display exact street addresses publicly.** Address city/state is fine; full street address is not.
- **Coordinates must be approximate.** WorkPress offsets them before storing — trust the API, do not try to recover exact locations.
- **Map zoom:** `maxZoom` must not exceed 15. Keep it between 10–13 to prevent street-level resolution.
- **SEO titles** serve as the privacy boundary — they identify the service and city, not the homeowner.

---

## 7. Schema.org

Every project detail page must include all three JSON-LD blocks:

1. **Service** — the job, service type, provider with `@id`, `areaServed` with city + coordinates
2. **BreadcrumbList** — Home → City → Project
3. **WebPage** — links the page to the service and business entities

**The `@id` for the business entity must be consistent across all pages:**

```json
"@id": "https://www.your-domain.com/#business"
```

This value is derived from `company_settings.website_url + '/#business'`. If `website_url` is missing or undefined, schema will break — validate it in Organization Settings first.

**Company address format for schema parsing:**

```
Street, City, State ZIP, Country
1157 Boxwood Drive, Crowley, Texas 76036, United States
```

Commas are required as delimiters. Wrong format breaks address parsing silently.

**`website_url` must have no trailing slash.**

---

## 8. Webhooks

WorkPress sends `POST /api/revalidate` when a project is published.

**Request format:**
```http
POST /api/revalidate
x-revalidate-token: {REVALIDATE_SECRET}
Content-Type: application/json

{ "city": "dallas", "slug": "roof-replacement-oak-lawn" }
```

- City is lowercased before sending from WorkPress
- The webhook endpoint validates the token and calls `revalidatePath()` on the affected page
- **Webhook failure must never block project publishing.** Catch errors silently on the WorkPress side.

---

## 9. Environment Variables

| Variable | Visibility | Rule |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | Public | Must use `www` if domain redirects |
| `NEXT_PUBLIC_CLIENT_ID` | Public | Org ID from WorkPress |
| `REVALIDATE_SECRET` | Private | Never expose to browser |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Public | Optional — only if using service map |

`NEXT_PUBLIC_` prefix required for variables used in server components (Next.js reads them at build time). Secrets that only run server-side get no prefix.

---

## 10. Images

Add the dashboard image CDN domain to `next.config.ts` under `remotePatterns`. Images come as full absolute URLs from the API — never relative paths.

### Alt text rules

Alt text must be SEO-friendly. When service and city are known, include them.

| Context | Alt text format | Example |
|---|---|---|
| Project cover photo | `[seoTitle] - project photo` | `Roof Replacement Dallas - project photo` |
| Gallery photo with caption | `[caption] - [seoTitle]` | `Before view - Roof Replacement Dallas` |
| Gallery photo without caption | `[seoTitle] photo [n]` | `Roof Replacement Dallas photo 3` |
| Non-project images (logos, icons) | Descriptive, no project context | `Apex Roofing company logo` |

Never leave `alt` empty on project images. Never use generic alt text like "photo" or "image" on its own.

---

## 11. New Layouts

When building a new visual layout:

- Keep all API functions, URL patterns, and data field names identical
- Change only CSS and component arrangement
- Reuse `ServiceAreaMap` and `ProjectGallery` components — they are layout-agnostic
- Do not add new data-fetching patterns; extend `src/lib/workpress-api.ts` if a new endpoint is needed

---

## Files Reference

| File | Purpose |
|---|---|
| `src/lib/workpress-api.ts` | All API calls |
| `src/lib/workpress-types.ts` | TypeScript interfaces |
| `src/lib/workpress-schema.ts` | Schema.org generator |
| `src/lib/metadata.ts` | SEO metadata helpers |
| `src/app/api/revalidate/route.ts` | Webhook endpoint |
| `WORKPRESS_INTEGRATION.md` | Setup and connection guide |
