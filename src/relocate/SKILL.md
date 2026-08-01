---
name: relocate
description: "Use when deciding WHERE logic belongs — move it to its gravity well, the heaviest atom it is wired to, the adequate place nearest its users. Computes each atom's gravity centre and the pull toward it, so general logic buried in a specialized module is drawn up to the general atom."
atomPath: relocate
coordinate: "relocate · 4/weave · c17d07c8"
contentUuid: "a14596a2-1295-5456-add8-832fc987fe7b"
diamondUuid: "f76f6181-810f-852d-b4bd-fa2e5d9c3b93"
uuid: "c17d07c8-92ee-88da-aa0a-166b4ea65c56"
horo: 4
typography:
  partition: relocate
  bondDegree: 37
standards:
  - "gravity — mass curves placement (the DRY / flatten law)"
bindings: []
signatures:
  computationUuid: "63454c6c-b508-8931-85d4-5406e2767cbd"
  stages:
    - stage: path
      stageUuid: "de9b0ed0-de04-8875-b1f3-521f802f5167"
    - stage: trinity
      stageUuid: "08c46fec-1fe7-84d5-9366-8ea1bf7eb5c9"
    - stage: boundary
      stageUuid: "72a0bffc-b51d-8e8a-96e9-1cb749436e9a"
    - stage: links
      stageUuid: "aaa1393d-937e-8477-90ad-f42722cd1ac3"
    - stage: horo
      stageUuid: "940782a4-34f5-8966-b7a6-f4b8cdc2e121"
    - stage: seal
      stageUuid: "bf10d036-136b-8e49-b6ed-59fc96d8dbf0"
    - stage: uuid
      stageUuid: "51d1a101-0a12-8e08-a640-0ff73baeb657"
version: 2
---
# relocate — move logic to its gravity well

The [[gravity]] law: **mass is gravity** — the links and dependents an atom carries curve where logic belongs. Logic sits at the atom its mass pulls it toward: the **adequate place**, nearest its users, so the distance it travels is minimal ([[merge]] / [[collapse]] — flatten = mass = DRY). General logic buried in a *specialized* module gravitates **up** to the *general* atom.

The canonical relocation: the cost-of-attack math (`coverageCostLog2`, `secondPreimageLog2`, the digest floors) left [[tamper]]-cost for [[cost]] — it is composed by [[balance]], [[analytics]], [[anchor]], and [[power]], not just tamper, so its gravity centre is the general `cost` atom (the heaviest cost relation). `tamper/cost` keeps only `crackVerdict`, composing the moved primitives.

Computed (matter-twin `src/relocate/index.ts`): `gravityCenter(atom)` finds the heaviest atom an atom is wired to on the live uuid-[[matrix]]; `pull(atom)` reports the ratio and flags when the centre dominates (logic gravitates there); `mislocations()` lists the candidates. It is **advisory** — the gravity points; the move is judgment (a general function relocates, a domain-specific one stays).

Composes: [[gravity]] · [[matrix]] · [[cost]] · [[tamper]] · [[merge]] · [[collapse]] · [[sequence]].

## Standards
- the gravity law — mass curves placement (flatten/DRY toward the well)
