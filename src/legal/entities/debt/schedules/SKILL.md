---
name: schedules
description: "Use when managing or reporting a legal entity's debt instruments — bank term/revolving loans, bonds, finance and operating leases, convertible notes, covenant tracking, repayment schedules, and IFRS-9 current/non-current classification per IFRS-9 / IAS-1 / ASC-470. The debt-instrument register collection."
atomPath: "legal/entities/debt/schedules"
coordinate: "legal/entities/debt/schedules · 1/base · afc4efd7"
contentUuid: "e93b5775-a2e8-5bb8-817a-94b581037b80"
diamondUuid: "5ca2de22-f5f2-8559-9bdc-7a6385f1b6d4"
uuid: "afc4efd7-172f-88b8-b0eb-14ba19a1085c"
horo: 1
typography:
  partition: legal
  bondDegree: 26
standards:
  - "IAS-1 current-non-current-classification"
  - "IFRS-9 financial-instruments"
  - "US-GAAP ASC-470 debt"
bindings: []
signatures:
  computationUuid: "a25a2f13-f25c-8ccd-9aa3-7e11e14ff8c2"
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
      stageUuid: "219e4d96-69cb-8437-88f1-521c82707eb9"
    - stage: seal
      stageUuid: "d44606cf-6458-8188-b52a-4d1b05ad3efa"
    - stage: uuid
      stageUuid: "fee048c4-0d4d-8701-b936-b2a9359adc12"
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
