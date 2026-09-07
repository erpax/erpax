---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 2/share · 922afeb8"
contentUuid: "6083ca60-f9e8-535e-a181-095139829dc9"
diamondUuid: "c5d8922e-8848-8d0d-a1e4-7c33bcd9fb1c"
uuid: "922afeb8-7bf8-8401-a4b3-ee09e7f5797e"
horo: 2
typography:
  partition: status
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "4715d7fd-db02-84ce-aed8-0c4868cad142"
  stages:
    - stage: path
      stageUuid: "49a1e297-a7e1-8e23-ba3f-17ea6ee99175"
    - stage: trinity
      stageUuid: "fa39638b-5a8c-8f7d-a1c4-610230247ec6"
    - stage: boundary
      stageUuid: "30c480af-3867-8096-83e4-95ec73177636"
    - stage: links
      stageUuid: "e8a19222-65bb-8144-9e56-2884e05524e6"
    - stage: horo
      stageUuid: "2f215576-0a99-8c69-9179-e5aa3b940a42"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "5b9ab0ad-2766-8c40-b2d8-a776befbfde1"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[field]].
