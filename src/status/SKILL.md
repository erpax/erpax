---
name: status
description: "Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'."
atomPath: status
coordinate: "status · 4/weave · e37fbb13"
contentUuid: "8e6d296d-406b-5f5e-924c-8b0193711cdf"
diamondUuid: "9f5b1b41-2833-8d2e-ac9d-c95cb4b480e3"
uuid: "e37fbb13-28d6-8706-9ce5-9c883fa1d04a"
horo: 4
typography:
  partition: status
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "e1c392c0-6b32-827c-a945-7e73307b5d63"
  stages:
    - stage: path
      stageUuid: "49a1e297-a7e1-8e23-ba3f-17ea6ee99175"
    - stage: trinity
      stageUuid: "fa39638b-5a8c-8f7d-a1c4-610230247ec6"
    - stage: boundary
      stageUuid: "a7c17657-f964-8685-9ec5-12b184c741e6"
    - stage: links
      stageUuid: "9224b7a9-ec4b-84cc-adc7-7097009dfc2f"
    - stage: horo
      stageUuid: "1cb8c9f4-8253-82bf-a73d-d079d469b283"
    - stage: seal
      stageUuid: "f262d609-dcbd-8cea-901e-0d2e8208c09b"
    - stage: uuid
      stageUuid: "604928f8-2148-8c49-9e74-fe70681b05c0"
version: 2
---
# status

Use when tracking a document's or entity's state — draft, approved, rejected, closed, pending, active, inactive. A select field carrying workflow-state enums. Drives UI rendering (e.g., locked periods are closed; draft documents are mutable). Common default: 'draft'.

Composes: [[fields]].
