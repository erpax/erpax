---
name: adjustments
description: "Use when posting or reviewing period-end adjusting entries — depreciation, interest accrual, salary accrual, deferred income, allowance — with segregation-of-duties approval and automatic GL posting on status change. The period-end-adjustments accrual collection."
atomPath: gl/accounts/period/end/adjustments
coordinate: gl/accounts/period/end/adjustments · 2/share · 4db77e37
contentUuid: "01a20d2d-f5c3-5945-8aa8-c890385482f1"
diamondUuid: "01480312-16d9-888a-af01-4303100cf415"
uuid: "4db77e37-8661-877e-807d-a89077c551b6"
horo: 2
bonds:
  in:
    - accounting
    - adjustment
    - end
    - entries
    - horo
    - law
    - proof
    - standard
  out:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
typography:
  partition: gl
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies-changes-and-errors"
  - "ISO-19011:2018 audit-trail"
  - "ISO-8601-1:2019 date-time period posted-at"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-250 accounting-changes-and-error-corrections"
bindings: []
neighbors:
  wikilink:
    - accounting
    - accounts
    - entries
    - law
  matrix:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
  backlinks:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
signatures:
  computationUuid: "a6d5f2d0-7b35-8640-a051-270e1e63d551"
  stages:
    - stage: path
      stageUuid: "85d4671a-1d9c-8734-80e6-f340dbb31d53"
    - stage: trinity
      stageUuid: "c5348dc0-d6ed-8995-8fd9-09c99337a065"
    - stage: boundary
      stageUuid: "421ffab7-63a0-81f5-a0d8-6a87e092abd8"
    - stage: links
      stageUuid: "339d4042-9243-88d4-8f46-fe23a36a3ae1"
    - stage: horo
      stageUuid: "bcec42c2-0db9-8327-ad51-87effa227630"
    - stage: seal
      stageUuid: "6ec68967-5307-8fa5-ae43-92ff6f95e25b"
    - stage: uuid
      stageUuid: "e470eaa3-b6f9-8bcb-8dd9-b037b29784ee"
version: 2
---
# period-end-adjustments

Period-End Adjustments — accruals, deferrals, depreciation, allocation entries.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time period posted-at
- IFRS IAS-1 presentation-of-financial-statements
- IFRS IAS-8 accounting-policies-changes-and-errors
- US-GAAP ASC-250 accounting-changes-and-error-corrections
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties approval-vs-creation
- ISO-19011:2018 audit-trail

Composes: [[accounting]] · [[journal/entries]] · [[gl/accounts]].

**Law — [[law]]: period-end adjustments are the accrual-basis entries (depreciation, accruals, deferrals, allowances) that align the period to the framework — segregation-gated on approval and auto-posted to the GL on status change.**
