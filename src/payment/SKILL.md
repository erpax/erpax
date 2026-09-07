---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 8/crest · 5cc1ae60"
contentUuid: "98f50930-43ce-5427-8c59-609cb75296f2"
diamondUuid: "1d924884-829b-8843-8daf-dadf842e350d"
uuid: "5cc1ae60-48f0-815a-80e4-479198afed4f"
horo: 8
typography:
  partition: payment
  bondDegree: 76
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "461bdb21-3f2b-8298-80b9-ffc2edbb5d24"
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
      stageUuid: "7dce7a9a-b855-836b-b285-11d7d58f5d05"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "b62cae2a-de26-8a7f-84df-e025d1c97670"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
