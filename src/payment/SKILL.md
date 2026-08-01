---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 2/share · 714cbaf9"
contentUuid: "00d0cedd-df63-531c-9977-3e232b927957"
diamondUuid: "8b29de72-b999-8084-a9e9-9caac109c8e6"
uuid: "714cbaf9-d758-85b6-b35a-82210bb53e95"
horo: 2
typography:
  partition: payment
  bondDegree: 77
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "bf411a58-da23-84b5-9bc1-c312f1245048"
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
      stageUuid: "465ce6ab-51d7-882b-9b9c-1d080f6095dd"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "ae0f4de7-e999-83a3-82b0-cfcf8ad49059"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
