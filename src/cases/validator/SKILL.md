---
name: validator
description: Use when reasoning about validator — Case balance law—charge and defence must balance into judgment before sealing
atomPath: "cases/validator"
coordinate: "cases/validator · 5/round · 02ea8d83"
contentUuid: "363a3895-19e0-555c-aec8-ed7a312528fd"
diamondUuid: "d599de93-7c47-8fb8-b04e-49a59eb1838b"
uuid: "02ea8d83-a7c9-8362-b1cc-6c4ed70debae"
horo: 5
typography:
  partition: cases
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "9526d57e-eb56-867d-8903-7bd01a92fbff"
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
      stageUuid: "fa0b68eb-423d-82ea-a606-2fb5ddc2a74a"
    - stage: seal
      stageUuid: "2219b058-3e1c-81e5-a8d3-33f9c3a14b6b"
    - stage: uuid
      stageUuid: "378b6631-49f6-8693-a743-2dadc623785c"
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
