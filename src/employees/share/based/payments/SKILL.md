---
name: payments
description: "Use when recording employee equity grants — stock options, RSUs, RSAs, PSUs, ESPP, SARs — under IFRS 2, tracking equity-settled vs cash-settled treatment, vesting tranches with service/performance/market conditions, cumulative expense recognition, exercises and forfeitures. The IFRS 2 share-based-payment grant register."
atomPath: "employees/share/based/payments"
coordinate: "employees/share/based/payments · 5/round · 6b561712"
contentUuid: "81ba02bb-896b-5db6-93c4-640422ab86b4"
diamondUuid: "59a8cca0-d7a0-8dfd-9bf9-89f29f8756df"
uuid: "6b561712-9fab-8c91-99ec-d900932b8f6b"
horo: 5
typography:
  partition: employees
  bondDegree: 40
standards:
  - "IFRS IFRS-2 §10-§13 equity-settled-share-based-payment"
  - "IFRS IFRS-2 §10-§13 equity-settled-share-based-payment`"
  - "IFRS IFRS-2 §15-§19 vesting-conditions"
  - "IFRS IFRS-2 §15-§19 vesting-conditions`"
  - "IFRS IFRS-2 §30-§33 cash-settled-share-based-payment"
  - "IFRS IFRS-2 §30-§33 cash-settled-share-based-payment`"
  - "IFRS IFRS-2 §44 disclosure-requirements"
  - "IFRS IFRS-2 §44 disclosure-requirements`"
  - "IFRS-2"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time grant-vesting-exercise"
  - "ISO-8601-1:2019 date-time grant-vesting-exercise`"
  - "SOX §404 internal-controls TOM-EQU-01"
  - "US-GAAP"
  - "US-GAAP ASC-718 stock-compensation"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "284cb46f-7c0a-82aa-83fd-0ccbf4f74b9c"
  stages:
    - stage: path
      stageUuid: "b5564dbb-e5b4-8543-a762-cf24c4531a33"
    - stage: trinity
      stageUuid: "6ad166eb-ffaf-8d75-a329-08a644b1ac4d"
    - stage: boundary
      stageUuid: "533d69e3-52da-827c-8663-59c729136e10"
    - stage: links
      stageUuid: "3056a3ce-5e46-8ac2-9702-961c64a5be1f"
    - stage: horo
      stageUuid: "e49790db-1c67-8f3b-9322-be1119620f8d"
    - stage: seal
      stageUuid: "b44c8410-4853-8778-8956-5de437407bf0"
    - stage: uuid
      stageUuid: "6743570e-64b7-84c2-9d4e-24b71b003d9d"
version: 2
---
# share-based-payments

Share-Based Payments — IFRS 2 equity-settled & cash-settled employee compensation register.

One row per grant (stock options, RSUs, RSAs, PSUs, ESPPs, SARs). The `settlementType` discriminator drives whether the grant credits equity (IFRS 2 §10) or builds a liability (IFRS 2 §30). Vesting schedule captured as tranche array; expense recognised straight-line over each tranche per IFRS 2 §15.

The schema lives in `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) in the same folder.

**Law — [[law]]: one row per equity grant under IFRS 2 — the settlementType discriminator decides whether the grant credits equity or builds a liability, and expense is recognised straight-line over each vesting tranche; a single-folder collection node (no scatter, no drift).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-2 §10-§13 equity-settled-share-based-payment`
- `@standard IFRS IFRS-2 §15-§19 vesting-conditions`
- `@standard IFRS IFRS-2 §30-§33 cash-settled-share-based-payment`
- `@standard IFRS IFRS-2 §44 disclosure-requirements`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time grant-vesting-exercise`


- IFRS IFRS-2 §10-§13 equity-settled-share-based-payment
- IFRS IFRS-2 §15-§19 vesting-conditions
- IFRS IFRS-2 §30-§33 cash-settled-share-based-payment
- IFRS IFRS-2 §44 disclosure-requirements
- US-GAAP ASC-718 stock-compensation
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time grant-vesting-exercise
- ISO 19011:2018 §6.4.6 audit-evidence-equity-grants
- SOX §404 internal-controls TOM-EQU-01
- ISO 27001 A.5.23 cloud-service-tenant-isolation

## Composition

Composes: [[Employees]] · [[accounting]] · [[transaction]] · [[identity]] · [[proof]] · [[standard]].
