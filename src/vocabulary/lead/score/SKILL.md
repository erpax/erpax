---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 7/descent · 15fc4933"
contentUuid: "373d664f-6c5e-59e6-8e14-2b82c5414056"
diamondUuid: "1449d758-b9da-899e-ac3c-fdcb86b0fd7b"
uuid: "15fc4933-2fbb-8800-a040-4d55a6281489"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "2c35aad6-bfad-861e-b5d5-0f2f2366eecf"
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
      stageUuid: "3c2c2e4b-e715-8218-9d56-4c6cb3c95ec5"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "41ce372d-3b3d-8328-9054-7c5a795e194c"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
