---
name: taxexempt
description: "Use when reasoning about taxexempt — Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation"
atomPath: taxexempt
coordinate: "taxexempt · 5/round · e45a9b3c"
contentUuid: "109143ad-2121-53ac-95a9-8ec8724760e3"
diamondUuid: "67959cca-c481-836b-b97b-fc79f6303286"
uuid: "e45a9b3c-1f44-854e-b0bb-2b98a25b277c"
horo: 5
typography:
  partition: taxexempt
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "a8901714-921d-81e5-930a-ba15fc9a88f1"
  stages:
    - stage: path
      stageUuid: "33b05baf-d69b-8843-85ba-0090ba5a3411"
    - stage: trinity
      stageUuid: "3ce8d394-b904-8106-9143-fe48085234cb"
    - stage: boundary
      stageUuid: "9f29df55-6c18-8c50-b229-0bfa36840a55"
    - stage: links
      stageUuid: "a17751d7-fbb3-8af2-b76e-4e61352bd5ef"
    - stage: horo
      stageUuid: "c347a728-c599-8dd3-9fe4-70ff74748541"
    - stage: seal
      stageUuid: "519cb7df-e33b-8ae7-80b8-cbd2a7bc7696"
    - stage: uuid
      stageUuid: "16416b8a-10c9-83d0-ad69-54f32448f3a0"
version: 2
---
# taxexempt

Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation

Composes: [[tax]] · [[legal/entities]] · [[tax/jurisdictions/deferred/tax/items]] · [[gl/accounts/tax/calculations]] · [[disclosure]] · [[standard]].

## Standards
- IAS-12 §26-29 (non-taxable income)
- FASB ASC 740-10-30 (tax-exempt organizations)
