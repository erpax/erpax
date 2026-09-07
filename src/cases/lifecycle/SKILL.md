---
name: lifecycle
description: Use when reasoning about lifecycle — Case state machine on the horo ring—filed to sealed through seven positions
atomPath: "cases/lifecycle"
coordinate: "cases/lifecycle · 2/share · 42dc1158"
contentUuid: "c2f5438f-e3b7-57e6-8625-4a130d7a7187"
diamondUuid: "20d56b28-81b0-8aad-a38d-1be3b41ba71c"
uuid: "42dc1158-75dd-8394-9b2d-6a2c17c2874f"
horo: 2
typography:
  partition: cases
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "3f60da16-e99b-8328-8278-6dfe4b80e397"
  stages:
    - stage: path
      stageUuid: "c52bc31c-0ca7-8396-bc22-a6a6fbf1ab4d"
    - stage: trinity
      stageUuid: "dc760a2e-a2a8-8da8-b9bd-aacdeb486e1d"
    - stage: boundary
      stageUuid: "38564d9e-9374-821c-a9a6-67bb297100f0"
    - stage: links
      stageUuid: "a3940f79-03c9-83ed-9917-7f75530e926d"
    - stage: horo
      stageUuid: "7880116c-d4f0-82e2-9a11-10fd3d014efb"
    - stage: seal
      stageUuid: "d3f0646c-8c5b-824b-9a2d-080e365dbc25"
    - stage: uuid
      stageUuid: "ee3a1c6a-8230-8046-9e0a-345c01407126"
version: 2
---
# cases/lifecycle — the justice state machine on the horo ring

Every case moves through seven positions on the 1·2·4·8·7·5·9 ring—filed → served → discovery → heard → adjudicated → remedied → sealed. Off-ring is disharmony.

## when

Use when enforcing case transitions or querying valid next steps in the justice lifecycle.

## law

A case moves only through positions on the horo ring. Off-ring status is disharmony.

## code

entry `@/cases/lifecycle` · sealed `0` · trinity `1·1·0`
exports CASE_RING · HoroState · caseStepOf · nextCaseStep
imports @/horo

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>

Composes: [[cases]] · [[horo]].
