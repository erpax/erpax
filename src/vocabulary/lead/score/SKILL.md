---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 4/weave · e3a9327f"
contentUuid: "720aa0e8-1b03-5d7f-95e2-239d88b951e4"
diamondUuid: "6f6b2e69-5f54-89fb-9259-81c31d02155e"
uuid: "e3a9327f-36dc-8801-8f9a-91ea5efc0dfb"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "cc6ef58a-8734-86a9-9728-ba7f9292b186"
  stages:
    - stage: path
      stageUuid: "a307075b-9109-881c-8ed4-8ec4ca625397"
    - stage: trinity
      stageUuid: "6d10aa46-f483-8a53-9bd4-ca2e5a24848f"
    - stage: boundary
      stageUuid: "2871f0bb-31e5-88f7-915e-b7d41ffc1f3a"
    - stage: links
      stageUuid: "7a38d317-14e9-869a-8610-55e0ba58aa6c"
    - stage: horo
      stageUuid: "7e64bf01-ec87-88c0-a676-77ccbc57686b"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "1d75c00c-32ee-88be-a399-fe31c44bbe7c"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · segment · [[Activities]] · prospect.

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
