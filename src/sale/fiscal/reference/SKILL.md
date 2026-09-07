---
name: reference
description: "Use when validating that a sale's fiscal references resolve — a citation that leads nowhere makes the sale unreviewable, which is a legal defect rather than a cosmetic one."
atomPath: "sale/fiscal/reference"
coordinate: "sale/fiscal/reference · 1/base · 6bca8058"
contentUuid: "3ee05122-f335-5195-abfa-e1bf1c44e34e"
diamondUuid: "c7aee197-2b4b-87a5-8f56-2bd90362889c"
uuid: "6bca8058-9a19-8068-a291-973c53144281"
horo: 1
typography:
  partition: sale
  bondDegree: 81
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature"
bindings: []
signatures:
  computationUuid: "b5fd831c-992c-81ed-9cc5-c6d31233e6e1"
  stages:
    - stage: path
      stageUuid: "85d46ff2-724c-896c-ae9e-17a8b930cc6f"
    - stage: trinity
      stageUuid: "2c34711e-deb5-8c23-8718-31ccd96f8dea"
    - stage: boundary
      stageUuid: "5a8d2392-8575-8440-b011-9494996dab0a"
    - stage: links
      stageUuid: "79494409-57ab-873a-8d57-d6e086abf7b4"
    - stage: horo
      stageUuid: "8df9ba2c-5739-8e3b-a5fc-2331f9beb8e7"
    - stage: seal
      stageUuid: "a315d9c2-40cf-8479-a834-e538503650a7"
    - stage: uuid
      stageUuid: "6b713804-0fdc-8509-aab6-8da0e11628c1"
version: 2
---
# reference

Validates that a sale's fiscal references resolve. Наредба Н-18 requires the software to be documented and inspectable, and ISO-19011 §6.4 requires a citation to lead to its evidence — so a dangling reference is not untidy, it is **unreviewable** ([[rules]]/reference).

Composes: [[sale]] · [[law]].
