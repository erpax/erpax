---
name: payables
description: "Use when reasoning about payables — , , and carry the fields EN-16931 requires of a supplier invoice; buckets what is outstanding, and is what falls due."
atomPath: "types/payables"
coordinate: "types/payables · 7/descent · 146f6307"
contentUuid: "b24481c5-2387-57fa-8f1c-a55a00124782"
diamondUuid: "4ad906da-f027-84ee-a4ba-ea611d04ad56"
uuid: "146f6307-27b2-80f3-aa4b-445c337b6256"
horo: 7
typography:
  partition: types
  bondDegree: 3
standards:
  - "EN-16931:2017 §BG-4 seller"
  - "IFRS IAS-37 provisions-contingent-liabilities"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei vendor-identification"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time bill-date due-date"
  - "US-GAAP ASC-405 liabilities"
  - "US-IRS Form-1099 information-return"
bindings: []
signatures:
  computationUuid: "5c4b9a68-2a4e-8355-82d8-5762461d33fe"
  stages:
    - stage: path
      stageUuid: "b1a49c4f-f35e-84c9-ab13-7195a4241d2a"
    - stage: trinity
      stageUuid: "d44a4a51-f315-8c42-913f-443fec13ee18"
    - stage: boundary
      stageUuid: "1a252c73-4d4d-81db-a256-3f57f7e2b82b"
    - stage: links
      stageUuid: "e2d88b8d-203c-8633-bd60-caff6a7c689e"
    - stage: horo
      stageUuid: "02f7e34c-bbc9-8720-9ac8-1dd5bb4f23bc"
    - stage: seal
      stageUuid: "05db6d9d-4147-8912-b0e3-4181312cb781"
    - stage: uuid
      stageUuid: "c01343f3-f941-86c6-a5ac-b52f2245886d"
version: 2
---
# types/payables — what the business owes, typed to the standard that governs the document

`Bill`, `BillLine`, `Vendor` and `VendorPayment` carry the fields EN-16931 requires of a supplier
invoice; `APAgingReport` buckets what is outstanding, and `PaymentScheduleItem` is what falls due.

The types name the standard rather than the screen, so a field exists because a statute or a
standard asks for it.


Composes: [[law]].
