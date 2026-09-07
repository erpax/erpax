---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 2/share · e8267189"
contentUuid: "80f95755-0d0e-5c29-b71f-b3443ec46553"
diamondUuid: "0e4673cd-40b2-8158-96e4-39855afaea8c"
uuid: "e8267189-f3d3-8b7c-a4fa-1e66eb16e239"
horo: 2
typography:
  partition: apply
  bondDegree: 10
standards:
  - erpax — automate orchestration loop
bindings: []
signatures:
  computationUuid: "d340e2f6-bf1b-8329-b048-5ab4a558eab9"
  stages:
    - stage: path
      stageUuid: "30d8d610-974e-8d46-aed9-cfd907210fe2"
    - stage: trinity
      stageUuid: "0436631d-7de3-8b9c-b8e5-3766874e3155"
    - stage: boundary
      stageUuid: "2822786a-222b-8307-af93-b3bd49aaefc9"
    - stage: links
      stageUuid: "6ea204c5-a821-8c3b-b98f-4f904303e2cb"
    - stage: horo
      stageUuid: "4a868004-f7dc-8bcf-b859-28799291c634"
    - stage: seal
      stageUuid: "2055bb2b-25be-8681-b344-631e89b2bc9b"
    - stage: uuid
      stageUuid: "729f4548-a791-8c49-b2ff-52cf345b5779"
version: 2
---
# automate

**Law — automate all:** `automateCycle()` — inventory → abort stale → dry-clean → rules light scan → entropy/freeEnergy measure → efficiencyRatchet → emit(ratchet, efficiency, inventory) → tamperCostReport (workTamperProduct delta). Tamper cost rises as entropy falls.

**Watch:** `maxEfficiencyLoop()` — HORO-derived interval; each cycle passes ratchet OR records exception; duplicate ACTIVE agents logged only (no external PID kill).

**Tamper axis:** `tamperCostOf(corpus)` — content-uuid coverage % · matrix edges · sealed % · violation floor distance → `workTamperProduct` source of truth. Gate: tamper cost must not decrease across passes.

**CLI:** `pnpm erpax automate` · `pnpm erpax automate watch`

Composes — [[apply]] · [[apply]]/efficiency · [[apply]]/inventory · [[wave]]/policy · [[quantum/entanglement]]

@standard erpax — automate orchestration loop

Composes: [[vocabulary/efficiency]].
