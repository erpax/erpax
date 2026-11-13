---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 4/weave · e3a9327f"
contentUuid: "243a47fc-7ef1-5620-b740-811bec1372e4"
diamondUuid: "7f9889a5-ba1d-8cf2-9bd1-6cf5574c309f"
uuid: "e3a9327f-36dc-8801-8f9a-91ea5efc0dfb"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "0bd60b19-6aec-8800-b1a8-d4c81c675612"
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
      stageUuid: "17d175e0-b1f4-8c96-82e7-4ea93578dc99"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "1a1ea930-f32d-868a-9ae2-3fbbf7ffbcc7"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · segment · [[Activities]] · prospect.

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
