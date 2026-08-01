---
name: plannings
description: "Use when creating or approving period-budgets by department or cost-center — monthly, quarterly, annual — with GL line items, period-lock enforcement, segregation-of-duties on approval, and fiscal-year comparisons; IAS-1/IAS-8/ASC-270 financial presentation. The budget approval and planning register."
atomPath: "budget/plannings"
coordinate: "budget/plannings · 8/crest · 0e9f2d56"
contentUuid: "468b3316-b238-5a04-aa2b-8f04c3f92e4a"
diamondUuid: "8be9feb1-2e2e-82f8-92a3-8d7e5fbd6a8a"
uuid: "0e9f2d56-f814-805f-b1c4-68d3f51b6cf6"
horo: 8
typography:
  partition: budget
  bondDegree: 25
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies-changes-and-errors"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time fiscal-year period"
  - "ISO-8601-1:2019 date-time fiscal-year period`"
  - "SOX §404 internal-controls budget-approval-workflow"
  - "US-GAAP ASC-270 interim-reporting"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9cfb42c9-7c9f-838a-a279-f2dc3651ae17"
  stages:
    - stage: path
      stageUuid: "71d3b8b3-6d52-862e-9672-5e1e69bc72a0"
    - stage: trinity
      stageUuid: "bbb79b4e-5102-8705-95f6-12392d427e32"
    - stage: boundary
      stageUuid: "55d9002e-4d34-8bd7-add8-f6faafed487a"
    - stage: links
      stageUuid: "07cfe24c-f671-8aed-bc32-0a1f5c14b0c6"
    - stage: horo
      stageUuid: "0d29e932-cffe-8c46-9751-6834d9e4823f"
    - stage: seal
      stageUuid: "27094773-9500-8f10-b216-8585885f7436"
    - stage: uuid
      stageUuid: "8187ea98-29de-897a-a6ac-e1b7f4486819"
version: 2
---
# budget-planning

Budget Planning — period-budgets by department / cost-center.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time fiscal-year period`


- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time fiscal-year period
- IFRS IAS-1 presentation-of-financial-statements
- IFRS IAS-8 accounting-policies-changes-and-errors
- US-GAAP ASC-270 interim-reporting
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls budget-approval-workflow
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties approval-vs-creation

Schema: [[accounting]] (GL accounts, period locks, fiscal periods); [[standard]] (compliance banners); [[identity]] (createdBy, approvedBy, audit chain); [[proof]] (audit-trail emission).

**Law — [[law]]: a budget-planning row is a period-budget by department or cost-center bound to GL line items — created and approved by different parties (segregation of duties) and enforced against the [[accounting]] period lock, so no budget posts to a closed period.**
