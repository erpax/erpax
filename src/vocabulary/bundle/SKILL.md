---
name: bundle
description: "Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles."
atomPath: "vocabulary/bundle"
coordinate: "vocabulary/bundle · 1/base · 5e67a7e9"
contentUuid: "556c0141-c17b-56d9-90bc-d1f12ac2a7ec"
diamondUuid: "5bb79eb9-6032-8584-89c1-b2872b542698"
uuid: "5e67a7e9-1d8f-8159-9edb-05cbb490f210"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "17f2fcea-3224-8642-a6db-1696344338c5"
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
      stageUuid: "05f0f66c-6f52-8c28-8c5a-e478396e1b28"
    - stage: seal
      stageUuid: "7254473c-e777-87d0-bc58-d039947a5d21"
    - stage: uuid
      stageUuid: "9434e2bb-878e-8dbb-81a3-142603ea710d"
version: 2
---
# bundle

Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles.

Composes: [[Items]] · [[items/bills/of/materials]] · [[customers/sales/orders]] · [[discount]] · [[variant]].

## Standards
- CRM-generic

**Law — [[law]]: a bundle packages multiple [[Items]] for joint sale, priced as a bundle (with its own [[discount]] rules) rather than as the sum of its components.**
