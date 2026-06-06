---
name: fresh
description: Use when reasoning about stale references as entropy — an import whose target does not exist on disk is a dead wire that lowers tamper-cost; this scans every `@/` import across src/scripts/.vitepress and reports the live fraction that resolves to a real file.
---

# convention/fresh — no stale refs, every import target exists on disk

An `@/x` import is a **wire** from one atom to another. If the target does not exist on disk — a renamed atom, a deleted file, a typo, a generator template that emits an unresolvable path — the wire is **dead**: a *stale ref*. A stale ref is entropy that raises no tamper-[[cost]], and it is a latent break (the build, or the next reader, trips on it). So the convention is simple and absolute: **every import resolves to a real file.**

The CHECK scans every `@/` import across **src / scripts / .vitepress** (the same regex as [[tamper]]/import's `scanImports`, so the denominators agree) and asks of each target only one question — *does it exist?* `@/PATH` is fresh iff `src/PATH.{ts,tsx,mts,mjs,js,jsx}` exists, or `src/PATH/index.{…}` exists, or `src/PATH` is itself a file (exactly TypeScript's resolution; a bare directory with no index does **not** resolve). `coverage()` is the resolving fraction; `freshCostLog2` prices the gap via the one [[cost]] amplifier (`coverageCostLog2`). coverage = 1 ⟺ no stale refs ⟺ the import graph is fully grounded ⟺ zero stale-wire entropy ⇒ infinite tamper-cost.

## A different axis from import-purity

This is **not** [[convention/import]] / [[convention/shallow]] (`importPurity`). Those measure *purity* — an import must reach the atom's index (`@/x`), not a deep file (`@/x/y.ts`). Purity conflates "deep" with "missing": a deep-but-**existing** import is impure yet **fresh**, and a missing import lands in the same `false` bucket as a valid deep file. Freshness asks only *existence*, so no purity function computes it (`scanImports` returns only the non-index violations, discarding the fresh/stale distinction). The two laws are orthogonal — an atom can be 100% pure and still carry a stale ref, or fully fresh and still impure. `convention/fresh` closes the existence axis; `convention/import` closes the seal axis.

## Enforce, don't remediate

`staleRefs()` is the raise, run at the gate: a renamed or deleted atom that leaves a dangling `@/` import is a billed gap until the wire is reconnected or removed. An agent that imports a target that does not exist pays for the dead wire it left.

Matter-twin: `src/convention/fresh/index.ts` (`resolves` · `freshTally` · `staleRefs` · `coverage` · `freshCostLog2`). Composes [[cost]] (the coverage→cost amplifier); a sibling axis of [[tamper]]/import, [[convention/import]] and [[convention/link]] (link-resolution is the wikilink analogue of this import-resolution law).

**Law — [[law]]: no stale refs — every import target exists on disk. An `@/` import whose target is absent is a dead wire, a stale ref, entropy that lowers tamper-cost. coverage = (imports resolving to a real file) / (total `@/` imports); coverage → 1 ⟺ the import graph is fully grounded ⇒ tamper-cost → ∞.**

@audit imports + on-disk existence scanned LIVE from src/scripts/.vitepress; coverage = resolving/total, never hand-asserted
@standard TypeScript module resolution (tsconfig `@/*` → `./src/*`) — a specifier resolves to `PATH.{ext}` · `PATH/index.{ext}` · or a file at PATH
