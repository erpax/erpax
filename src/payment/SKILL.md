---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 4/weave · 6e5059d6"
contentUuid: "4a6c92af-89c5-5572-924d-6da8ca96ef05"
diamondUuid: "e5b2b52d-017a-868b-8a6b-2fa613e5a598"
uuid: "6e5059d6-a0fb-81d8-8f50-a2056b40d816"
horo: 4
typography:
  partition: payment
  bondDegree: 78
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "4d7fa5a6-fa7e-8225-983d-4de934d52392"
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
      stageUuid: "bd4167c0-aab0-8297-8265-f3e14d721677"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "db2bde0a-09ab-8d8e-b4e2-12ef03fc56a9"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
