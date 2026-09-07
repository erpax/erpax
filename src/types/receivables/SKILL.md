---
name: receivables
description: "Use when reasoning about receivables — , , and are the A/R side of the same party document; buckets it and carries the expected-credit-loss figure IFRS 9 requires, which is the part a receivable cannot honestly omit."
atomPath: "types/receivables"
coordinate: "types/receivables · 1/base · 6df3f541"
contentUuid: "6f95b683-00a7-5394-9823-01dbf162d2a1"
diamondUuid: "8a0e7206-bc0f-856f-8ba8-da75ef2c86e4"
uuid: "6df3f541-336f-8a05-bb42-008a532abfba"
horo: 1
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
  computationUuid: "f59ed08f-5a99-8dac-b83f-b717a7e6c336"
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
      stageUuid: "6a81c91c-d3ee-8a04-9a01-0581a2c6678f"
    - stage: seal
      stageUuid: "64b495e8-b198-8aff-a525-a3b076769568"
    - stage: uuid
      stageUuid: "bbc56e72-af48-8455-b641-e68ddf704e3b"
version: 2
---
# types/receivables — what is owed to the business, and the allowance that admits some will not arrive

`Invoice`, `InvoiceLine`, `Customer` and `Payment` are the A/R side of the same party document;
`ARAgingReport` buckets it and `AllowanceResult` carries the expected-credit-loss figure IFRS 9
requires, which is the part a receivable cannot honestly omit.


Composes: [[law]].
