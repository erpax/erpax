---
name: lifecycle
description: Use when reasoning about lifecycle — Case state machine on the horo ring—filed to sealed through seven positions
atomPath: "cases/lifecycle"
coordinate: "cases/lifecycle · 2/share · 7d350e48"
contentUuid: "19bcc640-96d0-51b3-98d2-1444f491a027"
diamondUuid: "bb7f8463-fc46-8c17-a72e-e59331a47b52"
uuid: "7d350e48-503c-8994-b6ea-dfc50620b1a9"
horo: 2
typography:
  partition: cases
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "1d0d3616-7f71-8a9c-9717-7eef6674a449"
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
      stageUuid: "291d4335-5f64-8f11-a619-ba5f0fecae31"
    - stage: seal
      stageUuid: "d3f0646c-8c5b-824b-9a2d-080e365dbc25"
    - stage: uuid
      stageUuid: "ff8899f3-c17e-8f58-8b04-4a5398768ad5"
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
