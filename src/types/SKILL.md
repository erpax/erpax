---
name: types
description: "Use when working with Payload's generated TypeScript types — payload-types.ts, generate:types, GeneratedTypes, CollectionSlug, typing Local API results, or fixing stale-type errors after schema changes."
atomPath: types
coordinate: types · 1/base · 8b580573
contentUuid: "5ad3e808-0a81-5621-82b5-39c4fa72d382"
diamondUuid: "7d4c8e8a-c947-8097-b923-92c713c5f8fc"
uuid: "8b580573-a6fc-8cf7-bde1-c8f51e90beaf"
horo: 1
bonds:
  in:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  out:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
typography:
  partition: types
  bondDegree: 0
  neighbors: []
standards:
  - "CoE-108+"
  - "ECMA-262"
  - "IAS-2"
  - "IFRS-15"
  - "IFRS-16"
  - "ISA-95"
  - "ISO-17442-1"
  - "ISO-9362"
bindings: []
neighbors:
  wikilink:
    - gate
    - law
    - recover
    - schema
  matrix:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  backlinks:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
signatures:
  computationUuid: "673bcfc5-20d8-84e7-a8f0-2f7429066a65"
  stages:
    - stage: path
      stageUuid: "6fa22871-78bd-8867-abbf-e34b1beb9814"
    - stage: trinity
      stageUuid: "16bad5dd-dd65-85de-8404-167a2c89f514"
    - stage: boundary
      stageUuid: "51f6c844-0b0b-8a4b-b943-08933ae3a9b0"
    - stage: links
      stageUuid: "81e343c6-c75a-84dd-bed4-f72e36a1b834"
    - stage: horo
      stageUuid: "4d950f88-ebd1-86c3-a716-e5c2808820f5"
    - stage: seal
      stageUuid: "47ef39d7-1852-8737-a7bd-131ce52b40e5"
    - stage: uuid
      stageUuid: "a21e288d-857d-8de3-b236-4b730426c536"
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
