---
name: leads
description: "Use when capturing and qualifying prospects before they become customers — inbound/outbound sourcing, BANT/MEDDIC lead scoring, MQL/SQL progression, and conversion to an opportunity or customer on close-won. The CRM pre-customer lead collection."
atomPath: leads
coordinate: "leads · 4/weave · 1baf434b"
contentUuid: "424a092c-d2b2-58c7-ba0b-853f46e20a8e"
diamondUuid: "1da2c821-647b-876b-8592-d7dfec4e4339"
uuid: "1baf434b-bee8-83a8-9cfb-ef7d593462cf"
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
  computationUuid: "a27fac1f-84aa-8bda-b2e5-bc1fcab43dcc"
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
      stageUuid: "b915c70a-2497-8952-ac02-2ff75bad07f6"
    - stage: seal
      stageUuid: "f9b927f7-98d2-88cd-b4d5-813287a9fdb1"
    - stage: uuid
      stageUuid: "9e041a99-b404-8439-8083-e470dfa6484a"
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
