---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 7/descent · 8bb27841"
contentUuid: "05fe28cb-95d6-5daf-b3b9-8779b8657b22"
diamondUuid: "1bcf32ab-0260-848f-9266-c822a31ef644"
uuid: "8bb27841-1878-8171-9a79-a7f60ae94c47"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "c2dda68b-0f2d-81da-9b20-24ad181a2050"
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
      stageUuid: "c0d21ee1-d69f-82dc-9781-712e1752684b"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "651ae2a4-5cea-8570-bf20-d01cbbfc2774"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
