---
name: import
description: "Use when reasoning about import discipline as a security property — anything importing not from an atom's index is a deep coupling past the seal, a measurable gap that lowers tamper-cost; this finds the violations and prices them."
atomPath: "tamper/import"
coordinate: "tamper/import · 5/round · 90871a64"
contentUuid: "b83a92b0-6d3e-51a8-9c9f-a810bfd8ce5c"
diamondUuid: "ad30d220-c28a-82e6-8052-5ca9815461c7"
uuid: "90871a64-6561-8668-94d1-f2a1c114013e"
horo: 5
typography:
  partition: tamper
  bondDegree: 42
standards:
  - the import graph is the config (imported↔declared) — the public face is index.ts only
bindings: []
signatures:
  computationUuid: "cb9d744e-00be-855c-b3db-5944192d1cfb"
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
      stageUuid: "a94169ba-34f1-8e37-9260-3d04cbdf6a60"
    - stage: seal
      stageUuid: "839b59c4-dff7-8014-ab71-407b3583da0f"
    - stage: uuid
      stageUuid: "df8d4386-f666-8ec4-afce-61fa04f65e7a"
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
