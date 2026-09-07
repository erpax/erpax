---
name: types
description: "Use when reasoning about types — Canonical UN/EDIFACT message types — semantic structure only."
atomPath: "un/edifact/types"
coordinate: "un/edifact/types · 4/weave · a899d566"
contentUuid: "3a6b437e-732a-5fc9-8576-63f125c962f6"
diamondUuid: "0d762f96-34e2-8cdb-9918-5c18c2f40aba"
uuid: "a899d566-8d6c-8338-8f0e-52454966278e"
horo: 4
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
  computationUuid: "b0a6d42d-d87a-8f01-a33e-309fbf3c8fb3"
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
      stageUuid: "c981bfe7-b3c5-8613-b8ed-6da21c896779"
    - stage: seal
      stageUuid: "12411cb2-6550-8cdf-a679-2394c253f00c"
    - stage: uuid
      stageUuid: "0cf2d484-36d9-8fa6-b21c-b687cae5b811"
version: 2
---
# un/edifact/types

Canonical UN/EDIFACT message types — semantic structure only.

Extracted from `un/edifact/types.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
