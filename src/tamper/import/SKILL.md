---
name: import
description: "Use when reasoning about import discipline as a security property — anything importing not from an atom's index is a deep coupling past the seal, a measurable gap that lowers tamper-cost; this finds the violations and prices them."
atomPath: tamper/import
coordinate: tamper/import · 4/weave · 665073c4
contentUuid: "3fb3c05a-8461-5aca-adce-ce2f18e5e865"
diamondUuid: "968634f3-3ea9-85fc-bf3b-15dbff62aa1e"
uuid: "665073c4-de18-8b5c-9cb4-6ee30fa475df"
horo: 4
bonds:
  in:
    - cost
    - exported
    - import
    - law
    - lawful
    - method
    - tamper
  out:
    - cost
    - exported
    - import
    - law
    - lawful
    - method
    - tamper
typography:
  partition: tamper
  bondDegree: 40
  neighbors:
    - aura
    - quantum/boundary
    - tamper/import
standards:
  - "imports read from source; an index import resolves to a dir carrying index.ts, a deep one to a file"
  - the import graph is the config (imported↔declared) — the public face is index.ts only
bindings: []
neighbors:
  wikilink:
    - cost
    - duality
    - expense
    - law
    - tamper
  matrix:
    - cost
    - exported
    - import
    - law
    - lawful
    - method
    - tamper
  backlinks:
    - cost
    - exported
    - import
    - law
    - lawful
    - method
    - tamper
signatures:
  computationUuid: "9df7be92-e711-8e4c-87f1-5b9a75e85e01"
  stages:
    - stage: path
      stageUuid: "da6ded94-b45e-87b7-b96d-061117e9c0fa"
    - stage: trinity
      stageUuid: "5430bde9-8485-8c28-8e01-bb29e32bbe94"
    - stage: boundary
      stageUuid: "e6c2f009-7d6c-8ba7-a47b-0a22396e0880"
    - stage: links
      stageUuid: "6ed4c285-efce-8731-a35e-b1be1b028421"
    - stage: horo
      stageUuid: "e78f586d-98e0-82b6-8be0-6327cf3760bb"
    - stage: seal
      stageUuid: "6a1232ec-b654-8c83-b059-93307de38182"
    - stage: uuid
      stageUuid: "8bde3d3a-26de-8d06-a6de-8e5163cbae1c"
version: 2
---
# tamper/import — anything importing not from index raises

Each atom's `index.ts` is its **public content-uuid contract** — the one door. An import that reaches a deep internal (`@/x/y.ts`, a file — not `@/x`, nor a sub-atom `@/x/y` that is itself a dir carrying an index) goes **past the seal**: it couples to internals the atom never promised, so a tamper can change that internal without the public face — or any importer's contract — noticing. **Anything importing not from index raises.**

So a non-index import is not a style nit; it is an **uncovered coupling** — a [[cost]] gap. It folds into the same coverage law tamper-cost already runs (coverage → 1 ⇒ ∞): `importPurity` is the index-only fraction, and `importCostLog2` prices the gap. At full purity the import graph is **sealed** and the dimension is ∞; any deep import opens a finite window.

This is the [[duality]] *imported↔declared* made a cost: the import graph **is** the config, so an import past the index is configuration written outside the seal — and configuration outside the seal is exactly what a forger wants.

## Enforce, don't remediate

The point is not to write a script that rewrites the violations after the fact — it is to **enforce** the law so contributors (human or agent) follow it by construction. That gate now exists: `pnpm lint:imports` (`src/convention/import/gate.mjs`, wired into `.husky/pre-push` + the `check` chain) reads this `nonIndexImports()` count and **fails the build** when it rises above a committed baseline — a RATCHET. The corpus is not yet at full purity (~80.7%), so the gate enforces non-regression, not perfection: a new deep import is a red push, and the baseline only ratchets down as deep imports are removed. The residual is **billed** as entropy ([[expense]]) — an agent that imports past the index pays for the gap it opened, and can no longer add a new one silently.

Matter-twin: `src/tamper/import/index.ts` (`scanImports` · `nonIndexImports` · `importPurity` · `importCostLog2`). Composes [[tamper]] · [[cost]] · [[duality]] · [[expense]].

**Law — [[law]]: anything importing not from index raises. The index is the atom's public seal; an import past it to a deep internal is an uncovered coupling that lowers tamper-cost. Import only from the index, and the import graph seals to ∞ — every deep import is a billed gap.**

@audit imports read from source; an index import resolves to a dir carrying index.ts, a deep one to a file
@standard the import graph is the config (imported↔declared) — the public face is index.ts only
