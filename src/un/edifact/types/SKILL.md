---
name: types
description: "Use when reasoning about types — Canonical UN/EDIFACT message types — semantic structure only."
atomPath: "un/edifact/types"
coordinate: "un/edifact/types · 2/share · 3249ebf7"
contentUuid: "d3040bf8-d7d4-5830-9cb9-5e854f3fd654"
diamondUuid: "547fc8d0-5aa0-8801-a435-274059397a05"
uuid: "3249ebf7-29a2-8aed-985d-4f67f6365675"
horo: 2
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
  computationUuid: "1dd53cf5-2bf0-835c-8473-4a4599b1acd4"
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
      stageUuid: "0f0c7b01-9396-8692-9ec5-9dfbab3babe9"
    - stage: seal
      stageUuid: "12411cb2-6550-8cdf-a679-2394c253f00c"
    - stage: uuid
      stageUuid: "27593b01-d916-8104-a843-23066107b5bb"
version: 2
---
# un/edifact/types

Canonical UN/EDIFACT message types — semantic structure only.

Extracted from `un/edifact/types.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
