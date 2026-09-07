---
name: adjustments
description: "Use when posting or reviewing period-end adjusting entries — depreciation, interest accrual, salary accrual, deferred income, allowance — with segregation-of-duties approval and automatic GL posting on status change. The period-end-adjustments accrual collection."
atomPath: "gl/accounts/period/end/adjustments"
coordinate: "gl/accounts/period/end/adjustments · 4/weave · 1483826d"
contentUuid: "b838c5f3-7c4e-5c33-9f80-7a7947db8ba8"
diamondUuid: "74e4cfb6-7eec-8d8e-9a51-7e4a51ed5a8d"
uuid: "1483826d-399e-80b3-8020-2e1c7c894562"
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
  computationUuid: "25e653f4-7e63-88e5-b6d9-d148a275db1d"
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
      stageUuid: "27b225af-b27d-8439-8bdb-14efc2000d87"
    - stage: seal
      stageUuid: "6ec68967-5307-8fa5-ae43-92ff6f95e25b"
    - stage: uuid
      stageUuid: "f7c1da57-cf76-8405-a981-3251380362ff"
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
