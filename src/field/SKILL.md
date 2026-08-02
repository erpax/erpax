---
name: field
description: "Use when defining or debugging Payload fields — choosing a field type, shared field props (name, required, index, unique, defaultValue, validate, access, hooks, admin), relationships, arrays/blocks/groups/tabs, selects, or virtual/join fields."
atomPath: field
coordinate: "field · 7/descent · a4709d52"
contentUuid: "c05b064b-12d1-5fd0-b154-d48552c2045e"
diamondUuid: "0d7456e4-b559-8e18-85b7-b82fd45db02f"
uuid: "a4709d52-e6c1-8d5b-af9f-a9396203325b"
horo: 7
typography:
  partition: field
  bondDegree: 302
standards: []
bindings: []
signatures:
  computationUuid: "d6117fb4-ab44-8963-bb3f-f201e324d481"
  stages:
    - stage: path
      stageUuid: "62a5013e-7bfb-8ac6-bbf5-66bcfe0918da"
    - stage: trinity
      stageUuid: "9e78728c-da67-8ffe-af00-523d47b846ec"
    - stage: boundary
      stageUuid: "2521d28a-927d-8090-a1b1-d6192a4925ad"
    - stage: links
      stageUuid: "ed676071-a7e2-8331-9a20-1129d0a0ff15"
    - stage: horo
      stageUuid: "5f0337c6-1512-806c-ae4a-905fe4461054"
    - stage: seal
      stageUuid: "1c39c8dc-99be-8160-ac63-43b4d90e9196"
    - stage: uuid
      stageUuid: "11417683-e10c-89ac-bd03-a98485ae3332"
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
