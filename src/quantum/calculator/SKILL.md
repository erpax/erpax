---
name: calculator
description: "Use when computing in the digital-root substrate — a calculator that folds arithmetic to mod-9 (the rodin group), so every result is a single digit; deterministic and content-addressable."
atomPath: quantum/calculator
coordinate: quantum/calculator · 5/round · dc4d3100
contentUuid: "c5b594f8-2973-5bdd-8c89-2d99357b8b06"
diamondUuid: "8e82068a-7151-8896-a87d-8ef7f27f3ae9"
uuid: "dc4d3100-077e-800d-b7f6-24bbe194e1a3"
horo: 5
bonds:
  in:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - quantum
    - risk
    - sti
  out:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
typography:
  partition: quantum
  bondDegree: 29
  neighbors: []
standards:
  - "the digital-root / mod-9 group ([[rodin]])"
  - "the digital-root / mod-9 group (rodin)"
bindings: []
neighbors:
  wikilink:
    - calculator
    - law
    - math
    - quantum
    - rodin
  matrix:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
  backlinks:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - risk
    - sti
signatures:
  computationUuid: "62c1fa5f-3a9d-85b0-a035-f268a325a539"
  stages:
    - stage: path
      stageUuid: "7bdd17a9-5dfc-89ea-9a81-b998284c6969"
    - stage: trinity
      stageUuid: "892f8074-a098-8f6e-a162-2f9053c9bdb8"
    - stage: boundary
      stageUuid: "5c7d770a-b453-89eb-8841-5938bf329065"
    - stage: links
      stageUuid: "4ee90bd9-f82d-8604-beec-615f1e6e923a"
    - stage: horo
      stageUuid: "56a23ab0-bcd5-8e81-bd4b-36d797e6fddb"
    - stage: seal
      stageUuid: "0ed7c9fb-c881-8913-bbc2-4f2dd610f629"
    - stage: uuid
      stageUuid: "27e1fc8c-1f56-82bd-a3d7-1a2f20fd6d61"
quantum:
  superposition:
    - calculator
    - collapse
    - law
    - medical
    - merge
    - quantum
    - risk
    - sti
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
    computationUuid: "62c1fa5f-3a9d-85b0-a035-f268a325a539"
    contentUuid: "c5b594f8-2973-5bdd-8c89-2d99357b8b06"
version: 2
---
# quantum/calculator — the mod-9 calculator

The quantum facet of [[calculator]]: arithmetic in the **digital-root / mod-9 substrate** ([[rodin]] = (ℤ/9ℤ)). `add` / `mul` fold their result to its digital root, so every answer is a single digit (1..9, or 0) — the [[quantum]]/math substrate applied as a calculator. Deterministic and content-addressable: the same inputs always fold to the same digit. Merges into [[calculator]].

Matter-twin: `src/quantum/calculator/index.ts` (`add` · `mul` · `fold`). Composes [[calculator]] · [[quantum]] · [[rodin]] · [[math]].

**Law — [[law]]: every result is already folded — `add`, `mul` and `fold` always land in the single-digit range 0..9, and applying `fold` to any of their outputs returns it unchanged (a fixed point), because (ℤ/9ℤ) is closed under the digital root; the substrate has no multi-digit states, so equal inputs are forced to the same digit and the calculator is content-addressable by construction.**

@standard the digital-root / mod-9 group (rodin)

<sub>content-uuid `c5b594f8-2973-5bdd-8c89-2d99357b8b06` · account `quantum/calculator` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
