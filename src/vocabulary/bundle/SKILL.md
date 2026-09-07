---
name: bundle
description: "Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles."
atomPath: "vocabulary/bundle"
coordinate: "vocabulary/bundle · 8/crest · e2dc03c8"
contentUuid: "9f4ecd41-6f7f-5a16-b54b-190a5f65a4d7"
diamondUuid: "12f8d133-2405-877e-ab39-bd119791ee6b"
uuid: "e2dc03c8-9d22-8eae-9870-e1aeb9d1e02c"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "ad45362c-8274-8c0c-a6d1-2d5fa09b9521"
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
      stageUuid: "f297fffc-51ac-8932-b05b-1d5be8c1316e"
    - stage: seal
      stageUuid: "7254473c-e777-87d0-bc58-d039947a5d21"
    - stage: uuid
      stageUuid: "7aec2b13-ac52-8114-a0bc-c2fd55038ab4"
version: 2
---
# bundle

Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles.

Composes: [[Items]] · [[items/bills/of/materials]] · [[customers/sales/orders]] · [[discount]] · [[variant]].

## Standards
- CRM-generic

**Law — [[law]]: a bundle packages multiple [[Items]] for joint sale, priced as a bundle (with its own [[discount]] rules) rather than as the sum of its components.**
