---
name: generator
description: "Use when reasoning about generator — The extractor parses each collection's leading banner into a ; the generators beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from…"
atomPath: "spec/generator"
coordinate: "spec/generator · 4/weave · 7c9d681e"
contentUuid: "c21ce2c7-b0c5-5657-82cf-242f683cd509"
diamondUuid: "4dd9d876-9561-8aaf-b289-79283df73780"
uuid: "7c9d681e-6619-8984-87c1-bd786a0fd16c"
horo: 4
typography:
  partition: spec
  bondDegree: 35
standards:
  - "ISO/IEC 25010:2023 §5 modularity-and-maintainability"
  - "ISO/IEC-12207"
  - "RFC-8259"
  - "W3C-WAI-ARIA-1.2"
  - "WCAG-2.1"
bindings: []
signatures:
  computationUuid: "0c261e65-057d-8367-9b98-8dba79a3606f"
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
      stageUuid: "eb4e995e-6e1d-8acf-b586-6ad69b8ad996"
    - stage: seal
      stageUuid: "91da673c-647a-8977-bbd9-1877a4ea13d6"
    - stage: uuid
      stageUuid: "b5b50d9f-40c4-8235-abe5-02f77b87ab31"
version: 2
---
# spec/generator — the JSDoc banner is the spec, and everything downstream is generated from it

The extractor parses each collection's leading banner into a `CollectionSpec`; the generators
beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from
that one source.

A spec kept beside the code it describes drifts. A spec that IS the code's own banner cannot.

Composes: [[syntax]] · [[law]].
