---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 7/descent · b48bb0d2"
contentUuid: "799e3b8d-2388-515b-8ddc-09189843d314"
diamondUuid: "a166d970-6b75-8e20-9aab-d66acd6ccbee"
uuid: "b48bb0d2-7310-82f8-bc0f-202bdabab33b"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "50f1e553-5064-82cf-8e1d-19d922f330cf"
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
      stageUuid: "b44b3cb7-d38d-8105-9975-7656cbc42d32"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "19750ec4-8e3e-8566-8cc8-820798a4ce3a"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
