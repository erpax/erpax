---
name: bundle
description: "Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles."
atomPath: "vocabulary/bundle"
coordinate: "vocabulary/bundle · 8/crest · 840e70f9"
contentUuid: "25586cb5-e0bc-5fe7-a8a9-876562ef7ce3"
diamondUuid: "f054a527-4ba4-8bff-9e9b-94bc7e2ed1a3"
uuid: "840e70f9-067b-8ef8-9fd2-a78a818bdfc2"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "77d3a92a-dc8b-8efa-9918-52e2744e7829"
  stages:
    - stage: path
      stageUuid: "393bbaf6-d189-8ee9-9694-aa21b4de91b2"
    - stage: trinity
      stageUuid: "3e7bd9a8-0ccf-81c0-a4fc-be800b2d60c8"
    - stage: boundary
      stageUuid: "51cf19ce-c4b4-8b6d-8a95-891f05672301"
    - stage: links
      stageUuid: "f71a29f9-c127-8769-8d11-858541f32b69"
    - stage: horo
      stageUuid: "c658e0be-cac4-8469-b682-a7152e8d1d6d"
    - stage: seal
      stageUuid: "7dbaa0b0-25e0-88b0-8a60-7bdc8a1ebdb5"
    - stage: uuid
      stageUuid: "36847479-dcab-8ea3-a38a-100c2cdcce1c"
version: 2
---
# bundle

Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles.

Composes: [[Items]] · [[items/bills/of/materials]] · [[customers/sales/orders]] · [[discount]] · [[variant]].

## Standards
- CRM-generic

**Law — [[law]]: a bundle packages multiple [[Items]] for joint sale, priced as a bundle (with its own [[discount]] rules) rather than as the sum of its components.**
