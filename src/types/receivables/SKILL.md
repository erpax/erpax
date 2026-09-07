---
name: receivables
description: "Use when reasoning about receivables — , , and are the A/R side of the same party document; buckets it and carries the expected-credit-loss figure IFRS 9 requires, which is the part a receivable cannot honestly omit."
atomPath: "types/receivables"
coordinate: "types/receivables · 4/weave · c12c5463"
contentUuid: "d12e3179-06f5-5130-9a57-95619ab01fae"
diamondUuid: "968d25ce-71ca-81c7-a461-0d2eb7d94955"
uuid: "c12c5463-9307-8479-8d0a-189d7d25a609"
horo: 4
typography:
  partition: types
  bondDegree: 3
standards:
  - "EN-16931:2017 §BG-7 buyer"
  - "IFRS IFRS-9 IFRS-15"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time invoice-date due-date"
  - "US-GAAP ASC-310 ASC-326 ASC-606"
bindings: []
signatures:
  computationUuid: "3454cd1c-4358-8482-a8b5-37e16f4abbf3"
  stages:
    - stage: path
      stageUuid: "18a8ed94-852b-80a6-acca-7d490b60d5ff"
    - stage: trinity
      stageUuid: "91207297-81e1-88e1-a69a-780497ac4f77"
    - stage: boundary
      stageUuid: "092e7414-0eac-8708-8601-4b528bd38993"
    - stage: links
      stageUuid: "4ad31c49-3f79-8e36-8e9e-8e3b61b11ef2"
    - stage: horo
      stageUuid: "9d875322-5e76-863e-9846-696527c17bb1"
    - stage: seal
      stageUuid: "64b495e8-b198-8aff-a525-a3b076769568"
    - stage: uuid
      stageUuid: "8b7bb0f3-f1e0-8ca6-8b08-b91dc4386aa4"
version: 2
---
# types/receivables — what is owed to the business, and the allowance that admits some will not arrive

`Invoice`, `InvoiceLine`, `Customer` and `Payment` are the A/R side of the same party document;
`ARAgingReport` buckets it and `AllowanceResult` carries the expected-credit-loss figure IFRS 9
requires, which is the part a receivable cannot honestly omit.


Composes: [[law]].
