---
name: calculations
description: "Use when computing or reviewing tax-liability snapshots per period and jurisdiction — VAT, GST, income tax, payroll tax — with rate, gross/taxable/net amounts, GL payable account, and filing/payment deadlines; lifecycle from calculated to filed/paid. The tax-calculations period-snapshot collection."
atomPath: gl/accounts/tax/calculations
coordinate: gl/accounts/tax/calculations · 8/crest · ea9be5f6
contentUuid: "7c755356-275a-5cef-8185-29f57d2f805f"
diamondUuid: "2559f315-74be-807b-ac65-cf8667fd6f18"
uuid: "ea9be5f6-017c-8191-8c4a-6855f6625946"
horo: 8
bonds:
  in:
    - accounting
    - calculation
    - deduction
    - identity
    - law
    - party
    - proof
    - returns
    - standard
    - tax
    - taxexempt
  out:
    - accounting
    - calculation
    - deduction
    - identity
    - law
    - party
    - proof
    - returns
    - standard
    - tax
    - taxexempt
typography:
  partition: gl
  bondDegree: 34
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "ISO-19011:2018 audit-trail"
  - "ISO-3166-1:2020 country-codes jurisdiction"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes jurisdiction"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period posted-at filed-at paid-at"
  - "OECD SAF-T tax-table"
  - "SOX §404 internal-controls tax-position"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - party
    - proof
    - standard
    - tax
    - taxexempt
  matrix:
    - accounting
    - calculation
    - deduction
    - identity
    - law
    - party
    - proof
    - returns
    - standard
    - tax
    - taxexempt
  backlinks:
    - accounting
    - calculation
    - deduction
    - identity
    - law
    - party
    - proof
    - returns
    - standard
    - tax
    - taxexempt
signatures:
  computationUuid: "1ac99ead-311d-8169-9683-04c2f8d9de03"
  stages:
    - stage: path
      stageUuid: "a21c4d46-dfb9-8827-8d5d-ef79247677a5"
    - stage: trinity
      stageUuid: "f0da707c-818f-84f6-8e82-abc0116d8517"
    - stage: boundary
      stageUuid: "c390da46-96f0-8c7c-af0c-5a9fce5d3f23"
    - stage: links
      stageUuid: "8ea662ea-5321-83e2-a608-92cabfadaa94"
    - stage: horo
      stageUuid: "4cc803eb-aa63-8917-8acc-90d6aee36dfc"
    - stage: seal
      stageUuid: "b7722fdd-120b-851d-9fc0-2b05bb0200b2"
    - stage: uuid
      stageUuid: "d729be4b-a12f-8302-ae41-48bde7d5a785"
version: 2
---
# tax-calculations

Tax Calculations — computed tax-liability snapshots per period.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes jurisdiction
- ISO-3166-2:2020 subdivision-codes jurisdiction
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period posted-at filed-at paid-at
- EN-16931:2017 §BG-23 vat-breakdown
- OECD SAF-T tax-table
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls tax-position
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[tax]] · [[accounting]] · [[standard]] · [[identity]] · [[proof]] · [[party]] · [[taxexempt]].

**Law — [[law]]: a tax calculation is a computed liability snapshot per period and jurisdiction — rate over gross/taxable/net, bound to a GL payable account and filing/payment deadlines — moving calculated→filed→paid; one immutable position, not a recompute.**
