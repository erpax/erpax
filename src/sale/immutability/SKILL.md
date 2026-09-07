---
name: immutability
description: "Use when enforcing that a fiscalised sale cannot be edited or deleted — under Наредба Н-18 a closed fiscal sale is corrected by a reversal, never by mutation."
atomPath: "sale/immutability"
coordinate: "sale/immutability · 2/share · 5351738c"
contentUuid: "03a5aac2-2623-52d4-ac85-81212b7e267c"
diamondUuid: "0fe1854e-5fd5-80f2-9362-042b15900bb5"
uuid: "5351738c-7584-8a0e-98ec-ddd33b7243b9"
horo: 2
typography:
  partition: sale
  bondDegree: 16
standards:
  - "BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "054ec0c5-4d6d-808d-99bc-d9d85efc8ee2"
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
      stageUuid: "576408c7-7b22-8006-ad18-80c635f0d538"
    - stage: seal
      stageUuid: "cdb87415-db6a-8d78-abf2-581abbd33b16"
    - stage: uuid
      stageUuid: "d4cf57ce-1d81-8833-97f3-a3e0ce22cf0d"
version: 2
---
# immutability

A fiscalised sale is immutable. Under Наредба Н-18 a closed sale is corrected by issuing a **reversal** ([[sale/reverse]]), never by editing or deleting the original — the audit trail must show what happened, including the mistake.

Composes: [[sale]] · [[law]].
