---
name: taxexempt
description: "Use when reasoning about taxexempt — Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation"
atomPath: taxexempt
coordinate: "taxexempt · 4/weave · 1fe8126f"
contentUuid: "2809b775-24fa-516a-a60c-3991b903e078"
diamondUuid: "e0e35a0c-afab-8591-8d23-1080f58ef7c9"
uuid: "1fe8126f-07b0-86fa-b878-e60f8bdc5437"
horo: 4
typography:
  partition: taxexempt
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "97f14f21-2a3a-8f01-b201-9bd6edacc644"
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
      stageUuid: "3cf8eab7-dd34-875b-b58d-76858525e8be"
    - stage: seal
      stageUuid: "519cb7df-e33b-8ae7-80b8-cbd2a7bc7696"
    - stage: uuid
      stageUuid: "213f89aa-4a8b-80d1-9d02-b2e053f44f01"
version: 2
---
# taxexempt

Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation

Composes: [[tax]] · [[legal/entities]] · [[tax/jurisdictions/deferred/tax/items]] · [[gl/accounts/tax/calculations]] · [[disclosure]] · [[standard]].

## Standards
- IAS-12 §26-29 (non-taxable income)
- FASB ASC 740-10-30 (tax-exempt organizations)
