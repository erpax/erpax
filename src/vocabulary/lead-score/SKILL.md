---
name: "lead-score"
description: "Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales."
atomPath: "vocabulary/lead-score"
coordinate: "vocabulary/lead-score · 1/base · 0e09eb44"
contentUuid: "efd47232-56d5-59af-be35-9da4745f3850"
diamondUuid: "7e12fa9a-ab26-853d-a9b9-3253421d1fdf"
uuid: "0e09eb44-7320-88bc-b2b8-a061564fcee5"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "c7bc3546-5afe-8978-9748-4cfdb6b24842"
  stages:
    - stage: path
      stageUuid: "522b4e19-94f0-80ca-9f41-cd0e788d1336"
    - stage: trinity
      stageUuid: "b0c14ad1-d2ef-836f-8479-7a8a28c5b7cb"
    - stage: boundary
      stageUuid: "e8d8fd8f-c04f-8d9c-8271-bf587d3edb0f"
    - stage: links
      stageUuid: "ea94c695-ad80-8981-b501-1a61368408f3"
    - stage: horo
      stageUuid: "69628ff7-9567-8470-96bd-030882e5bd23"
    - stage: seal
      stageUuid: "6293c1d9-6096-8910-82c4-d2387593f7c9"
    - stage: uuid
      stageUuid: "251186ae-c730-894e-908f-3568cff1f499"
version: 2
---
# lead-score

Use when ranking prospect/lead quality — behavioral signals, firmographic attributes, scoring model, threshold for handoff to sales.

Composes: [[Leads]] · [[Opportunities]] · [[segment]] · [[Activities]] · [[prospect]].

**Law — [[law]]: a lead-score is a DERIVED ranking of prospect quality (behavioural + firmographic signals against a model), not stored truth — a threshold crossing is the handoff event to sales.**

## Standards
- CRM-generic
