---
name: import
description: "Use when reasoning about import discipline as a security property — anything importing not from an atom's index is a deep coupling past the seal, a measurable gap that lowers tamper-cost; this finds the violations and prices them."
atomPath: "tamper/import"
coordinate: "tamper/import · 1/base · 0abd1866"
contentUuid: "de54be3f-857f-5672-9695-efc5a0f87c98"
diamondUuid: "024fc93d-0f8a-8ee9-b153-62b7e9b6eb75"
uuid: "0abd1866-b370-8505-a12f-23370f584a73"
horo: 1
typography:
  partition: tamper
  bondDegree: 40
standards:
  - the import graph is the config (imported↔declared) — the public face is index.ts only
bindings: []
signatures:
  computationUuid: "2689464d-950e-8ef5-83fe-44619f4b2439"
  stages:
    - stage: path
      stageUuid: "da6ded94-b45e-87b7-b96d-061117e9c0fa"
    - stage: trinity
      stageUuid: "5430bde9-8485-8c28-8e01-bb29e32bbe94"
    - stage: boundary
      stageUuid: "1f1938e8-259f-8f6a-8dc6-54fda236fa6d"
    - stage: links
      stageUuid: "6ed4c285-efce-8731-a35e-b1be1b028421"
    - stage: horo
      stageUuid: "e6b53335-c325-8697-8e2a-a458dc5eb2d1"
    - stage: seal
      stageUuid: "839b59c4-dff7-8014-ab71-407b3583da0f"
    - stage: uuid
      stageUuid: "86fb5709-0cfc-8dd4-8661-fa6ce6ec8f8f"
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
