---
name: boot
description: Use when reasoning about boot — bootFromFederation — ingest a published genome into a clone instance.
atomPath: "cloning/boot"
coordinate: "cloning/boot · 8/crest · d0091a44"
contentUuid: "66926840-8b15-59c0-9418-ae8396426fa3"
diamondUuid: "d30e25a6-8ac5-83ff-8fe2-41222c849e71"
uuid: "d0091a44-9175-86ff-86a6-46426da8a151"
horo: 8
typography:
  partition: cloning
  bondDegree: 6
standards:
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-VC-2.0"
bindings: []
signatures:
  computationUuid: "26ef0650-ecae-82ca-a411-9a94d3de6aae"
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
      stageUuid: "98f2d15c-992b-8a09-b4d3-129d94cc5db7"
    - stage: seal
      stageUuid: "4ee1d449-b4cd-8e04-9230-02362414aed7"
    - stage: uuid
      stageUuid: "e87ee413-ee15-8dc0-9044-bb8db4dfc4a0"
version: 2
---
# cloning/boot

bootFromFederation — ingest a published genome into a clone instance.

Extracted from `cloning/boot.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
