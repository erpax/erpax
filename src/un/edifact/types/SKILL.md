---
name: types
description: "Use when reasoning about types — Canonical UN/EDIFACT message types — semantic structure only."
atomPath: "un/edifact/types"
coordinate: "un/edifact/types · 4/weave · 8bbc77a9"
contentUuid: "390354b7-25b0-5d96-a767-f8399b5921ba"
diamondUuid: "7245f455-73b0-89b3-afdb-617fa5417e2e"
uuid: "8bbc77a9-d5b7-8ca6-83c7-3c46391d3a25"
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
  computationUuid: "bb5dc5da-1818-89b7-9e76-bbacdbd55372"
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
      stageUuid: "7ce7213d-1a02-87e2-b474-31678166ebb7"
    - stage: seal
      stageUuid: "12411cb2-6550-8cdf-a679-2394c253f00c"
    - stage: uuid
      stageUuid: "ddcf26b5-62a0-81d7-bdba-8430a19401af"
version: 2
---
# un/edifact/types

Canonical UN/EDIFACT message types — semantic structure only.

Extracted from `un/edifact/types.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
