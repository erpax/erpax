---
name: upload
description: "Use when configuring a Payload upload collection or debugging file handling — image sizes/crop/focal point, mime/file-size limits, storage adapters (R2/S3), static serving, or securing uploaded files."
atomPath: upload
coordinate: "upload · 2/share · cf077a7f"
contentUuid: "f2c0ef20-c0b7-5cc4-81eb-c51fe1ee3a0a"
diamondUuid: "a5e1ab40-eef5-83db-83c9-50c5a2d9180d"
uuid: "cf077a7f-c0c3-8827-a165-698a0187ca05"
horo: 2
typography:
  partition: upload
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "88751e68-d743-844f-96a7-4d701894ffcb"
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
      stageUuid: "ce8c18ae-59b7-8a4c-97fc-823453b69b8d"
    - stage: seal
      stageUuid: "aad8904b-cb0a-86be-8ff1-f2400a2627b3"
    - stage: uuid
      stageUuid: "38eb8278-4871-87b5-8751-24afc0eac5dc"
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
