---
name: reference
description: "Use when validating that a sale's fiscal references resolve — a citation that leads nowhere makes the sale unreviewable, which is a legal defect rather than a cosmetic one."
atomPath: "sale/fiscal/reference"
coordinate: "sale/fiscal/reference · 1/base · 68f264a4"
contentUuid: "c25307ec-5ece-534a-8f45-61ef2a742fb7"
diamondUuid: "b4db0344-1d40-8c4c-9a43-c41ab8f3be3e"
uuid: "68f264a4-c162-8c69-87a3-5410c0fd4b42"
horo: 1
typography:
  partition: sale
  bondDegree: 81
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature"
bindings: []
signatures:
  computationUuid: "99253e4e-b103-843c-a1ce-34f053b63b7d"
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
      stageUuid: "fd24e245-9887-87e0-bb41-59d7e4cdd8cd"
    - stage: seal
      stageUuid: "a315d9c2-40cf-8479-a834-e538503650a7"
    - stage: uuid
      stageUuid: "4e53c774-d23d-8a91-a70a-2c6068fbc449"
version: 2
---
# reference

Validates that a sale's fiscal references resolve. Наредба Н-18 requires the software to be documented and inspectable, and ISO-19011 §6.4 requires a citation to lead to its evidence — so a dangling reference is not untidy, it is **unreviewable** ([[rules]]/reference).

Composes: [[sale]] · [[law]].
