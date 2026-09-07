---
name: schedules
description: "Use when managing or reporting a legal entity's debt instruments — bank term/revolving loans, bonds, finance and operating leases, convertible notes, covenant tracking, repayment schedules, and IFRS-9 current/non-current classification per IFRS-9 / IAS-1 / ASC-470. The debt-instrument register collection."
atomPath: "legal/entities/debt/schedules"
coordinate: "legal/entities/debt/schedules · 5/round · e2487848"
contentUuid: "8976bee8-1d77-5293-a2c4-51c193b643bc"
diamondUuid: "14abe58c-b5ec-888b-a875-00cef5b13837"
uuid: "e2487848-d328-8c80-9a25-6cf99d673729"
horo: 5
typography:
  partition: legal
  bondDegree: 26
standards:
  - "IAS-1 current-non-current-classification"
  - "IFRS-9 financial-instruments"
  - "US-GAAP ASC-470 debt"
bindings: []
signatures:
  computationUuid: "bb224e6e-e302-83aa-bfc4-0d001819215e"
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
      stageUuid: "be84bed2-7786-8668-b21b-a55a97c32e09"
    - stage: seal
      stageUuid: "d44606cf-6458-8188-b52a-4d1b05ad3efa"
    - stage: uuid
      stageUuid: "a9cd904f-d874-8b42-a17e-fce407008e24"
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
