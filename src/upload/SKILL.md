---
name: upload
description: "Use when configuring a Payload upload collection or debugging file handling — image sizes/crop/focal point, mime/file-size limits, storage adapters (R2/S3), static serving, or securing uploaded files."
atomPath: upload
coordinate: upload · 7/descent · 24e748bc
contentUuid: "f5b29c84-6b40-5653-aa0f-ad5ba37d1376"
diamondUuid: "a7c1be91-10a2-8735-a559-6b1bcddbf9df"
uuid: "24e748bc-8932-80fc-a9b1-d2cff21a463b"
horo: 7
bonds:
  in:
    - access
    - accounting
    - collections
    - config
    - deploy
    - harden
    - hooks
    - identity
    - media
  out:
    - access
    - accounting
    - collections
    - config
    - deploy
    - harden
    - hooks
    - identity
    - media
typography:
  partition: upload
  bondDegree: 29
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - config
    - deploy
    - harden
    - hooks
    - media
  matrix:
    - access
    - accounting
    - collections
    - config
    - deploy
    - harden
    - hooks
    - identity
    - media
  backlinks:
    - access
    - accounting
    - collections
    - config
    - deploy
    - harden
    - hooks
    - identity
    - media
signatures:
  computationUuid: "0a448376-39bc-88b5-8e97-a98ba06b23ca"
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
      stageUuid: "5fef0237-9914-8723-9bcd-e38416d0a482"
    - stage: seal
      stageUuid: "3d13ba76-8eb0-8b27-9bb0-4b8461dca164"
    - stage: uuid
      stageUuid: "995990af-45b3-831f-936d-b906b3330c78"
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
