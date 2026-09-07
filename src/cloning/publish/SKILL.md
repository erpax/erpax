---
name: publish
description: Use when reasoning about publish — publishSelf — wrap a GenomeBundle in a verifiable federation envelope.
atomPath: "cloning/publish"
coordinate: "cloning/publish · 1/base · b82e431d"
contentUuid: "b0dc4a2a-81fb-5620-95da-3952cde80501"
diamondUuid: "0335edd2-01c6-8d0a-9ea2-7a4b55e7b527"
uuid: "b82e431d-7c0d-8527-804b-a0d4eebb64fb"
horo: 1
typography:
  partition: cloning
  bondDegree: 50
standards:
  - "NIST FIPS 204 ML-DSA (when sign fn provided)"
  - W3C Activity Streams 2.0 (federated content envelope)
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "f40dcf92-b74c-83fc-b972-762696dde898"
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
      stageUuid: "1f75ac27-5e56-8f7f-b779-969fc3d47bf4"
    - stage: seal
      stageUuid: "860fce17-a5d2-8f79-8244-17128438b5b9"
    - stage: uuid
      stageUuid: "bcd00511-dba9-884f-9218-88e8aeb010a1"
version: 2
---
# cloning/publish

publishSelf — wrap a GenomeBundle in a verifiable federation envelope.

Extracted from `cloning/publish.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
