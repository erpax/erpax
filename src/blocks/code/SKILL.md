---
name: code
description: "Use when reasoning about code — exports (the Payload block) and exports (the React component). One barrel cannot offer both under one name, so the client is here."
atomPath: "blocks/code"
coordinate: "blocks/code · 7/descent · ea72dac6"
contentUuid: "c3b8a968-7003-5f72-a0bf-c5c41cedfb3c"
diamondUuid: "8c26dc50-40db-8dea-9da0-f73ef34244a9"
uuid: "ea72dac6-ce07-85f8-8a7f-5f3697a96636"
horo: 7
typography:
  partition: blocks
  bondDegree: 103
standards:
  - "ECMA-262"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "a467006d-f7e8-896e-94f2-4e2143966c84"
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
      stageUuid: "b969b754-a8ed-8bcb-9ec0-aa6f4bb16cd9"
    - stage: seal
      stageUuid: "e58a844b-76d6-8d14-9be4-3c249941846a"
    - stage: uuid
      stageUuid: "cfc79cf6-54fd-83b9-86db-30dc950ee015"
version: 2
---
# blocks/code — the config and the client component both wanted the name `Code`

`config.ts` exports `Code` (the Payload block) and `Component.client.tsx` exports `Code` (the React
component). One barrel cannot offer both under one name, so the client is `CodeClient` here. The
collision is real and naming it is cheaper than renaming a file two surfaces import by path.

Composes: [[law]].
