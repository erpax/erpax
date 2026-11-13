---
name: generator
description: "Use when reasoning about generator — The extractor parses each collection's leading banner into a ; the generators beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from…"
atomPath: "spec/generator"
coordinate: "spec/generator · 4/weave · 7c9d681e"
contentUuid: "22ddf498-e909-53d7-9dc2-d2e30f5d303b"
diamondUuid: "d8d0fff9-8871-8a99-b8e3-fe08715bf251"
uuid: "7c9d681e-6619-8984-87c1-bd786a0fd16c"
horo: 4
typography:
  partition: spec
  bondDegree: 32
standards:
  - "ISO/IEC 25010:2023 §5 modularity-and-maintainability"
  - "ISO/IEC-12207"
  - "RFC-8259"
bindings: []
signatures:
  computationUuid: "1f0d28f1-d115-89e0-a1ab-4ec0ee5f9303"
  stages:
    - stage: path
      stageUuid: "50bbe649-e51a-8685-bc36-dc11c78c6c19"
    - stage: trinity
      stageUuid: "1f6dbd37-ed8c-8d05-991a-e9811276bfc1"
    - stage: boundary
      stageUuid: "3df4d098-9be8-84c5-86ff-955630bf38c5"
    - stage: links
      stageUuid: "2f474cec-e157-8eb8-b0ad-eafe873a5c2d"
    - stage: horo
      stageUuid: "dcb37042-e4af-8c3f-8290-515c6a693db9"
    - stage: seal
      stageUuid: "91da673c-647a-8977-bbd9-1877a4ea13d6"
    - stage: uuid
      stageUuid: "b1755509-2981-87eb-aad9-9f111353064d"
version: 2
---
# spec/generator — the JSDoc banner is the spec, and everything downstream is generated from it

The extractor parses each collection's leading banner into a `CollectionSpec`; the generators
beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from
that one source.

A spec kept beside the code it describes drifts. A spec that IS the code's own banner cannot.

Composes: [[syntax]] · [[law]].
