---
name: jurisdictions
description: "Use when looking up or seeding read-only reference data for tax authority geographies — country, region, local and supranational levels with ISO-3166 codes, primary currency, languages, regulatory characteristics, banking requirements, filing deadlines and applicable compliance frameworks. The super-admin-maintained jurisdiction reference collection."
atomPath: "taxing/jurisdictions"
coordinate: "taxing/jurisdictions · 4/weave · 5e8ff1c4"
contentUuid: "611d1b4c-50e9-5f26-85c7-2a85e31d6a1e"
diamondUuid: "d0378e3c-eef0-8c8b-9642-f7627884a3a2"
uuid: "5e8ff1c4-9451-8b51-abc5-ad11d772c44c"
horo: 4
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
  computationUuid: "0094b4cb-e96c-8cb7-8f6d-b8bd84705185"
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
      stageUuid: "3c5afcf1-6a37-8066-95ee-f3c823b6f756"
    - stage: seal
      stageUuid: "43be8a2c-e9e2-893f-8b4a-f5d728781f18"
    - stage: uuid
      stageUuid: "732b0a83-b726-8f0c-b092-7c27ba3502c9"
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
