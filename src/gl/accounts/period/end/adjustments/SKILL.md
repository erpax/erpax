---
name: adjustments
description: "Use when posting or reviewing period-end adjusting entries — depreciation, interest accrual, salary accrual, deferred income, allowance — with segregation-of-duties approval and automatic GL posting on status change. The period-end-adjustments accrual collection."
atomPath: "gl/accounts/period/end/adjustments"
coordinate: "gl/accounts/period/end/adjustments · 5/round · f521a4d2"
contentUuid: "a09046fd-37b1-5c65-a016-7c07bdd3c3c2"
diamondUuid: "c4469489-f9bf-8bfe-94a9-d92c6cf4316d"
uuid: "f521a4d2-5549-8e99-a902-61e74a4eedac"
horo: 5
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
  computationUuid: "a6635f89-b4bf-8d2b-bc13-81b9c9bcf55e"
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
      stageUuid: "c7eb3329-5584-816d-8e7f-5c3e05bad5ac"
    - stage: seal
      stageUuid: "6ec68967-5307-8fa5-ae43-92ff6f95e25b"
    - stage: uuid
      stageUuid: "1344fcb3-6ea4-8d1f-b168-ae367965d233"
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
