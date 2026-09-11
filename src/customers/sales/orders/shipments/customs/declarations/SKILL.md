---
name: declarations
description: "Use when filing export or import customs declarations for a cross-border shipment — recording HS-coded line items, declared values, duty and import VAT, INCOTERMS, country of origin, and tracking MRN issuance through to customs release. The EU UCC / WCO structured customs-declaration collection."
atomPath: "customers/sales/orders/shipments/customs/declarations"
coordinate: "customers/sales/orders/shipments/customs/declarations · 1/base · 7cd852f0"
contentUuid: "53c5d539-c079-57cc-adfb-2ab9060ee2c0"
diamondUuid: "abc160fb-5f23-8ef2-8435-3a48829485a0"
uuid: "7cd852f0-ea14-8399-842c-90d46fe6e601"
horo: 1
typography:
  partition: customers
  bondDegree: 22
standards:
  - "EU UCC Regulation 952/2013 union-customs-code"
  - "EU UCC §6 customs-declaration"
  - "EU-UCC"
  - "ISO-3166-1:2020 country-codes country-of-origin"
  - "ISO-3166-1:2020 country-codes country-of-origin`"
  - "ISO-4217:2015 currency-codes valuation-currency"
  - "ISO-4217:2015 currency-codes valuation-currency`"
  - "ISO-8601-1:2019 date-time declaration-date"
  - "ISO-8601-1:2019 date-time declaration-date`"
  - "OECD BEPS Action 13 transfer-pricing-documentation"
  - "WCO Data Model 3.x customs-data-elements"
  - "WCO HS Convention harmonised-system"
  - "WCO-HS"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6c1a4272-2b01-8504-bec4-b7250ffc21e4"
  stages:
    - stage: path
      stageUuid: "f4aaf92f-e8f6-837f-9176-90853296d68d"
    - stage: trinity
      stageUuid: "424be992-bfe9-8a55-8538-514adf7131c5"
    - stage: boundary
      stageUuid: "b161df1e-ad44-88f0-9c53-2791d9294c42"
    - stage: links
      stageUuid: "1bf33a65-f181-8403-83fe-47f2b0fac359"
    - stage: horo
      stageUuid: "150e297d-1b8d-8e8a-becd-95df8b6d394e"
    - stage: seal
      stageUuid: "a0e29fa5-94ed-834e-ae8c-6de1a9f3b023"
    - stage: uuid
      stageUuid: "cfc6509b-cfea-8f02-a439-7835b00b91b3"
version: 2
---
# customs-declarations

[[shipments]] + [[items]] — WCO HS-coded export/import declarations structured via [[field]], [[hooks]], and [[access]].

Collection shape: `index.ts` (schema + standards banners), `seed.ts` (opening data), `index.test.ts` (invariant checks).
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time declaration-date`
- `@standard ISO-3166-1:2020 country-codes country-of-origin`
- `@standard ISO-4217:2015 currency-codes valuation-currency`

- ISO-8601-1:2019 date-time declaration-date
- ISO-3166-1:2020 country-codes country-of-origin
- ISO-4217:2015 currency-codes valuation-currency
- WCO HS Convention harmonised-system
- EU UCC Regulation 952/2013 union-customs-code
- WCO Data Model 3.x customs-data-elements
- ISO-19011:2018 audit-trail customs-evidence
- EU UCC §6 customs-declaration
- OECD BEPS Action 13 transfer-pricing-documentation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: every HS-coded line's declared value reconciles to its shipment item, and no cross-border movement is lawful until the issued MRN reaches customs-release.**
