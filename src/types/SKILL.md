---
name: types
description: "Use when working with Payload's generated TypeScript types — payload-types.ts, generate:types, GeneratedTypes, CollectionSlug, typing Local API results, or fixing stale-type errors after schema changes."
atomPath: types
coordinate: "types · 7/descent · 0d18c6fc"
contentUuid: "cd979a80-900e-5bd8-af5a-9dd314340c97"
diamondUuid: "04b589b7-b807-8d32-a800-8d67c0689772"
uuid: "0d18c6fc-79d2-8111-91d3-f408c6bdb839"
horo: 7
typography:
  partition: types
  bondDegree: 75
standards:
  - "CoE-108+"
  - "ECMA-262"
  - "IAS-2"
  - "IFRS-15"
  - "IFRS-16"
  - "ISA-95"
  - "ISO-17442"
  - "ISO-17442-1"
bindings: []
signatures:
  computationUuid: "8757056a-45e3-853e-b222-a9175b6a3a6e"
  stages:
    - stage: path
      stageUuid: "6fa22871-78bd-8867-abbf-e34b1beb9814"
    - stage: trinity
      stageUuid: "16bad5dd-dd65-85de-8404-167a2c89f514"
    - stage: boundary
      stageUuid: "b281ea17-83ed-8d77-8dab-014fd1ee237b"
    - stage: links
      stageUuid: "5222569e-395f-8d0e-b5f3-401487feba1e"
    - stage: horo
      stageUuid: "0a3441a4-be64-8ec6-aaae-31dbecb47334"
    - stage: seal
      stageUuid: "8b1698ad-2633-8ae8-8d17-2e8d968f2cf8"
    - stage: uuid
      stageUuid: "04388de2-f72a-8db5-8ee6-c276a7c07817"
version: 2
---
# types — Payload generated TypeScript

Payload generates `payload-types.ts` from the config (one interface per collection/global + union types like `CollectionSlug`). Regenerate after ANY schema change.

## Commands & config
| Item | Detail |
|---|---|
| `payload generate:types` | Regenerate `payload-types.ts`. No-op (early return) if output is byte-identical to existing. |
| `config.typescript.outputFile` | Where types are written. |
| `config.typescript.declare` | Adds `declare module 'payload' { interface GeneratedTypes }` so Local API is typed. |
| `payload generate:importmap` | Separate — regenerates admin component import map. |

## Using the types
```ts
import type { Invoice, CollectionSlug } from '@/payload-types'
const res = await payload.find({ collection: 'invoices' }) // res.docs: Invoice[]
```
Relationship fields are `string | RelatedDoc` depending on `depth` — guard before accessing populated props.

## Toolchain notes (this repo)
- Use **TypeScript 5.7.3** (matches Payload 4's validated toolchain; TS 6.0.3-beta crashes `tsc` and Payload's compile step). Keep `ignoreDeprecations` out — fix deprecated options instead.
- Standalone `tsc` may need `node --stack-size=4000 .../tsc.js` on huge configs (see recover).

## Common mistakes
- Editing `payload-types.ts` by hand (regenerated/overwritten).
- Stale types after adding/renaming collections → slug literals rejected (`TS2322`/`2345`) until you re-run `generate:types`.
- Accessing populated relationship props without checking `depth` (value may be just an ID string).

**Law — [[law]]: `payload-types.ts` is generated from the config, never hand-edited; regenerate after ANY [[schema]] change or the stale types are a [[gate]]-caught gap.**
