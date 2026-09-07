---
name: calculations
description: "Use when computing or reviewing tax-liability snapshots per period and jurisdiction — VAT, GST, income tax, payroll tax — with rate, gross/taxable/net amounts, GL payable account, and filing/payment deadlines; lifecycle from calculated to filed/paid. The tax-calculations period-snapshot collection."
atomPath: "gl/accounts/tax/calculations"
coordinate: "gl/accounts/tax/calculations · 8/crest · b026ec15"
contentUuid: "740e4de5-04ea-5505-a0c6-152d5973d770"
diamondUuid: "78593e60-6ed2-8ff9-a732-85960fa44e6a"
uuid: "b026ec15-660c-8df7-b196-53128684db19"
horo: 8
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
  computationUuid: "9e644455-f9a6-8378-9ac8-e4ad8efcd426"
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
      stageUuid: "41ae10a1-d83a-86fa-b3c4-18fbe2340400"
    - stage: seal
      stageUuid: "b7722fdd-120b-851d-9fc0-2b05bb0200b2"
    - stage: uuid
      stageUuid: "0624e4a2-121a-8fa7-b023-5eb18e3ada76"
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
