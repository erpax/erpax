---
name: field
description: "Use when defining or debugging Payload fields — choosing a field type, shared field props (name, required, index, unique, defaultValue, validate, access, hooks, admin), relationships, arrays/blocks/groups/tabs, selects, or virtual/join fields."
atomPath: field
coordinate: "field · 8/crest · dce1e551"
contentUuid: "8b90d5ab-a06e-534e-acc4-2086476f4b5e"
diamondUuid: "8599658c-d515-8cdf-9a64-c2a974078760"
uuid: "dce1e551-dcc6-8e6c-aa1b-3903d34ead9f"
horo: 8
typography:
  partition: field
  bondDegree: 243
standards: []
bindings: []
signatures:
  computationUuid: "f7379c71-0696-859d-a53f-e78432697c06"
  stages:
    - stage: path
      stageUuid: "63942086-e203-880a-9c04-a767a049c834"
    - stage: trinity
      stageUuid: "2384fec7-eb8f-8c3b-9e09-61cd6194cde7"
    - stage: boundary
      stageUuid: "571d4cf3-7fe3-8d21-9c63-ffecb9dee3da"
    - stage: links
      stageUuid: "fe8c2a86-6663-8fe2-8db7-d4f96b04827f"
    - stage: horo
      stageUuid: "85f1bc81-20c2-8a09-8ff2-8dc1b21efbf8"
    - stage: seal
      stageUuid: "56a4ccd0-145b-899a-bae3-f865ce518edf"
    - stage: uuid
      stageUuid: "3f7dc722-de26-860f-9160-37ce7bfb4c1d"
version: 2
---
# fields — Payload field building blocks (position 1, start of the material cycle)

Fields define the document schema and auto-generate the admin UI. Every field has `type`; data fields also have `name`.

## Field types
| Category | Types |
|---|---|
| Scalar | `text` `textarea` `number` `email` `code` `json` `date` `point` `checkbox` `radio` `select` |
| Rich | `richText` (lexical) |
| Relational | `relationship` (`relationTo`, `hasMany`), `upload`, `join` (virtual reverse-relationship: `collection` + `on`) |
| Nested data | `array`, `blocks` (use top-level `blocks` + `blockReferences` to DRY — see optimize), `group` |
| Presentational (no data) | `row`, `collapsible`, `tabs`, `ui` |

Open/extensible attributes that don't merit a typed field → a `json` bag, the metadata pattern (but prefer a real field or a [[tags]] context first).

## Shared properties
| Prop | Purpose |
|---|---|
| `name` | Field key (data fields). Must be unique at its level (dup → `DuplicateFieldName`). |
| `required` / `unique` / `index` | Validation / uniqueness / DB index (index queried+sorted fields, see optimize). |
| `defaultValue` | Static value or `({ req }) => …`. |
| `validate` | Custom validation fn. |
| `hooks` | Field [[hooks]]: beforeValidate/beforeChange/afterChange/afterRead. |
| `access` | Field [[access]] (booleans only). |
| `admin` | `hidden`, `readOnly`, `position`, `description`, `condition`, `components`. |
| `localized` | Per-locale value (needs config localization). |
| `dbName` | Override DB column/enum name — use to avoid 63-char enum overflow on deeply-nested selects/groups (see database). |
| `hasMany` / `relationTo` | Relationship cardinality / target slug(s). |

## Common mistakes
- A field `type: 'object'` — NOT valid; use `group`. (Invalid types crash type-gen with undefined `flattenedFields`.)
- Two top-level fields with the same `name` → `DuplicateFieldName` (watch shared-field helpers + plugin-injected fields like `tenant`).
- Deeply-nested group/select producing a >63-char enum name → add `dbName` (see recover,database).
- Inlining the same blocks in many collections instead of `blockReferences`.

**Law — [[law]]: a field defines the document schema and auto-generates the admin UI from one definition — every field has a `type`, data fields a `name` unique at their level; the schema and its UI never drift because they are the same source.**
