---
name: boot
description: Use when reasoning about boot — bootFromFederation — ingest a published genome into a clone instance.
atomPath: "cloning/boot"
coordinate: "cloning/boot · 1/base · 52f78e32"
contentUuid: "0950c42a-01c4-5366-b20e-4ea5ddccccc1"
diamondUuid: "f37ef624-21f2-8ca7-8955-f0c02321e808"
uuid: "52f78e32-17bf-87c5-8ff0-72dbf9bfda79"
horo: 1
typography:
  partition: cloning
  bondDegree: 6
standards:
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-VC-2.0"
bindings: []
signatures:
  computationUuid: "35b47547-be39-813f-910e-b39285c57bff"
  stages:
    - stage: path
      stageUuid: "64588969-e901-8a04-a3ef-4cd4b489e065"
    - stage: trinity
      stageUuid: "6220c108-53f8-8900-8bf1-ebb117e2426b"
    - stage: boundary
      stageUuid: "691bccc0-7b22-8d83-af52-36c274401dd5"
    - stage: links
      stageUuid: "f74a1c44-ccfa-83ae-bf8d-887161f01067"
    - stage: horo
      stageUuid: "15b8a066-2fb8-8639-a175-074a905bc565"
    - stage: seal
      stageUuid: "4ee1d449-b4cd-8e04-9230-02362414aed7"
    - stage: uuid
      stageUuid: "af42cb2d-a913-865f-8899-95ee28079c0e"
version: 2
---
# cloning/boot

bootFromFederation — ingest a published genome into a clone instance.

Extracted from `cloning/boot.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
