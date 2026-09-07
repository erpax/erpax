---
name: receivables
description: "Use when reasoning about receivables — , , and are the A/R side of the same party document; buckets it and carries the expected-credit-loss figure IFRS 9 requires, which is the part a receivable cannot honestly omit."
atomPath: "types/receivables"
coordinate: "types/receivables · 2/share · 40406558"
contentUuid: "5e7e2ea6-f7d9-54ff-bd34-7a019a4f202f"
diamondUuid: "e3c1cf47-80d1-8f03-acbb-ce37c8343f71"
uuid: "40406558-6d17-8495-95a2-a59e43b55916"
horo: 2
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
  computationUuid: "20399563-877b-8b63-a267-5dcb9abd20e3"
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
      stageUuid: "badc91ee-6e8f-84e1-8ba7-46d787621eed"
    - stage: seal
      stageUuid: "64b495e8-b198-8aff-a525-a3b076769568"
    - stage: uuid
      stageUuid: "0db79a7c-f69d-8fcf-8ea1-69a45d0383f3"
version: 2
---
# types/receivables — what is owed to the business, and the allowance that admits some will not arrive

`Invoice`, `InvoiceLine`, `Customer` and `Payment` are the A/R side of the same party document;
`ARAgingReport` buckets it and `AllowanceResult` carries the expected-credit-loss figure IFRS 9
requires, which is the part a receivable cannot honestly omit.


Composes: [[law]].
