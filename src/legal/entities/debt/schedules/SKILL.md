---
name: schedules
description: "Use when managing or reporting a legal entity's debt instruments — bank term/revolving loans, bonds, finance and operating leases, convertible notes, covenant tracking, repayment schedules, and IFRS-9 current/non-current classification per IFRS-9 / IAS-1 / ASC-470. The debt-instrument register collection."
atomPath: "legal/entities/debt/schedules"
coordinate: "legal/entities/debt/schedules · 7/descent · 2b019837"
contentUuid: "f8094b1e-3291-5dbf-948e-34547636969a"
diamondUuid: "810d20f4-e561-8e61-9b2a-ffa9e756b7ab"
uuid: "2b019837-e70a-847e-bd2b-3e3c222865e1"
horo: 7
bonds:
  in:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
  out:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
typography:
  partition: legal
  bondDegree: 26
  neighbors: []
standards:
  - "IAS-1 current-non-current-classification"
  - "IFRS-9 financial-instruments"
  - "US-GAAP ASC-470 debt"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "1a035424-5261-8a23-8f78-37db0de8f002"
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
      stageUuid: "9f05aacf-1821-84c0-822a-166847069be5"
    - stage: seal
      stageUuid: "d44606cf-6458-8188-b52a-4d1b05ad3efa"
    - stage: uuid
      stageUuid: "8cf240a4-5891-88d8-938e-72bb58573abc"
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
