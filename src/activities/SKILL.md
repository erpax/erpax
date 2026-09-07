---
name: activities
description: "Use when logging or analysing CRM touch-points — calls, emails, meetings, demos, tasks, social touches, document/quote sends, site visits — against a lead, opportunity, customer, vendor or project; relationship history, last-touch date, direction (inbound/outbound), rep activity volume, next-step planning. The CRM activity-log collection."
atomPath: activities
coordinate: "activities · 8/crest · 9a4e3651"
contentUuid: "093cde7a-f8eb-54f7-9da2-03431e597ba5"
diamondUuid: "5269484c-f85c-81e7-8a5f-1d2b98f21fce"
uuid: "9a4e3651-8046-8045-999c-a815eb10019f"
horo: 8
typography:
  partition: activities
  bondDegree: 58
standards:
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
signatures:
  computationUuid: "18bc5e6b-f34f-8ba7-8b55-355d67665c8b"
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
      stageUuid: "ef35c041-6b6f-8b4e-b5b2-eed36b500502"
    - stage: seal
      stageUuid: "181d77b7-a31c-8a7d-9890-4da0bae80813"
    - stage: uuid
      stageUuid: "ce6695b8-2ea4-85ef-9757-fcc44383beab"
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
