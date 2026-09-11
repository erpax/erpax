---
name: relocate
description: "Use when deciding WHERE logic belongs — move it to its gravity well, the heaviest atom it is wired to, the adequate place nearest its users. Computes each atom's gravity centre and the pull toward it, so general logic buried in a specialized module is drawn up to the general atom."
atomPath: relocate
coordinate: "relocate · 1/base · fc22be7d"
contentUuid: "a5b01131-4cf1-5bc7-a6ad-136183cd16dd"
diamondUuid: "c4a004b0-8185-8cbc-8666-6ca4c2d0a360"
uuid: "fc22be7d-61d3-8e2b-ae5a-f54cf1972534"
horo: 1
typography:
  partition: relocate
  bondDegree: 37
standards:
  - "gravity — mass curves placement (the DRY / flatten law)"
bindings: []
signatures:
  computationUuid: "61a57185-f7c3-8620-a7e1-5d2fa8715e01"
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
      stageUuid: "af96eae5-af92-8546-b0a0-656e521650b1"
    - stage: seal
      stageUuid: "bf10d036-136b-8e49-b6ed-59fc96d8dbf0"
    - stage: uuid
      stageUuid: "0fb2547c-4493-8ced-8fcd-818726d74686"
version: 2
---
# relocate — move logic to its gravity well

The [[gravity]] law: **mass is gravity** — the links and dependents an atom carries curve where logic belongs. Logic sits at the atom its mass pulls it toward: the **adequate place**, nearest its users, so the distance it travels is minimal ([[merge]] / [[collapse]] — flatten = mass = DRY). General logic buried in a *specialized* module gravitates **up** to the *general* atom.

The canonical relocation: the cost-of-attack math (`coverageCostLog2`, `secondPreimageLog2`, the digest floors) left [[tamper]]-cost for [[cost]] — it is composed by [[balance]], [[analytics]], [[anchor]], and [[power]], not just tamper, so its gravity centre is the general `cost` atom (the heaviest cost relation). `tamper/cost` keeps only `crackVerdict`, composing the moved primitives.

Computed (matter-twin `src/relocate/index.ts`): `gravityCenter(atom)` finds the heaviest atom an atom is wired to on the live uuid-[[matrix]]; `pull(atom)` reports the ratio and flags when the centre dominates (logic gravitates there); `mislocations()` lists the candidates. It is **advisory** — the gravity points; the move is judgment (a general function relocates, a domain-specific one stays).

Composes: [[gravity]] · [[matrix]] · [[cost]] · [[tamper]] · [[merge]] · [[collapse]] · [[sequence]].

## Standards
- the gravity law — mass curves placement (flatten/DRY toward the well)
