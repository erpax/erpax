---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 4/weave · cddecff7"
contentUuid: "6c762332-7f92-54f3-89d4-bab54a01491d"
diamondUuid: "d61fc9ad-11ed-85f7-8926-aab9700d7f4b"
uuid: "cddecff7-dd0d-8fee-8820-d9beddfd8875"
horo: 4
typography:
  partition: status
  bondDegree: 98
standards: []
bindings: []
signatures:
  computationUuid: "9ef760ca-ed2c-82d6-987a-14e66a5344fd"
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
      stageUuid: "64a1d564-437c-8535-b437-95e8ab45e4e0"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "4fe1d798-1244-8c2e-9a6e-33d3d57bde08"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[field]].
