---
name: payables
description: "Use when reasoning about payables — , , and carry the fields EN-16931 requires of a supplier invoice; buckets what is outstanding, and is what falls due."
atomPath: "types/payables"
coordinate: "types/payables · 4/weave · 6fa8866b"
contentUuid: "ee4951b6-a974-5c1a-9a58-4de8ae7008cc"
diamondUuid: "c20acf46-d079-8fa2-8785-4d4591dc33d5"
uuid: "6fa8866b-192e-8d32-880d-e3b3c1064c82"
horo: 4
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
  computationUuid: "066ea551-0c69-8fef-be0e-cb10e4133a6f"
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
      stageUuid: "ca17eb80-e6e1-8544-ba9d-cce1ce69405c"
    - stage: seal
      stageUuid: "05db6d9d-4147-8912-b0e3-4181312cb781"
    - stage: uuid
      stageUuid: "51cc4823-b562-8651-8bea-1998fbd28b48"
version: 2
---
# types/payables — what the business owes, typed to the standard that governs the document

`Bill`, `BillLine`, `Vendor` and `VendorPayment` carry the fields EN-16931 requires of a supplier
invoice; `APAgingReport` buckets what is outstanding, and `PaymentScheduleItem` is what falls due.

The types name the standard rather than the screen, so a field exists because a statute or a
standard asks for it.


Composes: [[law]].
