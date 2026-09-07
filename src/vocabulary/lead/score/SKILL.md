---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 5/round · 106a09ed"
contentUuid: "4bffd87a-8420-5ca4-a902-18bbca32dd56"
diamondUuid: "8b6e155c-7e23-8c51-ae49-056a3a0a95e5"
uuid: "106a09ed-f8cf-85c2-8e40-75a95fc7c760"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "95a9e331-9a28-8492-bf21-93405a89de38"
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
      stageUuid: "fd94b3ba-b1c3-812d-9383-a6086162780f"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "ca0fa090-acd0-8f61-92f6-03e92f6bbfed"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
