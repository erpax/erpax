---
name: lifecycle
description: Use when reasoning about lifecycle — Case state machine on the horo ring—filed to sealed through seven positions
atomPath: "cases/lifecycle"
coordinate: "cases/lifecycle · 2/share · 75c283cf"
contentUuid: "f5ebcdfd-1198-542c-b20b-163ea533018f"
diamondUuid: "5ddcf603-0780-8cc8-9b68-ecf862a47c2e"
uuid: "75c283cf-f136-8ecd-8c07-83083bc1e723"
horo: 2
typography:
  partition: cases
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "7d63c67b-a50d-81b4-be66-735e48b0a0cc"
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
      stageUuid: "9ca6b41d-8c3f-87ce-a1b3-9bc4089437b6"
    - stage: seal
      stageUuid: "d3f0646c-8c5b-824b-9a2d-080e365dbc25"
    - stage: uuid
      stageUuid: "0d35388d-e2da-8e15-926a-3438da5550f0"
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
