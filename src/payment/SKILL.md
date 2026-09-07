---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 5/round · 651b299a"
contentUuid: "c2f46fd8-d3eb-5273-82c8-ae9edbe52f01"
diamondUuid: "5c066d82-d993-870b-9e84-0d8d06b971f6"
uuid: "651b299a-9f3f-8fbb-82d8-4eaf9bd15a27"
horo: 5
typography:
  partition: payment
  bondDegree: 78
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "c124d043-3e3f-88b0-acf3-1d8cf509e6d1"
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
      stageUuid: "2feeb2f9-9075-8a72-b517-177ed8a38b7d"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "1638dde5-435b-8560-a021-b10fbdc7527d"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
