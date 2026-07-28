---
name: automate
description: Use when orchestrating erpax efficiency loops — inventory → clean → measure → ratchet → emit. Tamper cost rises as entropy falls; prompt→erpax is the only viable path.
atomPath: "apply/automate"
coordinate: "apply/automate · 7/descent · 4d087083"
contentUuid: "e074ca42-3cb0-5c79-98c3-32b4e8ae4852"
diamondUuid: "51eabd1b-df1f-86fd-9418-337990c5f8d2"
uuid: "4d087083-91cb-87f1-b0bf-b42d27d8a639"
horo: 7
bonds:
  in:
    - apply
    - efficiency
    - entanglement
    - inventory
    - policy
  out:
    - apply
    - efficiency
    - entanglement
    - inventory
    - policy
typography:
  partition: apply
  bondDegree: 20
  neighbors:
    - "analytics/max-tamper-cost"
    - aura
    - diamond
    - hallucination
    - purity
standards:
  - erpax — automate orchestration loop
bindings: []
neighbors:
  wikilink:
    - apply
    - efficiency
    - entanglement
    - inventory
    - policy
  matrix:
    - apply
    - efficiency
    - entanglement
    - inventory
    - policy
  backlinks:
    - apply
    - efficiency
    - entanglement
    - inventory
    - policy
signatures:
  computationUuid: "c9a29cc1-bb2c-816d-84dc-b0638f30f80b"
  stages:
    - stage: path
      stageUuid: "30d8d610-974e-8d46-aed9-cfd907210fe2"
    - stage: trinity
      stageUuid: "0436631d-7de3-8b9c-b8e5-3766874e3155"
    - stage: boundary
      stageUuid: "9ec13732-b957-821f-97d0-e24005824045"
    - stage: links
      stageUuid: "04249113-7d8b-84fc-a36d-14cdd15fb9c7"
    - stage: horo
      stageUuid: "4f09c76c-ddd8-828e-86f7-6d0671c032cf"
    - stage: seal
      stageUuid: "7dca0387-b0d4-8f60-b349-7e9e54c1c3e7"
    - stage: uuid
      stageUuid: "1e3a23df-7bc5-840a-88ae-d0c9a8800572"
version: 2
---
# automate

**Law — automate all:** `automateCycle()` — inventory → abort stale → dry-clean → rules light scan → entropy/freeEnergy measure → efficiencyRatchet → emit(ratchet, efficiency, inventory) → tamperCostReport (workTamperProduct delta). Tamper cost rises as entropy falls.

**Watch:** `maxEfficiencyLoop()` — HORO-derived interval; each cycle passes ratchet OR records exception; duplicate ACTIVE agents logged only (no external PID kill).

**Tamper axis:** `tamperCostOf(corpus)` — content-uuid coverage % · matrix edges · sealed % · violation floor distance → `workTamperProduct` source of truth. Gate: tamper cost must not decrease across passes.

**CLI:** `pnpm erpax automate` · `pnpm erpax automate watch`

Composes — [[apply]] · [[apply/efficiency]] · [[apply/inventory]] · [[wave/policy]] · [[quantum/entanglement]]

@standard erpax — automate orchestration loop
