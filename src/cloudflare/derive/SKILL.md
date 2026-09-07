---
name: derive
description: "Use when deriving a content-addressed diamond for a Cloudflare binding — the build-time half that scans src/, kept off the Worker face so a runtime call does not pay for it."
atomPath: "cloudflare/derive"
coordinate: "cloudflare/derive · 2/share · 10e4a9da"
contentUuid: "f5ee3ef5-59c7-57cb-bf97-129cf96bbb75"
diamondUuid: "77fb99ab-540f-8e60-8c4a-b8098bd25cf6"
uuid: "10e4a9da-623b-8216-ac9b-c3343f7f4633"
horo: 2
typography:
  partition: cloudflare
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "9820a642-3237-802c-976a-024216d7ace2"
  stages:
    - stage: path
      stageUuid: "8dd36ea6-d2cc-849c-a623-2946990e1d8d"
    - stage: trinity
      stageUuid: "65045806-6f2d-81c6-8292-3e443bb33710"
    - stage: boundary
      stageUuid: "c3c33dec-1af2-81a6-b9e8-c37ee3dfb806"
    - stage: links
      stageUuid: "33a7fd1c-9118-84b6-a036-7654351e1c1b"
    - stage: horo
      stageUuid: "60f22894-d781-851d-8bdb-19aadb4c8f98"
    - stage: seal
      stageUuid: "1668b9ad-0733-87c3-8d30-3829e63aa679"
    - stage: uuid
      stageUuid: "bcfd3c24-e1de-8645-9752-20c6d1c4c5ee"
version: 2
---
# cloudflare/derive — the half a Worker cannot run, and used to pay for anyway

These functions derive a diamond for a Cloudflare binding. To do it they call `computeDiamond`, which reads `src/` from disk — build-time work, in a package whose target runtime has no filesystem.

They lived one **value import** away from the runtime surface, in `../bindings`, and the whole barrel paid for it. Measured with esbuild over the published closure:

| entry | cost |
| --- | ---: |
| `@/cloudflare/constants` alone | 0 KB · 1 atom |
| `kvGet · kvPut · r2Get · r2Put` | **5,836 KB · 73 atoms** |

One edge did it — `bindings.ts → @/diamond → @/readme/compute → @/rules` — dragging the entire gate registry, 58 `node:fs` imports and a TypeScript compiler behind the simplest call in the package. `wrangler.ts` and `ai.ts` were the same shape, each holding a value import for a CLI block or one derivation.

After the cut, `@erpax/cloudflare` is **17 atoms** instead of 73, and its face offers only what a Worker can execute.

## The type/value distinction is the whole mechanism

`../bindings`, `../wrangler` and `../ai` still speak in `DiamondModel` — as a **type**. TypeScript erases it, so it costs a consumer nothing. What cost 5.8 MB was `computeDiamond`, `deploymentFaces` and `diamondUuid` as **values**, which is the same lesson [[rules]]/cycle paid for measuring import edges: `import { type A }` is not an edge, and a regex cannot tell the difference.

**Honest boundary.** This cut the corpus-scanning half out of the runtime face; it did not make the package small. 4.2 MB of what remains is `uuid/matrix/generated.ts`, pulled in through `@/path`'s barrel — a deeper edge in the corpus's most central atom, and a separate decision.

Composes: [[cloudflare]] · [[diamond]] · [[rules]]/cycle.
