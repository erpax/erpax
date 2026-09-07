---
name: calculator
description: "Use when computing in the digital-root substrate — a calculator that folds arithmetic to mod-9 (the rodin group), so every result is a single digit; deterministic and content-addressable."
atomPath: "quantum/calculator"
coordinate: "quantum/calculator · 1/base · 88b70a97"
contentUuid: "9da173dd-eb8e-5e52-8954-c2b780f4b467"
diamondUuid: "aec62a34-853a-84ce-a4dc-11d9edbed678"
uuid: "88b70a97-155f-85f1-95f4-9cfbc62bab20"
horo: 1
typography:
  partition: quantum
  bondDegree: 30
standards:
  - "the digital-root / mod-9 group ([[rodin]])"
  - "the digital-root / mod-9 group (rodin)"
bindings: []
signatures:
  computationUuid: "ecca2897-e73b-82e2-8022-3b132ae5a55a"
  stages:
    - stage: path
      stageUuid: "7bdd17a9-5dfc-89ea-9a81-b998284c6969"
    - stage: trinity
      stageUuid: "892f8074-a098-8f6e-a162-2f9053c9bdb8"
    - stage: boundary
      stageUuid: "5c7d770a-b453-89eb-8841-5938bf329065"
    - stage: links
      stageUuid: "5100f030-fb79-850f-b75b-0bd145ee80f0"
    - stage: horo
      stageUuid: "972380ae-4c1a-8414-8e1d-0f5fce2e7f83"
    - stage: seal
      stageUuid: "0ed7c9fb-c881-8913-bbc2-4f2dd610f629"
    - stage: uuid
      stageUuid: "1e54aa11-c49e-8609-8714-4a5efb78781a"
quantum:
  superposition:
    - calculator
    - dry
    - law
    - medical
    - quantum
    - superposition
  collapse:
    - "Use when computing in the digital-root substrate — a calculator that folds arithmetic to mod-9 (the rodin group), so every result is a single digit; deterministic and content-addressable."
    - "every result is already folded — `add`, `mul` and `fold` always land in the single-digit range 0..9, and applying `fold` to any of their outputs returns it unchanged (a fixed point), because (ℤ/9ℤ) is closed under the digital root; the substrate has no multi-digit states, so equal inputs are forced to the same digit and the calculator is content-addressable by construction."
    - "matter-twin:src/quantum/calculator/index.ts"
    - "the digital-root / mod-9 group (rodin)"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "ecca2897-e73b-82e2-8022-3b132ae5a55a"
    contentUuid: "9da173dd-eb8e-5e52-8954-c2b780f4b467"
version: 2
---
# quantum/calculator — the mod-9 calculator

The quantum facet of [[calculator]]: arithmetic in the **digital-root / mod-9 substrate** ([[rodin]] = (ℤ/9ℤ)). `add` / `mul` fold their result to its digital root, so every answer is a single digit (1..9, or 0) — the [[quantum]]/math substrate applied as a calculator. Deterministic and content-addressable: the same inputs always fold to the same digit. Merges into [[calculator]].

Matter-twin: `src/quantum/calculator/index.ts` (`add` · `mul` · `fold`). Composes [[calculator]] · [[quantum]] · [[rodin]] · [[math]].

**Law — [[law]]: every result is already folded — `add`, `mul` and `fold` always land in the single-digit range 0..9, and applying `fold` to any of their outputs returns it unchanged (a fixed point), because (ℤ/9ℤ) is closed under the digital root; the substrate has no multi-digit states, so equal inputs are forced to the same digit and the calculator is content-addressable by construction.**

@standard the digital-root / mod-9 group (rodin)

<sub>content-uuid `9da173dd-eb8e-5e52-8954-c2b780f4b467` · account `quantum/calculator` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
