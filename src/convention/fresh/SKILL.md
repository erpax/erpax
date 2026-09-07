---
name: fresh
description: "Use when reasoning about stale references as entropy — an import whose target does not exist on disk is a dead wire that lowers tamper-cost; this scans every `@/` import across src/scripts/.vitepress and reports the live fraction that resolves to a real file."
atomPath: "convention/fresh"
coordinate: "convention/fresh · 2/share · c382a802"
contentUuid: "8053d5a2-3756-5264-82b6-e6fee678e46f"
diamondUuid: "9d58cf7b-05e2-8812-b91d-399fe948c4bd"
uuid: "c382a802-f5ba-87e7-a5f6-85a58993532d"
horo: 2
typography:
  partition: convention
  bondDegree: 23
standards:
  - "TypeScript module resolution (tsconfig `@/"
bindings: []
signatures:
  computationUuid: "9002db65-f37d-8e71-9a4a-586180ef9c2c"
  stages:
    - stage: path
      stageUuid: "102fb3c0-d0a4-8e13-bf98-c3ab5266f117"
    - stage: trinity
      stageUuid: "a42741ce-c1d8-8741-8845-0963be4601f2"
    - stage: boundary
      stageUuid: "bddc46d3-0765-87a4-9ef0-f347e253b389"
    - stage: links
      stageUuid: "fcaf6256-c50c-8604-a395-6f292d304aae"
    - stage: horo
      stageUuid: "d4370893-4b04-8ac4-b7b8-5b37281e2e38"
    - stage: seal
      stageUuid: "e86a184b-8460-8e6c-bd79-34edd4374715"
    - stage: uuid
      stageUuid: "5921286a-3eb4-81b5-a00e-db15a4b8bb52"
version: 2
---
# convention/fresh — no stale refs, every import target exists on disk

An `@/x` import is a **wire** from one atom to another. If the target does not exist on disk — a renamed atom, a deleted file, a typo, a generator template that emits an unresolvable path — the wire is **dead**: a *stale ref*. A stale ref is entropy that raises no tamper-[[cost]], and it is a latent break (the build, or the next reader, trips on it). So the convention is simple and absolute: **every import resolves to a real file.**

The CHECK scans every `@/` import across **src / scripts / .vitepress** (the same regex as [[tamper]]/import's `scanImports`, so the denominators agree) and asks of each target only one question — *does it exist?* `@/PATH` is fresh iff `src/PATH.{ts,tsx,mts,mjs,js,jsx}` exists, or `src/PATH/index.{…}` exists, or `src/PATH` is itself a file (exactly TypeScript's resolution; a bare directory with no index does **not** resolve). `coverage()` is the resolving fraction; `freshCostLog2` prices the gap via the one [[cost]] amplifier (`coverageCostLog2`). coverage = 1 ⟺ no stale refs ⟺ the import graph is fully grounded ⟺ zero stale-wire entropy ⇒ infinite tamper-cost.

## A different axis from import-purity

This is **not** [[convention/import]] / [[convention/shallow]] (`importPurity`). Those measure *purity* — an import must reach the atom's index (`@/x`), not a deep file (`@/x/y.ts`). Purity conflates "deep" with "missing": a deep-but-**existing** import is impure yet **fresh**, and a missing import lands in the same `false` bucket as a valid deep file. Freshness asks only *existence*, so no purity function computes it (`scanImports` returns only the non-index violations, discarding the fresh/stale distinction). The two laws are orthogonal — an atom can be 100% pure and still carry a stale ref, or fully fresh and still impure. `convention/fresh` closes the existence axis; `convention/import` closes the seal axis.

## Enforce, don't remediate

`staleRefs()` is the raise, run at the gate: a renamed or deleted atom that leaves a dangling `@/` import is a billed gap until the wire is reconnected or removed. An agent that imports a target that does not exist pays for the dead wire it left.

Matter-twin: `src/convention/fresh/index.ts` (`resolves` · `freshTally` · `staleRefs` · `coverage` · `freshCostLog2`). Composes [[cost]] (the coverage→cost amplifier); a sibling axis of [[tamper]]/import, [[convention/import]] and [[convention/link]] (link-resolution is the wikilink analogue of this import-resolution law); the dual of [[baked]] — fresh forbids TRUSTING a stale derived copy, [[baked]] forbids COMMITTING one (a baked artifact is gitignored yet must still resolve, regenerated at build from the one source).

**Law — [[law]]: no stale refs — every import target exists on disk. An `@/` import whose target is absent is a dead wire, a stale ref, entropy that lowers tamper-cost. coverage = (imports resolving to a real file) / (total `@/` imports); coverage → 1 ⟺ the import graph is fully grounded ⇒ tamper-cost → ∞.**

@audit imports + on-disk existence scanned LIVE from src/scripts/.vitepress; coverage = resolving/total, never hand-asserted
@standard TypeScript module resolution (tsconfig `@/*` → `./src/*`) — a specifier resolves to `PATH.{ext}` · `PATH/index.{ext}` · or a file at PATH
