---
name: generator
description: "Use when reasoning about generator — The extractor parses each collection's leading banner into a ; the generators beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from…"
atomPath: "spec/generator"
coordinate: "spec/generator · 8/crest · 23ea23e4"
contentUuid: "5860ab87-d50c-5af6-8264-334b4c9d8eed"
diamondUuid: "d85311ab-4b74-83a7-bb44-6c95c92ff215"
uuid: "23ea23e4-3bfe-8ac5-b0c3-b6227ecf88e9"
horo: 8
typography:
  partition: spec
  bondDegree: 40
standards:
  - "ISO/IEC 25010:2023 §5 modularity-and-maintainability"
  - "ISO/IEC-12207"
  - "RFC-8259"
bindings: []
signatures:
  computationUuid: "2806a43c-df9f-82e7-adc8-f0c18c1ecb58"
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
      stageUuid: "04a94db1-1ea2-8323-85cd-918ac6ceb404"
    - stage: seal
      stageUuid: "91da673c-647a-8977-bbd9-1877a4ea13d6"
    - stage: uuid
      stageUuid: "b078b56b-d5ee-89b1-8b9b-977e1806713c"
version: 2
---
# spec/generator — the JSDoc banner is the spec, and everything downstream is generated from it

The extractor parses each collection's leading banner into a `CollectionSpec`; the generators
beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from
that one source.

A spec kept beside the code it describes drifts. A spec that IS the code's own banner cannot.

Composes: [[syntax]] · [[law]].
