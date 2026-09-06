# WorkPress Unmapped Fields

These WorkPress data fields were not wired during setup because no existing UI component had a clear place for them. Decide how to handle each one.

## Project Fields

- `coordinates.lat / coordinates.lon` — No interactive map component exists. The homepage and projects-archive map sections use a static Unsplash image with hardcoded pin positions. Consider replacing with a real Mapbox or Google Maps embed that plots live project coordinates.

- `metaDescription` — Wired into `app/projects/[slug]/page.tsx` via `generateMetadata`. Not used on the archive page (`app/projects/page.tsx`) — if you add a `generateMetadata` export there, pull it from this field.

- `created_at` — No "published date" element exists in any card or detail view. Consider adding a subtle date badge to `ProjectCard` in `app/projects/client.tsx` or to the detail page sidebar.

- `is_published` — The public API already filters to published projects only, so this is redundant on the client. No action needed unless you add a preview/draft mode.

## Company Fields (from `getCompanySettings()`)

- `company_name` — Header and Footer have "KingdomCare" hardcoded as logo alt text and in the layout metadata. Wire this if the company name is dynamic across tenants, otherwise leave as-is.

- `company_phone` ✅ — Wired into `TopBar.tsx` and `Footer.tsx`. CTA buttons (`FinalCTA.tsx`, `ServiceAreas.tsx`, detail page, archive CTA) still use hardcoded `tel:8178888282` — wire those when ready.

- `company_address` ✅ — Wired into `Footer.tsx`.

- `website_url` — Unused on the front end. Relevant for schema.org JSON-LD if you add a `LocalBusiness` block to the layout. Already used internally by `generateProjectSchema()`.

## How to use these fields

```ts
import { getCompanySettings } from '@/lib/workpress-api'
const settings = await getCompanySettings()
// settings.company_name, settings.company_phone, settings.company_address, settings.website_url
```

```ts
import { getProjects } from '@/lib/workpress-api'
const projects = await getProjects()
// project.coordinates.lat, project.coordinates.lon, project.created_at
```

See `WORKPRESS_INTEGRATION.md` for the full API reference.
