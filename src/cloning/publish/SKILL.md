---
name: publish
description: Use when reasoning about publish — publishSelf — wrap a GenomeBundle in a verifiable federation envelope.
atomPath: "cloning/publish"
coordinate: "cloning/publish · 8/crest · d01c3107"
contentUuid: "0d29ca5a-d930-5ef4-be88-4b0393fccd9e"
diamondUuid: "9e1eab03-44fd-8ec3-bad8-2f0a7e47109a"
uuid: "d01c3107-5e10-8cfc-bde6-1d5cc43e6fd0"
horo: 8
typography:
  partition: cloning
  bondDegree: 50
standards:
  - "NIST FIPS 204 ML-DSA (when sign fn provided)"
  - W3C Activity Streams 2.0 (federated content envelope)
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "4de0891c-cd3e-89a3-9224-f4e36a52d186"
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
      stageUuid: "9a4aa585-28bb-8109-acb4-31a5627df2ea"
    - stage: seal
      stageUuid: "860fce17-a5d2-8f79-8244-17128438b5b9"
    - stage: uuid
      stageUuid: "70d34184-6429-8fc8-9e32-db840410fc30"
version: 2
---
# cloning/publish

publishSelf — wrap a GenomeBundle in a verifiable federation envelope.

Extracted from `cloning/publish.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
