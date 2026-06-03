---
name: upload
description: Use when configuring a Payload upload collection or debugging file handling — image sizes/crop/focal point, mime/file-size limits, storage adapters (R2/S3), static serving, or securing uploaded files.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# upload — file/media collections

Make a collection handle files via `upload: true` or an `upload` config object. Pairs with `sharp` (in [[config]]) for image processing and a storage adapter for persistence.

## upload config
| Option | Purpose |
|---|---|
| `staticDir` | Local dir (dev only — use cloud storage in prod, see [[deploy]]). |
| `imageSizes` | Array of `{ name, width, height, position }` generated variants. |
| `focalPoint` / `crop` | Enable focal-point + crop UI. |
| `mimeTypes` | Allowed MIME types. |
| `filesRequiredOnCreate` | Require a file on create. |
| `formatOptions` / `resizeOptions` | sharp transforms. |
| `adminThumbnail` | Which size shows as thumbnail. |
| `disableLocalStorage` | Use a storage adapter (R2/S3) instead of disk. |

## Storage adapters
erpax uses `@payloadcms/storage-r2` (Cloudflare R2): `r2Storage({ bucket, collections: { media: true } })` in `config.plugins`. Never rely on ephemeral local disk in production.

## Security (see [[harden]])
Restrict `create`/`update`/`read` [[access]] on upload collections; scan uploads via [[hooks]]; limit `mimeTypes` and file size.

## Common mistakes
- Local `staticDir` on a serverless/ephemeral host → lost files; use R2/S3.
- Public `read` on private user uploads.
- Too many `imageSizes` (slow processing, storage cost).

Composes: [[Media]].
