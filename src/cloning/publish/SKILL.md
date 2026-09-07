---
name: publish
description: Use when reasoning about publish — publishSelf — wrap a GenomeBundle in a verifiable federation envelope.
atomPath: "cloning/publish"
coordinate: "cloning/publish · 5/round · 646dc983"
contentUuid: "3abfa274-e26d-5c55-a9a0-6d0754cb374d"
diamondUuid: "36fc7cd1-1548-8b08-bf9f-6011c96849f6"
uuid: "646dc983-b5e3-8d4b-a668-e39785cdb2c4"
horo: 5
typography:
  partition: cloning
  bondDegree: 50
standards:
  - "NIST FIPS 204 ML-DSA (when sign fn provided)"
  - W3C Activity Streams 2.0 (federated content envelope)
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "fa172bb4-484f-804d-9243-3c9e2b480f76"
  stages:
    - stage: path
      stageUuid: "d416055f-230b-8f80-9a65-828236eb29b7"
    - stage: trinity
      stageUuid: "27ea9352-f36a-87ee-9a50-1a6e8f0464e3"
    - stage: boundary
      stageUuid: "059ba715-09f2-8043-8dcb-183c5d2b9c26"
    - stage: links
      stageUuid: "03a03c36-2f13-8e4c-b0a6-8a1869942588"
    - stage: horo
      stageUuid: "7ad01627-8331-83b3-9cca-a7ee133a969d"
    - stage: seal
      stageUuid: "860fce17-a5d2-8f79-8244-17128438b5b9"
    - stage: uuid
      stageUuid: "a7c8aabd-a600-8e84-a98c-89dc8aef3f76"
version: 2
---
# cloning/publish

publishSelf — wrap a GenomeBundle in a verifiable federation envelope.

Extracted from `cloning/publish.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
