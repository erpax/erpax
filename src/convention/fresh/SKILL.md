---
name: fresh
description: "Use when reasoning about stale references as entropy — an import whose target does not exist on disk is a dead wire that lowers tamper-cost; this scans every `@/` import across src/scripts/.vitepress and reports the live fraction that resolves to a real file."
atomPath: convention/fresh
coordinate: convention/fresh · 5/round · cb062ec4
contentUuid: "29b4a4d2-9414-565e-a35c-dfc1061b48b4"
diamondUuid: "99285a10-b45f-8a03-af39-5f89948d6e42"
uuid: "cb062ec4-bfa1-88ed-bf87-bc6d270d65ed"
horo: 5
bonds:
  in:
    - baked
    - convention
  out:
    - baked
typography:
  partition: convention
  bondDegree: 11
  neighbors:
    - tamper/import
standards:
  - "TypeScript module resolution (tsconfig `@/"
  - "imports + existence scanned LIVE from src/scripts/.vitepress; coverage never hand-asserted"
  - "imports + on-disk existence scanned LIVE from src/scripts/.vitepress; coverage = resolving/total, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - baked
    - cost
    - import
    - law
    - link
    - shallow
    - tamper
  matrix:
    - baked
  backlinks:
    - baked
signatures:
  computationUuid: "e1e4dfae-6750-8212-b6a4-ce2d7a0858b6"
  stages:
    - stage: path
      stageUuid: "102fb3c0-d0a4-8e13-bf98-c3ab5266f117"
    - stage: trinity
      stageUuid: "a42741ce-c1d8-8741-8845-0963be4601f2"
    - stage: boundary
      stageUuid: "bddc46d3-0765-87a4-9ef0-f347e253b389"
    - stage: links
      stageUuid: "f1360c9e-4ecc-82d7-a420-5a3708ff0b2b"
    - stage: horo
      stageUuid: "34773975-cc76-8e2d-b238-c8596598a0d2"
    - stage: seal
      stageUuid: "80291566-8584-8b8c-9847-5cc952e9c605"
    - stage: uuid
      stageUuid: "014df213-c784-81b6-bc48-1211e51ddbd8"
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
