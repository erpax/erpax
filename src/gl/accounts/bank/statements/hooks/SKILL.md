---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · b0ffff1e"
contentUuid: "afe3f7ed-d9c0-5f38-b8e3-808125887c59"
diamondUuid: "073228e2-16f1-8ff4-b50b-c24bcf74c8be"
uuid: "b0ffff1e-7947-8be2-b4e6-3f5bd690a039"
horo: 3
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "d66892ff-783d-81aa-a2a7-6e9ed7b3fb5c"
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
      stageUuid: "37ae389d-0e51-8c75-a753-4b9a3e2ede50"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "f3b55503-3421-8d0a-8517-19dffd8bb6a6"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
