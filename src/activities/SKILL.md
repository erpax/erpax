---
name: activities
description: "Use when logging or analysing CRM touch-points — calls, emails, meetings, demos, tasks, social touches, document/quote sends, site visits — against a lead, opportunity, customer, vendor or project; relationship history, last-touch date, direction (inbound/outbound), rep activity volume, next-step planning. The CRM activity-log collection."
atomPath: activities
coordinate: "activities · 5/round · 5541d5d2"
contentUuid: "b61dc4f3-480d-5584-b1f1-8ac7626d2f2f"
diamondUuid: "d04acf6b-43a9-867a-a8a5-92fdf8535dd6"
uuid: "5541d5d2-c04a-8b4f-a069-92c9ccf52b64"
horo: 5
bonds:
  in:
    - attribution
    - customers
    - engagement
    - escalation
    - interview
    - law
    - leads
    - leadscore
    - opportunities
    - prospect
    - queue
    - retention
    - sentiment
    - sla
    - ticket
    - users
    - vendors
  out:
    - attribution
    - customers
    - engagement
    - escalation
    - interview
    - law
    - leads
    - leadscore
    - opportunities
    - prospect
    - queue
    - retention
    - sentiment
    - sla
    - ticket
    - users
    - vendors
typography:
  partition: activities
  bondDegree: 58
  neighbors: []
standards:
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-Intrastat-Reg-2019/2152"
  - "GDPR Art.30 records-of-processing-activities"
  - "GDPR Art.5(1)(c) data-minimisation"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "RFC-5545"
  - "rfc-5545 icalendar"
  - "rfc-5545 icalendar`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - customers
    - law
    - leads
    - opportunities
    - users
    - vendors
  matrix:
    - attribution
    - customers
    - engagement
    - escalation
    - interview
    - law
    - leads
    - leadscore
    - opportunities
    - prospect
    - queue
    - retention
    - sentiment
    - sla
    - ticket
    - users
    - vendors
  backlinks:
    - attribution
    - customers
    - engagement
    - escalation
    - interview
    - law
    - leads
    - leadscore
    - opportunities
    - prospect
    - queue
    - retention
    - sentiment
    - sla
    - ticket
    - users
    - vendors
signatures:
  computationUuid: "b89a769e-2bb6-8a0a-bc8d-50ae50a979c0"
  stages:
    - stage: path
      stageUuid: "a7db485e-6813-825e-9e77-3c34e544ca06"
    - stage: trinity
      stageUuid: "641ce8fc-2501-82c2-9d1f-c7d14d3d5711"
    - stage: boundary
      stageUuid: "ce6b9752-2f85-8b3e-980f-d4a9b522e6bb"
    - stage: links
      stageUuid: "8f1f16fe-52fe-8875-8f4c-967707c27f48"
    - stage: horo
      stageUuid: "f5916bf3-d3d8-86c2-940b-869dbdb9bb39"
    - stage: seal
      stageUuid: "181d77b7-a31c-8a7d-9890-4da0bae80813"
    - stage: uuid
      stageUuid: "52f4bd69-a122-8b6c-99fe-945ea23533de"
version: 2
---
# activities

Activities — calls / emails / meetings log per lead / opportunity / customer.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard rfc-5545 icalendar`

- ISO-8601-1:2019 date-time
- rfc-5545 icalendar
- GDPR Art.5(1)(c) data-minimisation
- GDPR Art.30 records-of-processing-activities
- ISO-19011:2018 audit-trail crm-activity
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Leads]] · [[Opportunities]] · [[Customers]] · [[Vendors]] · [[Users]].

**Law — [[law]]: every CRM touch-point is one append-only logged activity — typed, directional (inbound/outbound), timestamped, attributed to a rep and a counterparty — so relationship history and last-touch are recoverable, never inferred.**
