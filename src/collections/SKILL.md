---
name: collections
description: "Use when defining or debugging a Payload Collection or Global config — slug, fields, admin options, access, hooks, auth, upload, versions/drafts, timestamps, labels, default sort, or registering it in the config."
atomPath: collections
coordinate: "collections · 2/share · 80e96d25"
contentUuid: "b44de3c8-6905-5bcd-ade1-a8d2ad80cd97"
diamondUuid: "00b3eb7e-3cdf-8ba8-ab37-365b306650a4"
uuid: "80e96d25-387c-8c01-af88-88b7e21be0ee"
horo: 2
typography:
  partition: collections
  bondDegree: 153
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "59dcb364-37b3-81c1-b910-6b322175e2d8"
  stages:
    - stage: path
      stageUuid: "3cb62e17-5652-85d0-86ad-85104eac1d76"
    - stage: trinity
      stageUuid: "c2f1e59a-1e0f-8479-b97d-6eeca1d5b8cf"
    - stage: boundary
      stageUuid: "a77d847b-36eb-8728-b01b-3af28cb3acaa"
    - stage: links
      stageUuid: "eb55d21c-e8ad-82f8-9029-01dc90336900"
    - stage: horo
      stageUuid: "9906c277-973d-823a-870c-2f412cf9b8bd"
    - stage: seal
      stageUuid: "2496d1b0-3e92-88d7-b085-2491c6527c06"
    - stage: uuid
      stageUuid: "7c02cafe-47cd-8c5f-ad65-dbf1fcd5edda"
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
