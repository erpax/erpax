---
name: receivables
description: "Use when reasoning about receivables — , , and are the A/R side of the same party document; buckets it and carries the expected-credit-loss figure IFRS 9 requires, which is the part a receivable cannot honestly omit."
atomPath: "types/receivables"
coordinate: "types/receivables · 7/descent · ac6ce4d3"
contentUuid: "97be1b58-0082-51cc-9b3e-cbbc6460ab1a"
diamondUuid: "cf8823a4-bfa4-8412-9d26-dde01a905776"
uuid: "ac6ce4d3-abc5-86d2-b765-cb08bc898118"
horo: 7
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
  computationUuid: "38cdc647-0401-8a91-8ace-09d46ddc97b2"
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
      stageUuid: "f230df4f-2706-8b52-81fc-1bbdeb1acdc1"
    - stage: seal
      stageUuid: "64b495e8-b198-8aff-a525-a3b076769568"
    - stage: uuid
      stageUuid: "b9765ef4-c368-82f2-945b-6e06b2116a00"
version: 2
---
# types/receivables — what is owed to the business, and the allowance that admits some will not arrive

`Invoice`, `InvoiceLine`, `Customer` and `Payment` are the A/R side of the same party document;
`ARAgingReport` buckets it and `AllowanceResult` carries the expected-credit-loss figure IFRS 9
requires, which is the part a receivable cannot honestly omit.


Composes: [[law]].
