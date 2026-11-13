---
name: code
description: "Use when reasoning about code — exports (the Payload block) and exports (the React component). One barrel cannot offer both under one name, so the client is here."
atomPath: "blocks/code"
coordinate: "blocks/code · 4/weave · 4d1db0b8"
contentUuid: "ecdb0434-adfc-5c30-94ab-59df0ddbe715"
diamondUuid: "a4d46b22-68e0-8371-b2f5-f3d5d375f5ce"
uuid: "4d1db0b8-c585-891a-8783-c8a10f588675"
horo: 4
typography:
  partition: blocks
  bondDegree: 42
standards:
  - "ECMA-262"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "12fd90e2-7290-8909-8ef9-8cfb235c261e"
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
      stageUuid: "fe669999-3dea-82c0-ade7-c7f58e7cbc2c"
    - stage: seal
      stageUuid: "e58a844b-76d6-8d14-9be4-3c249941846a"
    - stage: uuid
      stageUuid: "b0aa26d4-2624-82af-b54d-ae0a97b98f67"
version: 2
---
# blocks/code — the config and the client component both wanted the name `Code`

`config.ts` exports `Code` (the Payload block) and `Component.client.tsx` exports `Code` (the React
component). One barrel cannot offer both under one name, so the client is `CodeClient` here. The
collision is real and naming it is cheaper than renaming a file two surfaces import by path.

Composes: [[law]].
