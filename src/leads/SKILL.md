---
name: leads
description: "Use when capturing and qualifying prospects before they become customers — inbound/outbound sourcing, BANT/MEDDIC lead scoring, MQL/SQL progression, and conversion to an opportunity or customer on close-won. The CRM pre-customer lead collection."
atomPath: leads
coordinate: "leads · 4/weave · aecb8d0d"
contentUuid: "9f48f256-74ef-5174-9b74-49f32d5a9d7e"
diamondUuid: "e1022c27-8f89-845a-913a-8a39b7f36216"
uuid: "aecb8d0d-40b8-8053-8947-e6e1d4982029"
horo: 4
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
  computationUuid: "0500e84c-f7f9-8a63-b2f9-27cfbd1935f9"
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
      stageUuid: "d58c4772-61ef-8ec2-8355-6b2f7fb03aec"
    - stage: seal
      stageUuid: "f9b927f7-98d2-88cd-b4d5-813287a9fdb1"
    - stage: uuid
      stageUuid: "eaf09d3f-4ce5-8604-877c-4674d401e327"
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
