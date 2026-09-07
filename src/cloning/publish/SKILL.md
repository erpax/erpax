---
name: publish
description: Use when reasoning about publish — publishSelf — wrap a GenomeBundle in a verifiable federation envelope.
atomPath: "cloning/publish"
coordinate: "cloning/publish · 4/weave · 60b3ee34"
contentUuid: "d2899747-66de-5b99-9372-ce16bb9bdc14"
diamondUuid: "014d8cff-039c-894f-9244-6240fe56e70a"
uuid: "60b3ee34-2b21-8a52-9cf3-a0d994ec2712"
horo: 4
typography:
  partition: cloning
  bondDegree: 50
standards:
  - "NIST FIPS 204 ML-DSA (when sign fn provided)"
  - W3C Activity Streams 2.0 (federated content envelope)
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "c0ca3103-9ab4-82ec-b6db-19fd82cd9f99"
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
      stageUuid: "29f23541-5b85-8b86-b335-6d46db696b3d"
    - stage: seal
      stageUuid: "860fce17-a5d2-8f79-8244-17128438b5b9"
    - stage: uuid
      stageUuid: "b3a4caf2-9acb-87ee-83a6-1a272c75bda3"
version: 2
---
# cloning/publish

publishSelf — wrap a GenomeBundle in a verifiable federation envelope.

Extracted from `cloning/publish.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
