---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 7/descent · 0dc0b2ca"
contentUuid: "2f44948b-7ac3-536f-8451-496a492aa720"
diamondUuid: "28c80da2-8123-8dcf-a804-f77ddadcd250"
uuid: "0dc0b2ca-3ba5-8f0f-9760-4a8ea1558eca"
horo: 7
typography:
  partition: payment
  bondDegree: 66
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "35acd4e5-5668-8ffd-9800-1f0bbce110c5"
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
      stageUuid: "bcaeb8ec-86ca-8282-b101-de41f585ef09"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "dd085b12-1dc7-84de-8a1a-c5761f320594"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · date · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, date, and counterparty in the [[accounting]]/[[commerce]] cycle.**
