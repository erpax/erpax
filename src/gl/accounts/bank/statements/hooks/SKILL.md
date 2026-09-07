---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 6/6 · c9a34e82"
contentUuid: "dcc4e781-f7c4-5f4f-8550-22c7ed826a3c"
diamondUuid: "d4460f7a-d621-87d0-a3f8-ef40097a1288"
uuid: "c9a34e82-72e5-8499-9764-487e9e650c61"
horo: 6
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "327decc7-d3cd-8360-9ae5-43b6c5434838"
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
      stageUuid: "1ac1e066-a0da-84d5-a7ce-8946f8509a3b"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "64124373-429d-830b-89fc-0a5ce474245a"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
