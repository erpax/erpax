---
name: adjustments
description: "Use when posting or reviewing period-end adjusting entries — depreciation, interest accrual, salary accrual, deferred income, allowance — with segregation-of-duties approval and automatic GL posting on status change. The period-end-adjustments accrual collection."
atomPath: "gl/accounts/period/end/adjustments"
coordinate: "gl/accounts/period/end/adjustments · 7/descent · 36af0809"
contentUuid: "3d68e56f-bbed-5eeb-9416-88efaeecc2e5"
diamondUuid: "3b6d4bca-5641-8470-b617-00f9d6bf1235"
uuid: "36af0809-1e53-8183-8d21-8af2d7078a79"
horo: 7
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
  computationUuid: "751f4b7c-c920-8a6f-a8ae-327fe208cd13"
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
      stageUuid: "3100b2e9-8c20-8973-8ba2-2e64f51a2dd4"
    - stage: seal
      stageUuid: "6ec68967-5307-8fa5-ae43-92ff6f95e25b"
    - stage: uuid
      stageUuid: "da037315-f387-8db1-90e4-a961f059112b"
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
