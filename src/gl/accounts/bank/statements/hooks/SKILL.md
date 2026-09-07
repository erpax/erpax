---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 6/6 · 153ad85c"
contentUuid: "7d267216-bf4e-5ed3-9bff-66a9d953a319"
diamondUuid: "f4fd0760-4aee-8d66-9ec4-cffa2960c1a9"
uuid: "153ad85c-009c-894c-8ccc-ce43a2b0e83b"
horo: 6
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "a6c5c2fa-31fc-86e3-a9b5-267b83c54a36"
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
      stageUuid: "e1837032-2254-8159-a69b-63278e260815"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "73e7753b-b157-8962-848c-b8ee7095b847"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
