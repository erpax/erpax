---
name: lifecycle
description: Use when reasoning about lifecycle — Case state machine on the horo ring—filed to sealed through seven positions
atomPath: "cases/lifecycle"
coordinate: "cases/lifecycle · 4/weave · 128e6ca6"
contentUuid: "3e484543-e587-53b7-8d74-c9b373abfe15"
diamondUuid: "ecf18113-2570-8fe9-a674-cad8876c8b3a"
uuid: "128e6ca6-45c9-8258-bc96-12262fc6c2a1"
horo: 4
typography:
  partition: cases
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "b3859a21-e189-85c7-bfa7-27902a2103e1"
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
      stageUuid: "852c1eaa-e466-8a2b-944d-9f16e0a93550"
    - stage: seal
      stageUuid: "d3f0646c-8c5b-824b-9a2d-080e365dbc25"
    - stage: uuid
      stageUuid: "9025edc6-037d-834f-b38f-1f5ea99fa302"
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
