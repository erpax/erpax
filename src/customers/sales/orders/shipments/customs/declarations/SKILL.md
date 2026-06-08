---
name: declarations
description: "Use when filing export or import customs declarations for a cross-border shipment — recording HS-coded line items, declared values, duty and import VAT, INCOTERMS, country of origin, and tracking MRN issuance through to customs release. The EU UCC / WCO structured customs-declaration collection."
atomPath: customers/sales/orders/shipments/customs/declarations
coordinate: customers/sales/orders/shipments/customs/declarations · 4/weave · 9b1cf7b4
contentUuid: "1b90c9b3-b76f-5904-8ee3-42f8b4497898"
diamondUuid: "0a8a9fef-b3bb-86fc-81ae-936dbeb572ad"
uuid: "9b1cf7b4-769b-86bd-ab84-a043a6f4e55d"
horo: 4
bonds:
  in:
    - access
    - declaration
    - fields
    - hooks
    - items
    - law
    - shipments
  out:
    - access
    - declaration
    - fields
    - hooks
    - items
    - law
    - shipments
typography:
  partition: customers
  bondDegree: 22
  neighbors: []
standards:
  - "EU UCC Regulation 952/2013 union-customs-code"
  - "EU UCC §6 customs-declaration"
  - "EU-UCC"
  - "ISO-19011:2018 audit-trail customs-evidence"
  - "ISO-3166-1:2020 country-codes country-of-origin"
  - "ISO-4217:2015 currency-codes valuation-currency"
  - "ISO-8601-1:2019 date-time declaration-date"
  - "OECD BEPS Action 13 transfer-pricing-documentation"
  - "WCO Data Model 3.x customs-data-elements"
  - "WCO HS Convention harmonised-system"
  - "WCO-HS"
bindings: []
neighbors:
  wikilink:
    - access
    - fields
    - hooks
    - items
    - law
    - shipments
  matrix:
    - access
    - declaration
    - fields
    - hooks
    - items
    - law
    - shipments
  backlinks:
    - access
    - declaration
    - fields
    - hooks
    - items
    - law
    - shipments
signatures:
  computationUuid: "37fc7d83-4703-8fa1-a926-b9fe7bed5ca1"
  stages:
    - stage: path
      stageUuid: "f4aaf92f-e8f6-837f-9176-90853296d68d"
    - stage: trinity
      stageUuid: "424be992-bfe9-8a55-8538-514adf7131c5"
    - stage: boundary
      stageUuid: "b161df1e-ad44-88f0-9c53-2791d9294c42"
    - stage: links
      stageUuid: "071d22f5-8496-85a1-aef2-e633df9adeee"
    - stage: horo
      stageUuid: "040bd290-2edb-8b78-a46e-012889926124"
    - stage: seal
      stageUuid: "a0e29fa5-94ed-834e-ae8c-6de1a9f3b023"
    - stage: uuid
      stageUuid: "55f3adaa-02e6-8e6f-a34f-0ee972c8a463"
version: 2
---
# customs-declarations

[[shipments]] + [[items]] — WCO HS-coded export/import declarations structured via [[fields]], [[hooks]], and [[access]].

Collection shape: `index.ts` (schema + standards banners), `seed.ts` (opening data), `index.test.ts` (invariant checks).
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
