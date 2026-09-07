# GoHighLevel Integration

Form submissions flow to GHL LeadConnector via a server-side API route.

## Architecture

```
Form (client) → POST /api/submit-form → src/lib/ghl-client.ts → GHL /contacts/upsert
```

## Environment Variables

Stored in `.env.local` (gitignored):

| Variable | Description |
|---|---|
| `PIT_TOKEN` | Private Integration Token — GHL → Settings → Integrations → Private Integrations |
| `LOCATION_ID` | Subaccount ID — GHL → Settings → Business Profile |
| `GHL_API_BASE` | API base URL (default: `https://services.leadconnectorhq.com`) |

Required PIT scopes: `contacts.write`

## Forms Connected

| Form | File | `form_type` | Tags |
|---|---|---|---|
| Hero estimate form | `src/components/HeroForm.tsx` | `hero` | `website-lead`, `hero-form` |
| Service area modal | `app/service-areas/[slug]/ServiceAreaPageContent.tsx` | `estimate` | `website-lead`, `estimate-request` |
| Generic service area modal | `app/service-area/ServiceAreaContent.tsx` | `estimate` | `website-lead`, `estimate-request` |

## GHL Custom Fields Required

Create these in **GHL → Settings → Custom Fields** as TEXT fields:

| Field Key | Suggested GHL Label | Used By |
|---|---|---|
| `service_interest` | Service Interest | All forms |
| `project_message` | Project Message | Estimate modals |

## Field Mapping

Standard fields (`name`, `email`, `phone`) map directly to GHL contact fields.

Custom fields:
- `service` (select value) → `service_interest`
- `message` (textarea) → `project_message`

## Testing

With dev server running (`npm run dev`):

```bash
# Test hero form
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{"form_type":"hero","name":"Test User","phone":"817-555-0100","service":"roofing"}'

# Test estimate modal
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{"form_type":"estimate","name":"Test User","email":"test@example.com","phone":"817-555-0100","service":"storm","message":"Hail damage to roof"}'
```

Check **GHL → Contacts** for the new contact with tags and custom fields.

## Common Issues

- **Missing credentials error** — Check `.env.local` has real values, restart dev server after editing
- **Custom fields not saving** — The field key must exist in GHL → Custom Fields first
- **Version header** — `ghl-client.ts` always sends `Version: 2021-07-28`; never remove it
- **Upsert behavior** — GHL deduplicates by email/phone; resubmitting with same contact updates instead of creating duplicate
