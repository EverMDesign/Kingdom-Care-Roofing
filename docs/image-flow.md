# Kingdom Care — Image Flow

How images get from upload to the visitor's screen, and to social link previews.

There are three separate image paths. Each has its own storage, its own upload method, and its own place in the code.

| Path | What it covers | Storage | Served from |
|---|---|---|---|
| 1. Site images | Logo, hero video, service photos, service-area city photos, OG image | Cloudflare R2 bucket `kingdom-care-media` | `https://kcmedia.evermdesign.com` |
| 2. Project photos | Portfolio projects, galleries, before/after | ImageKit, managed by WorkPress | ImageKit URLs, passed through the WorkPress public API |
| 3. Social link previews | The image shown when a page link is pasted on Facebook, LinkedIn, iMessage, etc. | R2 (same as path 1) | `https://kcmedia.evermdesign.com/images/homepage/kingdom-care-og-image.jpg` |

---

## 1. Site images (Cloudflare R2)

### Storage

- Bucket: `kingdom-care-media` on the EMD Cloudflare account.
- Public domain: `kcmedia.evermdesign.com`, connected to the bucket as an R2 custom domain. Cloudflare provides the certificate and CDN caching.
- Folder layout:

```
images/
├── homepage/       logo, hero (webp + mp4), benefits, brand logos, CTA backgrounds,
│                   contact form bg, favicon, Our Story, OG image
├── services/       one hero image per service page (24)
└── service-area/   one image per city, named kingdom-care-area-{slug}.webp (30)
```

`images/projects/` is intentionally not in the bucket. Project photos come from WorkPress (path 2).

### Why not the `r2.dev` address

Cloudflare's `pub-….r2.dev` URL is for testing. It has a variable rate limit (hundreds of requests per second), returns HTTP 429 when exceeded, and has no caching, WAF, or Bot Management. The custom domain replaced it in commit `863f900`. The `r2.dev` URL is no longer used anywhere in the code and can be turned off in the Cloudflare dashboard.

### Local files are not deployed

`public/images` is gitignored (`.gitignore`). Local copies exist for convenience only. A file that exists locally but not in R2 returns a 404 on the live site. Always upload to R2.

### Upload

Uses `rclone` with the configured `r2:` remote (config at `~/.config/rclone/rclone.conf`).

```bash
# One file
rclone copyto public/images/homepage/new-file.webp \
  r2:kingdom-care-media/images/homepage/new-file.webp

# Verify it is live
curl -I https://kcmedia.evermdesign.com/images/homepage/new-file.webp
```

Set the content type if the guess is wrong, e.g. `--header-upload "Content-Type: image/jpeg"`.

### Where the code reads them

| File | Role |
|---|---|
| `src/lib/images.ts` | `BASE` constant (`https://kcmedia.evermdesign.com`), the `IMAGES` map, and `serviceAreaHero(slug)` |
| `src/components/ServicesGrid.tsx` | `S` constant for `images/services` |
| `src/lib/services-data.ts` | `S` constant for `images/services` |
| `next.config.js` | `images.remotePatterns` allows `kcmedia.evermdesign.com` for `next/image` |

If the media domain ever changes, update `BASE`, both `S` constants, and the `remotePatterns` hostname.

### Request flow

1. Visitor opens a page served by Vercel.
2. The page references an image URL built from `BASE`.
3. `next/image` (where used) asks `kcmedia.evermdesign.com` for the original through the allowlist in `next.config.js`, then resizes and caches it.
4. Cloudflare serves the file from its edge cache, or from the R2 bucket on a miss.

---

## 2. Project photos (WorkPress and ImageKit)

Portfolio projects are not stored in this repo or in R2.

1. **Photos enter WorkPress** by CompanyCam sync (before/after tags are detected) or by manual upload in the WorkPress dashboard.
2. **WorkPress uploads them to ImageKit** under `/workpress/{orgId}/{projectId}/`. The database stores the URLs, order, and cover photo.
3. **ImageKit resizes on request** through URL parameters (thumbnail 400px, cover 1200px, full 2048px) and serves WebP or AVIF depending on the browser.
4. **This site reads them from the WorkPress public API**:
   - `GET /api/public/organizations/{orgId}/projects`
   - `GET /api/public/organizations/{orgId}/projects/{slug}`
   - `GET /api/public/organizations/{orgId}/projects/{slug}/photos`
   - Types are in `src/lib/workpress-types.ts` (`cover_photo_url`, photo `url` and `caption`).
5. **Components render the URLs**: `src/components/Projects.tsx` and `src/components/ProjectGallery.tsx` use plain `<img>` tags with the ImageKit URLs, so these do not go through `next/image` or the `remotePatterns` allowlist.
6. **Publishing triggers a refresh**: WorkPress sends a webhook to `POST /api/revalidate` (`src/app/api/revalidate/route.ts`) with the `x-revalidate-token` header. The route checks it against `REVALIDATE_SECRET` and revalidates `/{city}/{slug}` and `/`.

The folder `public/images/projects/` on the local machine is gitignored reference material. It is not what the live site shows.

---

## 3. Social link previews (OG image)

### Files

- Image: 1200×630 JPG, 105 KB, the crew-at-sunset roof photo.
- Two copies exist:
  - R2: `images/homepage/kingdom-care-og-image.jpg`, served at `https://kcmedia.evermdesign.com/images/homepage/kingdom-care-og-image.jpg`. **This is the one the site uses.**
  - Repo: `public/og-image.jpg`, served at `/og-image.jpg` on the site's own domain. A working fallback that nothing currently points to.

### Metadata

`app/layout.tsx` sets `openGraph` and `twitter` (`summary_large_image`) with the absolute R2 URL, `width: 1200`, `height: 630`, and alt text. Every page inherits this because no page overrides `images`.

### What happens when a link is pasted

1. The platform fetches the page HTML.
2. It reads `og:image` and `twitter:image` from the tags.
3. It downloads the image from `kcmedia.evermdesign.com`.
4. It caches the result.

### Replacing the image

- Platforms cache previews. After changing the image, use a **new file name** or clear the cache with Facebook's Sharing Debugger and LinkedIn's Post Inspector.
- Keep 1200×630, under about 300 KB (some apps reject larger files), JPG or PNG.

### Gaps

- No per-page OG images yet. Service, project, and service-area pages all show the same preview. Adding one means setting `openGraph.images` and `twitter.images` in that page's `generateMetadata`.

---

## Checklist: adding a new site image

1. Prepare the file (WebP for photos, 1200×630 JPG for OG images).
2. Upload with `rclone copyto` to the matching folder in `kingdom-care-media`.
3. Check `curl -I https://kcmedia.evermdesign.com/<path>` returns 200 and the right `content-type`.
4. Reference it through `IMAGES` in `src/lib/images.ts`, or the `S` constants for service images.
5. If it is a new host, add it to `next.config.js` `remotePatterns`.

## Checklist: a project photo is missing from the site

1. Confirm the project is published in WorkPress and the photo is attached.
2. Check the WorkPress public API response for the project's photos.
3. Check that the `/api/revalidate` webhook is registered and `REVALIDATE_SECRET` matches on both sides.
4. Open the ImageKit URL directly. If it loads, the issue is on the site side. If it does not, the issue is in WorkPress or ImageKit.

## Related

- Cloudflare account: EMD agency account (per-client bucket model).
- Earlier research on storage options: `WORKLOG.md`, entry "Research: Image Storage & CDN Strategy for Production".
- WorkPress image pipeline: `WorkPress/TECH_STACK.md`, section "Image Pipeline".
