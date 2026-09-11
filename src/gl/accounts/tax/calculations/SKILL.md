---
name: calculations
description: "Use when computing or reviewing tax-liability snapshots per period and jurisdiction — VAT, GST, income tax, payroll tax — with rate, gross/taxable/net amounts, GL payable account, and filing/payment deadlines; lifecycle from calculated to filed/paid. The tax-calculations period-snapshot collection."
atomPath: "gl/accounts/tax/calculations"
coordinate: "gl/accounts/tax/calculations · 8/crest · 4b6fffbe"
contentUuid: "efb7c850-9d45-5387-9847-4991f9d83e92"
diamondUuid: "8d352ee1-b7c0-8627-8f76-8565ee3d8136"
uuid: "4b6fffbe-c4ab-8b96-9a52-2c5f26d7b8dc"
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
  computationUuid: "0af90b29-c0df-88b8-a498-e2f1c4922c3c"
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
      stageUuid: "18113eb5-6c5f-8934-ac3d-3becce776a65"
    - stage: seal
      stageUuid: "b7722fdd-120b-851d-9fc0-2b05bb0200b2"
    - stage: uuid
      stageUuid: "3eb09373-9afe-87c3-abcf-c409a6211d0a"
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
