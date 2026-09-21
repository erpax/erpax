---
name: standards
description: "Use when reasoning about standards — Use for the standards wire-format boundary — the outbound service that emits documents and the inbound parser that ingests them, the give and take of the same formats."
atomPath: "export/standards"
coordinate: "export/standards · 1/base · 6ccc4e97"
contentUuid: "ca8906fa-e803-5fe6-a3a9-c7c644f24f32"
diamondUuid: "0f2b4b6b-c775-87de-87ad-7bb9ded2c3f3"
uuid: "6ccc4e97-ee44-8dd0-9cbc-b9ff78f86e7a"
horo: 1
typography:
  partition: export
  bondDegree: 191
standards:
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - "SAF-T"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "d9d1c593-799c-8677-bc08-935321952a69"
  stages:
    - stage: path
      stageUuid: "8a0518ae-85f1-8a5d-baa1-ceacfabaf1aa"
    - stage: trinity
      stageUuid: "04fe0b8a-7e49-8dfc-b7fc-bcbb48b9e0bd"
    - stage: boundary
      stageUuid: "77e7c3b2-a28f-8cf3-bfb6-f8894dcaead0"
    - stage: links
      stageUuid: "71e9efa0-a62b-8400-a491-04ebf936615c"
    - stage: horo
      stageUuid: "4f2d55a3-4aed-816d-8003-8bd1d27ec302"
    - stage: seal
      stageUuid: "fd1f8123-3dc2-8e30-a1d1-a787cff61c09"
    - stage: uuid
      stageUuid: "ec1ac5ea-c8ec-8122-b4d7-bd2be31856fd"
version: 2
---
# standards

The two directions of one boundary. `service` **gives** — it emits the canonical wire formats; `import` **takes** — banks and Peppol Access Points hand erpax an XML document and it routes to the canonical parser by a `format` discriminator, returning the typed structure the write path ingests.

They are siblings because they must agree on the same formats: a give that the take cannot parse is a boundary that only works outward.

Composes: [[standards]] · [[law]].
