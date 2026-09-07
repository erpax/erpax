---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 2/share · b5fa21e5"
contentUuid: "3be1541e-8aa0-574f-9ed6-77f481b08c78"
diamondUuid: "607f8e42-8f80-8b4b-ba30-506244a888d7"
uuid: "b5fa21e5-f6c4-8fa7-90a9-b19db2de662f"
horo: 2
typography:
  partition: apply
  bondDegree: 10
standards:
  - erpax — automate orchestration loop
bindings: []
signatures:
  computationUuid: "d1f16bd4-21f1-8ccb-a710-dfe0deffe7b8"
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
      stageUuid: "7b9242cc-ac44-8f3f-a872-51b3c26c2a0d"
    - stage: seal
      stageUuid: "2055bb2b-25be-8681-b344-631e89b2bc9b"
    - stage: uuid
      stageUuid: "56a3ea3c-ec8a-83be-b199-ff7a8d4c1541"
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
