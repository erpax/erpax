---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 1/base · f1891bde"
contentUuid: "c6885a4e-5023-5488-8649-7ba4260c5c33"
diamondUuid: "c95bba5e-1873-8672-b3fe-84ed7b78fdec"
uuid: "f1891bde-65c0-8d57-9841-301fc1c05c41"
horo: 1
typography:
  partition: status
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "3661201f-95c3-85a7-ae89-1e53ce90c30c"
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
      stageUuid: "b30254fd-497e-8feb-b15d-d21a9870d637"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "1bc11138-6e4b-8662-9d78-2d4f5419191f"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[field]].
