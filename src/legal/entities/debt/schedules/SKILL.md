---
name: schedules
description: "Use when managing or reporting a legal entity's debt instruments — bank term/revolving loans, bonds, finance and operating leases, convertible notes, covenant tracking, repayment schedules, and IFRS-9 current/non-current classification per IFRS-9 / IAS-1 / ASC-470. The debt-instrument register collection."
atomPath: legal/entities/debt/schedules
coordinate: legal/entities/debt/schedules · 4/weave · 9c9cc011
contentUuid: "bdfa7f5a-5675-5f53-8ca1-f3f8a0f7a90b"
diamondUuid: "d6886faa-f1ec-838f-89e2-16945200b27f"
uuid: "9c9cc011-0c76-80e4-abed-4a17cbc96d95"
horo: 4
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
  computationUuid: "bfacce8b-5dd4-854e-90ba-62887448e156"
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
      stageUuid: "2673f05e-377a-8624-bac0-48ac5c96bbca"
    - stage: seal
      stageUuid: "d44606cf-6458-8188-b52a-4d1b05ad3efa"
    - stage: uuid
      stageUuid: "476812bd-c274-8e28-8cd7-b17e8a284e4a"
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
