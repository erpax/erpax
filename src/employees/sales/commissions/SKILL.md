---
name: commissions
description: "Use when recording and accounting for salesperson commissions on closed-won deals — IFRS-15 §91-94 incremental-cost-of-obtaining assessment, capitalise-and-amortise vs immediate-expense treatment, clawback provisions, payroll payment linkage. The IFRS-15 commission register."
atomPath: "employees/sales/commissions"
coordinate: "employees/sales/commissions · 5/round · 799e130a"
contentUuid: "df158897-e9a3-5921-b56b-17498d0ba3c3"
diamondUuid: "bf3c7da7-f4d1-808d-96fb-0ede126d2a36"
uuid: "799e130a-9d28-8fc9-b288-25e9af27c6e6"
horo: 5
typography:
  partition: employees
  bondDegree: 33
standards:
  - "IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining"
  - "IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls commission-completeness"
  - "US-GAAP ASC-340-40-25-1 incremental-costs"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "dd665392-6cd1-82d4-9185-775b3b71e7df"
  stages:
    - stage: path
      stageUuid: "2190973b-e538-83ad-8a0c-09a9d7a6dff3"
    - stage: trinity
      stageUuid: "e202198a-8fc9-8aac-bdf1-d2cd2945733b"
    - stage: boundary
      stageUuid: "e2fa174c-a119-8efa-bd01-8cbb5c8b9c84"
    - stage: links
      stageUuid: "d59c5861-b9a7-8812-8e5e-a084033e32b2"
    - stage: horo
      stageUuid: "c2b4c340-78b7-8a37-a24f-8f548273632d"
    - stage: seal
      stageUuid: "51741b34-5140-8ddf-94df-c45a873dfd47"
    - stage: uuid
      stageUuid: "523b4bce-b35d-82ad-8c8f-b213d3137e4a"
version: 2
---
# sales-commissions

Sales Commissions — IFRS-15 §91-94 incremental costs of obtaining a.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining
- IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation
- US-GAAP ASC-340-40-25-1 incremental-costs
- ISO-19011:2018 audit-trail commission-evidence
- SOX §404 internal-controls commission-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]].

**Law — [[law]]: every closed-won commission is an IFRS-15 §91-94 incremental cost double-entry [[accounting]]ed — capitalise-and-amortise or immediately expensed by the same rule, clawbacks reversed not erased.**
