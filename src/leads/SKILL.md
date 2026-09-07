---
name: leads
description: "Use when capturing and qualifying prospects before they become customers — inbound/outbound sourcing, BANT/MEDDIC lead scoring, MQL/SQL progression, and conversion to an opportunity or customer on close-won. The CRM pre-customer lead collection."
atomPath: leads
coordinate: "leads · 1/base · ac53d75e"
contentUuid: "685066bb-8c31-5dbd-a6c2-4fc7a8ceb5d5"
diamondUuid: "91f23942-ca21-8fce-b2ad-b5a3b3e2d857"
uuid: "ac53d75e-569a-8333-b513-7a941b954464"
horo: 1
typography:
  partition: leads
  bondDegree: 34
standards:
  - "GDPR Art.5 data-minimisation"
  - "GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "82e779c1-9128-8bcc-b593-81b35a090943"
  stages:
    - stage: path
      stageUuid: "20106496-7c97-85a2-a958-bcd903c96f68"
    - stage: trinity
      stageUuid: "727344c6-03d1-8a94-ab9a-994f9052388b"
    - stage: boundary
      stageUuid: "21c6b590-4b61-8656-9275-ccca1937aca5"
    - stage: links
      stageUuid: "cdf0287d-8ad5-8526-9f42-20918752a6fc"
    - stage: horo
      stageUuid: "f822a7a4-1d8b-8a81-ab0b-5da57bb01c61"
    - stage: seal
      stageUuid: "f9b927f7-98d2-88cd-b4d5-813287a9fdb1"
    - stage: uuid
      stageUuid: "73d0f372-02f9-82ef-8431-14f83e72faee"
version: 2
---
# leads

Leads — pre-customer state qualified-lead pipeline.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-3166-1:2020 country-codes`

- ISO-8601-1:2019 date-time
- ISO-3166-1:2020 country-codes
- GDPR Art.5 data-minimisation
- GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)
- ISO-19011:2018 audit-trail crm-pipeline
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Opportunities]] · [[access]] · [[accounting]] · [[standard]].

**Law — [[law]]: a lead is the pre-customer state — a prospect sourced and qualified (BANT/MEDDIC, MQL→SQL) that converts to an opportunity or customer on close, never the customer itself.**
