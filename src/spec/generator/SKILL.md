---
name: generator
description: "Use when reasoning about generator — The extractor parses each collection's leading banner into a ; the generators beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from…"
atomPath: "spec/generator"
coordinate: "spec/generator · 8/crest · 74b77d54"
contentUuid: "961edb2f-b21b-5c47-8d2c-08e4d417eedc"
diamondUuid: "97875ebd-06ee-8d10-953c-58216ea54576"
uuid: "74b77d54-2cd5-89f3-9369-52073dd9b5ce"
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
  computationUuid: "ed7361fe-6cc5-8e7e-9c66-37c623872cdf"
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
      stageUuid: "9f18d2db-8159-8709-b8c9-fb4e7c7c7ecc"
    - stage: seal
      stageUuid: "91da673c-647a-8977-bbd9-1877a4ea13d6"
    - stage: uuid
      stageUuid: "bf02d136-27dc-867d-ad8a-a63a7c4f0eb2"
version: 2
---
# spec/generator — the JSDoc banner is the spec, and everything downstream is generated from it

The extractor parses each collection's leading banner into a `CollectionSpec`; the generators
beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from
that one source.

A spec kept beside the code it describes drifts. A spec that IS the code's own banner cannot.

Composes: [[syntax]] · [[law]].
