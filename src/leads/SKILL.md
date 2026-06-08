---
name: leads
description: "Use when capturing and qualifying prospects before they become customers — inbound/outbound sourcing, BANT/MEDDIC lead scoring, MQL/SQL progression, and conversion to an opportunity or customer on close-won. The CRM pre-customer lead collection."
atomPath: leads
coordinate: leads · 7/descent · 178e9214
contentUuid: "9bb2c1a3-5df1-528a-b56f-130d983e6c2b"
diamondUuid: "bf96818c-8f5c-84ef-91e1-d4ada459f087"
uuid: "178e9214-c1f8-8b51-bced-bd7794ec7d50"
horo: 7
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
  - "ISO-19011:2018 audit-trail crm-pipeline"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-8601-1:2019 date-time"
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
  computationUuid: "bd81c149-e0b1-85b9-aff2-76e5b769018f"
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
      stageUuid: "a5301418-2688-8f99-ac88-ded9a2e974af"
    - stage: seal
      stageUuid: "e59ff24a-ac8c-8dc1-814b-5d247ec56d20"
    - stage: uuid
      stageUuid: "5dafe401-15b5-83cf-8dd2-24b649ca0186"
version: 2
---
# leads

Leads — pre-customer state qualified-lead pipeline.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-3166-1:2020 country-codes
- GDPR Art.5 data-minimisation
- GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)
- ISO-19011:2018 audit-trail crm-pipeline
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Opportunities]] · [[access]] · [[accounting]] · [[standard]].

**Law — [[law]]: a lead is the pre-customer state — a prospect sourced and qualified (BANT/MEDDIC, MQL→SQL) that converts to an opportunity or customer on close, never the customer itself.**
