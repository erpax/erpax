---
name: plannings
description: "Use when creating or approving period-budgets by department or cost-center — monthly, quarterly, annual — with GL line items, period-lock enforcement, segregation-of-duties on approval, and fiscal-year comparisons; IAS-1/IAS-8/ASC-270 financial presentation. The budget approval and planning register."
atomPath: "budget/plannings"
coordinate: "budget/plannings · 8/crest · a171bec2"
contentUuid: "61c1c7d2-2d58-5b73-868d-bf29e90307ad"
diamondUuid: "b713bae9-2aab-850e-9578-4602defe7847"
uuid: "a171bec2-f87f-80d0-bdfc-579c0e271c83"
horo: 8
bonds:
  in:
    - accounting
    - budgetvariance
    - identity
    - law
    - planning
    - proof
    - standard
    - variance
  out:
    - accounting
    - budgetvariance
    - identity
    - law
    - planning
    - proof
    - standard
    - variance
typography:
  partition: budget
  bondDegree: 25
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - standard
  matrix:
    - accounting
    - budgetvariance
    - identity
    - law
    - planning
    - proof
    - standard
    - variance
  backlinks:
    - accounting
    - budgetvariance
    - identity
    - law
    - planning
    - proof
    - standard
    - variance
signatures:
  computationUuid: "dab6fefa-673f-8e3d-b5d4-de106d03ad80"
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
      stageUuid: "cce3f77f-9197-854b-b651-4fd6fe792bd9"
    - stage: seal
      stageUuid: "27094773-9500-8f10-b216-8585885f7436"
    - stage: uuid
      stageUuid: "bfeac829-3d81-8463-a0bf-638a45e6ddc9"
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
