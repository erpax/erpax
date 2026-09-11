---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 2/share · 2200a620"
contentUuid: "03a90da3-6ccb-5418-bada-d8fb257de96b"
diamondUuid: "15091fc4-9f32-8765-a1d4-7fb1f4fa3a56"
uuid: "2200a620-be91-83be-bd28-c2dcb5d8baf5"
horo: 2
typography:
  partition: payment
  bondDegree: 78
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "791fdd8a-2515-8b98-a679-8adb3a6edbb3"
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
      stageUuid: "3a76414d-1b20-8910-8fdb-dc8bd4f869e8"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "2c8d78ac-b2b7-864b-970a-ff23fb9132d5"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
