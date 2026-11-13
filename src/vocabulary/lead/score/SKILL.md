---
name: score
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead/score"
coordinate: "vocabulary/lead/score · 7/descent · cb331952"
contentUuid: "fe0c2074-de6b-5a4e-84aa-a52fde14b21b"
diamondUuid: "cc1d2e4f-1649-8328-8a8c-56491eb44a69"
uuid: "cb331952-a314-8e77-bb12-689db235d9c1"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 32
standards: []
bindings: []
signatures:
  computationUuid: "b4e23191-2bf4-8720-8a2d-74f9d3df7af8"
  stages:
    - stage: path
      stageUuid: "a307075b-9109-881c-8ed4-8ec4ca625397"
    - stage: trinity
      stageUuid: "6d10aa46-f483-8a53-9bd4-ca2e5a24848f"
    - stage: boundary
      stageUuid: "3fda82eb-cd8e-81e8-ac83-fb32fb4d2e09"
    - stage: links
      stageUuid: "2f2f5496-cb3f-8ca0-9f69-bc4faa5796e1"
    - stage: horo
      stageUuid: "2124689a-ed72-8779-bba5-db5233ec0848"
    - stage: seal
      stageUuid: "cdb0f474-2724-878e-850c-ce0784c329d6"
    - stage: uuid
      stageUuid: "e9f2000a-4729-865f-b886-d411b0503c28"
version: 2
---
# score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · segment · [[Activities]] · prospect.

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
