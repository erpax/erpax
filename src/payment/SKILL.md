---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 8/crest · eeed0ab1"
contentUuid: "f2402a2a-afb2-5ab6-a79b-7b8211652b39"
diamondUuid: "5c41a56b-0a9d-8806-9943-c218c5d88471"
uuid: "eeed0ab1-29c4-8c2e-b1ab-e8e0faced38d"
horo: 8
typography:
  partition: payment
  bondDegree: 76
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "f7c40d2a-262c-82fb-a4a2-0f8c174f6341"
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
      stageUuid: "ae22b5e1-5aa0-8731-ad9e-2b0c8dc4d786"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "f0e0b15a-423f-8513-9c86-46fd94675d8d"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
