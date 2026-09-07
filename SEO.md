# Kingdom Care Roofing — SEO Audit

Last audited: 2026-09-06

---

## Critical Issues

### 1. No sitemap
- **File missing**: `app/sitemap.ts`
- **Impact**: Google cannot auto-discover all pages (30 service-area pages, 12 service pages, project pages)
- **Fix**: Create `app/sitemap.ts` returning all static routes + dynamic routes from `SERVICES`, `serviceAreas`, and `getProjects()`

### 2. No robots.txt
- **File missing**: `app/robots.ts`
- **Impact**: Crawlers have no guidance; defaults vary by bot
- **Fix**: Create `app/robots.ts` allowing all and pointing to sitemap URL

### 3. No `metadataBase` in root layout
- **File**: `app/layout.tsx`
- **Impact**: Relative OG image paths (e.g. `/images/homepage/...`) will not resolve for social sharing — Facebook/X scrapers need absolute URLs
- **Fix**: Add `metadataBase: new URL('https://kingdomcareroofingandconstruction.com')` to the root metadata export

### 4. OG image is a relative path
- **File**: `app/layout.tsx`
- **Impact**: Without `metadataBase`, the OG image won't load when pages are shared on social media
- **Fix**: Resolve after `metadataBase` is set, or use an absolute URL directly

---

## Missing Page-Level Metadata

### 5. Homepage has no metadata export
- **File**: `app/page.tsx`
- **Impact**: Falls back to generic layout title/description; no page-specific OG image or description
- **Fix**: Add `export const metadata: Metadata = { title: '...', description: '...', openGraph: { ... } }`

### 6. Projects archive page has no metadata
- **File**: `app/projects/page.tsx`
- **Impact**: Generic title, no OG data
- **Fix**: Add metadata export with relevant title/description

### 7. Service pages have no OG image
- **File**: `app/services/[slug]/page.tsx` — `generateMetadata()`
- **Impact**: Social shares show no image
- **Fix**: Add `openGraph.images` using `service.image` (already available on the service object)

### 8. Project detail pages have no OG image
- **File**: `app/projects/[slug]/page.tsx` — `generateMetadata()`
- **Impact**: Social shares show no image for project pages
- **Fix**: Add `openGraph.images` using `project.cover_photo_url`

### 9. Service area pages have no OG image
- **File**: `app/service-areas/[slug]/page.tsx` — `generateMetadata()`
- **Impact**: Social shares show no image for location pages
- **Fix**: Add `openGraph.images` using the local area hero image

---

## Missing SEO Tags (All Pages)

### 10. No canonical URLs
- **Impact**: If pages are accessible via multiple URLs or HTTP/HTTPS variants, Google may index duplicates
- **Fix**: Add `alternates: { canonical: 'https://kingdomcareroofingandconstruction.com/...' }` to each page's metadata

### 11. No Twitter/X card metadata
- **Impact**: Links shared on X show basic link previews instead of large image cards
- **Fix**: Add `twitter: { card: 'summary_large_image', title: '...', description: '...', images: [...] }` to each page's metadata

---

## Duplicate Content Risk

### 12. `/service-area` conflicts with `/service-areas/[slug]`
- **File**: `app/service-area/page.tsx` (generic page)
- **Impact**: Two URL patterns for location content — crawlers may split authority between `/service-area` and `/service-areas/[slug]`
- **Fix**: Either remove the generic `/service-area` page or add a canonical pointing to the slug-based pages; ensure no internal links point to the generic URL

---

## Schema.org

### 13. No LocalBusiness schema on homepage
- **Impact**: Homepage is the most authoritative page for entity recognition — missing schema reduces trust signal
- **Fix**: Add LocalBusiness (RoofingContractor) schema to `app/page.tsx` with same `@id` used across service-area pages

### 14. Service pages have no schema
- **Impact**: No structured data for individual service offerings
- **Fix**: Add Service schema to each service page using the service title, description, and provider `@id`

---

## What Is Already Good

- `lang="en"` set on `<html>` in root layout
- Viewport meta tag set correctly
- Title + description present on most pages via `generateMetadata`
- LocalBusiness + BreadcrumbList schema on all 30 service-area pages
- Schema on project detail pages
- Semantic HTML structure (header, main, footer, section)
- Descriptive alt text on most images
- All images served as WebP from local `/public/images/` (fast, no CDN dependency)

---

## Priority Order

| Priority | Issue |
|----------|-------|
| P0 | metadataBase in layout.tsx |
| P0 | sitemap.ts |
| P0 | robots.ts |
| P1 | Homepage metadata + schema |
| P1 | OG images on service, project, and service-area pages |
| P1 | Canonical URLs |
| P2 | Twitter card metadata |
| P2 | Service page schema |
| P2 | Projects page metadata |
| P3 | Resolve /service-area duplicate content |
