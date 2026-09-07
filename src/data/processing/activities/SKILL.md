---
name: activities
description: "Use when maintaining the GDPR Art.30 Records of Processing Activities (RoPA) — documenting each processing activity's purpose, lawful basis, data categories, retention period, third-country transfer safeguards, and scheduling annual DPO reviews. The controller/processor RoPA register."
atomPath: "data/processing/activities"
coordinate: "data/processing/activities · 2/share · d4516ff1"
contentUuid: "21254b52-7fd1-574e-a454-fe46f1b22e68"
diamondUuid: "952d1eff-a93d-8d7c-b52d-34cc67f39527"
uuid: "d4516ff1-53b1-87ee-8f76-fdd3d72fa09c"
horo: 2
typography:
  partition: data
  bondDegree: 58
standards:
  - "GDPR Art.30(1) records-controller"
  - "GDPR Art.30(2) records-processor"
  - "GDPR Art.5(1)(e) storage-limitation"
  - "ISO-27701:2019 §6.3.1 records-of-processing"
  - "ISO-8601-1:2019 date-time review-due-at"
  - "ISO-8601-1:2019 date-time review-due-at`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "68d51102-1189-84d6-96c7-a13291058a93"
  stages:
    - stage: path
      stageUuid: "8d4664f9-fc2c-82c5-a13f-a40d9e25a966"
    - stage: trinity
      stageUuid: "5364f373-964c-8fd6-852f-363e9dd59213"
    - stage: boundary
      stageUuid: "4bebff49-13c6-84d2-9a6d-4b9634c17c55"
    - stage: links
      stageUuid: "0d5ac127-f4fc-869a-810e-a6d1befde096"
    - stage: horo
      stageUuid: "f9ea23c1-9607-876e-a853-be870c0375ec"
    - stage: seal
      stageUuid: "94db3aa7-55aa-8ac5-a9e7-11accdd3822d"
    - stage: uuid
      stageUuid: "8e48a493-563e-88e1-a3e3-d233df87673f"
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

The collection schema is built with [[field]], [[access]], and [[hooks]]:
- **Schema** ([[field]]): activity name, purpose, controller/processor role, lawful basis (Art.6), data categories (including Art.9 special categories), data subject categories, recipient categories, third-country transfers (Art.44), retention period, security measures (Art.32).
- **Access** ([[access]]): tenant-scoped read, admin-gated create/update, tenant-admin delete.
- **Lifecycle** ([[hooks]]): standard collection hooks for audit and consistency.

**Composes**: [[consent/records]].
