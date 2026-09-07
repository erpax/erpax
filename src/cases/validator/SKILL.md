---
name: validator
description: Use when reasoning about validator — Case balance law—charge and defence must balance into judgment before sealing
atomPath: "cases/validator"
coordinate: "cases/validator · 2/share · a7a1870e"
contentUuid: "25f70e4b-2436-59c7-ae08-70df5d293c4a"
diamondUuid: "4b19b1d0-513a-828a-8b5e-65fb738b3db3"
uuid: "a7a1870e-b60c-873d-a65d-167b72e0883e"
horo: 2
typography:
  partition: cases
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "d61c6d2d-6483-8e15-940f-4e685230151c"
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
      stageUuid: "18ca7df7-1c16-866a-a817-742fac450ce7"
    - stage: seal
      stageUuid: "2219b058-3e1c-81e5-a8d3-33f9c3a14b6b"
    - stage: uuid
      stageUuid: "e9c1068d-d30d-8996-aac9-43d0acda7d09"
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
