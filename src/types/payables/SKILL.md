---
name: payables
description: "Use when reasoning about payables — , , and carry the fields EN-16931 requires of a supplier invoice; buckets what is outstanding, and is what falls due."
atomPath: "types/payables"
coordinate: "types/payables · 1/base · a56940ef"
contentUuid: "b9d5ac00-2f12-5803-8300-58e12c4db23d"
diamondUuid: "63d8c651-fb03-85b8-9d0c-419ea46f3219"
uuid: "a56940ef-6974-8a7d-bb31-a946b29150b7"
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
  computationUuid: "27e01dfa-ca8a-8086-a78c-ce2998435b6d"
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
      stageUuid: "3dac4376-d7af-8696-8ee7-7fd7e72c2a98"
    - stage: seal
      stageUuid: "05db6d9d-4147-8912-b0e3-4181312cb781"
    - stage: uuid
      stageUuid: "7a8a1027-4fa1-8bad-b1de-45f1a8daad07"
version: 2
---
# types/payables — what the business owes, typed to the standard that governs the document

`Bill`, `BillLine`, `Vendor` and `VendorPayment` carry the fields EN-16931 requires of a supplier
invoice; `APAgingReport` buckets what is outstanding, and `PaymentScheduleItem` is what falls due.

The types name the standard rather than the screen, so a field exists because a statute or a
standard asks for it.


Composes: [[law]].
