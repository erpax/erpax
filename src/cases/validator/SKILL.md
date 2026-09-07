---
name: validator
description: Use when reasoning about validator — Case balance law—charge and defence must balance into judgment before sealing
atomPath: "cases/validator"
coordinate: "cases/validator · 4/weave · 5fbc3c70"
contentUuid: "aa5f8636-385c-50da-aeb5-b0da2d13df6d"
diamondUuid: "76020a8b-c9d6-8e23-be1f-cfff026646f9"
uuid: "5fbc3c70-8dda-860f-92fe-181171d5d290"
horo: 4
typography:
  partition: cases
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "bc031d29-331c-82c9-8e1d-5a3ea631f393"
  stages:
    - stage: path
      stageUuid: "8aae7221-da46-8776-8435-bc33d7dbcd17"
    - stage: trinity
      stageUuid: "315b4cb6-8b7a-8381-b5f6-92f14a664e36"
    - stage: boundary
      stageUuid: "7e7cc0c9-0f55-88b1-ac43-6b0d446b29b6"
    - stage: links
      stageUuid: "f822ae73-fc6d-8bfa-8ab6-1e0a75e72b91"
    - stage: horo
      stageUuid: "7cb485b6-4036-84df-a141-3e1933e18bad"
    - stage: seal
      stageUuid: "2219b058-3e1c-81e5-a8d3-33f9c3a14b6b"
    - stage: uuid
      stageUuid: "84943e63-d677-8112-a7bf-aec33d61714f"
version: 2
---
# cases/validator — case balance law (charge ↔ defence → judgment)

A case seals only when charge and defence balance into a judgment. The ledger-closing rule applied to public order.

## when

Use when validating a case transition to sealed, or when enforcing the double-entry rule in justice.

## law

A case seals only when charge↔defence balance into a judgment. Without the judgment the books do not balance.

## code

entry `@/cases/validator` · sealed `0` · trinity `1·1·0`
exports requireJudgmentToSeal · validateCaseTransition · neverDelete
imports payload

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cases]] · [[balance]] · [[seal]].
