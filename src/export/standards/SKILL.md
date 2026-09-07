---
name: standards
description: "Use when reasoning about standards — Use for the standards wire-format boundary — the outbound service that emits documents and the inbound parser that ingests them, the give and take of the same formats."
atomPath: "export/standards"
coordinate: "export/standards · 4/weave · f7292ad0"
contentUuid: "1cb9251b-dc61-558b-8847-62da40d48664"
diamondUuid: "d08ae7aa-1458-8f02-b14e-cc7f9fc78c69"
uuid: "f7292ad0-02d1-88c0-a570-2008d2ce7d9b"
horo: 4
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
  computationUuid: "fbecfe67-4e5f-8105-992b-bf639316bb3e"
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
      stageUuid: "728cf959-f1ed-889d-8bcf-de19f9e5badd"
    - stage: seal
      stageUuid: "fd1f8123-3dc2-8e30-a1d1-a787cff61c09"
    - stage: uuid
      stageUuid: "76cb1abf-732f-8923-adec-0e45f305ff20"
version: 2
---
# standards

The two directions of one boundary. `service` **gives** — it emits the canonical wire formats; `import` **takes** — banks and Peppol Access Points hand erpax an XML document and it routes to the canonical parser by a `format` discriminator, returning the typed structure the write path ingests.

They are siblings because they must agree on the same formats: a give that the take cannot parse is a boundary that only works outward.

Composes: [[standards]] · [[law]].
