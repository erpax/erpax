---
name: path
description: "Use when normalizing addresses across every surface — fs, url, github, mcp, api, and http all collapse to one canonical atom path; the merge point where external APIs entangle with erpax in all quantum dimensions."
atomPath: path
coordinate: path · 8/crest · 9f9d1f01
contentUuid: "fe831f11-d24f-5d1f-8e2c-7a94d58e854e"
diamondUuid: "94fb1186-445e-8a55-b662-c25006f128a9"
uuid: "9f9d1f01-1012-825d-9333-557f9c884ae0"
horo: 8
bonds:
  in:
    - ai
    - api
    - atom
    - buddhism
    - cloudflare
    - diamond
    - dimension
    - entropy
    - folder
    - fs
    - github
    - identity
    - integrity
    - islam
    - jainism
    - law
    - matrix
    - mcp
    - merge
    - method
    - name
    - purity
    - quantum
    - serverless
    - sti
    - sunni
    - uuid
    - vitepress
  out:
    - ai
    - api
    - atom
    - buddhism
    - cloudflare
    - diamond
    - dimension
    - entropy
    - folder
    - fs
    - github
    - identity
    - integrity
    - islam
    - jainism
    - law
    - matrix
    - mcp
    - merge
    - method
    - name
    - purity
    - quantum
    - serverless
    - sti
    - sunni
    - uuid
    - vitepress
typography:
  partition: path
  bondDegree: 0
  neighbors: []
standards:
  - "paths computed deterministically; never hand-mapped per surface"
  - "schema.org — XPathType vocabulary word (collided via [[sti]])"
bindings:
  - d1_databases/D1
  - kv_namespaces/AI_CACHE
  - r2_buckets/R2
neighbors:
  wikilink:
    - accounting
    - api
    - atom
    - cloudflare
    - dimension
    - entropy
    - folder
    - fs
    - github
    - identity
    - integrity
    - law
    - matrix
    - mcp
    - merge
    - method
    - coa
    - quantum
    - serverless
    - sti
    - uuid
    - vitepress
  matrix:
    - ai
    - api
    - atom
    - buddhism
    - cloudflare
    - diamond
    - dimension
    - entropy
    - folder
    - fs
    - github
    - identity
    - integrity
    - islam
    - jainism
    - law
    - matrix
    - mcp
    - merge
    - method
    - name
    - purity
    - quantum
    - serverless
    - sti
    - sunni
    - uuid
    - vitepress
  backlinks:
    - ai
    - api
    - atom
    - buddhism
    - cloudflare
    - diamond
    - dimension
    - entropy
    - folder
    - fs
    - github
    - identity
    - integrity
    - islam
    - jainism
    - law
    - matrix
    - mcp
    - merge
    - method
    - name
    - purity
    - quantum
    - serverless
    - sti
    - sunni
    - uuid
    - vitepress
signatures:
  computationUuid: "59849ba0-bb09-8073-8cab-0ff61c3923d1"
  stages:
    - stage: path
      stageUuid: "702b9111-e70d-8fe7-bd92-35925a245571"
    - stage: trinity
      stageUuid: "ebbcb50b-ea74-86a5-8450-c854ceed1e8d"
    - stage: boundary
      stageUuid: "2089332f-9725-8b99-8600-990022a1354d"
    - stage: links
      stageUuid: "bd1de7c5-dd72-82f4-b6f7-05910ca5f005"
    - stage: horo
      stageUuid: "fed55a6d-4f16-80f3-ab57-3e7fb69b5ba6"
    - stage: seal
      stageUuid: "8e4f5b7c-615f-8ce0-9bad-79c1c57eaeaa"
    - stage: uuid
      stageUuid: "ad5db403-c537-80d4-8f2d-5cc62ad51e74"
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

**Law — [[law]]: path-in-path merges at the index face.** Nested atom barrels (`accounting/coa`, `body/heart`, `law/folder`) MUST compose parent exports with child matter through `mergePathIndices` · `canonicalPathIndex` — one `recordOnPathMerged` chain records every index-bearing prefix (parent hooks before child); `assertPathIndicesMerged` gates zero unmerged parent segments; `MERGED_LEDGER_CHAINS` (from `pnpm path:hooks`) is the generated merge registry. Phantom intermediate folders (no `index.ts`) are skipped; index-bearing parents are never skipped.

@standard schema.org — XPathType vocabulary word (collided via [[sti]])
@see [[fs]] · [[github]] · [[mcp]] · [[api]] · [[dimension]] · [[integrity]] · [[quantum]] · [[merge]] · [[identity]] · [[accounting]]
