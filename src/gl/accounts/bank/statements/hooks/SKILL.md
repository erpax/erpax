---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · e2d952f8"
contentUuid: "7ab8244d-db4b-52ba-bf41-8c407c9d7074"
diamondUuid: "270ccd23-2501-81f8-983a-73dfaca2c918"
uuid: "e2d952f8-fa1e-82fa-83b7-b0992b30346d"
horo: 3
typography:
  partition: gl
  bondDegree: 288
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "b1b9559a-a7e1-8ac0-98d8-fc7c46e8ac5e"
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
      stageUuid: "e4989b87-24d8-8f93-92d5-4463f4fc52de"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "816ad529-2770-8930-93ff-6543db5a2e77"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
