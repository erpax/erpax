---
name: payments
description: "Use when recording employee equity grants — stock options, RSUs, RSAs, PSUs, ESPP, SARs — under IFRS 2, tracking equity-settled vs cash-settled treatment, vesting tranches with service/performance/market conditions, cumulative expense recognition, exercises and forfeitures. The IFRS 2 share-based-payment grant register."
atomPath: employees/share/based/payments
coordinate: employees/share/based/payments · 5/round · 270bfde6
contentUuid: "c4826230-ea68-5981-a266-668bccbeab1d"
diamondUuid: "7322b47a-4c11-80be-a23f-67c29ed0ddc1"
uuid: "270bfde6-f8ef-83bd-90cf-930fd33609a4"
horo: 5
bonds:
  in:
    - accounting
    - allocations
    - based
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
  out:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
typography:
  partition: employees
  bondDegree: 40
  neighbors: []
standards:
  - "IFRS IFRS-2 §10-§13 equity-settled-share-based-payment"
  - "IFRS IFRS-2 §15-§19 vesting-conditions"
  - "IFRS IFRS-2 §30-§33 cash-settled-share-based-payment"
  - "IFRS IFRS-2 §44 disclosure-requirements"
  - "IFRS-2"
  - "ISO 19011:2018 §6.4.6 audit-evidence-equity-grants"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time grant-vesting-exercise"
  - "SOX §404 internal-controls TOM-EQU-01"
  - "US-GAAP"
  - "US-GAAP ASC-718 stock-compensation"
bindings: []
neighbors:
  wikilink:
    - accounting
    - employees
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - allocations
    - dunning
    - escrow
    - identity
    - law
    - loan
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "6392193c-9b2c-88bb-8a32-45e4f47bd6a0"
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
      stageUuid: "8e301b74-223b-8f3f-906c-5338cc22cfd3"
    - stage: seal
      stageUuid: "b44c8410-4853-8778-8956-5de437407bf0"
    - stage: uuid
      stageUuid: "90025416-f5ac-8c25-b87d-ffc0df54bf28"
version: 2
---
# share-based-payments

Share-Based Payments — IFRS 2 equity-settled & cash-settled employee compensation register.

One row per grant (stock options, RSUs, RSAs, PSUs, ESPPs, SARs). The `settlementType` discriminator drives whether the grant credits equity (IFRS 2 §10) or builds a liability (IFRS 2 §30). Vesting schedule captured as tranche array; expense recognised straight-line over each tranche per IFRS 2 §15.

The schema lives in `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) in the same folder.

**Law — [[law]]: one row per equity grant under IFRS 2 — the settlementType discriminator decides whether the grant credits equity or builds a liability, and expense is recognised straight-line over each vesting tranche; a single-folder collection node (no scatter, no drift).**

## Standards

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
