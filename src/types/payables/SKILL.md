---
name: payables
description: "Use when reasoning about payables — , , and carry the fields EN-16931 requires of a supplier invoice; buckets what is outstanding, and is what falls due."
atomPath: "types/payables"
coordinate: "types/payables · 2/share · 59acefc1"
contentUuid: "e1cfbd67-a955-5456-820f-b20d5b133f67"
diamondUuid: "30b842b9-27e3-8d49-bfd6-b657b476b47b"
uuid: "59acefc1-6df0-86ae-9c02-1bb22efdf7d6"
horo: 2
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
  computationUuid: "8b5368c3-e6b0-8bb3-803e-76ec22a728f9"
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
      stageUuid: "99fb4138-b108-8a72-b269-b6523042804c"
    - stage: seal
      stageUuid: "05db6d9d-4147-8912-b0e3-4181312cb781"
    - stage: uuid
      stageUuid: "917a1827-2356-87ef-85a8-2040739ebf5b"
version: 2
---
# types/payables — what the business owes, typed to the standard that governs the document

`Bill`, `BillLine`, `Vendor` and `VendorPayment` carry the fields EN-16931 requires of a supplier
invoice; `APAgingReport` buckets what is outstanding, and `PaymentScheduleItem` is what falls due.

The types name the standard rather than the screen, so a field exists because a statute or a
standard asks for it.


Composes: [[law]].
