---
name: reference
description: "Use when validating that a sale's fiscal references resolve — a citation that leads nowhere makes the sale unreviewable, which is a legal defect rather than a cosmetic one."
atomPath: "sale/fiscal/reference"
coordinate: "sale/fiscal/reference · 7/descent · 39b18cad"
contentUuid: "08c40e33-7631-579e-8b6c-f28589f282e0"
diamondUuid: "37f8bf67-02de-8127-82f9-89c4a0dbc78c"
uuid: "39b18cad-dd98-8395-b06b-8de22394586d"
horo: 7
typography:
  partition: sale
  bondDegree: 85
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature"
bindings: []
signatures:
  computationUuid: "ac746e25-91eb-898a-b5a7-6f3054a5c3e4"
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
      stageUuid: "ff5d7198-51a8-89c3-8347-5d0209b41835"
    - stage: seal
      stageUuid: "a315d9c2-40cf-8479-a834-e538503650a7"
    - stage: uuid
      stageUuid: "4d4f06d2-3ab3-8c2b-9489-99b351bf3f49"
version: 2
---
# reference

Validates that a sale's fiscal references resolve. Наредба Н-18 requires the software to be documented and inspectable, and ISO-19011 §6.4 requires a citation to lead to its evidence — so a dangling reference is not untidy, it is **unreviewable** ([[rules]]/reference).

Composes: [[sale]] · [[law]].
