---
name: collections
description: "Use when defining or debugging a Payload Collection or Global config — slug, fields, admin options, access, hooks, auth, upload, versions/drafts, timestamps, labels, default sort, or registering it in the config."
atomPath: collections
coordinate: "collections · 7/descent · 6a82db0b"
contentUuid: "0a109372-4866-5009-973a-21a2f4e93e18"
diamondUuid: "dcaf47ce-bca3-8742-b44a-bc40143f2c17"
uuid: "6a82db0b-0a4d-8500-9caf-07e15d84fcd8"
horo: 7
typography:
  partition: collections
  bondDegree: 147
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "8cebbb34-71b5-8a50-ab2f-9494896dfdac"
  stages:
    - stage: path
      stageUuid: "3cb62e17-5652-85d0-86ad-85104eac1d76"
    - stage: trinity
      stageUuid: "c2f1e59a-1e0f-8479-b97d-6eeca1d5b8cf"
    - stage: boundary
      stageUuid: "a77d847b-36eb-8728-b01b-3af28cb3acaa"
    - stage: links
      stageUuid: "c3226bd6-c25f-8c41-8453-9104beea033e"
    - stage: horo
      stageUuid: "4c7d0d90-5d9c-8cc2-bb8e-90b5eea4f115"
    - stage: seal
      stageUuid: "2496d1b0-3e92-88d7-b085-2491c6527c06"
    - stage: uuid
      stageUuid: "8d48349a-5913-8ed5-b6b5-d857bfbac94e"
version: 2
---
# collections — Collections & Globals (position 2 of the material cycle)

**Collection** = many documents of one schema; **Global** = one document. Both are field schemas with config around them. Register in `config.collections` / `config.globals` (see [[config]]).

## CollectionConfig
| Key | Purpose |
|---|---|
| `slug` * | Unique kebab-case id; relationships reference it via `relationTo`. THE connector. |
| `fields` * | Array of [[field]]. |
| `admin` | `useAsTitle`, `defaultColumns`, `group`, `hidden`, `listSearchableFields`, `pagination`, `components`, `livePreview`. |
| `access` | create/read/update/delete/readVersions/unlock (see [[access]]). |
| `hooks` | Lifecycle [[hooks]]. |
| `auth` | Enable authentication (see [[auth]]). |
| `upload` | Make it an upload collection (see [[upload]]). |
| `versions` | `{ drafts, maxPerDoc }` — drafts/autosave/history (see [[versions]]). |
| `timestamps` | createdAt/updatedAt (default true). |
| `labels` | `{ singular, plural }`. |
| `defaultSort` | Default sort field. |
| `dbName` | Override table name (avoid long-name DB errors). |
| `defaultPopulate` | Limit relationship population (see [[optimize]]). |

## GlobalConfig
`slug`, `fields`, `access`, `hooks`, `admin`, `versions`, `dbName`.

## Subtypes (one table, many behaviors)
When a collection holds several behavioral subtypes (invoice↔bill↔credit_note, payment/party kinds), use a flat `type` discriminator on ONE collection — see [[sti]] — not N near-duplicate collections.

## Export convention (this repo)
Collections export a **named const** (`export const Posts: CollectionConfig`); the barrel `collections/index.ts` re-exports them. Keep `export { X }` and `export { default as X }` aligned with each file's actual export (mismatch → ESM "no default export"; see [[recover]]).

## Common mistakes
- Duplicate `slug` across two files → `DuplicateCollection`.
- A collection in `config.collections` AND provided by a plugin (e.g. `addresses` from ecommerce) → duplicate.
- Listing a collection in a plugin (multi-tenant) but not registering it in `config.collections` → "missing collections" warning.
