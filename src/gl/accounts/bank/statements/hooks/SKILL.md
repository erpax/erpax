---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · e2d952f8"
contentUuid: "3364416e-7a0c-5e2b-a52f-9620334e6761"
diamondUuid: "2320a243-aef4-882e-93ca-2531f2d7168d"
uuid: "e2d952f8-fa1e-82fa-83b7-b0992b30346d"
horo: 3
typography:
  partition: gl
  bondDegree: 297
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "396b68ae-69b8-8295-b423-b1e0a14e1933"
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
      stageUuid: "5bb462e9-5791-890a-9a59-a8ad96e709bd"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "bcab3009-1874-819c-8e24-87516bbc8878"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
