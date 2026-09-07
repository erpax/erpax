---
name: boot
description: Use when reasoning about boot — bootFromFederation — ingest a published genome into a clone instance.
atomPath: "cloning/boot"
coordinate: "cloning/boot · 8/crest · ae31f7e8"
contentUuid: "934131ba-5e95-543d-ad82-f0186ab79fa8"
diamondUuid: "e7aca9a8-e507-8541-9598-abf847b58d52"
uuid: "ae31f7e8-9622-80d0-9717-4d09b75210e2"
horo: 8
typography:
  partition: cloning
  bondDegree: 6
standards:
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-VC-2.0"
bindings: []
signatures:
  computationUuid: "fe378e05-d755-8708-9838-1c3889d09839"
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
      stageUuid: "257274f5-22b3-8672-947d-bcfa1b3a5984"
    - stage: seal
      stageUuid: "4ee1d449-b4cd-8e04-9230-02362414aed7"
    - stage: uuid
      stageUuid: "b726b3dc-201d-89fb-8507-ab408f718a10"
version: 2
---
# cloning/boot

bootFromFederation — ingest a published genome into a clone instance.

Extracted from `cloning/boot.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
