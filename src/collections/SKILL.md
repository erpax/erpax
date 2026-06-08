---
name: collections
description: "Use when defining or debugging a Payload Collection or Global config — slug, fields, admin options, access, hooks, auth, upload, versions/drafts, timestamps, labels, default sort, or registering it in the config."
atomPath: collections
coordinate: collections · 1/base · adadcd0e
contentUuid: "ca01cc8f-1650-5cbe-b5ff-f8dad06001a6"
diamondUuid: "4f02166b-61b8-891f-b211-63a271c0ffe0"
uuid: "adadcd0e-65bb-856a-95c3-52056965ff08"
horo: 1
bonds:
  in:
    - access
    - accounting
    - accounts
    - analytics
    - assets
    - auth
    - batches
    - chat
    - commitments
    - config
    - connections
    - dashboard
    - defence
    - definitions
    - diamond
    - education
    - endpoints
    - factory
    - fields
    - fractal
    - gap
    - health
    - hooks
    - identifier
    - justice
    - manufacturing
    - mcp
    - messages
    - optimize
    - packages
    - part
    - plugins
    - port
    - position
    - quotes
    - rates
    - receipts
    - recover
    - schema
    - sectors
    - segments
    - services
    - share
    - skills
    - sti
    - subscriptions
    - testing
    - torus
    - unavoidable
    - upload
    - versions
    - whole
  out:
    - access
    - accounting
    - accounts
    - analytics
    - assets
    - auth
    - batches
    - chat
    - commitments
    - config
    - connections
    - dashboard
    - defence
    - definitions
    - diamond
    - education
    - endpoints
    - factory
    - fields
    - fractal
    - gap
    - health
    - hooks
    - identifier
    - justice
    - manufacturing
    - mcp
    - messages
    - optimize
    - packages
    - part
    - plugins
    - port
    - position
    - quotes
    - rates
    - receipts
    - recover
    - schema
    - sectors
    - segments
    - services
    - share
    - skills
    - sti
    - subscriptions
    - testing
    - torus
    - unavoidable
    - upload
    - versions
    - whole
typography:
  partition: collections
  bondDegree: 163
  neighbors: []
standards:
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ISO/IEC-29119"
bindings: []
neighbors:
  wikilink:
    - access
    - auth
    - config
    - fields
    - hooks
    - optimize
    - recover
    - sti
    - upload
    - versions
  matrix:
    - access
    - accounting
    - accounts
    - analytics
    - assets
    - auth
    - batches
    - chat
    - commitments
    - config
    - connections
    - dashboard
    - defence
    - definitions
    - diamond
    - education
    - endpoints
    - factory
    - fields
    - fractal
    - gap
    - health
    - hooks
    - identifier
    - justice
    - manufacturing
    - mcp
    - messages
    - optimize
    - packages
    - part
    - plugins
    - port
    - position
    - quotes
    - rates
    - receipts
    - recover
    - schema
    - sectors
    - segments
    - services
    - share
    - skills
    - sti
    - subscriptions
    - testing
    - torus
    - unavoidable
    - upload
    - versions
    - whole
  backlinks:
    - access
    - accounting
    - accounts
    - analytics
    - assets
    - auth
    - batches
    - chat
    - commitments
    - config
    - connections
    - dashboard
    - defence
    - definitions
    - diamond
    - education
    - endpoints
    - factory
    - fields
    - fractal
    - gap
    - health
    - hooks
    - identifier
    - justice
    - manufacturing
    - mcp
    - messages
    - optimize
    - packages
    - part
    - plugins
    - port
    - position
    - quotes
    - rates
    - receipts
    - recover
    - schema
    - sectors
    - segments
    - services
    - share
    - skills
    - sti
    - subscriptions
    - testing
    - torus
    - unavoidable
    - upload
    - versions
    - whole
signatures:
  computationUuid: "00d3f599-9457-8794-9ee0-bbe11ed9c028"
  stages:
    - stage: path
      stageUuid: "3cb62e17-5652-85d0-86ad-85104eac1d76"
    - stage: trinity
      stageUuid: "c2f1e59a-1e0f-8479-b97d-6eeca1d5b8cf"
    - stage: boundary
      stageUuid: "57ec3f23-80c3-88bd-98dc-29c3ad422aac"
    - stage: links
      stageUuid: "eb55d21c-e8ad-82f8-9029-01dc90336900"
    - stage: horo
      stageUuid: "17d7e023-336f-8b57-ab1d-11b4a28b5d38"
    - stage: seal
      stageUuid: "2a734200-52c7-8150-a7c9-2780376d58bd"
    - stage: uuid
      stageUuid: "3497fb92-48a2-8423-8728-6978e65bed61"
version: 2
---
# collections — Collections & Globals (position 2 of the material cycle)

**Collection** = many documents of one schema; **Global** = one document. Both are field schemas with config around them. Register in `config.collections` / `config.globals` (see [[config]]).

## CollectionConfig
| Key | Purpose |
|---|---|
| `slug` * | Unique kebab-case id; relationships reference it via `relationTo`. THE connector. |
| `fields` * | Array of [[fields]]. |
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
