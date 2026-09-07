---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 9/unity · 94db4d01"
contentUuid: "a08e6264-438f-576a-94c6-7a88f8366abf"
diamondUuid: "d447cd0b-db8a-82d8-bc1e-fda8a706de49"
uuid: "94db4d01-74b6-8039-b658-40ba6e6fc556"
horo: 9
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "9d017918-3709-860e-acde-d018064031c5"
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
      stageUuid: "90debec3-e9dc-829c-be73-de34e7ce3be5"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "cb2f7c5d-8e0a-8408-a447-6f26d70fbcf0"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
