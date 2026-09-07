---
name: standards
description: "Use when reasoning about standards — Use for the standards wire-format boundary — the outbound service that emits documents and the inbound parser that ingests them, the give and take of the same formats."
atomPath: "export/standards"
coordinate: "export/standards · 7/descent · 9f701454"
contentUuid: "a4a3a4e3-936b-5501-b949-f387181d03e2"
diamondUuid: "74b5eaf0-959d-8a30-a37f-fcb880e0661c"
uuid: "9f701454-51a4-86b1-86bc-dbcd01588903"
horo: 7
typography:
  partition: export
  bondDegree: 188
standards:
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - "SAF-T"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "faf0f423-2e6f-833f-8ed5-503ccf42fde6"
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
      stageUuid: "4e911ebc-b906-8f12-9e87-f16ac3acb9d2"
    - stage: seal
      stageUuid: "fd1f8123-3dc2-8e30-a1d1-a787cff61c09"
    - stage: uuid
      stageUuid: "6131a5cf-0d15-8e53-a280-8eee07be2254"
version: 2
---
# standards

The two directions of one boundary. `service` **gives** — it emits the canonical wire formats; `import` **takes** — banks and Peppol Access Points hand erpax an XML document and it routes to the canonical parser by a `format` discriminator, returning the typed structure the write path ingests.

They are siblings because they must agree on the same formats: a give that the take cannot parse is a boundary that only works outward.

Composes: [[standards]] · [[law]].
