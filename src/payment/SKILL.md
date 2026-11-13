---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 4/weave · 8c68da92"
contentUuid: "5b7a1e71-daa3-5c37-8bba-d0c27959ebb9"
diamondUuid: "382cada8-f9cc-8760-96ab-b9c46981a2e1"
uuid: "8c68da92-04ae-8f47-8357-cbbd2250b2ce"
horo: 4
typography:
  partition: payment
  bondDegree: 39
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "eec4a1b4-68dc-801d-80f5-8fc5a6f0aa17"
  stages:
    - stage: path
      stageUuid: "fce1c4ca-2d13-8596-ab81-de229be75d71"
    - stage: trinity
      stageUuid: "a08fd577-9d6c-8a8c-a974-487016d4298a"
    - stage: boundary
      stageUuid: "9e0484b5-d867-8c54-80db-28867ab35979"
    - stage: links
      stageUuid: "fa1c76ef-f822-8371-94a9-8b6104b1831e"
    - stage: horo
      stageUuid: "56f1eac6-5ba8-82bb-84d3-1d7a17008871"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "5bc0532b-e303-85c0-a55c-dce2ae6cafbe"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · date · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, date, and counterparty in the [[accounting]]/[[commerce]] cycle.**
