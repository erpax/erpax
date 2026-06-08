---
name: activities
description: "Use when maintaining the GDPR Art.30 Records of Processing Activities (RoPA) — documenting each processing activity's purpose, lawful basis, data categories, retention period, third-country transfer safeguards, and scheduling annual DPO reviews. The controller/processor RoPA register."
atomPath: data/processing/activities
coordinate: data/processing/activities · 8/crest · 02336b30
contentUuid: "0366935e-8925-56e8-ace0-19953ca0c4b9"
diamondUuid: "7f6455be-ba91-88b5-9187-7e0dd8f5feec"
uuid: "02336b30-a4c2-8230-8598-0d81cf0d216d"
horo: 8
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
    - processing
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
  partition: data
  bondDegree: 58
  neighbors: []
standards:
  - "GDPR Art.30(1) records-controller"
  - "GDPR Art.30(2) records-processor"
  - "GDPR Art.5(1)(e) storage-limitation"
  - "ISO-19011:2018 audit-trail ropa-evidence"
  - "ISO-27701:2019 §6.3.1 records-of-processing"
  - "ISO-8601-1:2019 date-time review-due-at"
bindings: []
neighbors:
  wikilink:
    - access
    - fields
    - hooks
    - records
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
  computationUuid: "7a302e15-cb0e-835e-bd39-b97505b70cd6"
  stages:
    - stage: path
      stageUuid: "8d4664f9-fc2c-82c5-a13f-a40d9e25a966"
    - stage: trinity
      stageUuid: "5364f373-964c-8fd6-852f-363e9dd59213"
    - stage: boundary
      stageUuid: "4bebff49-13c6-84d2-9a6d-4b9634c17c55"
    - stage: links
      stageUuid: "1cad9f42-8fc6-808a-a253-3a353b836f7b"
    - stage: horo
      stageUuid: "0a87e5bd-414a-8fb6-8743-e3c97daf2f61"
    - stage: seal
      stageUuid: "94db3aa7-55aa-8ac5-a9e7-11accdd3822d"
    - stage: uuid
      stageUuid: "23c8387a-d8bc-889f-b97c-25b487b56c54"
version: 2
---
# data-processing-activities

Data Processing Activities — GDPR Art.30 Records of Processing Activities (RoPA).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time review-due-at
- GDPR Art.30(1) records-controller
- GDPR Art.30(2) records-processor
- GDPR Art.5(1)(e) storage-limitation
- ISO-27701:2019 §6.3.1 records-of-processing
- ISO-19011:2018 audit-trail ropa-evidence
- ISO-27001 A.5.34 privacy-and-pii

## Composition

The collection schema is built with [[fields]], [[access]], and [[hooks]]:
- **Schema** ([[fields]]): activity name, purpose, controller/processor role, lawful basis (Art.6), data categories (including Art.9 special categories), data subject categories, recipient categories, third-country transfers (Art.44), retention period, security measures (Art.32).
- **Access** ([[access]]): tenant-scoped read, admin-gated create/update, tenant-admin delete.
- **Lifecycle** ([[hooks]]): standard collection hooks for audit and consistency.

**Composes**: [[consent/records]].
