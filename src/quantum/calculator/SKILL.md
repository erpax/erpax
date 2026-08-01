---
name: calculator
description: "Use when computing in the digital-root substrate — a calculator that folds arithmetic to mod-9 (the rodin group), so every result is a single digit; deterministic and content-addressable."
atomPath: "quantum/calculator"
coordinate: "quantum/calculator · 1/base · 684efe5e"
contentUuid: "200067fb-cc43-5e8f-8056-174788ac75bf"
diamondUuid: "d4f5c605-7343-87f4-a965-b7850827ba92"
uuid: "684efe5e-589f-858a-82e0-cb3feeacd492"
horo: 1
typography:
  partition: quantum
  bondDegree: 30
standards:
  - "the digital-root / mod-9 group ([[rodin]])"
  - "the digital-root / mod-9 group (rodin)"
bindings: []
signatures:
  computationUuid: "7d44fae6-9cb8-8530-abd1-b0224ede44c4"
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
      stageUuid: "8bbbf1e0-de0b-8cb3-8158-d20dd66a921e"
    - stage: seal
      stageUuid: "0ed7c9fb-c881-8913-bbc2-4f2dd610f629"
    - stage: uuid
      stageUuid: "5cf94e86-12d4-8166-9f54-89b7b47898b5"
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
    computationUuid: "7d44fae6-9cb8-8530-abd1-b0224ede44c4"
    contentUuid: "200067fb-cc43-5e8f-8056-174788ac75bf"
version: 2
---
# quantum/calculator — the mod-9 calculator

The quantum facet of [[calculator]]: arithmetic in the **digital-root / mod-9 substrate** ([[rodin]] = (ℤ/9ℤ)). `add` / `mul` fold their result to its digital root, so every answer is a single digit (1..9, or 0) — the [[quantum]]/math substrate applied as a calculator. Deterministic and content-addressable: the same inputs always fold to the same digit. Merges into [[calculator]].

Matter-twin: `src/quantum/calculator/index.ts` (`add` · `mul` · `fold`). Composes [[calculator]] · [[quantum]] · [[rodin]] · [[math]].

**Law — [[law]]: every result is already folded — `add`, `mul` and `fold` always land in the single-digit range 0..9, and applying `fold` to any of their outputs returns it unchanged (a fixed point), because (ℤ/9ℤ) is closed under the digital root; the substrate has no multi-digit states, so equal inputs are forced to the same digit and the calculator is content-addressable by construction.**

@standard the digital-root / mod-9 group (rodin)

<sub>content-uuid `200067fb-cc43-5e8f-8056-174788ac75bf` · account `quantum/calculator` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
