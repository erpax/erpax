---
name: standards
description: "Use when reasoning about standards — Use for the standards wire-format boundary — the outbound service that emits documents and the inbound parser that ingests them, the give and take of the same formats."
atomPath: "export/standards"
coordinate: "export/standards · 2/share · 63dc31fc"
contentUuid: "898bd3f7-f8e2-54fe-ad44-6301146b8358"
diamondUuid: "702156ad-9e58-8ad6-b950-512490a4a391"
uuid: "63dc31fc-650a-85c6-84b4-e79e83a55e80"
horo: 2
typography:
  partition: export
  bondDegree: 176
standards:
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - "SAF-T"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "c5fb15e3-0c2e-8da9-9cd4-30cb60184a11"
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
      stageUuid: "943cceb7-e0a2-8c9b-8e82-1e3aaa6927f3"
    - stage: seal
      stageUuid: "fd1f8123-3dc2-8e30-a1d1-a787cff61c09"
    - stage: uuid
      stageUuid: "5bf3483e-9f9e-80b0-b599-ee0932eccee7"
version: 2
---
# standards

The two directions of one boundary. `service` **gives** — it emits the canonical wire formats; `import` **takes** — banks and Peppol Access Points hand erpax an XML document and it routes to the canonical parser by a `format` discriminator, returning the typed structure the write path ingests.

They are siblings because they must agree on the same formats: a give that the take cannot parse is a boundary that only works outward.

Composes: [[standards]] · [[law]].
