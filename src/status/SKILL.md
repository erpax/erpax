---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 4/weave · cddecff7"
contentUuid: "6be78b55-e067-5528-9b51-be77de3f3b37"
diamondUuid: "40e0823a-534a-8dee-bc33-a40d793a5fbc"
uuid: "cddecff7-dd0d-8fee-8820-d9beddfd8875"
horo: 4
typography:
  partition: status
  bondDegree: 32
standards: []
bindings: []
signatures:
  computationUuid: "7f333928-8282-8b4c-8ad8-a0d2441dcc40"
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
      stageUuid: "107803ab-3ede-89b3-8597-1187a7768122"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "bb08c77d-aada-83d2-a411-34fd9b13f896"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[field]].
