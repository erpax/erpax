---
name: upload
description: "Use when configuring a Payload upload collection or debugging file handling — image sizes/crop/focal point, mime/file-size limits, storage adapters (R2/S3), static serving, or securing uploaded files."
atomPath: upload
coordinate: "upload · 5/round · 87bb991f"
contentUuid: "803881f2-5ce0-5ba2-91e1-4d34c7f62c65"
diamondUuid: "04e14ab0-2193-88e4-a3ec-7913d29fb029"
uuid: "87bb991f-7976-897c-8b4f-52bba48d1831"
horo: 5
typography:
  partition: upload
  bondDegree: 32
standards: []
bindings: []
signatures:
  computationUuid: "2940bbbe-57bc-8db7-83d0-db7b740ef16d"
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
      stageUuid: "5ea460e8-e151-8c83-8673-b8c50018e6bd"
    - stage: seal
      stageUuid: "aad8904b-cb0a-86be-8ff1-f2400a2627b3"
    - stage: uuid
      stageUuid: "1fb79126-077a-80c9-864b-4870e7fcec12"
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
