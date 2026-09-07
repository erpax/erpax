---
name: commissions
description: "Use when recording and accounting for salesperson commissions on closed-won deals — IFRS-15 §91-94 incremental-cost-of-obtaining assessment, capitalise-and-amortise vs immediate-expense treatment, clawback provisions, payroll payment linkage. The IFRS-15 commission register."
atomPath: "employees/sales/commissions"
coordinate: "employees/sales/commissions · 1/base · a823ee3c"
contentUuid: "bfbc68ea-f7f5-5edf-b939-37361cd65b06"
diamondUuid: "824b12fd-3dec-8d06-bbc4-e047ec9474af"
uuid: "a823ee3c-6f63-8077-99a2-c91dba81e301"
horo: 1
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
  computationUuid: "af67f8da-7b72-8564-9ec4-93304dd7612b"
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
      stageUuid: "4a3fef1e-0c59-814b-8730-8da74451a285"
    - stage: seal
      stageUuid: "51741b34-5140-8ddf-94df-c45a873dfd47"
    - stage: uuid
      stageUuid: "567a813e-07eb-8744-a092-bb614e0284e2"
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
