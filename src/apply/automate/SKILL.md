---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 1/base · dd4d7592"
contentUuid: "33674370-dd12-55ad-a881-4d19838da237"
diamondUuid: "de7524d2-8ecf-854d-a9ce-236b7e542a4a"
uuid: "dd4d7592-9e89-835a-a939-d55d31f66f2b"
horo: 1
typography:
  partition: apply
  bondDegree: 20
standards:
  - erpax — automate orchestration loop
bindings: []
signatures:
  computationUuid: "ff4120aa-345d-82eb-8d9f-7cf9f6eaee78"
  stages:
    - stage: path
      stageUuid: "30d8d610-974e-8d46-aed9-cfd907210fe2"
    - stage: trinity
      stageUuid: "0436631d-7de3-8b9c-b8e5-3766874e3155"
    - stage: boundary
      stageUuid: "c065e694-9798-85e3-a07a-076725adc9c0"
    - stage: links
      stageUuid: "04249113-7d8b-84fc-a36d-14cdd15fb9c7"
    - stage: horo
      stageUuid: "f36783cb-491b-8471-927d-a13b38920d5f"
    - stage: seal
      stageUuid: "7dca0387-b0d4-8f60-b349-7e9e54c1c3e7"
    - stage: uuid
      stageUuid: "65783bac-09b7-82fc-8897-c3e435cb95a2"
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
