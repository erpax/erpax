---
name: reference
description: "Use when validating that a sale's fiscal references resolve — a citation that leads nowhere makes the sale unreviewable, which is a legal defect rather than a cosmetic one."
atomPath: "sale/fiscal/reference"
coordinate: "sale/fiscal/reference · 8/crest · 3369a45b"
contentUuid: "fca41fe6-1391-5d26-ba5a-b73781431ff2"
diamondUuid: "152b4bea-3491-8620-8b07-87855cf3f187"
uuid: "3369a45b-da2d-8488-a1ea-62190dec2563"
horo: 8
typography:
  partition: sale
  bondDegree: 85
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature"
bindings: []
signatures:
  computationUuid: "2df9a4f4-00c5-8972-b78e-db81bef1ed0f"
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
      stageUuid: "eec58a3d-bbab-8648-9c27-167211de31df"
    - stage: seal
      stageUuid: "a315d9c2-40cf-8479-a834-e538503650a7"
    - stage: uuid
      stageUuid: "de715901-e8be-80a2-9845-1d8130c3e752"
version: 2
---
# reference

Validates that a sale's fiscal references resolve. Наредба Н-18 requires the software to be documented and inspectable, and ISO-19011 §6.4 requires a citation to lead to its evidence — so a dangling reference is not untidy, it is **unreviewable** ([[rules]]/reference).

Composes: [[sale]] · [[law]].
