# WorkPress Unmapped Fields

These WorkPress data fields were not wired during setup because no existing UI component had a clear place for them. Decide how to handle each one.

## Project Fields

- `coordinates.lat / coordinates.lon` — No interactive map component exists. The homepage and projects-archive map sections use a static Unsplash image with hardcoded pin positions. Consider replacing with a real Mapbox or Google Maps embed that plots live project coordinates.

- `metaDescription` — Already wired into `app/projects/[slug]/page.tsx` via `generateMetadata`. Not used on the archive page (`app/projects/page.tsx`) — if you add a `generateMetadata` export there, pull it from this field.

- `created_at` — No "published date" element exists in any card or detail view. Consider adding a subtle date badge to `ProjectCard` in `app/projects/client.tsx` or to the detail page sidebar.

- `is_published` — The public API already filters to published projects only, so this is redundant on the client. No action needed unless you add a preview/draft mode.

## Company Fields (from `getCompanySettings()`)

- `company_name` — Header and Footer have "KingdomCare" hardcoded as text and in the logo. Wire this if the company name is dynamic across multiple tenants, otherwise leave as-is.

- `company_phone` — Footer and CTA buttons have `(817) 888-8282` hardcoded. Consider replacing `href="tel:8178888282"` and display text with `settings.company_phone` fetched in layout or individual sections.

- `company_address` — Footer still shows a placeholder address (`1234 Contractor Way, Suite 100`). Wire `settings.company_address` into the Footer component once the real address is in WorkPress.

- `website_url` — Unused on the front end. Relevant for schema.org markup if you add a `LocalBusiness` or `Service` JSON-LD block to the layout.

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
