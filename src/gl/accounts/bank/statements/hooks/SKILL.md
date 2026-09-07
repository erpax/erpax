---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 6/6 · fb8659b9"
contentUuid: "d99d3eaf-06b0-5003-b4e3-d5e91bceb887"
diamondUuid: "99e23391-c495-8ba2-ba7e-7d8b95a0d724"
uuid: "fb8659b9-3aec-8550-ae23-1f26dcc5bd2d"
horo: 6
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "968e90f9-5b83-8d33-a66e-9791b70d2e5d"
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
      stageUuid: "86e54545-170a-82ef-a728-1b80aa9c3ebe"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "1f74d6cb-eaa4-8928-9a41-4cbd7d6c58b0"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
