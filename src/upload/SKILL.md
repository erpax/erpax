---
name: upload
description: "Use when configuring a Payload upload collection or debugging file handling — image sizes/crop/focal point, mime/file-size limits, storage adapters (R2/S3), static serving, or securing uploaded files."
atomPath: upload
coordinate: "upload · 5/round · 931fdd89"
contentUuid: "844cdb5b-3b3c-5dba-8875-d1b0d1eb9e35"
diamondUuid: "5d3af501-3e64-86d8-9611-03872ce8c4ca"
uuid: "931fdd89-3c22-87e5-b85e-71fdb6070296"
horo: 5
typography:
  partition: upload
  bondDegree: 32
standards: []
bindings: []
signatures:
  computationUuid: "df9379da-0789-804b-ab2c-6a44d04dd58c"
  stages:
    - stage: path
      stageUuid: "e30c7cf3-dc39-839e-b6ee-e0ee7164523a"
    - stage: trinity
      stageUuid: "de598762-1fc4-8ead-9de5-cf55fd28560e"
    - stage: boundary
      stageUuid: "0f1318ad-c689-86ce-8107-62fba65fcc8a"
    - stage: links
      stageUuid: "eb04a93b-d0a6-86bb-81c7-9bc194e86eb8"
    - stage: horo
      stageUuid: "7e877601-6167-8c76-b7b5-d7131a4ac862"
    - stage: seal
      stageUuid: "aad8904b-cb0a-86be-8ff1-f2400a2627b3"
    - stage: uuid
      stageUuid: "ac49a600-285e-819b-ac09-21b3b6643c6b"
version: 2
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
