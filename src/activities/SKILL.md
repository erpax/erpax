---
name: activities
description: "Use when logging or analysing CRM touch-points — calls, emails, meetings, demos, tasks, social touches, document/quote sends, site visits — against a lead, opportunity, customer, vendor or project; relationship history, last-touch date, direction (inbound/outbound), rep activity volume, next-step planning. The CRM activity-log collection."
atomPath: activities
coordinate: activities · 5/round · 683e3f56
contentUuid: "873f5049-44a1-57f6-b1a4-af065bafcc76"
diamondUuid: "28f0a268-5bb9-84bd-8a59-078d44227ee7"
uuid: "683e3f56-ae03-8d1c-be34-b392e91bbcf9"
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
  - "ISO-19011:2018 audit-trail crm-activity"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time"
  - "RFC-5545"
  - "rfc-5545 icalendar"
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
  computationUuid: "1ea896e2-33c8-8a47-9150-7153f37fb1d5"
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
      stageUuid: "4e86e6d4-c18e-8439-b8f2-e7082a229c3b"
    - stage: seal
      stageUuid: "67703e68-6f03-8bcc-ba99-d57fa1c0a6d0"
    - stage: uuid
      stageUuid: "06b4d0cf-a530-8682-94e1-519332bdec42"
version: 2
---
# activities

Activities — calls / emails / meetings log per lead / opportunity / customer.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- rfc-5545 icalendar
- GDPR Art.5(1)(c) data-minimisation
- GDPR Art.30 records-of-processing-activities
- ISO-19011:2018 audit-trail crm-activity
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Leads]] · [[Opportunities]] · [[Customers]] · [[Vendors]] · [[Users]].

**Law — [[law]]: every CRM touch-point is one append-only logged activity — typed, directional (inbound/outbound), timestamped, attributed to a rep and a counterparty — so relationship history and last-touch are recoverable, never inferred.**
