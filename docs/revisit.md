# Revisit List

Items to come back to later.

---

## Local SEO Structure — Site Check Findings (2026-11-14)

Result of the `/site-check` K section (Local SEO Structure) run against this site. Based on a code read only, no build. Principles come from the Drive folder `EMD_website-admin`.

### P0 — Fix before launch

- **Add the home city to service pages.** Titles currently read "Service | KingdomCare Roofing & Construction" with no city, and the H1 is just the service name. Put the home city in the title tag, H1 and opening paragraph of each of the 12 service pages (`app/services/[slug]/page.tsx`, copy in `src/lib/services-data.ts`). Don't create a page for every service × city combination.
- **Create a `/services` hub page.** Only `app/services/[slug]` exists. `src/lib/schema.ts` (around line 363) uses `/services` as the default breadcrumb parent, so that breadcrumb likely points to a 404. Build a hub that links to every service, or change the breadcrumb parent to a page that exists.

### P1 — Cross-links and local proof

- **Link city pages to service pages.** `ServiceAreaPageContent.tsx` has a hardcoded `servicesList` of plain text with no links. Link each item to its `/services/{slug}` page.
- **Link service pages to city pages.** Services only reference cities in schema. Add a visible "areas we serve" block with contextual links to the city pages.
- **Link project pages to their city and service pages.** `app/[city]/[slug]/page.tsx` links only to `/projects` and related projects. Add links to `/service-areas/{city}-tx` and the matching `/services/{slug}`.
- **Make city page reviews city-specific.** The testimonials in `ServiceAreaPageContent.tsx` are one hardcoded list shared by all 30 city pages. Use reviews that mention the city, and fall back honestly when there are none. Ties into the Business Profile reviews work.
- **Settle one business name.** "KingdomCare" (26 uses) and "Kingdom Care" (6) are mixed, plus "Kingdom Care Roofing & Construction" in schema and several LLC and "and" variants. Pick the form that matches the Google Business Profile exactly and use it in titles, schema, footer and copy.

### P2 — Cleanup and verification

- **Check the two `href="#"` CTAs.** `src/components/Hero.tsx:68` and `src/components/FinalCTA.tsx:16`. If they're modal triggers, make that explicit (button with handler). If not, point them at a real destination.
- **Review `roof-replacement` against `roof-installation`.** Make sure each has distinct content and intent. Merge or differentiate if they overlap.
- **Decide on parent categories** for the 12 flat service pages (for example, a Roofing parent), and only nest a sub-service page when it has real traction. Link down from the parent and back up with breadcrumbs, breadcrumb schema and a contextual body link.
- **Confirm the footer email domain.** `Ben@kingdomstormgroup.com` differs from the site domain. Confirm it's intentional.
- **Update `SEO.md`.** It still lists the sitemap and `robots.txt` as missing, but `app/sitemap.ts` and `app/robots.ts` now exist. Also verify `metadataBase`.

### Confirm with client (off-site, can't be checked in code)

- Google Business Profile: primary category, services and service areas set.
- Steady reviews that mention the service and the town, with owner responses.
- Real photos, and consistent name, address and phone across the web.
- Quality local links, not mass directory listings.
- Note: distance dominates map-pack ranking, so pages alone won't win distant towns.

---

## SEO.md Audit — Re-checked Against Current Code (2026-11-14)

`SEO.md` (project root, audited 2026-09-06) is out of date. Each item was re-checked against the current code. Code read only, no build.

### Already fixed (SEO.md still lists these as open)

- **Sitemap** — `app/sitemap.ts` exists (home, projects, privacy, terms, all services, all city pages, all projects).
- **robots.txt** — `app/robots.ts` exists, allows all, disallows `/api/`, references the sitemap.
- **`metadataBase`** — set in `app/layout.tsx` to the `www` domain.
- **OG image path** — now an absolute URL (`kcmedia.evermdesign.com/...`).
- **Homepage LocalBusiness schema** — `#business` and `#website` are emitted sitewide from the root layout (`schema-business.ts`).
- **Service page schema** — `buildServicePageSchema` is used on every service page.
- **Duplicate `/service-area` route** — the route is gone and nothing links to it.
- **Canonicals** — set on service, city, project and `/service-areas` archive pages.

### Still open

**P1**
- **Wrong canonical on pages with no canonical of their own.** The root layout sets `alternates.canonical: '/'`, and pages without their own `alternates` inherit it. `/privacy`, `/terms` and `/projects` therefore declare the homepage as canonical. Add a canonical to each, or remove the canonical from the root layout and set it per page.
- **Projects page has no metadata export.** `app/projects/page.tsx` has schema but no `export const metadata`. It inherits the homepage title and description. Add a unique title, description and canonical.
- **Service, city and project pages have no per-page OG or Twitter data.** None of the three define `openGraph` or `twitter`, so shares fall back to the homepage's generic title, description and image. Add `openGraph.images` using `service.image`, the city hero image (`serviceAreaHero(slug)`) and `project.cover_photo_url`, with matching Twitter cards.
- **Sitemap is missing `/service-areas`.** The archive page exists and is linked sitewide, but is not in `app/sitemap.ts` static routes. (The `/services` hub also needs adding once it's built, see the Local SEO section above.)

**P2**
- **No custom 404 page.** There is no `app/not-found.tsx`, so the default Next.js 404 is used. Add a branded page linking back to services and areas, with a CTA.
- **OG and Twitter description says "Fort Worth".** The root layout's `openGraph.description` and `twitter.description` read "Professional roofing and construction services in Fort Worth", while the title says Burleson. Align the location with the Business Profile.
- **Terms and Privacy have no OG or Twitter data.** Low priority, they inherit the generic homepage card.

### Housekeeping

- Update or retire `SEO.md` once the open items above are done. Its file paths are stale too (it refers to `app/projects/[slug]/page.tsx`, but project pages now live at `app/[city]/[slug]/page.tsx`).
