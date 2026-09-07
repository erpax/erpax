---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 7/descent · 4f120547"
contentUuid: "0ee26a2d-56ad-5fdc-91a6-60c9d4ce4bf6"
diamondUuid: "c2109cf0-cdd6-834e-8552-965377a9c744"
uuid: "4f120547-85d4-8ec4-8d8c-fc1b32e1be31"
horo: 7
typography:
  partition: payment
  bondDegree: 78
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "021029a6-d25b-8387-a9cd-09909e8a1e2d"
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
      stageUuid: "a42095ad-3ff1-8e35-9202-212d1ca5049a"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "bcaf408a-e75c-82dd-9274-2c2753f8376f"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
