---
name: plannings
description: "Use when creating or approving period-budgets by department or cost-center — monthly, quarterly, annual — with GL line items, period-lock enforcement, segregation-of-duties on approval, and fiscal-year comparisons; IAS-1/IAS-8/ASC-270 financial presentation. The budget approval and planning register."
atomPath: "budget/plannings"
coordinate: "budget/plannings · 5/round · d6926423"
contentUuid: "1e137fb7-47f6-5bd3-8d32-dccb803b26fc"
diamondUuid: "66676d23-af68-8078-ab87-76b3c163b7eb"
uuid: "d6926423-ec43-8300-8fec-6ed0ce6b40f6"
horo: 5
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
  computationUuid: "da6bf849-e7ba-851b-8bbb-39263addaebc"
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
      stageUuid: "1814a01f-4bb3-896b-9767-4676df2d5450"
    - stage: seal
      stageUuid: "27094773-9500-8f10-b216-8585885f7436"
    - stage: uuid
      stageUuid: "1730853a-e09d-8733-b4cb-4887c9599260"
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
