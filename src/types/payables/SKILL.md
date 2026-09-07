---
name: payables
description: "Use when reasoning about payables — , , and carry the fields EN-16931 requires of a supplier invoice; buckets what is outstanding, and is what falls due."
atomPath: "types/payables"
coordinate: "types/payables · 1/base · 41b07614"
contentUuid: "16c37b94-8c9b-5980-8f43-e272027f092b"
diamondUuid: "dd525b60-0a54-8a04-acb5-94a55ddf127b"
uuid: "41b07614-ce27-8b7a-8028-19b3da57a4a4"
horo: 1
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
  computationUuid: "738ba330-75d1-89b5-967e-b2a454f495ad"
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
      stageUuid: "9ea5d140-1988-8c51-b029-60a7294291cb"
    - stage: seal
      stageUuid: "05db6d9d-4147-8912-b0e3-4181312cb781"
    - stage: uuid
      stageUuid: "699e8d09-12b3-8717-887d-09de84fd4e5a"
version: 2
---
# types/payables — what the business owes, typed to the standard that governs the document

`Bill`, `BillLine`, `Vendor` and `VendorPayment` carry the fields EN-16931 requires of a supplier
invoice; `APAgingReport` buckets what is outstanding, and `PaymentScheduleItem` is what falls due.

The types name the standard rather than the screen, so a field exists because a statute or a
standard asks for it.


Composes: [[law]].
