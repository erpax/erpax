---
name: validator
description: Use when reasoning about validator — Case balance law—charge and defence must balance into judgment before sealing
atomPath: "cases/validator"
coordinate: "cases/validator · 7/descent · bac11127"
contentUuid: "b4301e0c-3b95-5fff-a656-4be3e8ed6d8e"
diamondUuid: "1a7afb0b-7f3f-8e8b-86d2-c022d90ae69f"
uuid: "bac11127-1046-8e3f-849a-e8066b03fe8e"
horo: 7
typography:
  partition: cases
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "7264a731-c956-8666-b84a-245ef961c1ea"
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
      stageUuid: "95fd0461-4810-8e78-8fdb-4baf01854554"
    - stage: seal
      stageUuid: "2219b058-3e1c-81e5-a8d3-33f9c3a14b6b"
    - stage: uuid
      stageUuid: "a6ae7df6-6953-88f9-9cd6-d8f4d107e277"
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
