---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 7/descent · 9cbafc57"
contentUuid: "60faef24-31d7-598e-88f4-9cf55b563b0c"
diamondUuid: "8dbb361d-456d-819c-b659-1a5d3be40e4c"
uuid: "9cbafc57-b516-8135-883f-61fbab2aebeb"
horo: 7
typography:
  partition: apply
  bondDegree: 9
standards:
  - erpax — automate orchestration loop
bindings: []
signatures:
  computationUuid: "2adbc9a5-a5e2-8a2b-b1eb-e0cc505ec0e6"
  stages:
    - stage: path
      stageUuid: "30d8d610-974e-8d46-aed9-cfd907210fe2"
    - stage: trinity
      stageUuid: "0436631d-7de3-8b9c-b8e5-3766874e3155"
    - stage: boundary
      stageUuid: "2822786a-222b-8307-af93-b3bd49aaefc9"
    - stage: links
      stageUuid: "429cd6f6-7405-8fd6-8019-b20cf9724aa0"
    - stage: horo
      stageUuid: "90ca14f1-5058-863a-960e-93324dcd1a0c"
    - stage: seal
      stageUuid: "2055bb2b-25be-8681-b344-631e89b2bc9b"
    - stage: uuid
      stageUuid: "af45b032-6052-8a91-ae4c-32881090c4eb"
version: 2
---
# automate

**Law — automate all:** `automateCycle()` — inventory → abort stale → dry-clean → rules light scan → entropy/freeEnergy measure → efficiencyRatchet → emit(ratchet, efficiency, inventory) → tamperCostReport (workTamperProduct delta). Tamper cost rises as entropy falls.

**Watch:** `maxEfficiencyLoop()` — HORO-derived interval; each cycle passes ratchet OR records exception; duplicate ACTIVE agents logged only (no external PID kill).

**Tamper axis:** `tamperCostOf(corpus)` — content-uuid coverage % · matrix edges · sealed % · violation floor distance → `workTamperProduct` source of truth. Gate: tamper cost must not decrease across passes.

**CLI:** `pnpm erpax automate` · `pnpm erpax automate watch`

Composes — [[apply]] · [[apply]]/efficiency · [[apply]]/inventory · [[wave]]/policy · [[quantum/entanglement]]

@standard erpax — automate orchestration loop

Composes: efficiency.
