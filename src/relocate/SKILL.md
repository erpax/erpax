---
name: relocate
description: "Use when deciding WHERE logic belongs — move it to its gravity well, the heaviest atom it is wired to, the adequate place nearest its users. Computes each atom's gravity centre and the pull toward it, so general logic buried in a specialized module is drawn up to the general atom."
atomPath: relocate
coordinate: relocate · 7/descent · 56e5207b
contentUuid: "d23e5182-dbdb-599a-9eed-0ae1d2ef6618"
diamondUuid: "27c55e60-06d3-82e3-85f8-25999c30f325"
uuid: "56e5207b-58f0-8005-8ba1-816b897b2516"
horo: 7
bonds:
  in:
    - analytics
    - anchor
    - balance
    - collapse
    - command
    - cost
    - gravity
    - matrix
    - merge
    - power
    - sequence
    - tamper
  out:
    - analytics
    - anchor
    - balance
    - collapse
    - command
    - cost
    - gravity
    - matrix
    - merge
    - power
    - sequence
    - tamper
typography:
  partition: relocate
  bondDegree: 37
  neighbors:
    - analytics
standards:
  - "computed over the live uuid-matrix mass ([[gravity]]); never hand-asserted"
  - gravity — mass curves placement (the DRY / flatten law)
bindings: []
neighbors:
  wikilink:
    - analytics
    - anchor
    - balance
    - collapse
    - cost
    - gravity
    - matrix
    - merge
    - power
    - sequence
    - tamper
  matrix:
    - analytics
    - anchor
    - balance
    - collapse
    - command
    - cost
    - gravity
    - matrix
    - merge
    - power
    - sequence
    - tamper
  backlinks:
    - analytics
    - anchor
    - balance
    - collapse
    - command
    - cost
    - gravity
    - matrix
    - merge
    - power
    - sequence
    - tamper
signatures:
  computationUuid: "4c48566c-e264-8d7c-8132-9fb90cfe4211"
  stages:
    - stage: path
      stageUuid: "de9b0ed0-de04-8875-b1f3-521f802f5167"
    - stage: trinity
      stageUuid: "08c46fec-1fe7-84d5-9366-8ea1bf7eb5c9"
    - stage: boundary
      stageUuid: "aed9780f-e1fa-8a56-a614-e5034df0a578"
    - stage: links
      stageUuid: "aaa1393d-937e-8477-90ad-f42722cd1ac3"
    - stage: horo
      stageUuid: "f945995b-46b3-8ae4-afeb-fd3ae7f3fbdb"
    - stage: seal
      stageUuid: "46c96c9d-175b-8a0d-b1b6-fef20c77318b"
    - stage: uuid
      stageUuid: "f144cd3f-048d-8a86-bf10-be0a5d87505c"
version: 2
---
# relocate — move logic to its gravity well

The [[gravity]] law: **mass is gravity** — the links and dependents an atom carries curve where logic belongs. Logic sits at the atom its mass pulls it toward: the **adequate place**, nearest its users, so the distance it travels is minimal ([[merge]] / [[collapse]] — flatten = mass = DRY). General logic buried in a *specialized* module gravitates **up** to the *general* atom.

The canonical relocation: the cost-of-attack math (`coverageCostLog2`, `secondPreimageLog2`, the digest floors) left [[tamper]]-cost for [[cost]] — it is composed by [[balance]], [[analytics]], [[anchor]], and [[power]], not just tamper, so its gravity centre is the general `cost` atom (the heaviest cost relation). `tamper/cost` keeps only `crackVerdict`, composing the moved primitives.

Computed (matter-twin `src/relocate/index.ts`): `gravityCenter(atom)` finds the heaviest atom an atom is wired to on the live uuid-[[matrix]]; `pull(atom)` reports the ratio and flags when the centre dominates (logic gravitates there); `mislocations()` lists the candidates. It is **advisory** — the gravity points; the move is judgment (a general function relocates, a domain-specific one stays).

Composes: [[gravity]] · [[matrix]] · [[cost]] · [[tamper]] · [[merge]] · [[collapse]] · [[sequence]].

## Standards
- the gravity law — mass curves placement (flatten/DRY toward the well)
