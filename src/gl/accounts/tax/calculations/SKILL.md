---
name: calculations
description: "Use when computing or reviewing tax-liability snapshots per period and jurisdiction — VAT, GST, income tax, payroll tax — with rate, gross/taxable/net amounts, GL payable account, and filing/payment deadlines; lifecycle from calculated to filed/paid. The tax-calculations period-snapshot collection."
atomPath: "gl/accounts/tax/calculations"
coordinate: "gl/accounts/tax/calculations · 4/weave · 0d7075c5"
contentUuid: "0b2e9362-5e30-5dd9-a733-aeb397925d32"
diamondUuid: "e7ac3118-b90b-8157-ae35-8fa09a94803a"
uuid: "0d7075c5-16c7-8fb9-8feb-e9474995ba12"
horo: 4
typography:
  partition: gl
  bondDegree: 34
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EN-16931:2017 §BG-23 vat-breakdown`"
  - "ISO-3166-1:2020 country-codes jurisdiction"
  - "ISO-3166-1:2020 country-codes jurisdiction`"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes jurisdiction"
  - "ISO-3166-2:2020 subdivision-codes jurisdiction`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time period posted-at filed-at paid-at"
  - "ISO-8601-1:2019 date-time period posted-at filed-at paid-at`"
  - "OECD SAF-T tax-table"
  - "SOX §404 internal-controls tax-position"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0266cb81-5691-8869-91ef-5faebaa16bf1"
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
      stageUuid: "bc4dbf11-6471-890e-9530-ce82f1c6a9bc"
    - stage: seal
      stageUuid: "b7722fdd-120b-851d-9fc0-2b05bb0200b2"
    - stage: uuid
      stageUuid: "c582e7ac-ffc8-823d-a468-6071f6c05105"
version: 2
---
# tax-calculations

Tax Calculations — computed tax-liability snapshots per period.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes jurisdiction`
- `@standard ISO-3166-2:2020 subdivision-codes jurisdiction`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time period posted-at filed-at paid-at`
- `@standard EN-16931:2017 §BG-23 vat-breakdown`

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
