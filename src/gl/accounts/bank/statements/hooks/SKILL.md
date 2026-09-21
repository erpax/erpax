---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · e2d952f8"
contentUuid: "72a346ad-aace-541d-be51-87b730cf6bb7"
diamondUuid: "9fe69e9e-cd8a-8be1-8607-860e58686f39"
uuid: "e2d952f8-fa1e-82fa-83b7-b0992b30346d"
horo: 3
typography:
  partition: gl
  bondDegree: 345
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "b5aea242-5edf-8445-8129-d4c1f6e1bac3"
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
      stageUuid: "32623fe9-9232-8ec4-88d2-aca92cdaacc9"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "71ccc78b-833b-8992-ae26-62f140549e7f"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
