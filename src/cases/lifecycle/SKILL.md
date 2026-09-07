---
name: lifecycle
description: Use when reasoning about lifecycle — Case state machine on the horo ring—filed to sealed through seven positions
atomPath: "cases/lifecycle"
coordinate: "cases/lifecycle · 7/descent · 40153fb9"
contentUuid: "05be76a0-a8ef-5144-967d-a43b46bc777d"
diamondUuid: "cf244708-1c75-8546-8bc3-ee96dabad0da"
uuid: "40153fb9-d2d0-8a22-b319-a4076a7c587a"
horo: 7
typography:
  partition: cases
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "c5bc0297-6817-87bb-9fbe-e992a95039a3"
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
      stageUuid: "ed11fa64-7217-8e0e-8e44-7b12f8d9fe0a"
    - stage: seal
      stageUuid: "d3f0646c-8c5b-824b-9a2d-080e365dbc25"
    - stage: uuid
      stageUuid: "47fa9dae-e949-8d58-aa48-142f662e0b28"
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
