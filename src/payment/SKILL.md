---
name: payment
description: "Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle."
atomPath: payment
coordinate: "payment · 7/descent · 0dc0b2ca"
contentUuid: "de82e7ec-51f3-5b3c-83ed-8897fc50dcfe"
diamondUuid: "4f251556-7b29-80cf-bf08-08eb65005e04"
uuid: "0dc0b2ca-3ba5-8f0f-9760-4a8ea1558eca"
horo: 7
typography:
  partition: payment
  bondDegree: 78
standards:
  - "NIST-SP-800-38D"
bindings: []
signatures:
  computationUuid: "44ac0a49-6667-8a68-8a05-e7e676b760b7"
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
      stageUuid: "9b7c2a01-2d9f-884f-b628-8f95c3f7f409"
    - stage: seal
      stageUuid: "de11b79b-23b5-81ac-8e05-797a10e6b5a8"
    - stage: uuid
      stageUuid: "8435d965-8169-85ce-9dc5-68bcc77629e6"
version: 2
---
# payment

Use when modeling a cash inflow/outflow — payment received from customer, payment to vendor, expense reimbursement, salary payment. A transaction linking a GL account (cash), amount, date, and counterparty. Part of the accounting/commerce cycle.

Composes: [[accounting]] · [[commerce]] · [[transaction]] · [[amount]] · [[date]] · [[currency]].

**Law — [[law]]: a payment is one cash inflow/outflow — a [[transaction]] binding a cash GL account, amount, [[date]], and counterparty in the [[accounting]]/[[commerce]] cycle.**
