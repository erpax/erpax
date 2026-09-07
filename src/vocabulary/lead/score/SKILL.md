---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 8/crest · fa9452f3"
contentUuid: "c7b10fce-b821-56e4-8b7b-0deaac928aaf"
diamondUuid: "27886446-9175-8881-80a5-57d437b2d763"
uuid: "fa9452f3-f5af-8d1c-9148-2d5f46b66ec6"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "8be752a6-9976-8c24-98ca-202793a294c9"
  stages:
    - stage: path
      stageUuid: "a307075b-9109-881c-8ed4-8ec4ca625397"
    - stage: trinity
      stageUuid: "6d10aa46-f483-8a53-9bd4-ca2e5a24848f"
    - stage: boundary
      stageUuid: "6c6049cf-e8ac-8e2d-beb2-8e1f163e2ee0"
    - stage: links
      stageUuid: "07168ac0-c308-8815-9fb6-d542f4697ab4"
    - stage: horo
      stageUuid: "592fb8ac-0bef-86c9-9d78-7f2509d075e3"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "c6582b53-e301-8034-a9e7-ce504ba59035"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
