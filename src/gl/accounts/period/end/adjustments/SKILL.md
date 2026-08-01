---
name: adjustments
description: "Use when posting or reviewing period-end adjusting entries — depreciation, interest accrual, salary accrual, deferred income, allowance — with segregation-of-duties approval and automatic GL posting on status change. The period-end-adjustments accrual collection."
atomPath: "gl/accounts/period/end/adjustments"
coordinate: "gl/accounts/period/end/adjustments · 1/base · 5ba99bb3"
contentUuid: "fb16fd78-becf-591c-ab31-21cc64913d11"
diamondUuid: "47b62ba5-3aea-8453-baf4-8a84f21f6903"
uuid: "5ba99bb3-aee9-8689-b22e-f1d48ca73ef4"
horo: 1
typography:
  partition: gl
  bondDegree: 0
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies-changes-and-errors"
  - "ISO-8601-1:2019 date-time period posted-at"
  - "ISO-8601-1:2019 date-time period posted-at`"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-250 accounting-changes-and-error-corrections"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7575553c-f7ae-89bb-a7a4-a34705f6612e"
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
      stageUuid: "3a999683-c12c-89b7-9384-0ace6b44ec65"
    - stage: seal
      stageUuid: "6ec68967-5307-8fa5-ae43-92ff6f95e25b"
    - stage: uuid
      stageUuid: "b405b034-f3e3-8006-8680-c6b70801a16f"
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
