---
name: immutability
description: "Use when enforcing that a fiscalised sale cannot be edited or deleted — under Наредба Н-18 a closed fiscal sale is corrected by a reversal, never by mutation."
atomPath: "sale/immutability"
coordinate: "sale/immutability · 1/base · 3f42631a"
contentUuid: "d37e2216-c11a-547d-b4dd-cd3a865ccfc4"
diamondUuid: "95309990-719a-8596-8a57-1f9a08b914bd"
uuid: "3f42631a-4a3f-889f-9de0-d1528ad32d1e"
horo: 1
typography:
  partition: sale
  bondDegree: 16
standards:
  - "BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "833969ba-f77c-80a5-ae95-b361c8a65285"
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
      stageUuid: "e7944587-3726-8fbd-b19e-1381cf8593a3"
    - stage: seal
      stageUuid: "cdb87415-db6a-8d78-abf2-581abbd33b16"
    - stage: uuid
      stageUuid: "a2248731-9290-8dc0-b7b3-39e1ed34b52d"
version: 2
---
# immutability

A fiscalised sale is immutable. Under Наредба Н-18 a closed sale is corrected by issuing a **reversal** ([[sale/reverse]]), never by editing or deleting the original — the audit trail must show what happened, including the mistake.

Composes: [[sale]] · [[law]].
