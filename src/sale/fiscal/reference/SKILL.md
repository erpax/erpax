---
name: reference
description: "Use when validating that a sale's fiscal references resolve — a citation that leads nowhere makes the sale unreviewable, which is a legal defect rather than a cosmetic one."
atomPath: "sale/fiscal/reference"
coordinate: "sale/fiscal/reference · 8/crest · 50dd4c99"
contentUuid: "168973aa-bd52-5077-9f17-4d910988ea29"
diamondUuid: "38b2776d-942a-827e-9a2b-aaa8b74c355d"
uuid: "50dd4c99-f23f-87e0-a6a9-064f830020aa"
horo: 8
typography:
  partition: sale
  bondDegree: 81
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature"
bindings: []
signatures:
  computationUuid: "892f1835-64ae-8c99-91aa-676649cfb4fe"
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
      stageUuid: "3f141766-2f96-82c3-b146-62a3cc8e7844"
    - stage: seal
      stageUuid: "a315d9c2-40cf-8479-a834-e538503650a7"
    - stage: uuid
      stageUuid: "40bd6f4d-c2f4-8576-97b3-ce4a64cdaff7"
version: 2
---
# reference

Validates that a sale's fiscal references resolve. Наредба Н-18 requires the software to be documented and inspectable, and ISO-19011 §6.4 requires a citation to lead to its evidence — so a dangling reference is not untidy, it is **unreviewable** ([[rules]]/reference).

Composes: [[sale]] · [[law]].
