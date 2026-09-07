---
name: relocate
description: "Use when deciding WHERE logic belongs — move it to its gravity well, the heaviest atom it is wired to, the adequate place nearest its users. Computes each atom's gravity centre and the pull toward it, so general logic buried in a specialized module is drawn up to the general atom."
atomPath: relocate
coordinate: "relocate · 2/share · d423a703"
contentUuid: "4e5aa8b0-e65c-5501-b72f-0c26e395651d"
diamondUuid: "6512dde4-0806-839f-9c99-af30e6199523"
uuid: "d423a703-76c5-8dcb-98fc-01e4141d6d30"
horo: 2
typography:
  partition: relocate
  bondDegree: 37
standards:
  - "gravity — mass curves placement (the DRY / flatten law)"
bindings: []
signatures:
  computationUuid: "b13fb4af-6a08-8b93-8258-1e70967457af"
  stages:
    - stage: path
      stageUuid: "de9b0ed0-de04-8875-b1f3-521f802f5167"
    - stage: trinity
      stageUuid: "08c46fec-1fe7-84d5-9366-8ea1bf7eb5c9"
    - stage: boundary
      stageUuid: "72a0bffc-b51d-8e8a-96e9-1cb749436e9a"
    - stage: links
      stageUuid: "fc0d8435-a2b9-8f02-a3c9-b2ff5d3b3581"
    - stage: horo
      stageUuid: "fe953ba3-b730-8249-abca-8a06ebb6c723"
    - stage: seal
      stageUuid: "bf10d036-136b-8e49-b6ed-59fc96d8dbf0"
    - stage: uuid
      stageUuid: "a45bc72f-e184-88e0-846d-73d77e3e5f36"
version: 2
---
# relocate — move logic to its gravity well

The [[gravity]] law: **mass is gravity** — the links and dependents an atom carries curve where logic belongs. Logic sits at the atom its mass pulls it toward: the **adequate place**, nearest its users, so the distance it travels is minimal ([[merge]] / [[collapse]] — flatten = mass = DRY). General logic buried in a *specialized* module gravitates **up** to the *general* atom.

The canonical relocation: the cost-of-attack math (`coverageCostLog2`, `secondPreimageLog2`, the digest floors) left [[tamper]]-cost for [[cost]] — it is composed by [[balance]], [[analytics]], [[anchor]], and [[power]], not just tamper, so its gravity centre is the general `cost` atom (the heaviest cost relation). `tamper/cost` keeps only `crackVerdict`, composing the moved primitives.

Computed (matter-twin `src/relocate/index.ts`): `gravityCenter(atom)` finds the heaviest atom an atom is wired to on the live uuid-[[matrix]]; `pull(atom)` reports the ratio and flags when the centre dominates (logic gravitates there); `mislocations()` lists the candidates. It is **advisory** — the gravity points; the move is judgment (a general function relocates, a domain-specific one stays).

Composes: [[gravity]] · [[matrix]] · [[cost]] · [[tamper]] · [[merge]] · [[collapse]] · [[sequence]].

## Standards
- the gravity law — mass curves placement (flatten/DRY toward the well)
