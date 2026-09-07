---
name: immutability
description: "Use when enforcing that a fiscalised sale cannot be edited or deleted — under Наредба Н-18 a closed fiscal sale is corrected by a reversal, never by mutation."
atomPath: "sale/immutability"
coordinate: "sale/immutability · 5/round · 570e1ad1"
contentUuid: "172cd38b-9fcd-5dd7-86b9-18f5eb3dc767"
diamondUuid: "5e776d82-5346-8e45-b39c-39f0a51a9e7d"
uuid: "570e1ad1-77e8-80be-bc06-631a93cea62e"
horo: 5
typography:
  partition: sale
  bondDegree: 16
standards:
  - "BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "4e317b16-35fa-8d0c-93a9-d7066f3b8e64"
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
      stageUuid: "5f1d3f43-b88a-86c1-9bf8-80ff5cb029ec"
    - stage: seal
      stageUuid: "cdb87415-db6a-8d78-abf2-581abbd33b16"
    - stage: uuid
      stageUuid: "b7f4b70d-2346-87e8-975a-343bf928a423"
version: 2
---
# immutability

A fiscalised sale is immutable. Under Наредба Н-18 a closed sale is corrected by issuing a **reversal** ([[sale/reverse]]), never by editing or deleting the original — the audit trail must show what happened, including the mistake.

Composes: [[sale]] · [[law]].
