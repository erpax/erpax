---
name: activities
description: "Use when maintaining the GDPR Art.30 Records of Processing Activities (RoPA) — documenting each processing activity's purpose, lawful basis, data categories, retention period, third-country transfer safeguards, and scheduling annual DPO reviews. The controller/processor RoPA register."
atomPath: "data/processing/activities"
coordinate: "data/processing/activities · 5/round · 069f1260"
contentUuid: "cc2a0316-b22d-5504-ab1d-2c4aa0b9d520"
diamondUuid: "e99f3178-0232-838e-8b05-6b14db72541a"
uuid: "069f1260-a6ff-855c-bcad-d6a85301e702"
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
  - "ISO-27701:2019 §6.3.1 records-of-processing"
  - "ISO-8601-1:2019 date-time review-due-at"
  - "ISO-8601-1:2019 date-time review-due-at`"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "1f76e213-1a66-838b-a116-69dd7389b47e"
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
      stageUuid: "0a3d6d68-f29d-8177-97b9-485f1249d1e7"
    - stage: seal
      stageUuid: "94db3aa7-55aa-8ac5-a9e7-11accdd3822d"
    - stage: uuid
      stageUuid: "7d70fce8-2177-8eef-a4c9-fe670498c640"
version: 2
---
# data-processing-activities

Data Processing Activities — GDPR Art.30 Records of Processing Activities (RoPA).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time review-due-at`

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
