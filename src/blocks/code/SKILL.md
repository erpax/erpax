---
name: code
description: "Use when reasoning about code — exports (the Payload block) and exports (the React component). One barrel cannot offer both under one name, so the client is here."
atomPath: "blocks/code"
coordinate: "blocks/code · 1/base · eb1fa138"
contentUuid: "4f12ae77-24fe-5d9c-9ae3-b3488433a812"
diamondUuid: "f696c1a2-d8a9-8cf8-b693-68f9db11e8ee"
uuid: "eb1fa138-be04-8cda-a6b6-74ae71e7bce7"
horo: 1
typography:
  partition: blocks
  bondDegree: 101
standards:
  - "ECMA-262"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "b8556b02-91f6-8fbf-859c-4daa01f38582"
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
      stageUuid: "fe27df3c-b445-8134-af20-0c41f210e33e"
    - stage: seal
      stageUuid: "e58a844b-76d6-8d14-9be4-3c249941846a"
    - stage: uuid
      stageUuid: "b99784c6-c09e-885a-a70d-3c9076222fda"
version: 2
---
# blocks/code — the config and the client component both wanted the name `Code`

`config.ts` exports `Code` (the Payload block) and `Component.client.tsx` exports `Code` (the React
component). One barrel cannot offer both under one name, so the client is `CodeClient` here. The
collision is real and naming it is cheaper than renaming a file two surfaces import by path.

Composes: [[law]].
