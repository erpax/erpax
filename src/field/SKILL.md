---
name: field
description: "Use when defining or debugging Payload fields — choosing a field type, shared field props (name, required, index, unique, defaultValue, validate, access, hooks, admin), relationships, arrays/blocks/groups/tabs, selects, or virtual/join fields."
atomPath: field
coordinate: "field · 4/weave · 0893b414"
contentUuid: "3aedd021-fde8-572b-ba91-c0c3bd3b0770"
diamondUuid: "0f32e66e-cf95-8967-95f1-5a58fa7e1110"
uuid: "0893b414-e3bd-8780-b6c4-92f0c92e83a0"
horo: 4
typography:
  partition: field
  bondDegree: 358
standards: []
bindings: []
signatures:
  computationUuid: "63c90b81-f1e5-8b0f-9b71-1a33322ee051"
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
      stageUuid: "e489f0b0-defa-8202-a969-f5806090ec44"
    - stage: seal
      stageUuid: "11d912a1-7f7c-8b03-96d7-3935b81a1c47"
    - stage: uuid
      stageUuid: "2b2ab544-4d12-869b-8857-2164374ba8f9"
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
