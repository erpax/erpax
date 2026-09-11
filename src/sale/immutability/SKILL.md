---
name: immutability
description: "Use when enforcing that a fiscalised sale cannot be edited or deleted — under Наредба Н-18 a closed fiscal sale is corrected by a reversal, never by mutation."
atomPath: "sale/immutability"
coordinate: "sale/immutability · 1/base · 07c83155"
contentUuid: "1310ca40-b910-5bdd-a9cb-ff807cc5bd4a"
diamondUuid: "0ff87293-c5ff-8e6a-a514-420a3b46a62f"
uuid: "07c83155-35e8-845b-b48f-bd7d623b66eb"
horo: 1
typography:
  partition: sale
  bondDegree: 16
standards:
  - "BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "1109bdff-5616-8e8e-ad9c-7127df6362ee"
  stages:
    - stage: path
      stageUuid: "e354e87c-13fa-889f-aafd-81ff15d03a24"
    - stage: trinity
      stageUuid: "d434c686-7288-8f8d-8e9a-fc7081930b22"
    - stage: boundary
      stageUuid: "424c2394-70c5-85a7-b154-298268eb64cc"
    - stage: links
      stageUuid: "247515ec-1a32-8eaf-9a06-6e7e0bd19e2b"
    - stage: horo
      stageUuid: "6fd4a914-64d6-8f14-b497-5a93f16e2345"
    - stage: seal
      stageUuid: "cdb87415-db6a-8d78-abf2-581abbd33b16"
    - stage: uuid
      stageUuid: "02cfba4c-3202-8a98-972e-0f39114e867b"
version: 2
---
# immutability

A fiscalised sale is immutable. Under Наредба Н-18 a closed sale is corrected by issuing a **reversal** ([[sale/reverse]]), never by editing or deleting the original — the audit trail must show what happened, including the mistake.

Composes: [[sale]] · [[law]].
