---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 7/descent · 036acad9"
contentUuid: "54a90a7f-35c8-5a6c-98f5-f3e40ef67551"
diamondUuid: "a3a58737-238f-8694-a4e8-2bcb1f9a7dbf"
uuid: "036acad9-675d-82f0-9695-72b0e1234c85"
horo: 7
typography:
  partition: payment
  bondDegree: 76
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "23119bcb-7d40-8e0d-bad0-014932b6b5b5"
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
      stageUuid: "7c52765b-19ac-8e91-aee1-b1105af6ed05"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "52ca131c-610d-81ec-98a4-81e1685e9567"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
