---
name: minutes
description: "Use when capturing formal audit committee meeting records — agenda, attendees, discussion summary, key decisions, action items with due dates, auditor observations, compliance matters, and the approved minutes document. The SOX §301 committee-records evidence collection."
atomPath: "legal/entities/audit/committees/audit/committee/minutes"
coordinate: "legal/entities/audit/committees/audit/committee/minutes · 4/weave · f4a61d71"
contentUuid: "f8cf0fc1-8d27-5bbe-802e-2727769fdb5f"
diamondUuid: "f56c140f-edb7-8562-8657-369ccdfd3eec"
uuid: "f4a61d71-d93b-80df-b41c-b2750e2b5f5e"
horo: 4
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
  computationUuid: "56404ba7-88bb-8a37-a92a-36d9fb0b870d"
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
      stageUuid: "7199966d-cf79-8a31-91a1-b23e11fd0a1d"
    - stage: seal
      stageUuid: "ef407894-7f90-83ba-a7c2-c01cbfe55747"
    - stage: uuid
      stageUuid: "162bfbce-bc8c-8013-ba58-7fa772b52786"
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
