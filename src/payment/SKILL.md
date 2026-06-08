---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: payment · 7/descent · f940fc93
contentUuid: "255f9a94-1f00-5f41-846f-6908c6a07599"
diamondUuid: "c903dd8e-4326-8f4d-8141-085598f6a2db"
uuid: "f940fc93-6501-8579-8a82-2592014ef614"
horo: 7
bonds:
  in:
    - accepted
    - accounting
    - amount
    - api
    - applies
    - card
    - charge
    - commerce
    - contactless
    - currency
    - date
    - down
    - due
    - frequency
    - law
    - loan
    - minimum
    - quantum
    - run
    - scheduled
    - service
    - specification
    - trading
    - transaction
    - url
  out:
    - accepted
    - accounting
    - amount
    - api
    - applies
    - card
    - charge
    - commerce
    - contactless
    - currency
    - date
    - down
    - due
    - frequency
    - law
    - loan
    - minimum
    - quantum
    - run
    - scheduled
    - service
    - specification
    - trading
    - transaction
    - url
typography:
  partition: payment
  bondDegree: 77
  neighbors: []
standards:
  - "ISO-9362"
  - "NIST-SP-800-38D"
bindings: []
neighbors:
  wikilink:
    - accounting
    - amount
    - commerce
    - currency
    - date
    - law
    - transaction
  matrix:
    - accepted
    - accounting
    - amount
    - api
    - applies
    - card
    - charge
    - commerce
    - contactless
    - currency
    - date
    - down
    - due
    - frequency
    - law
    - loan
    - minimum
    - quantum
    - run
    - scheduled
    - service
    - specification
    - trading
    - transaction
    - url
  backlinks:
    - accepted
    - accounting
    - amount
    - api
    - applies
    - card
    - charge
    - commerce
    - contactless
    - currency
    - date
    - down
    - due
    - frequency
    - law
    - loan
    - minimum
    - quantum
    - run
    - scheduled
    - service
    - specification
    - trading
    - transaction
    - url
signatures:
  computationUuid: "c86488b7-d653-81fd-818b-6523723e4f5e"
  stages:
    - stage: path
      stageUuid: "fce1c4ca-2d13-8596-ab81-de229be75d71"
    - stage: trinity
      stageUuid: "a08fd577-9d6c-8a8c-a974-487016d4298a"
    - stage: boundary
      stageUuid: "6c0d2afa-a966-8dcc-b83b-c3cb8fff9b41"
    - stage: links
      stageUuid: "907f79ce-678e-8fbb-a427-8f7b5453c20e"
    - stage: horo
      stageUuid: "ba4312a5-daa4-8eeb-99d8-5a60e02c89a6"
    - stage: seal
      stageUuid: "75b5462c-cd45-88f4-8807-534ccbe848cd"
    - stage: uuid
      stageUuid: "7a555f04-80c2-89ff-bb86-93f1fd17b776"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
