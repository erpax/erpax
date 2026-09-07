---
name: bundle
description: "Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles."
atomPath: "vocabulary/bundle"
coordinate: "vocabulary/bundle · 5/round · b344bcdb"
contentUuid: "f2e496cf-0c6a-5361-966d-9141d5f55faa"
diamondUuid: "bb2283dc-ee44-83c5-a296-bf93d6e757ec"
uuid: "b344bcdb-df06-81bd-a63a-97ae2a33ff73"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "ffa6e7d2-e415-8c51-9c9c-0b79f8cd9ecd"
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
      stageUuid: "b92b26a9-f7b6-8f25-b998-b50c1733131e"
    - stage: seal
      stageUuid: "7254473c-e777-87d0-bc58-d039947a5d21"
    - stage: uuid
      stageUuid: "ce1c9567-72d3-8010-94da-5f211075c20f"
version: 2
---
# bundle

Use when packaging multiple items for joint sale — bundle composition, bundle pricing (vs. component sum), discount rules for bundles.

Composes: [[Items]] · [[items/bills/of/materials]] · [[customers/sales/orders]] · [[discount]] · [[variant]].

## Standards
- CRM-generic

**Law — [[law]]: a bundle packages multiple [[Items]] for joint sale, priced as a bundle (with its own [[discount]] rules) rather than as the sum of its components.**
