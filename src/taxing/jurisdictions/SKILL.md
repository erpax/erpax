---
name: jurisdictions
description: "Use when looking up or seeding read-only reference data for tax authority geographies — country, region, local and supranational levels with ISO-3166 codes, primary currency, languages, regulatory characteristics, banking requirements, filing deadlines and applicable compliance frameworks. The super-admin-maintained jurisdiction reference collection."
atomPath: taxing/jurisdictions
coordinate: taxing/jurisdictions · 7/descent · 1d1f8607
contentUuid: "bc4d6d35-a5ab-5ebd-ac9b-937b2b5ffbd0"
diamondUuid: "26cc3437-8ba5-8482-a42b-eaf5f4615bb2"
uuid: "1d1f8607-6f0d-847f-805d-c579923e71e4"
horo: 7
bonds:
  in:
    - codes
    - items
    - returns
  out:
    - codes
    - items
    - returns
typography:
  partition: taxing
  bondDegree: 0
  neighbors: []
standards:
  - EU Directive 2006/112/EC VAT
  - "EU-2006/43"
  - "EU-ESRS"
  - "EU-VAT-Directive"
  - "ISO-17442-1"
  - "ISO-3166-1:2020 country-codes"
  - "OECD tax-jurisdiction"
  - XBRL
bindings: []
neighbors:
  wikilink:
    - standards
    - structures
    - templates
  matrix:
    - codes
    - items
    - returns
  backlinks:
    - codes
    - items
    - returns
signatures:
  computationUuid: "fd705c09-6bba-8442-a034-207426e3cc51"
  stages:
    - stage: path
      stageUuid: "601de279-fc37-8f90-8b0b-b9c5affca0a3"
    - stage: trinity
      stageUuid: "a836b277-e4e5-86f6-b966-3fdf2e518f0c"
    - stage: boundary
      stageUuid: "630f3ce1-948d-8ffd-8173-5e9d52a1de16"
    - stage: links
      stageUuid: "8f53fcb6-edc0-886f-b8b3-8ad8d821b678"
    - stage: horo
      stageUuid: "e8dd121c-597d-8aab-8f2d-096776b1d82a"
    - stage: seal
      stageUuid: "43be8a2c-e9e2-893f-8b4a-f5d728781f18"
    - stage: uuid
      stageUuid: "4b783ec2-ccf2-860d-a9db-e46576049c08"
version: 2
---
# taxing-jurisdictions

TaxingJurisdictions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes
- OECD tax-jurisdiction
- EU Directive 2006/112/EC VAT
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions/reporting/standards]] · [[taxing/jurisdictions/statutory/report/templates]] · [[taxing/jurisdictions/entity/legal/structures]].
