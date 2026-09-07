---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 4/weave · be3857c6"
contentUuid: "11c960ca-ff6e-55ad-9370-426052a856b6"
diamondUuid: "3e622a9c-7871-8228-9c6c-ecf5b3da171f"
uuid: "be3857c6-4ed9-8232-99e1-b4be81cc8778"
horo: 4
typography:
  partition: status
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "93830972-e9d9-8a94-9e44-8a4bf50044fd"
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
      stageUuid: "c943a1b0-2111-8fa0-afed-46821453989b"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "ab1ddb50-f5ca-8b15-a2c1-15f443add9ec"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[field]].
