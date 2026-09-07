---
name: jurisdictions
description: "Use when looking up or seeding read-only reference data for tax authority geographies — country, region, local and supranational levels with ISO-3166 codes, primary currency, languages, regulatory characteristics, banking requirements, filing deadlines and applicable compliance frameworks. The super-admin-maintained jurisdiction reference collection."
atomPath: "taxing/jurisdictions"
coordinate: "taxing/jurisdictions · 1/base · 535666a1"
contentUuid: "f8b98d50-24d3-5bd1-bc9a-ba77057fbc93"
diamondUuid: "2495b432-a4ad-86ee-ae10-e9446a13d052"
uuid: "535666a1-bb03-861d-b2ca-48bdb8519607"
horo: 1
typography:
  partition: taxing
  bondDegree: 14
standards:
  - "EU Directive 2006/112/EC VAT"
  - "EU-ESRS"
  - "EU-VAT-Directive"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "OECD tax-jurisdiction"
  - XBRL
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f0faddfb-2e61-8630-aa3e-a0bdb8d60807"
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
      stageUuid: "3e0c2d44-e283-8ef9-844a-95e416fd814a"
    - stage: seal
      stageUuid: "43be8a2c-e9e2-893f-8b4a-f5d728781f18"
    - stage: uuid
      stageUuid: "00f911e0-90df-82f9-a2a6-9ec16c25a5dd"
version: 2
---
# taxing-jurisdictions

TaxingJurisdictions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes`

- ISO-3166-1:2020 country-codes
- OECD tax-jurisdiction
- EU Directive 2006/112/EC VAT
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions/reporting/standards]] · [[taxing/jurisdictions/statutory/report/templates]] · [[taxing/jurisdictions/entity/legal/structures]].
