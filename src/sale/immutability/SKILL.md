---
name: immutability
description: "Use when enforcing that a fiscalised sale cannot be edited or deleted — under Наредба Н-18 a closed fiscal sale is corrected by a reversal, never by mutation."
atomPath: "sale/immutability"
coordinate: "sale/immutability · 4/weave · 4666fb37"
contentUuid: "5517e437-a46b-5281-b65a-f1715a6de1c2"
diamondUuid: "26c4d181-e377-866a-819b-d7ef6ade69eb"
uuid: "4666fb37-3a6b-87af-9238-449bb48dbb30"
horo: 4
typography:
  partition: sale
  bondDegree: 16
standards:
  - "BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "3478a109-a2ef-89f2-afe7-0847b57745da"
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
      stageUuid: "ea962bee-2ecf-8b73-b784-aa6a8dcc129d"
    - stage: seal
      stageUuid: "cdb87415-db6a-8d78-abf2-581abbd33b16"
    - stage: uuid
      stageUuid: "a40a01c2-d476-84e2-a944-754bad3c8668"
version: 2
---
# immutability

A fiscalised sale is immutable. Under Наредба Н-18 a closed sale is corrected by issuing a **reversal** ([[sale/reverse]]), never by editing or deleting the original — the audit trail must show what happened, including the mistake.

Composes: [[sale]] · [[law]].
