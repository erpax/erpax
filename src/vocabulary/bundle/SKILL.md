---
name: bundle
description: "Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles."
atomPath: "vocabulary/bundle"
coordinate: "vocabulary/bundle · 5/round · 71087266"
contentUuid: "9b0c13c9-7a44-519d-900e-2900ccab160b"
diamondUuid: "e30bbc5e-2aa4-8ca5-90f9-11cb511a16f4"
uuid: "71087266-9ea9-8e4e-bb45-22e2d08b3583"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "dc09bcb4-6af8-8536-bce8-6a9a3b065e02"
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
      stageUuid: "2369fec0-bd99-8f1e-9681-21fca355ca6a"
    - stage: seal
      stageUuid: "7254473c-e777-87d0-bc58-d039947a5d21"
    - stage: uuid
      stageUuid: "6af42770-7515-828b-9518-1fc92938a6d5"
version: 2
---
# bundle

Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles.

Composes: [[Items]] · [[items/bills/of/materials]] · [[customers/sales/orders]] · [[discount]] · [[variant]].

## Standards
- CRM-generic

**Law — [[law]]: a bundle packages multiple [[Items]] for joint sale, priced as a bundle (with its own [[discount]] rules) rather than as the sum of its components.**
