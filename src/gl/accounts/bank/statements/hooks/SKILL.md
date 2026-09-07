---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 9/unity · c417bef9"
contentUuid: "569501b0-740d-5f5c-8070-34b8865e2cff"
diamondUuid: "aeaeff51-c6e9-8481-8c64-c2b381d85a1f"
uuid: "c417bef9-f852-8315-81d4-ec50cde0557c"
horo: 9
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "0c79b2a5-0841-880d-9a83-ca16ab46d05d"
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
      stageUuid: "ad22be6f-55ce-8f08-b61b-6597030c9e33"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "38290fac-d2bb-8932-a638-11fd38baee59"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
