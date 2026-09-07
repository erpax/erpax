---
name: jurisdictions
description: "Use when looking up or seeding read-only reference data for tax authority geographies — country, region, local and supranational levels with ISO-3166 codes, primary currency, languages, regulatory characteristics, banking requirements, filing deadlines and applicable compliance frameworks. The super-admin-maintained jurisdiction reference collection."
atomPath: "taxing/jurisdictions"
coordinate: "taxing/jurisdictions · 1/base · 6c7116e5"
contentUuid: "65e10220-01b4-5ce3-9fa4-a49d4cd3a2ea"
diamondUuid: "12712454-6d47-847c-aa34-6373d1661504"
uuid: "6c7116e5-f885-86d7-9903-b7911e489d2f"
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
  computationUuid: "74252efe-ed18-819c-8e08-2f9428f61585"
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
      stageUuid: "d638e10a-4a89-8a86-a46a-9d4b6a80ee10"
    - stage: seal
      stageUuid: "43be8a2c-e9e2-893f-8b4a-f5d728781f18"
    - stage: uuid
      stageUuid: "e6f16848-92a7-82ea-8a61-61a57329594b"
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
