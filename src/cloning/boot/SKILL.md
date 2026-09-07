---
name: boot
description: Use when reasoning about boot — bootFromFederation — ingest a published genome into a clone instance.
atomPath: "cloning/boot"
coordinate: "cloning/boot · 5/round · d12d5f3e"
contentUuid: "7ee5c8b7-1194-5d24-9395-a47d3b8c00bd"
diamondUuid: "db526f73-97b8-85f4-ad8a-2059257242d2"
uuid: "d12d5f3e-a1da-8681-bce3-a92d8b074231"
horo: 5
typography:
  partition: cloning
  bondDegree: 6
standards:
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-VC-2.0"
bindings: []
signatures:
  computationUuid: "6d0ff806-5fd3-8257-8660-e363116a6c48"
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
      stageUuid: "47ace761-54c4-8508-b002-c7ad499c7a03"
    - stage: seal
      stageUuid: "4ee1d449-b4cd-8e04-9230-02362414aed7"
    - stage: uuid
      stageUuid: "9281a68b-4813-8309-89c6-1565ee42c1a3"
version: 2
---
# cloning/boot

bootFromFederation — ingest a published genome into a clone instance.

Extracted from `cloning/boot.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
