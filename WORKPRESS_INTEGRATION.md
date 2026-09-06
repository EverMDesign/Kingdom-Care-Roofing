# WorkPress Integration Guide

This site is connected to **WorkPress** — a multi-tenant SaaS dashboard where service companies manage project portfolios. WorkPress publishes projects to this site via a public API and keeps pages fresh via webhook revalidation.

---

## How It Works

```
WorkPress Dashboard
├─ Service company creates/edits project
├─ Project published → saved to database
└─ Webhook fires → POST /api/revalidate on this site

This Site
├─ Receives webhook with { city, slug }
├─ Calls revalidatePath() on the affected page
└─ Next visitor sees regenerated static HTML
```

All project data — names, descriptions, photos, services, locations — comes from WorkPress. Company details (name, phone, address, website URL) are also fetched from WorkPress and used to populate schema.org markup on every project page.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_URL` | ✅ | WorkPress base URL (e.g. `https://www.workpressapp.com`) |
| `NEXT_PUBLIC_CLIENT_ID` | ✅ | Organization ID from WorkPress (e.g. `org_abc123`) |
| `REVALIDATE_SECRET` | ✅ | Secret token shared with WorkPress for webhook auth |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Optional | Mapbox token for interactive service area maps |

Set these in `.env.local` for local dev and in your Vercel dashboard for production.

---

## API Functions (`src/lib/workpress-api.ts`)

```ts
import { getProjects, getProject, getProjectPhotos, getCompanySettings } from '@/lib/workpress-api';

// All published projects (cached 5 min)
const projects = await getProjects();

// Single project by slug (cached 1 hr, revalidated via webhook)
const project = await getProject('roof-replacement-dallas');

// Project photos
const photos = await getProjectPhotos('roof-replacement-dallas');

// Company info for schema.org (cached 1 hr)
const company = await getCompanySettings();
```

All functions return `null` or `[]` on failure — no throwing.

---

## WorkPress Public API Endpoints

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/public/organizations/{orgId}/projects` | `Project[]` — all published projects |
| GET | `/api/public/organizations/{orgId}/projects/{slug}` | `Project` — single project |
| GET | `/api/public/organizations/{orgId}/projects/{slug}/photos` | `Photo[]` — project gallery |
| GET | `/api/public/organizations/{orgId}/settings` | `CompanySettings` — company info |

No authentication required — public read-only endpoints.

---

## Webhook Revalidation (`src/app/api/revalidate/route.ts`)

WorkPress POSTs to `POST /api/revalidate` on this site when a project is published.

**Request format:**
```http
POST /api/revalidate
x-revalidate-token: your-revalidate-secret
Content-Type: application/json

{ "city": "dallas", "slug": "roof-replacement-oak-lawn" }
```

**Response:**
```json
{ "revalidated": true, "timestamp": "...", "path": "/dallas/roof-replacement-oak-lawn" }
```

**Test it locally:**
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-token: your-revalidate-secret" \
  -d '{"city":"dallas","slug":"roof-replacement-oak-lawn"}'
```

---

## TypeScript Types (`src/lib/workpress-types.ts`)

```ts
Project {
  id, name, slug, description
  seoTitle        // "Roof Replacement Dallas" format — used for display, not the internal name
  metaDescription // optional
  status          // 'published' | 'draft'
  address         // { street, city, state, zip }
  services        // string[] — optional service tags
  cover_photo_url
  coordinates     // { lat, lon } — approximate, privacy-first
  is_published
  created_at, updated_at
}

Photo {
  id, url, caption, order
}

CompanySettings {
  company_name, company_phone, company_address, website_url
}
```

---

## Dashboard Setup (WorkPress Side)

These steps must be done **in the WorkPress dashboard** — the setup script does not handle this:

1. Log into WorkPress → **Organization Settings**
2. Fill in company details:
   - **Company Name** — your business name
   - **Company Phone** — e.g. `214-555-0100`
   - **Company Address** — `123 Main St, Dallas, Texas 75201, United States` (comma-separated, exact format)
   - **Website URL** — `https://www.yoursite.com` (no trailing slash)
3. Register the revalidation webhook:
   - URL: `https://www.yoursite.com/api/revalidate`
   - Secret: same value as `REVALIDATE_SECRET` in your `.env.local`

---

## ISR Caching Strategy

| Page | Cache Duration | Revalidates On |
|---|---|---|
| Homepage `/` | 5 minutes | Background ISR |
| Projects `/projects` | 5 minutes | Background ISR |
| Project detail `/[city]/[slug]` | 1 hour | Webhook from WorkPress |
| Company settings (schema) | 1 hour | ISR |

---

## SEO Notes

- `seoTitle` format is **Service + City** (e.g. "Roof Replacement Dallas") — used as page heading and in metadata
- Never expose homeowner names or exact street addresses publicly
- `coordinates` are offset/approximate for privacy — map pins show area, not exact location
- Schema.org `@id` uses `website_url/#business` consistently across all pages to build Google entity trust

---

## Files Added by Setup Script

```
src/
├── lib/
│   ├── workpress-api.ts       # API client functions
│   └── workpress-types.ts     # TypeScript interfaces
└── app/
    └── api/
        └── revalidate/
            └── route.ts       # Webhook endpoint

.env.local                     # WorkPress env vars (update with real values)
WORKPRESS_INTEGRATION.md       # This file
```
