---
name: validator
description: Use when reasoning about validator — Case balance law—charge and defence must balance into judgment before sealing
atomPath: "cases/validator"
coordinate: "cases/validator · 4/weave · 0865aa83"
contentUuid: "4c418a6e-ed2e-514e-b09a-9c68f5f0d83a"
diamondUuid: "4f705fd7-5f95-8927-aaa4-b5e44791a60b"
uuid: "0865aa83-0ae7-8b12-8315-77444b1be908"
horo: 4
typography:
  partition: cases
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "e3d71b97-f0d8-8d2d-9558-d492c00d9922"
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
      stageUuid: "64edd07f-2133-88ea-9d91-489f00fa1f0a"
    - stage: seal
      stageUuid: "2219b058-3e1c-81e5-a8d3-33f9c3a14b6b"
    - stage: uuid
      stageUuid: "efa105dd-fbb9-8f05-b8f5-95a41c7eb255"
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
