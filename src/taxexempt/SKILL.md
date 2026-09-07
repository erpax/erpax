---
name: taxexempt
description: "Use when reasoning about taxexempt — Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation"
atomPath: taxexempt
coordinate: "taxexempt · 8/crest · 17abef93"
contentUuid: "76856598-292c-53c6-b3ae-96e53f741989"
diamondUuid: "3c167599-9458-8d94-a48b-f609f7d24586"
uuid: "17abef93-6479-8279-aecc-a50002d2427a"
horo: 8
typography:
  partition: taxexempt
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "7fb7124e-c301-8a91-b024-1af9a4e29657"
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
      stageUuid: "78270e44-67ae-8240-9d7f-4ff2df1a1219"
    - stage: seal
      stageUuid: "519cb7df-e33b-8ae7-80b8-cbd2a7bc7696"
    - stage: uuid
      stageUuid: "117b5207-13f1-8ef4-8dd9-e731fec8fb7a"
version: 2
---
# taxexempt

Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation

Composes: [[tax]] · [[legal/entities]] · [[tax/jurisdictions/deferred/tax/items]] · [[gl/accounts/tax/calculations]] · [[disclosure]] · [[standard]].

## Standards
- IAS-12 §26-29 (non-taxable income)
- FASB ASC 740-10-30 (tax-exempt organizations)
