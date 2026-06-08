---
name: taxexempt
description: "Use when reasoning about taxexempt — Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation"
atomPath: taxexempt
coordinate: taxexempt · 5/round · 1a3c620e
contentUuid: "43ad3a83-d20e-5db6-9c07-8fc9608baf5f"
diamondUuid: "1aee7621-8625-8d58-81aa-42b50c90d7d5"
uuid: "1a3c620e-5a26-8b6e-8da4-f6fee1357e63"
horo: 5
bonds:
  in:
    - calculations
    - deduction
    - disclosure
    - entities
    - items
    - standard
    - tax
  out:
    - calculations
    - deduction
    - disclosure
    - entities
    - items
    - standard
    - tax
typography:
  partition: taxexempt
  bondDegree: 22
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - calculations
    - disclosure
    - entities
    - items
    - standard
    - tax
  matrix:
    - calculations
    - deduction
    - disclosure
    - entities
    - items
    - standard
    - tax
  backlinks:
    - calculations
    - deduction
    - disclosure
    - entities
    - items
    - standard
    - tax
signatures:
  computationUuid: "9dc241b9-f4d3-8de4-a1e8-42c29b9a76f7"
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
      stageUuid: "4eab5230-a426-8f4f-b993-ebbfcc9863c9"
    - stage: seal
      stageUuid: "83bf78ec-1651-8f5e-aa88-831e58167ca6"
    - stage: uuid
      stageUuid: "8ab96c02-3191-82e4-b93c-6cec9d20076e"
version: 2
---
# taxexempt

Use for non-taxable income or entities exempt from income tax — requires jurisdiction-specific exemption testing and disclosure; affects deferred-tax calculation

Composes: [[tax]] · [[legal/entities]] · [[tax/jurisdictions/deferred/tax/items]] · [[gl/accounts/tax/calculations]] · [[disclosure]] · [[standard]].

## Standards
- IAS-12 §26-29 (non-taxable income)
- FASB ASC 740-10-30 (tax-exempt organizations)
