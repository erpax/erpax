---
name: calculator
description: "Use when computing in the digital-root substrate — a calculator that folds arithmetic to mod-9 (the rodin group), so every result is a single digit; deterministic and content-addressable."
atomPath: "quantum/calculator"
coordinate: "quantum/calculator · 1/base · 5a954057"
contentUuid: "ed5d1121-8634-57d3-9a71-dbf0b93d02bd"
diamondUuid: "24c9826c-c174-8d07-84e8-0f0970dd9701"
uuid: "5a954057-a74a-8895-a1f8-93850b1e13ab"
horo: 1
typography:
  partition: quantum
  bondDegree: 30
standards:
  - "the digital-root / mod-9 group ([[rodin]])"
  - "the digital-root / mod-9 group (rodin)"
bindings: []
signatures:
  computationUuid: "5825446f-4449-8fa0-96b7-9e5c0b7e81ed"
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
      stageUuid: "d55a09f3-dafd-8caa-8718-0c539a8a40f3"
    - stage: seal
      stageUuid: "0ed7c9fb-c881-8913-bbc2-4f2dd610f629"
    - stage: uuid
      stageUuid: "7d134c1b-bd0d-8589-8153-858e0caed64a"
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
    computationUuid: "5825446f-4449-8fa0-96b7-9e5c0b7e81ed"
    contentUuid: "ed5d1121-8634-57d3-9a71-dbf0b93d02bd"
version: 2
---
# quantum/calculator — the mod-9 calculator

The quantum facet of [[calculator]]: arithmetic in the **digital-root / mod-9 substrate** ([[rodin]] = (ℤ/9ℤ)). `add` / `mul` fold their result to its digital root, so every answer is a single digit (1..9, or 0) — the [[quantum]]/math substrate applied as a calculator. Deterministic and content-addressable: the same inputs always fold to the same digit. Merges into [[calculator]].

Matter-twin: `src/quantum/calculator/index.ts` (`add` · `mul` · `fold`). Composes [[calculator]] · [[quantum]] · [[rodin]] · [[math]].

**Law — [[law]]: every result is already folded — `add`, `mul` and `fold` always land in the single-digit range 0..9, and applying `fold` to any of their outputs returns it unchanged (a fixed point), because (ℤ/9ℤ) is closed under the digital root; the substrate has no multi-digit states, so equal inputs are forced to the same digit and the calculator is content-addressable by construction.**

@standard the digital-root / mod-9 group (rodin)

<sub>content-uuid `ed5d1121-8634-57d3-9a71-dbf0b93d02bd` · account `quantum/calculator` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
