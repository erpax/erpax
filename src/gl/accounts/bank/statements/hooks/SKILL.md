---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · 36cb9a1f"
contentUuid: "747aa840-5af1-5638-8935-bfe8b9f259d7"
diamondUuid: "5c9f51c9-9c7f-8c68-9190-563547097674"
uuid: "36cb9a1f-785b-8822-a2d2-39504b9e773b"
horo: 3
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "4d23d77f-4d11-80d7-b3b2-0014ceea1d91"
  stages:
    - stage: path
      stageUuid: "453b1a0c-fdf5-8086-bd90-7132bbe81972"
    - stage: trinity
      stageUuid: "dd702646-1856-8486-98d3-fe084625856d"
    - stage: boundary
      stageUuid: "0fecac63-4a67-8f83-a35d-4f26ab37dceb"
    - stage: links
      stageUuid: "a052f9d2-33e4-8129-8ab7-4f10b1df2a43"
    - stage: horo
      stageUuid: "463b8fbd-e039-8fae-8909-90a257dd84d8"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "631c654c-6e6e-8d82-af11-c576d5f42073"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
