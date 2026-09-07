---
name: types
description: "Use when working with Payload's generated TypeScript types — payload-types.ts, generate:types, GeneratedTypes, CollectionSlug, typing Local API results, or fixing stale-type errors after schema changes."
atomPath: types
coordinate: "types · 1/base · 913f3882"
contentUuid: "2a30c310-7e60-5861-90a8-1db8ddf33d90"
diamondUuid: "80dc2ea1-b147-897e-b7cc-89ed0111e1ae"
uuid: "913f3882-f9d9-8892-beee-e2419988bc26"
horo: 1
typography:
  partition: types
  bondDegree: 85
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
  computationUuid: "fdc5d394-9a2a-8d4a-a6af-b4a878dbde96"
  stages:
    - stage: path
      stageUuid: "6fa22871-78bd-8867-abbf-e34b1beb9814"
    - stage: trinity
      stageUuid: "16bad5dd-dd65-85de-8404-167a2c89f514"
    - stage: boundary
      stageUuid: "b281ea17-83ed-8d77-8dab-014fd1ee237b"
    - stage: links
      stageUuid: "81e343c6-c75a-84dd-bed4-f72e36a1b834"
    - stage: horo
      stageUuid: "7ef09d6e-494c-8ee8-8130-809818ae080c"
    - stage: seal
      stageUuid: "8b1698ad-2633-8ae8-8d17-2e8d968f2cf8"
    - stage: uuid
      stageUuid: "3ceb54c6-5685-869c-a98c-e34c45bb646f"
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
- Standalone `tsc` may need `node --stack-size=4000 .../tsc.js` on huge configs (see [[recover]]).

## Common mistakes
- Editing `payload-types.ts` by hand (regenerated/overwritten).
- Stale types after adding/renaming collections → slug literals rejected (`TS2322`/`2345`) until you re-run `generate:types`.
- Accessing populated relationship props without checking `depth` (value may be just an ID string).

**Law — [[law]]: `payload-types.ts` is generated from the config, never hand-edited; regenerate after ANY [[schema]] change or the stale types are a [[gate]]-caught gap.**
