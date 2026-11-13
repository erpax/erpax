---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · e2d952f8"
contentUuid: "0b9b31a7-6d42-5e3f-82ac-87a213ff1ebe"
diamondUuid: "db7713c2-a1ce-8990-a469-38c61e71955f"
uuid: "e2d952f8-fa1e-82fa-83b7-b0992b30346d"
horo: 3
typography:
  partition: gl
  bondDegree: 333
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "42511a1b-9d8e-8772-b493-995266de4113"
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
      stageUuid: "10d06701-b73b-8ad9-920b-8d8f37a715bb"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "473c8ba4-0861-84a2-b373-7e1bb9508689"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
