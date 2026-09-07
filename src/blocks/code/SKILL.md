---
name: code
description: "Use when reasoning about code — exports (the Payload block) and exports (the React component). One barrel cannot offer both under one name, so the client is here."
atomPath: "blocks/code"
coordinate: "blocks/code · 2/share · e60293f1"
contentUuid: "343e7747-152e-5bda-8ee2-995ec888cee3"
diamondUuid: "6e829026-117e-8f13-9a80-509665d13777"
uuid: "e60293f1-35ce-8f81-aa72-dc216e6c6c6f"
horo: 2
typography:
  partition: blocks
  bondDegree: 101
standards:
  - "ECMA-262"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "f601b71d-c9f2-87d1-abdb-8fedf7cb1681"
  stages:
    - stage: path
      stageUuid: "a471817a-987e-8588-a86e-82284c285857"
    - stage: trinity
      stageUuid: "6ab8d664-42b8-84b9-98f9-ec50c42b299d"
    - stage: boundary
      stageUuid: "a3dfa561-4ee4-8518-939a-a9c28cee2475"
    - stage: links
      stageUuid: "e4562b40-493e-8d91-ba3a-71df04e389b1"
    - stage: horo
      stageUuid: "3df5f72a-07a0-80d6-b90c-802d3ed90f58"
    - stage: seal
      stageUuid: "e58a844b-76d6-8d14-9be4-3c249941846a"
    - stage: uuid
      stageUuid: "c859813d-d7c6-8522-85fa-5e47782a01de"
version: 2
---
# blocks/code — the config and the client component both wanted the name `Code`

`config.ts` exports `Code` (the Payload block) and `Component.client.tsx` exports `Code` (the React
component). One barrel cannot offer both under one name, so the client is `CodeClient` here. The
collision is real and naming it is cheaper than renaming a file two surfaces import by path.

Composes: [[law]].
