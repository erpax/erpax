---
name: taxexempt
description: "Use when reasoning about taxexempt — Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation"
atomPath: taxexempt
coordinate: "taxexempt · 5/round · 01a98c5b"
contentUuid: "ddf6b212-2b5e-534d-9fb5-0d9243d7f021"
diamondUuid: "51e65fac-24f6-8655-b418-599d870960d9"
uuid: "01a98c5b-f1af-8d1d-b0fe-8ce9853d1fde"
horo: 5
typography:
  partition: taxexempt
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "9452d2bd-2b5b-835a-a8ca-cecc549a7305"
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
      stageUuid: "04a77367-2ac5-87e5-b366-0b04c8764dd6"
    - stage: seal
      stageUuid: "519cb7df-e33b-8ae7-80b8-cbd2a7bc7696"
    - stage: uuid
      stageUuid: "700ab8bc-c5b9-8723-9967-53a6c7369964"
version: 2
---
# taxexempt

Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation

Composes: [[tax]] · [[legal/entities]] · [[tax/jurisdictions/deferred/tax/items]] · [[gl/accounts/tax/calculations]] · [[disclosure]] · [[standard]].

## Standards
- IAS-12 §26-29 (non-taxable income)
- FASB ASC 740-10-30 (tax-exempt organizations)
