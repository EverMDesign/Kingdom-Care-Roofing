# Kingdom Care Roofing — Internal Worklog

---

## 2026-09-04

### Website Scraping & Data Enrichment

**Tasks Completed:**
- Installed `wget` via Homebrew for site crawling
- Installed Playwright (Chromium) to bypass Vercel bot protection
- Scraped 265 total pages from `kingdomcareroofingandconstruction.com`:
  - 201 project pages
  - 24 service pages
  - 30 service area pages
  - Pages, reviews, blog, sitemap
- Saved all HTML to `scraped/` as flat files (e.g. `projects__slug.html`)
- CSS, JS, fonts, and assets saved to `scraped/_next/`

**Data Extraction:**
- Analyzed page structure and identified available fields
- Built `extract-projects.mjs` — extracts slug, SEO title, meta description, address, lat/lng, services, cover photo from each page
- Extracted all 201 projects → `projects.json` (0 failures)

**AI Enrichment:**
- Read WorkPress `claude.ts` for SEO rules (title format, meta desc format, description rules)
- Built `enrich-projects.mjs` — uses Claude API (Opus 4.6) in batches of 5
- Rules applied: SEO title under 60 chars, meta desc 55-155 chars geo-targeted, 3-paragraph description 750-1500 chars, 3-5 extracted services
- Enriched all 201 projects → `projects-enriched.json` (0 failures)

**Fixes:**
- Removed accidental `"type": "commonjs"`, `playwright`, and `@anthropic-ai/sdk` from Next.js `package.json` — was breaking the build

**Files Created:**
- `scraped/` — 265 HTML pages + assets
- `extract-projects.mjs` — extraction script
- `enrich-projects.mjs` — AI enrichment script
- `scraper.mjs` — Playwright site crawler
- `projects.json` — raw extracted data (201 projects)
- `projects-enriched.json` — AI-enriched final data (201 projects)

**Status:** ✅ Complete
**Next Steps:** Build site, then import `projects-enriched.json` into Neon database

---

## 2026-09-04 — 18:23

Scraped all 201 project pages from kingdomcareroofingandconstruction.com, extracted structured data into projects.json, and enriched all 201 projects with Claude API using WorkPress SEO rules into projects-enriched.json

**Files:** scraper.mjs, extract-projects.mjs, enrich-projects.mjs, projects.json, projects-enriched.json, scraped/

**Status:** ✅ Complete
**Next Steps:** Build site, then import projects-enriched.json into Neon database

---

## 2026-09-05 — 07:19

Renamed and organized all homepage images — benefits, CTAs, brands, hero, favicon, video, Our Story, and 30 service area pages. Moved service area images to images/service-area/. All images/homepage/ files now have descriptive kingdom-care- prefixed names.

**Files:** images/homepage/, images/service-area/

**Status:** ✅ Complete

---

## 2026-09-05 — 10:02

test global log script from Kingdom Care project

**Status:** ✅ Complete

---

## 2026-09-05 — 11:32

Connected all homepage components to real Kingdom Care ImageKit images. Created src/lib/images.ts with all confirmed URLs. Updated Hero (video bg), About (Our Story), Brands (3 real logos + Google badge), FinalCTA (real bg), ServicesGrid (8 service photos), Projects (4 surge_media thumbnails). Updated layout.tsx favicon + OG image. Remaining Unsplash: 2 map placeholder images in Projects + ServiceAreas (no real equivalent in IK library).

**Status:** ✅ Complete

---

## 2026-09-05 — 11:41

Expanded ServicesGrid from 8 placeholder cards to all 24 real services scraped from kingdomcareroofingandconstruction.com. Each service maps to its correct ImageKit hero image, real subheader description, slug, and category badge. Grid: 1/2/3/4 cols responsive. Cards at 300px height. Services cover roofing, commercial, emergency, inspection, painting, and construction categories.

**Status:** ✅ Complete

---

## 2026-09-05 — 17:37

added projects archive and detail

**Status:** ✅ Complete

---

## 2026-09-05 — 17:38

added projects archive and detail

**Files:** app/projects/page.tsx, app/projects/[slug]/page.tsx, src/components/ComparisonSlider.tsx, src/lib/projects.ts, src/components/index.ts, src/components/Header.tsx

**Status:** ✅ Complete
**Next Steps:** Connect projects to DB, add real before/after images to comparison slider, build mobile menu dropdown, wire remaining header links

---

## 2026-09-06 — 10:08

Kingdom Care site session: updated ServiceAreaMap with mapStyle prop and light-v11 default; added Mapbox map to projects archive page and project detail page; replaced placeholder pin image on projects page with live map; updated projects page heading to 'Our Completed Work Across DFW' with Burleson subtext; removed Service Areas from header nav; reduced ServicesGrid from 24 to 12 by merging similar services; removed links from service area list in ServiceAreas component; built full service page template at app/services/[slug]/page.tsx with banner, two-column layout, sidebar nav, related projects, FAQ accordion, reviews, and contact CTA; created src/lib/services-data.ts with content and FAQs for all 12 services; created app/services/[slug]/ServiceFAQ.tsx client accordion component; wired footer service links to actual service pages; added Services dropdown to desktop nav and expandable accordion to mobile menu

**Files:** src/components/ServiceAreaMap.tsx, src/components/ServiceAreas.tsx, src/components/Header.tsx, src/components/Footer.tsx, src/components/ServicesGrid.tsx, src/components/Projects.tsx, app/projects/page.tsx, app/projects/[slug]/page.tsx, app/services/[slug]/page.tsx, app/services/[slug]/ServiceFAQ.tsx, src/lib/services-data.ts

**Status:** ✅ Complete

---

## 2026-09-06 — 17:35

Added LocalBusiness and BreadcrumbList schema to all service area pages. Created generateServiceAreaSchema() in src/lib/service-areas-data.ts — outputs RoofingContractor + HomeAndConstructionBusiness with phone (+1-817-888-8282), Burleson address, city-specific areaServed, county containedInPlace, and hasOfferCatalog matching the 6 services shown in the page sidebar (Roof Replacement, Storm Damage Repair, Roof Inspection, Exterior Painting, Gutter Installation, Leak Detection & Repair). BreadcrumbList: Home → Service Areas → {city}, TX. Consistent @id across all pages for entity trust. Wired into app/service-areas/[slug]/page.tsx as inline script tag.

**Files:** src/lib/service-areas-data.ts, app/service-areas/[slug]/page.tsx

**Status:** ✅ Complete

---

## 2026-09-06 — 18:02

Converted all JPEG/JPG/PNG images in public/images/ to WebP format using cwebp (quality 80) and ImageMagick. SVGs, MP4 hero video, and favicon.png left unchanged. Reduced total image folder size from 829MB to 444MB (~46% reduction, 385MB saved). Updated all source file references from .jpeg/.jpg/.png to .webp across images.ts, projects.ts, services-data.ts, ServicesGrid.tsx, and layout.tsx.

**Status:** ✅ Complete

---

## 2026-09-07 — 23:10

SEO audit — documented all issues in SEO.md. Critical: missing sitemap.ts, robots.ts, metadataBase in layout. High: no OG images on service/project/service-area pages, no canonical URLs, no homepage metadata export or LocalBusiness schema. Medium: no Twitter card metadata, no service page schema, /service-area duplicate content risk.

**Files:** SEO.md

**Status:** ✅ Complete
**Next Steps:** Fix P0 issues: add metadataBase to layout.tsx, create sitemap.ts, create robots.ts

---

## 2026-09-07 — 09:37

Connected all forms to GoHighLevel via LeadConnector API. Created GHL client library, submit-form API route, and wired 3 forms (HeroForm, ServiceAreaPageContent modal, ServiceAreaContent modal). All submissions upsert contacts with tags and custom fields.

**Files:** src/lib/ghl-client.ts, src/app/api/submit-form/route.ts, src/components/HeroForm.tsx, app/service-areas/[slug]/ServiceAreaPageContent.tsx, app/service-area/ServiceAreaContent.tsx, GHL_INTEGRATION.md, .env.local

**Status:** ✅ Complete
**Next Steps:** Create 2 GHL custom fields: service_interest, project_message. Test with curl against dev server.

---

## 2026-09-07 — 10:47

GHL Connect setup complete and form fixes. Fixed API route location (src/app/api → app/api), resolved JSON parse error, added EverReach tracking script, updated service dropdowns across all forms (combined Interior/Exterior Painting, added Interior/Exterior Remodeling).

**Files:** app/api/submit-form/route.ts, src/lib/ghl-client.ts, app/layout.tsx, src/components/HeroForm.tsx, app/service-areas/[slug]/ServiceAreaPageContent.tsx, app/service-area/ServiceAreaContent.tsx, GHL_INTEGRATION.md

**Status:** ✅ Complete

---

## 2026-09-07 — 10:50

Updated all form service dropdowns so option values match display labels exactly for clean GHL reporting.

**Files:** src/components/HeroForm.tsx, app/service-areas/[slug]/ServiceAreaPageContent.tsx, app/service-area/ServiceAreaContent.tsx

**Status:** ✅ Complete

---

## 2026-09-08 — 21:00

EverReach + GHL form tracking fixes, EstimateModal component, Vercel env sync skill

**Files:** src/components/EstimateModal.tsx, src/components/HeroForm.tsx, app/service-areas/[slug]/ServiceAreaPageContent.tsx, app/service-area/ServiceAreaContent.tsx, src/components/index.ts, app/projects/page.tsx, app/projects/[slug]/page.tsx, app/layout.tsx

**Status:** ✅ Complete

---

## 2026-09-08 — Research: Image Storage & CDN Strategy for Production

**Type:** Architecture Planning / Research

### Context
Kingdom Care has 443MB / 737 image files in `public/images/` (git-ignored). Need a production image hosting solution before launch. Evaluated all major options for both this site and as the EMD agency standard going forward.

---

### Current State
- Images live in `public/images/` organized into 4 folders: `homepage/`, `projects/`, `service-area/`, `services/`
- All referenced via `src/lib/images.ts` with local paths (e.g. `/images/homepage/...`)
- `next.config.js` is empty — no remote image config yet
- `public/images` is git-ignored

---

### Options Evaluated

#### 1. Cloudflare R2 — Recommended for Agency Scale
- S3-compatible object storage with **zero egress fees**
- 10GB free storage tier — 443MB fits with massive headroom
- Serves via Cloudflare's global CDN
- Supports custom domain (e.g. `media.kingdomcareroofing.com`)
- Upload via `rclone` (one command, S3-compatible)
- `next/image` handles all optimization — R2 is just the origin
- One Cloudflare account → multiple per-client buckets = clean agency architecture

#### 2. ImageKit
- Image CDN + real-time transformations + media library
- Free plan: 20GB storage, 20GB bandwidth/month — fine for a single local business site
- URL-based transforms (resize, crop, WebP conversion via URL params)
- Official Next.js custom loader available
- **Problem for agency scale:** one account shared across clients exposes the account ID (`ik.imagekit.io/ACCOUNTID/`) in every URL — not white-labeled
- Paid plans start at $49+/month if free tier exceeded across multiple clients
- Transforms are redundant if already using `next/image` (which handles resize, WebP, quality)

#### 3. Vercel Blob
- Native Vercel integration — zero config
- ~$0.023/GB storage + bandwidth fees
- Egress is NOT free — costs grow with traffic
- Good for simple single-site setups, not agency scale

#### 4. Bunny.net Storage + CDN
- ~$0.01/GB storage + cheap CDN bandwidth
- Similar to R2 but a separate vendor
- Valid option, used by many WordPress agencies
- Less unified than Cloudflare (separate storage + CDN services to manage)

#### 5. GoHighLevel (GHL) Subaccount Media Library — Rejected
See dedicated section below.

---

### Competitor Agency Analysis
Reviewed `kingdomcareroofingandconstruction.com` (competing agency's build):

URL structure found in production:
```
/_next/image?url=https://ik.imagekit.io/4wu305uo4/image_rFRnGMZJl.jpg&w=1920&q=75
```

**Issues identified with their approach:**
1. **Double processing** — `_next/image` re-optimizes an already-served ImageKit URL. Wastes Vercel image credits AND ImageKit bandwidth simultaneously with no benefit.
2. **Exposed account ID** — `4wu305uo4` appears in every image URL across every client site they build. Not white-labeled, not professional.
3. **No folder organization** — filename `image_rFRnGMZJl.jpg` is ImageKit's auto-generated ID. No SEO value, no structure, not manageable at scale.
4. **One shared ImageKit account** — all client images mixed into one account with no per-client isolation.

---

### Why NOT GoHighLevel for Image Storage

GHL subaccounts have a media library backed by Google Cloud Storage. Files are publicly accessible via URL. It is technically possible to reference these URLs in a website — but GHL is the wrong tool for this job.

**Reasons to never use GHL as an image CDN for production websites:**

1. **GHL is a CRM, not infrastructure.** It is a marketing and sales SaaS platform. Image delivery performance, CDN edge caching, and uptime SLAs for asset serving are not design goals. If GHL has an incident, the website's images go down.

2. **Ugly, uncontrollable URLs.** GHL media URLs look like `storage.googleapis.com/msgsndr/ACCOUNT_ID/media/filename.jpg`. This string is exposed in every `<img>` tag on the client's website. It is not white-labeled, not ownable, and GHL can change this URL structure at any time — silently breaking every image on every client site.

3. **No image optimization.** No transforms, no automatic WebP conversion, no resizing. You'd still need `next/image` in front of it — creating the same double-processing problem seen on the competing agency's site above.

4. **Storage limits tied to GHL plan.** Not designed for bulk asset storage. Limits can be hit unexpectedly and are not transparent.

5. **Mixing concerns.** CRM contacts, automation data, and website production assets all live in the same platform. If a client churns off GHL, or GHL raises prices or changes terms, the client's website images disappear with no migration path.

6. **No per-client isolation control.** EMD does not own the underlying storage. GHL does. There is no way to enforce isolation, run cost attribution per client, or hand off storage cleanly.

**The only valid GHL image workflow:** clients upload job-site photos to GHL from mobile (which they may already do for social content) → sync/export to R2 → serve from R2. GHL as a workflow step is acceptable. GHL as the delivery layer is not.

---

### EMD Agency-Scale Decision

**Chosen direction: Cloudflare R2 + `next/image` + custom domain per client**

```
One Cloudflare Account (EMD)
├── R2 Bucket: kingdom-care-media     → media.kingdomcareroofing.com
├── R2 Bucket: kcb-services-media     → media.kcbservices.com
├── R2 Bucket: avvalley-media         → media.avvalley.com
└── R2 Bucket: [client]-media         → media.[clientdomain].com
```

**Why this wins at agency scale:**
- Zero egress fees regardless of traffic or number of clients
- Per-client bucket = clean isolation, easy handoff, zero cross-contamination
- Custom domain per client = fully white-labeled, professional
- One Cloudflare account = centralized agency control
- `next/image` handles all transforms natively — no separate image transform service needed
- `rclone` uploads the entire `public/images/` folder in one command (S3-compatible)
- Storage cost at 50 clients with ~500MB each ≈ $0.38/month total
- Natural future integration: WorkPress dashboard uploads directly to R2 per organization

**Cost comparison at agency scale (10 clients, ~500MB each = ~5GB):**

| Service | Storage | Egress | Monthly Est. |
|---|---|---|---|
| Cloudflare R2 | ~$0.08 | $0.00 | ~$0.08 |
| ImageKit (shared acct) | Free | Free (20GB cap) | $0 until cap |
| ImageKit (paid) | Included | Included | $49+ |
| Vercel Blob | ~$0.12 | Variable | $1–10+ |
| GHL Media | Included | N/A | Not suitable |

**Implementation steps for Kingdom Care:**
1. Create R2 bucket `kingdom-care-media` in Cloudflare dashboard
2. Connect `media.kingdomcareroofing.com` custom domain to bucket
3. Upload `public/images/` via `rclone sync` (one command)
4. Update base URL in `src/lib/images.ts` from `/images/` to `https://media.kingdomcareroofing.com/images/`
5. Add `remotePatterns` to `next.config.js` to allow the CDN domain
6. `public/images` stays git-ignored as-is

**Status:** Research Complete — Implementation Pending
**Next Steps:** Create R2 bucket and run upload before prod deployment

---

## 2026-09-08 — Image Storage: R2 Setup & Migration Complete

**Type:** Infrastructure / DevOps

### Summary
Researched, decided on, and fully implemented Cloudflare R2 as the image storage and CDN solution for Kingdom Care and as the EMD agency standard going forward. All site images are now live on R2 and the codebase is updated to pull from the CDN.

---

### Decisions Made

**Storage: Cloudflare R2**
Chosen over ImageKit, Vercel Blob, Bunny.net, and GHL media library. Key reasons:
- Zero egress fees — costs nothing regardless of traffic
- One EMD Cloudflare account with a bucket per client (same model as GHL subaccounts)
- `next/image` handles all optimization natively — no separate image transform service needed
- Per-client custom domain via Cloudflare DNS (e.g. `media.kingdomcareroofing.com`)
- Near-zero cost at scale (50 clients ≈ $0.38/month total storage)

**GHL rejected** — CRM tool, not infrastructure. Exposes `storage.googleapis.com/msgsndr/` in every URL, no image optimization, storage limits tied to GHL plan, client churn risk.

**ImageKit rejected for agency scale** — account ID exposed in every URL across all client sites, redundant with `next/image`, paid plans $49+/month at scale.

**Two-bucket model for WorkPress:**
- Static site images → per-client R2 bucket (EMD Cloudflare account)
- WorkPress dashboard-uploaded project photos → `workpress-uploads` bucket (WorkPress's own Cloudflare account, organized by `org_[orgId]/`)
- CompanyCam photos → CC hosts them, WorkPress stores the URL, no R2 needed

**WorkPress gets its own Cloudflare account** — separate from EMD's agency account. WorkPress is a standalone SaaS product with its own domain, DB, and auth. Infrastructure follows product boundaries.

---

### What Was Built

**rclone installed and configured** (`~/.config/rclone/rclone.conf`)
- Provider: Cloudflare R2
- Endpoint: `https://7a79f1b50d3108bbef9b798ed5cdbb18.r2.cloudflarestorage.com`
- Credentials: Account API token (Admin Read & Write)

**Bucket created:** `kingdom-care-media`

**Images uploaded — 71 files across 3 folders:**
- `images/homepage/` — logo, hero (webp + mp4), benefits, brands, CTAs, contact form bg, favicon, Our Story
- `images/services/` — all 24 service page hero images
- `images/service-area/` — all 30 service area city images
- `images/projects/` — intentionally excluded (will come from WorkPress/CompanyCam)

**Public access enabled** — bucket live at:
`https://pub-e208ced336924f319590ff630e2d3a92.r2.dev`

**Codebase updated:**
- `src/lib/images.ts` — `BASE` constant set to R2 pub URL
- `src/components/ServicesGrid.tsx` — `S` constant updated to R2
- `src/lib/services-data.ts` — `S` constant updated to R2
- `next.config.js` — `remotePatterns` added for `pub-e208ced336924f319590ff630e2d3a92.r2.dev`

**All URLs verified 200 OK** — logo, services, service-area, hero video.

---

### Pending

- **Custom domain** (`media.kingdomcareroofing.com`) blocked — domain is at Squarespace with Google Workspace email. Requires moving DNS to Cloudflare first. Steps documented: add site in Cloudflare (imports MX + SPF/DKIM records), verify Google Workspace records are intact, then update nameservers at Squarespace. Custom domain is cosmetic only — site fully works on the pub URL today.

**Status:** ✅ Complete (pub URL) — Custom domain pending DNS migration
**Next Steps:** Move `kingdomcareroofing.com` DNS to Cloudflare → connect `media.kingdomcareroofing.com` to bucket

---

## 2026-09-08 — 00:54

Kingdom Care – modal system, nav cleanup, page creation, and CRM fixes

**Files:** app/services/[slug]/page.tsx, app/services/[slug]/ServiceCTA.tsx, app/services/[slug]/ServiceBannerCTA.tsx, src/components/Header.tsx, src/components/FloatingCTA.tsx, src/components/EstimateModal.tsx, src/components/OfferModals.tsx, src/components/Offers.tsx, src/components/Brands.tsx, src/components/Footer.tsx, app/privacy/page.tsx, app/terms/page.tsx, app/api/submit-form/route.ts, src/lib/ghl-client.ts

**Status:** ✅ Complete
**Next Steps:** Test all modal forms end-to-end; verify GHL custom fields are created; check offer form submissions in CRM

---

## 2026-09-08 — 18:12

Spam protection investigation and cleanup — honeypot implemented and removed, Turnstile selected as final solution

**Files:** src/components/HeroForm.tsx, src/components/EstimateModal.tsx, src/components/OfferModals.tsx, app/service-areas/[slug]/ServiceAreaPageContent.tsx, app/service-area/ServiceAreaContent.tsx, app/api/submit-form/route.ts

**Status:** ⏳ Deferred
**Next Steps:** Implement Cloudflare Turnstile once site is live on its domain — need Site Key and Secret Key from Cloudflare dashboard

---

## 2026-09-10 — 23:04

Investigated and fixed GHL form submission issues on Kingdom Care website — audited all 4 forms (HeroForm, EstimateModal, FreeUpForm, ReferralForm), confirmed /api/submit-form route exists in app/ not src/app/, added code field to freeup and referral field mappings as promo_code, removed code from exclusion list so it passes through as custom field, added name attributes to all inputs in OfferModals for both FreeUpForm and ReferralForm

**Files:** app/api/submit-form/route.ts, src/components/OfferModals.tsx

**Status:** ✅ Complete

---

## 2026-09-10 — 23:29

Added client-side form validation to all 4 Kingdom Care forms — phone (10-digit + no 0/1 area code), email format, and address format (optional fields only validate when filled); errors show on submit with red borders and inline messages, clear on edit

**Files:** src/lib/validation.ts, src/components/HeroForm.tsx, src/components/EstimateModal.tsx, src/components/OfferModals.tsx

**Status:** ✅ Complete

---
