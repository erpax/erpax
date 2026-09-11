---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 2/share · f706328c"
contentUuid: "7498c71c-54ce-5da0-b838-b43f1ae29149"
diamondUuid: "3e7ee674-b7e6-80f6-a087-cc73c1bfbd08"
uuid: "f706328c-2faa-8da5-b220-74d9b1e96860"
horo: 2
typography:
  partition: apply
  bondDegree: 10
standards:
  - erpax — automate orchestration loop
bindings: []
signatures:
  computationUuid: "893e648d-9680-83f8-9236-7af580435457"
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
      stageUuid: "c99aab8c-fde6-8ae4-a7bd-75b8ef124e9c"
    - stage: seal
      stageUuid: "2055bb2b-25be-8681-b344-631e89b2bc9b"
    - stage: uuid
      stageUuid: "9bf7fcc7-d705-84d4-9b99-c40a66dafb22"
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
