---
name: schedules
description: "Use when managing or reporting a legal entity's debt instruments — bank term/revolving loans, bonds, finance and operating leases, convertible notes, covenant tracking, repayment schedules, and IFRS-9 current/non-current classification per IFRS-9 / IAS-1 / ASC-470. The debt-instrument register collection."
atomPath: "legal/entities/debt/schedules"
coordinate: "legal/entities/debt/schedules · 1/base · 4c7319ce"
contentUuid: "27c1e2eb-717f-5a6b-981a-13955e574ca1"
diamondUuid: "ecc3604f-1eeb-88fc-9b0b-9978576d3b21"
uuid: "4c7319ce-8acf-8e86-89c0-f3cc0ff13dfc"
horo: 1
typography:
  partition: legal
  bondDegree: 23
standards:
  - "IAS-1 current-non-current-classification"
  - "IFRS-9 financial-instruments"
  - "US-GAAP ASC-470 debt"
bindings: []
signatures:
  computationUuid: "f6b70632-c44e-8e91-b104-fdc62ced0f81"
  stages:
    - stage: path
      stageUuid: "b855236d-e0f1-8721-90f1-153d0ad07a59"
    - stage: trinity
      stageUuid: "a3a65e14-dc99-8c66-81d7-aebeb675e5fa"
    - stage: boundary
      stageUuid: "6b241a13-fb46-8800-803d-4bf6549917f5"
    - stage: links
      stageUuid: "7116d031-c359-8a0b-9491-d57d1a96feea"
    - stage: horo
      stageUuid: "ad18f9bf-cf21-8465-8f66-030c9ee13a0d"
    - stage: seal
      stageUuid: "d44606cf-6458-8188-b52a-4d1b05ad3efa"
    - stage: uuid
      stageUuid: "0bf9ae89-3686-8b8d-a34f-db260fe87a17"
version: 2
---
# debt-schedule

DebtSchedule.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS-9 financial-instruments
- IAS-1 current-non-current-classification
- US-GAAP ASC-470 debt
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the register of a legal entity's debt instruments (loans, bonds, leases, convertible notes) tracking covenants and repayment schedules, each classified current vs non-current per IFRS-9 / IAS-1.**
