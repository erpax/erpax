---
name: generator
description: "Use when reasoning about generator — The extractor parses each collection's leading banner into a ; the generators beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from…"
atomPath: "spec/generator"
coordinate: "spec/generator · 5/round · 54766d41"
contentUuid: "83ac2f48-340d-53b4-b641-ba041089b739"
diamondUuid: "f8dd2420-6fc0-85ba-a1a3-a84a649aace7"
uuid: "54766d41-9cda-86af-aff1-c548b04afd20"
horo: 5
typography:
  partition: spec
  bondDegree: 40
standards:
  - "ISO/IEC 25010:2023 §5 modularity-and-maintainability"
  - "ISO/IEC-12207"
  - "RFC-8259"
bindings: []
signatures:
  computationUuid: "d9f28d6a-2f03-8969-b453-9ef62b74a701"
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
      stageUuid: "c5fc9684-133e-81c5-9463-67023cded5e9"
    - stage: seal
      stageUuid: "91da673c-647a-8977-bbd9-1877a4ea13d6"
    - stage: uuid
      stageUuid: "1829a25b-7212-8af5-b640-f2979eb71827"
version: 2
---
# spec/generator — the JSDoc banner is the spec, and everything downstream is generated from it

The extractor parses each collection's leading banner into a `CollectionSpec`; the generators
beside it emit the chain registry, the test scaffolds, the marketing pages and the i18n keys from
that one source.

A spec kept beside the code it describes drifts. A spec that IS the code's own banner cannot.

Composes: [[syntax]] · [[law]].
