---
name: boot
description: Use when reasoning about boot — bootFromFederation — ingest a published genome into a clone instance.
atomPath: "cloning/boot"
coordinate: "cloning/boot · 8/crest · 8bfe1bf4"
contentUuid: "a24a6c78-b03e-5ff7-b450-9bc987004550"
diamondUuid: "bc76c08f-b229-8e64-b9ab-d64236fc55f4"
uuid: "8bfe1bf4-0e46-88bb-9b1d-c9c2df7de2ef"
horo: 8
typography:
  partition: cloning
  bondDegree: 6
standards:
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C-VC-2.0"
bindings: []
signatures:
  computationUuid: "c722da45-2558-8603-a183-3376079cc391"
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
      stageUuid: "9a686566-a26d-80b4-bd3d-adc649de7da0"
    - stage: seal
      stageUuid: "4ee1d449-b4cd-8e04-9230-02362414aed7"
    - stage: uuid
      stageUuid: "dbbcfda5-6faf-8ce9-922a-692ac86e28b5"
version: 2
---
# cloning/boot

bootFromFederation — ingest a published genome into a clone instance.

Extracted from `cloning/boot.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
