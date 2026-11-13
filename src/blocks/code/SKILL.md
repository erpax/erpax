---
name: code
description: "Use when reasoning about code — exports (the Payload block) and exports (the React component). One barrel cannot offer both under one name, so the client is here."
atomPath: "blocks/code"
coordinate: "blocks/code · 4/weave · 4d1db0b8"
contentUuid: "4e5f6077-04b6-562f-961a-8b40f5931196"
diamondUuid: "daed6bb3-2ca8-8ab6-b982-9115d6c9e805"
uuid: "4d1db0b8-c585-891a-8783-c8a10f588675"
horo: 4
typography:
  partition: blocks
  bondDegree: 95
standards:
  - "ECMA-262"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "1382be93-b41d-8965-a1d2-f585c2620010"
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
      stageUuid: "bbd0b2c0-eef8-854f-8015-9e61c4a2dae2"
    - stage: seal
      stageUuid: "e58a844b-76d6-8d14-9be4-3c249941846a"
    - stage: uuid
      stageUuid: "726e6837-2dd9-830a-b36d-82aa812b6815"
version: 2
---
# blocks/code — the config and the client component both wanted the name `Code`

`config.ts` exports `Code` (the Payload block) and `Component.client.tsx` exports `Code` (the React
component). One barrel cannot offer both under one name, so the client is `CodeClient` here. The
collision is real and naming it is cheaper than renaming a file two surfaces import by path.

Composes: [[law]].
