---
name: leads
description: "Use when capturing and qualifying prospects before they become customers — inbound/outbound sourcing, BANT/MEDDIC lead scoring, MQL/SQL progression, and conversion to an opportunity or customer on close-won. The CRM pre-customer lead collection."
atomPath: leads
coordinate: "leads · 4/weave · 0c839406"
contentUuid: "d414ff39-c4e6-5636-8ae2-2b12e4f12b73"
diamondUuid: "5f2547ca-dc18-845d-9c98-88196a09ad46"
uuid: "0c839406-eadc-8a4c-affb-24f6bd9fd9c8"
horo: 4
bonds:
  in:
    - access
    - accounting
    - activities
    - campaign
    - funnel
    - law
    - leadscore
    - opportunities
    - pipeline
    - prospect
    - standard
  out:
    - access
    - accounting
    - activities
    - campaign
    - funnel
    - law
    - leadscore
    - opportunities
    - pipeline
    - prospect
    - standard
typography:
  partition: leads
  bondDegree: 34
  neighbors: []
standards:
  - "GDPR Art.5 data-minimisation"
  - "GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - law
    - opportunities
    - standard
  matrix:
    - access
    - accounting
    - activities
    - campaign
    - funnel
    - law
    - leadscore
    - opportunities
    - pipeline
    - prospect
    - standard
  backlinks:
    - access
    - accounting
    - activities
    - campaign
    - funnel
    - law
    - leadscore
    - opportunities
    - pipeline
    - prospect
    - standard
signatures:
  computationUuid: "62bb279a-d6c9-8f57-90e0-a9bf4dba3e8b"
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
      stageUuid: "db5a537e-23da-8aa3-a133-6c395116607d"
    - stage: seal
      stageUuid: "f9b927f7-98d2-88cd-b4d5-813287a9fdb1"
    - stage: uuid
      stageUuid: "6caf008f-1e6b-8536-9b25-3208eaa320fc"
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
