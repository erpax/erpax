---
name: field
description: "Use when defining or debugging Payload fields — choosing a field type, shared field props (name, required, index, unique, defaultValue, validate, access, hooks, admin), relationships, arrays/blocks/groups/tabs, selects, or virtual/join fields."
atomPath: field
coordinate: "field · 1/base · 5dde2bea"
contentUuid: "74e2956d-de7d-5fa5-bdb7-d32c045a3d40"
diamondUuid: "631a8257-a3a9-87e4-9602-39d57ef3493c"
uuid: "5dde2bea-e790-87ec-b94f-ead4989001e5"
horo: 1
typography:
  partition: field
  bondDegree: 358
standards: []
bindings: []
signatures:
  computationUuid: "10e19757-c743-8c11-ac07-15bcdb305dbb"
  stages:
    - stage: path
      stageUuid: "63942086-e203-880a-9c04-a767a049c834"
    - stage: trinity
      stageUuid: "dd2e6fd1-3085-870a-88a8-8c966d41814b"
    - stage: boundary
      stageUuid: "d46ffd4c-8984-8a7d-b5da-60a56c2e58b2"
    - stage: links
      stageUuid: "b60ade56-b0d6-8a76-92f5-773e54b48b17"
    - stage: horo
      stageUuid: "3e43eee2-7829-898a-aebc-9d5803647c66"
    - stage: seal
      stageUuid: "11d912a1-7f7c-8b03-96d7-3935b81a1c47"
    - stage: uuid
      stageUuid: "a567e1c4-064a-803e-853e-f885b3d3b585"
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
| Nested data | `array`, `blocks` (use top-level `blocks` + `blockReferences` to DRY — see [[optimize]]), `group` |
| Presentational (no data) | `row`, `collapsible`, `tabs`, `ui` |

Open/extensible attributes that don't merit a typed field → a `json` bag, the [[metadata]] pattern (but prefer a real field or a [[tags]] context first).

## Shared properties
| Prop | Purpose |
|---|---|
| `name` | Field key (data fields). Must be unique at its level (dup → `DuplicateFieldName`). |
| `required` / `unique` / `index` | Validation / uniqueness / DB index (index queried+sorted fields, see [[optimize]]). |
| `defaultValue` | Static value or `({ req }) => …`. |
| `validate` | Custom validation fn. |
| `hooks` | Field [[hooks]]: beforeValidate/beforeChange/afterChange/afterRead. |
| `access` | Field [[access]] (booleans only). |
| `admin` | `hidden`, `readOnly`, `position`, `description`, `condition`, `components`. |
| `localized` | Per-locale value (needs config localization). |
| `dbName` | Override DB column/enum name — use to avoid 63-char enum overflow on deeply-nested selects/groups (see [[database]]). |
| `hasMany` / `relationTo` | Relationship cardinality / target slug(s). |

## Common mistakes
- A field `type: 'object'` — NOT valid; use `group`. (Invalid types crash type-gen with undefined `flattenedFields`.)
- Two top-level fields with the same `name` → `DuplicateFieldName` (watch shared-field helpers + plugin-injected fields like `tenant`).
- Deeply-nested group/select producing a >63-char enum name → add `dbName` (see [[recover]],[[database]]).
- Inlining the same blocks in many collections instead of `blockReferences`.

**Law — [[law]]: a field defines the document schema and auto-generates the admin UI from one definition — every field has a `type`, data fields a `name` unique at their level; the schema and its UI never drift because they are the same source.**
