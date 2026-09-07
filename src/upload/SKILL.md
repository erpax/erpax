---
name: upload
description: "Use when configuring a Payload upload collection or debugging file handling — image sizes/crop/focal point, mime/file-size limits, storage adapters (R2/S3), static serving, or securing uploaded files."
atomPath: upload
coordinate: "upload · 8/crest · 2ec53e38"
contentUuid: "e11bc22e-4098-5fe3-8607-8032e22351fe"
diamondUuid: "22ab8adc-0302-8809-97aa-5203dea6cc3b"
uuid: "2ec53e38-7ff9-8f3a-afde-680e2fca9ca7"
horo: 8
typography:
  partition: upload
  bondDegree: 32
standards: []
bindings: []
signatures:
  computationUuid: "4187a393-e9cb-8807-b140-a5c4f8286579"
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
      stageUuid: "bbfd5cc3-3fd5-8d28-9b6d-36c03e388d36"
    - stage: seal
      stageUuid: "aad8904b-cb0a-86be-8ff1-f2400a2627b3"
    - stage: uuid
      stageUuid: "d49dfe8f-da7d-824d-a84c-ef3ab55e79b1"
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
