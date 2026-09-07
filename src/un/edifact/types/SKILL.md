---
name: types
description: "Use when reasoning about types — Canonical UN/EDIFACT message types — semantic structure only."
atomPath: "un/edifact/types"
coordinate: "un/edifact/types · 5/round · 60b9fbdd"
contentUuid: "75ccb71d-ede1-527d-b1cb-3f57dcbc1ead"
diamondUuid: "4f688ea1-dd84-8427-a9b8-5f21f86a9f42"
uuid: "60b9fbdd-84eb-8449-b8a6-9ab73e2d2d13"
horo: 5
typography:
  partition: un
  bondDegree: 85
standards:
  - "ISO-9735"
  - "ISO-9735:2002 edifact-syntax-rules"
  - "ISO-9735:2002 syntax-identifier"
  - "UN-EDIFACT D.96A BGM beginning-of-message"
  - "UN-EDIFACT D.96A DESADV despatch-advice"
  - "UN-EDIFACT D.96A DTM date-time-period"
  - "UN-EDIFACT D.96A IMD item-description"
  - "UN-EDIFACT D.96A INVOIC invoice"
  - "UN-EDIFACT D.96A LIN line-item"
  - "UN-EDIFACT D.96A MOA monetary-amount"
  - "UN-EDIFACT D.96A NAD name-and-address"
  - "UN-EDIFACT D.96A PAYMUL multiple-payment-order"
  - "UN-EDIFACT D.96A PRI price-details"
  - "UN-EDIFACT D.96A QTY quantity"
  - "UN-EDIFACT D.96A TAX tax-duty-fee"
  - "UN-EDIFACT D.96A UNB interchange-header"
  - "UN-EDIFACT D.96A UNH message-header"
  - "UN-EDIFACT D.96A UNT message-trailer"
  - "UN-EDIFACT D.96A UNZ interchange-trailer"
  - "UN-EDIFACT D.96A interchange"
  - "UN-EDIFACT D.96A invoic-line"
  - "UN-EDIFACT D.96A invoice-message"
  - "UN-EDIFACT message-types"
bindings: []
signatures:
  computationUuid: "53fc73ec-33f5-88b0-95ee-224122b2739c"
  stages:
    - stage: path
      stageUuid: "10b076ae-21b4-8214-8d7c-aec4c9a59fa2"
    - stage: trinity
      stageUuid: "a959029c-9373-893b-9040-5f6f8989818b"
    - stage: boundary
      stageUuid: "832e64ba-c7d8-8479-b6ee-bcaf9b187b7b"
    - stage: links
      stageUuid: "2e856fd6-893e-8366-848b-d4f042ae349d"
    - stage: horo
      stageUuid: "1b36baa2-ab8e-8c35-a26c-5b02cb7898e2"
    - stage: seal
      stageUuid: "12411cb2-6550-8cdf-a679-2394c253f00c"
    - stage: uuid
      stageUuid: "4f1454b9-a2cc-8be5-be9a-17ac06daa104"
version: 2
---
# un/edifact/types

Canonical UN/EDIFACT message types — semantic structure only.

Extracted from `un/edifact/types.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
