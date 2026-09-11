---
name: receivables
description: "Use when reasoning about receivables — , , and are the A/R side of the same party document; buckets it and carries the expected-credit-loss figure IFRS 9 requires, which is the part a receivable cannot honestly omit."
atomPath: "types/receivables"
coordinate: "types/receivables · 8/crest · b9c85c0d"
contentUuid: "c647084b-e93c-5c73-bb29-2ab9d07c5126"
diamondUuid: "f25dd4fc-3067-8eed-8c3f-5d0172eebbaf"
uuid: "b9c85c0d-4f3b-8f97-bffa-f470b46dfbf0"
horo: 8
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
  computationUuid: "e4140771-f9a7-87e8-b434-5624c81ca816"
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
      stageUuid: "619767c2-03e9-88e6-9500-5f632314565a"
    - stage: seal
      stageUuid: "64b495e8-b198-8aff-a525-a3b076769568"
    - stage: uuid
      stageUuid: "506cd669-fe6a-85ea-b4fc-f0d0a4d850e9"
version: 2
---
# types/receivables — what is owed to the business, and the allowance that admits some will not arrive

`Invoice`, `InvoiceLine`, `Customer` and `Payment` are the A/R side of the same party document;
`ARAgingReport` buckets it and `AllowanceResult` carries the expected-credit-loss figure IFRS 9
requires, which is the part a receivable cannot honestly omit.


Composes: [[law]].
