---
name: adjustments
description: "Use when posting or reviewing period-end adjusting entries — depreciation, interest accrual, salary accrual, deferred income, allowance — with segregation-of-duties approval and automatic GL posting on status change. The period-end-adjustments accrual collection."
atomPath: "gl/accounts/period/end/adjustments"
coordinate: "gl/accounts/period/end/adjustments · 4/weave · 8534d782"
contentUuid: "f55e3ac8-8211-5473-a1a8-aa28bf689377"
diamondUuid: "9c7f2c44-f68f-85e3-ba59-3135c3ecca06"
uuid: "8534d782-c7e6-819a-8d7f-bc9bdb29dce1"
horo: 4
typography:
  partition: gl
  bondDegree: 42
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies-changes-and-errors"
  - "ISO-8601-1:2019 date-time period posted-at"
  - "ISO-8601-1:2019 date-time period posted-at`"
  - "ISO/IEC-29119"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-250 accounting-changes-and-error-corrections"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "84be29d7-e7cf-85f9-be82-07a43cc6db9f"
  stages:
    - stage: path
      stageUuid: "85d4671a-1d9c-8734-80e6-f340dbb31d53"
    - stage: trinity
      stageUuid: "c5348dc0-d6ed-8995-8fd9-09c99337a065"
    - stage: boundary
      stageUuid: "4adb5a97-03fc-8db2-ad1b-24ae3aafbaa9"
    - stage: links
      stageUuid: "339d4042-9243-88d4-8f46-fe23a36a3ae1"
    - stage: horo
      stageUuid: "35bdeb07-3dd8-8497-8c54-0544c27d1da7"
    - stage: seal
      stageUuid: "6ec68967-5307-8fa5-ae43-92ff6f95e25b"
    - stage: uuid
      stageUuid: "67ecb242-032b-81a6-877e-7bf51a6f8742"
version: 2
---
# period-end-adjustments

Period-End Adjustments — accruals, deferrals, depreciation, allocation entries.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time period posted-at`

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
