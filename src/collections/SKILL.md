---
name: collections
description: "Use when defining or debugging a Payload Collection or Global config — slug, fields, admin options, access, hooks, auth, upload, versions/drafts, timestamps, labels, default sort, or registering it in the config."
atomPath: collections
coordinate: "collections · 7/descent · 281fbde4"
contentUuid: "66e149e0-ff23-5b73-83ef-97cec9623930"
diamondUuid: "3b86f2aa-1c02-80e0-82f1-822be5a66982"
uuid: "281fbde4-eee1-8dbb-830d-7f12400d7ad3"
horo: 7
typography:
  partition: collections
  bondDegree: 163
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "ecbedc09-699a-884e-8375-4ee5c2340499"
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
      stageUuid: "4515ffbe-170e-8f05-9d13-9fe259bdebe5"
    - stage: seal
      stageUuid: "2496d1b0-3e92-88d7-b085-2491c6527c06"
    - stage: uuid
      stageUuid: "4b4fe835-1617-82aa-94d2-ede3f782d4cc"
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
