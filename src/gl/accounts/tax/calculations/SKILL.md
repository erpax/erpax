---
name: calculations
description: "Use when computing or reviewing tax-liability snapshots per period and jurisdiction — VAT, GST, income tax, payroll tax — with rate, gross/taxable/net amounts, GL payable account, and filing/payment deadlines; lifecycle from calculated to filed/paid. The tax-calculations period-snapshot collection."
atomPath: "gl/accounts/tax/calculations"
coordinate: "gl/accounts/tax/calculations · 7/descent · ba307cb4"
contentUuid: "33a8efd6-8511-5991-bcaf-eb88482d3c79"
diamondUuid: "361e5f09-a591-811a-bfd7-245fc8642282"
uuid: "ba307cb4-7657-8f09-b319-489299560296"
horo: 7
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
  computationUuid: "2aef38f0-f230-8b38-8473-91c77798b569"
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
      stageUuid: "30239ca5-0098-8451-92ac-8f809c311eec"
    - stage: seal
      stageUuid: "b7722fdd-120b-851d-9fc0-2b05bb0200b2"
    - stage: uuid
      stageUuid: "da128142-ca33-849d-b996-37e980b73843"
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
