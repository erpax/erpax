---
name: standards
description: "Use when reasoning about standards — Use for the standards wire-format boundary — the outbound service that emits documents and the inbound parser that ingests them, the give and take of the same formats."
atomPath: "export/standards"
coordinate: "export/standards · 5/round · 17b5e678"
contentUuid: "c6dc012e-0c56-5c3d-ae43-2a2c08b83a17"
diamondUuid: "755bf823-9ea7-8103-9e66-65b081a74d84"
uuid: "17b5e678-43a3-8a2a-b689-43e5b654a400"
horo: 5
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
  computationUuid: "71642835-bc05-8948-8eb6-37dcbadf6bf5"
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
      stageUuid: "133324da-f59a-8721-bd3b-76b99c268965"
    - stage: seal
      stageUuid: "fd1f8123-3dc2-8e30-a1d1-a787cff61c09"
    - stage: uuid
      stageUuid: "6e79ed10-e86b-8789-80c4-77a05eff501a"
version: 2
---
# standards

The two directions of one boundary. `service` **gives** — it emits the canonical wire formats; `import` **takes** — banks and Peppol Access Points hand erpax an XML document and it routes to the canonical parser by a `format` discriminator, returning the typed structure the write path ingests.

They are siblings because they must agree on the same formats: a give that the take cannot parse is a boundary that only works outward.

Composes: [[standards]] · [[law]].
