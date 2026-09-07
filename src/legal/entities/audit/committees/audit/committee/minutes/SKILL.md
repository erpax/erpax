---
name: minutes
description: "Use when capturing formal audit committee meeting records — agenda, attendees, discussion summary, key decisions, action items with due dates, auditor observations, compliance matters, and the approved minutes document. The SOX §301 committee-records evidence collection."
atomPath: "legal/entities/audit/committees/audit/committee/minutes"
coordinate: "legal/entities/audit/committees/audit/committee/minutes · 8/crest · c89dc408"
contentUuid: "aead1625-039b-5936-a101-1c9b19ddd2b8"
diamondUuid: "820b89a5-11d8-815c-a28e-6add964f4f7f"
uuid: "c89dc408-26dc-8a81-a280-85311776a68e"
horo: 8
typography:
  partition: legal
  bondDegree: 6
standards:
  - "ISO-8601-1:2019 meeting-date"
  - "ISO-8601-1:2019 meeting-date`"
  - "SOX §301 audit-committee-records"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ab58dc1a-12b4-8b54-99e0-318291fcbdfb"
  stages:
    - stage: path
      stageUuid: "2dcc24ba-d36e-89ac-ac1d-52c1a9ddce7f"
    - stage: trinity
      stageUuid: "1d87b854-ad18-808b-885c-a99435b6d8d3"
    - stage: boundary
      stageUuid: "c36d5211-bcc9-8c77-aa21-f3b89553ee50"
    - stage: links
      stageUuid: "718b344a-616a-8b7f-bfbe-970fadde8efc"
    - stage: horo
      stageUuid: "210d9f0b-f2e5-88b2-978c-7dc7b1d6c8e7"
    - stage: seal
      stageUuid: "ef407894-7f90-83ba-a7c2-c01cbfe55747"
    - stage: uuid
      stageUuid: "45e644b1-8666-82ad-92f2-634b459fec8c"
version: 2
---
# audit-committee-minutes

AuditCommitteeMinutes.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 meeting-date`

- SOX §301 audit-committee-records
- ISO-19011:2018 audit-evidence
- ISO-8601-1:2019 meeting-date
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[legal/entities/board/actions]].
