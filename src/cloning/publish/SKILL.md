---
name: publish
description: Use when reasoning about publish — publishSelf — wrap a GenomeBundle in a verifiable federation envelope.
atomPath: "cloning/publish"
coordinate: "cloning/publish · 4/weave · 157fe7e7"
contentUuid: "f73ad135-5343-5a13-866c-dde0a64957a1"
diamondUuid: "ae40a890-8c10-89d0-908b-68305e6c37b1"
uuid: "157fe7e7-18bb-8e5f-88c4-7a16f3c01fd2"
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
  computationUuid: "3aa00aae-0d03-8014-bb6e-3b8ea29bcdc5"
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
      stageUuid: "d582ca28-22fb-8c8f-a045-9966c201f42f"
    - stage: seal
      stageUuid: "860fce17-a5d2-8f79-8244-17128438b5b9"
    - stage: uuid
      stageUuid: "fbac1771-67e9-8748-9e5a-bba44b473dc1"
version: 2
---
# cloning/publish

publishSelf — wrap a GenomeBundle in a verifiable federation envelope.

Extracted from `cloning/publish.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
