---
name: code
description: "Use when reasoning about code — exports (the Payload block) and exports (the React component). One barrel cannot offer both under one name, so the client is here."
atomPath: "blocks/code"
coordinate: "blocks/code · 5/round · f3b3536c"
contentUuid: "29d5cdfc-8b5a-597c-b4fc-e3c20299fb63"
diamondUuid: "609772a9-9e70-82f5-b08d-8523f0f4815f"
uuid: "f3b3536c-73d3-8c65-9f11-e16571470c7d"
horo: 5
typography:
  partition: blocks
  bondDegree: 101
standards:
  - "ECMA-262"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "dce35725-90be-85da-b09e-2ef88ea6af83"
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
      stageUuid: "45ae3bfb-c541-839a-bdff-5199a2db8544"
    - stage: seal
      stageUuid: "e58a844b-76d6-8d14-9be4-3c249941846a"
    - stage: uuid
      stageUuid: "15c8e008-3722-8f00-883e-187a4c2c2b06"
version: 2
---
# blocks/code — the config and the client component both wanted the name `Code`

`config.ts` exports `Code` (the Payload block) and `Component.client.tsx` exports `Code` (the React
component). One barrel cannot offer both under one name, so the client is `CodeClient` here. The
collision is real and naming it is cheaper than renaming a file two surfaces import by path.

Composes: [[law]].
