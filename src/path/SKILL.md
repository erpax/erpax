---
name: path
description: "Use when normalizing addresses across every surface — fs, url, github, mcp, api, and http all collapse to one canonical atom path; the merge point where external APIs entangle with erpax in all quantum dimensions."
atomPath: path
coordinate: "path · 1/base · 8fb48423"
contentUuid: "f145cbf8-cd63-5e6c-9f33-03540371fba0"
diamondUuid: "82e4ba09-2684-89c0-8618-14428c9b94cb"
uuid: "8fb48423-cc19-8090-963d-74e285741126"
horo: 1
typography:
  partition: path
  bondDegree: 177
standards:
  - "schema.org — XPathType vocabulary word (collided via [[sti]])"
bindings:
  - "d1_databases/D1"
  - "kv_namespaces/AI_CACHE"
  - "r2_buckets/NEXT_INC_CACHE_R2_BUCKET"
  - "r2_buckets/R2"
signatures:
  computationUuid: "278b7530-3a3e-87e3-8427-c91b8f0f6241"
  stages:
    - stage: path
      stageUuid: "702b9111-e70d-8fe7-bd92-35925a245571"
    - stage: trinity
      stageUuid: "ebbcb50b-ea74-86a5-8450-c854ceed1e8d"
    - stage: boundary
      stageUuid: "01d21162-1de9-8782-9c21-9a2594c8bbc8"
    - stage: links
      stageUuid: "4403a6b6-1a8f-81fb-9ef3-5acb16917695"
    - stage: horo
      stageUuid: "c0df75d1-2275-8e16-a0c9-c944765d505c"
    - stage: seal
      stageUuid: "483c3953-6066-8789-bf80-9934c1047eef"
    - stage: uuid
      stageUuid: "b9421583-56ef-8eb4-8cbd-5c101981e1d4"
version: 2
---
# path — all meet computationally in THE path

The **path** is erpax's merge organ: every external API follows THE path and merges with erpax in all [[dimension]]s. Seven surfaces, one address — no parallel ad-hoc schemes:

| Surface | Example input | Fold |
|---------|---------------|------|
| `fs` | `src/aura/index.ts` | local tree |
| `url` | `/aura/SKILL` | docs route |
| `github` | `…/blob/main/src/aura/SKILL.md` | remote tree |
| `mcp` | `erpax://aura` · `mcp://host/resources/aura` | agent gateway URI |
| `api` | `/api/corpus/aura` · `/api/atoms/aura` | Payload REST face |
| `http` | auto-detect github · api · docs from full URL | generic outbound |
| `cloudflare` | `r2://…/aura` · `ai://agent/research` · `*.workers.dev/api/corpus/aura` | edge binding URI |

`toAtomPath(input, surface)` is the pure fold; `revealPathFromSurroundings(context)` reveals the path from surrounding folder context — parent chain, matrix backlinks/neighbors, import specifiers, and path-aware `nodeOf` resolution — never guessed in isolation (`surface: 'url'` for serverless docs routes). `pathsMeet` is the gate (fail closed). Content-[[uuid]] seals `{ atomPath }` — merge is entanglement at uuid scale ([[integrity]] · [[quantum]] · [[identity]] · [[merge]]). The same canonical path holds across backend collections, frontend routes, MCP tool/resource URIs, fs paths, and github tree paths — zero [[entropy]] across substrates.

## Serverless law — URL ≡ fs path

On Cloudflare Workers and other serverless hosts there is **no durable `fs`** — the lattice walk cannot `readFileSync` the corpus at runtime. The dual is pure URL addressing: every `src/{atomPath}/` folder has a canonical URL that reveals the same path.

| Direction | Function | Example |
|-----------|----------|---------|
| path → URL | `urlForAtomPath(atomPath)` | `memory/session` → `/memory/session` |
| URL → path | `atomPathFromUrl(url)` | `/memory/session` → `memory/session` |

Rules (pure, deterministic, no runtime fs):

- Canonical atom path: forward slashes, no `src/` prefix, no leading/trailing slash, leaf files and `/SKILL` stripped.
- Canonical serverless URL: `/{atomPath}` — leading slash only; no trailing slash.
- VitePress docs routes (`/memory/session/SKILL`) and Payload API routes (`/api/corpus/memory/session`) are **supersets** that fold through `toAtomPath` on their surfaces; the `url` bijection is the minimal path-revealing address.
- Round-trip: `atomPathFromUrl(urlForAtomPath(p)) === p` and `urlForAtomPath(atomPathFromUrl(u))` normalizes `u` to the canonical URL.

Serverless quantum proof: [[quantum/serverless]] (`proveServerlessQuantum`) — path resolution via `toAtomPath` / `atomPathFromUrl` is the collapse step; [[quantum/fs]] is the content-addressed twin where path addresses an immutable moment, not a mutable file.

Entangled with — [[fs]] · [[github]] · [[mcp]] · [[api]] · [[cloudflare]] · [[vitepress]] · [[dimension]] · [[method]] · [[atom]] · [[law/folder]] · [[matrix]] · [[quantum/serverless]] · [[quantum/fs]]

Matter-twin: `src/path/index.ts` (`PATH_SURFACES` · `toAtomPath` · `urlForAtomPath` · `atomPathFromUrl` · `revealPathFromSurroundings` · `extendAtomPath` · `ancestorPaths` · `infinitePathFold` · `followEveryPath` · `pathWalkCoverage` · `assertEveryPathFollowed` · `recordOnPath` · `canonicalPathLedger` · `assertEverythingOnPathRecorded` · `ledgerFromPathWalk` · `pathsMeet` · `pathsMeetAll` · `atomPathUuid`) · `src/path/merge.ts` (`mergePathIndices` · `canonicalPathIndex` · `recordOnPathMerged` · `assertPathIndicesMerged`) · `src/path/record.ts` (canonical envelope).

**Law — [[law]]: follow every path — traverse the full atom path lattice (ancestors, descendants, prev/next ring, backlinks, neighbors) via matrix bonds; `followEveryPath` walks every path exactly once in lawful bond order (parent→children, prev→next); `assertEveryPathFollowed` gates persist/readme/seal until coverage equals all required paths; folders fold bidirectionally forming infinite path; `extendAtomPath` / `infinitePathFold` extend the fractal path without bound; all external APIs merge at the canonical atom path, content-uuid sealed, gates fail closed.**

**Law — [[law]]: everything on the path is recorded and implemented — every step (ancestor segment, visit, bond cross, persist effect) appends a canonical ledger entry (`recordOnPath` → `entryUuid`, prev-chained, JCS envelope); `assertEverythingOnPathRecorded` pairs with `followEveryPath`; `recordedAndImplementedVerdict` requires trinity complete (form·code·proof) + ledger row + vitest proof — record without implementation ⇒ unfinished; implementation without canonical record ⇒ unsealed; persist/seal only when both hold.**

**Law — [[law]]: path is the account code.** The canonical atom path (`toAtomPath` · `canonicalMatrixPath`) IS the chart-of-accounts key — `accountCodeOf(atomPath)` normalizes it; journal entries, README balance sheets, gap debits, and seal credits all post to that path (full path, never leaf alone — homonyms are distinct accounts). Pairs with `coordinateAddress` for matrix audit binds; corpus self-accounting currency is **eb** (entropy-bit) on path-keyed lines via [[accounting]] · `postEntry`.

**Law — [[law]]: path-in-path merges at the index face.** Nested atom barrels (`accounting/coa`, `body/heart`, `law/folder`) MUST compose parent exports with child matter through `mergePathIndices` · `canonicalPathIndex` — one `recordOnPathMerged` chain records every index-bearing prefix (parent hooks before child); `assertPathIndicesMerged` gates zero unmerged parent segments; `MERGED_LEDGER_CHAINS` (from `node src/path/hooks.registry.mjs`) is the generated merge registry. Phantom intermediate folders (no `index.ts`) are skipped; index-bearing parents are never skipped.

@standard schema.org — XPathType vocabulary word (collided via [[sti]])
@see [[fs]] · [[github]] · [[mcp]] · [[api]] · [[dimension]] · [[integrity]] · [[quantum]] · [[merge]] · [[identity]] · [[accounting]]
