---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 6/6 · 656e7ad6"
contentUuid: "10d5162e-10bb-57c6-b306-4cae1ac57fbc"
diamondUuid: "150b3eda-7842-8bd5-8cac-c0fc6b2f4bec"
uuid: "656e7ad6-1994-83dc-842f-303f86543e6d"
horo: 6
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "bfb55af0-4095-869c-aac1-1cefd8852734"
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
      stageUuid: "70c344bc-302e-87e7-833d-eac0b6feb9dd"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "85b7afff-4ea8-82df-b76a-82889b226afd"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
