---
name: taxexempt
description: "Use when reasoning about taxexempt — Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation"
atomPath: taxexempt
coordinate: "taxexempt · 7/descent · ce622a5b"
contentUuid: "013a9575-9b3a-51c8-9020-c5a1c5285dff"
diamondUuid: "2da901bb-8eae-8ea0-9d0a-c971cb3c932b"
uuid: "ce622a5b-d100-85e6-b0bc-f39671f58404"
horo: 7
typography:
  partition: taxexempt
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "337a0787-b350-81be-a14c-f3605740cd22"
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
      stageUuid: "f2f64e57-1b65-845f-ae20-585b5b63c219"
    - stage: seal
      stageUuid: "519cb7df-e33b-8ae7-80b8-cbd2a7bc7696"
    - stage: uuid
      stageUuid: "3e29b189-c9a6-8690-bbbc-57a36a3013e9"
version: 2
---
# taxexempt

Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation

Composes: [[tax]] · [[legal/entities]] · [[tax/jurisdictions/deferred/tax/items]] · [[gl/accounts/tax/calculations]] · [[disclosure]] · [[standard]].

## Standards
- IAS-12 §26-29 (non-taxable income)
- FASB ASC 740-10-30 (tax-exempt organizations)
