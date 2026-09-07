---
name: hooks
description: "Use when reasoning about hooks — fires when a statement lands, which is the event reconciliation waits on. Polling for new statements instead would make the delay a property of the poll interval rather than of…"
atomPath: "gl/accounts/bank/statements/hooks"
coordinate: "gl/accounts/bank/statements/hooks · 3/3 · 4c96a627"
contentUuid: "ff4d5fed-8d38-511a-b9ee-cb40f57cd970"
diamondUuid: "5cd0a9d6-d38a-85b4-9828-d5b4f82ac893"
uuid: "4c96a627-0abe-8eee-89d0-872a5ca9b637"
horo: 3
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO-9362"
bindings: []
signatures:
  computationUuid: "d6db2d1d-ed8e-8cfa-952f-dc4c21c6e2a9"
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
      stageUuid: "aaaa420f-6481-8c7e-a257-51082974fc1d"
    - stage: seal
      stageUuid: "4797bd6a-ebbd-827b-a8c6-9b8953975025"
    - stage: uuid
      stageUuid: "60ea177d-3184-878f-8f9e-dc23d75227dc"
version: 2
---
# gl/accounts/bank/statements/hooks — an imported statement announces itself so reconciliation can begin

`bankStatementImportedHook` fires when a statement lands, which is the event reconciliation waits on.
Polling for new statements instead would make the delay a property of the poll interval rather than
of the import.

Composes: [[law]].
