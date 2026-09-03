---
name: derive
description: "Use when deriving a content-addressed diamond for a Cloudflare binding — the build-time half that scans src/, kept off the Worker face so a runtime call does not pay for it."
atomPath: cloudflare/derive
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
