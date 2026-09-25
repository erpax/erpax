---
name: publish
description: Use when reasoning about publish — publishSelf — wrap a GenomeBundle in a verifiable federation envelope.
atomPath: "cloning/publish"
coordinate: "cloning/publish · 1/base · 93a39890"
contentUuid: "f8ab084b-c2bd-522d-a793-0233f494b1f2"
diamondUuid: "f23bef1c-1436-852c-85b3-58c62fdbed82"
uuid: "93a39890-fef0-8c0f-a13b-0344660eb880"
horo: 1
typography:
  partition: cloning
  bondDegree: 56
standards:
  - "NIST FIPS 204 ML-DSA (when sign fn provided)"
  - W3C Activity Streams 2.0 (federated content envelope)
bindings: []
signatures:
  computationUuid: "e44fdffc-c19d-8ac7-9820-dd3537fd7614"
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
      stageUuid: "8d42ce7c-fa48-834a-bd45-6a63193eb02d"
    - stage: seal
      stageUuid: "860fce17-a5d2-8f79-8244-17128438b5b9"
    - stage: uuid
      stageUuid: "a61791c7-eb20-83eb-a2d6-5b255c89c7ab"
version: 2
---
# cloning/publish

publishSelf — wrap a GenomeBundle in a verifiable federation envelope.

Extracted from `cloning/publish.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
