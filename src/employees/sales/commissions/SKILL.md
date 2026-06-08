---
name: commissions
description: "Use when recording and accounting for salesperson commissions on closed-won deals — IFRS-15 §91-94 incremental-cost-of-obtaining assessment, capitalise-and-amortise vs immediate-expense treatment, clawback provisions, payroll payment linkage. The IFRS-15 commission register."
atomPath: employees/sales/commissions
coordinate: employees/sales/commissions · 4/weave · f4396700
contentUuid: "3b9bbb72-5f65-5bfa-86f8-f772069eab27"
diamondUuid: "eaceee92-ab7c-8652-921b-78342982bdeb"
uuid: "f4396700-7fcd-8393-a501-47af5dd169cb"
horo: 4
bonds:
  in:
    - accounting
    - commission
    - employees
    - fees
    - identity
    - law
    - proof
    - quota
    - sales
    - specification
    - standard
    - transaction
  out:
    - accounting
    - commission
    - employees
    - fees
    - identity
    - law
    - proof
    - quota
    - specification
    - standard
    - transaction
typography:
  partition: employees
  bondDegree: 33
  neighbors: []
standards:
  - "IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining"
  - "IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation"
  - "ISO-19011:2018 audit-trail commission-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls commission-completeness"
  - "US-GAAP ASC-340-40-25-1 incremental-costs"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - commission
    - employees
    - fees
    - identity
    - law
    - proof
    - quota
    - specification
    - standard
    - transaction
  backlinks:
    - accounting
    - commission
    - employees
    - fees
    - identity
    - law
    - proof
    - quota
    - specification
    - standard
    - transaction
signatures:
  computationUuid: "36ffc4b0-9445-8773-ab8e-3f903421a423"
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
      stageUuid: "b5dd1338-fdda-85d7-a441-74dd71ea70e1"
    - stage: seal
      stageUuid: "51741b34-5140-8ddf-94df-c45a873dfd47"
    - stage: uuid
      stageUuid: "86d5d7fd-8cd9-8a7b-8f03-6c4fd1014654"
version: 2
---
# sales-commissions

Sales Commissions — IFRS-15 §91-94 incremental costs of obtaining a.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
