---
name: derive
description: "Use when deriving a content-addressed diamond for a Cloudflare binding — the build-time half that scans src/, kept off the Worker face so a runtime call does not pay for it."
atomPath: "cloudflare/derive"
coordinate: "cloudflare/derive · 2/share · 73786f61"
contentUuid: "15ee7871-20ec-5f2b-ae24-b8c163af0cd8"
diamondUuid: "d2be8444-c3af-8e99-a58d-27d6df4d75f7"
uuid: "73786f61-ef75-8e01-8335-77459f11e8df"
horo: 2
typography:
  partition: cloudflare
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "5a72f47d-538b-8656-8481-4c0ea7df3e94"
  stages:
    - stage: path
      stageUuid: "8dd36ea6-d2cc-849c-a623-2946990e1d8d"
    - stage: trinity
      stageUuid: "65045806-6f2d-81c6-8292-3e443bb33710"
    - stage: boundary
      stageUuid: "902aa905-844e-8fc8-9933-3ef535e56261"
    - stage: links
      stageUuid: "33a7fd1c-9118-84b6-a036-7654351e1c1b"
    - stage: horo
      stageUuid: "5e212935-bfd0-8a57-a4d2-8c985b8b1d51"
    - stage: seal
      stageUuid: "8fc939e5-b9b7-8704-bfcb-ada822a8b32e"
    - stage: uuid
      stageUuid: "ee00da82-5615-8d31-bfd0-5946d1707ce9"
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
