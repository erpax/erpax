---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 7/descent · c28cf141"
contentUuid: "33bc6bba-ddfe-5693-985c-c8305304bfce"
diamondUuid: "c3e8dfba-5f04-8646-9a46-8a9eddb775e3"
uuid: "c28cf141-c0d4-82e7-8bcb-43f216115bc2"
horo: 7
typography:
  partition: apply
  bondDegree: 10
standards:
  - erpax — automate orchestration loop
bindings: []
signatures:
  computationUuid: "7eac9b47-e732-81ff-bfa2-a2ebbdbab0f1"
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
      stageUuid: "b83d8608-78f2-8a17-8246-fbe8df86b468"
    - stage: seal
      stageUuid: "2055bb2b-25be-8681-b344-631e89b2bc9b"
    - stage: uuid
      stageUuid: "9999efce-7653-80df-acc9-1d92ff3b178e"
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
