---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 5/round · aac8cc52"
contentUuid: "5958dc1c-0e63-53a6-b3d4-26eee55179a8"
diamondUuid: "cc95006a-2868-8974-81bd-befcf86163bb"
uuid: "aac8cc52-01a9-8fdb-a1e4-0ca970262a3b"
horo: 5
typography:
  partition: status
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "e13b1c9b-2e93-8e70-a1e7-41c3cd9472e7"
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
      stageUuid: "9bafe89b-f0fe-80aa-bbd7-02a6e6a86f79"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "9116ff43-ecc9-8157-9b6c-41ea2128256b"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[field]].
