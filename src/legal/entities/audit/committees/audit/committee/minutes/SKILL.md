---
name: minutes
description: "Use when capturing formal audit committee meeting records — agenda, attendees, discussion summary, key decisions, action items with due dates, auditor observations, compliance matters, and the approved minutes document. The SOX §301 committee-records evidence collection."
atomPath: "legal/entities/audit/committees/audit/committee/minutes"
coordinate: "legal/entities/audit/committees/audit/committee/minutes · 4/weave · bbb036c9"
contentUuid: "5ef6b26a-3864-5595-9452-b121b04db72a"
diamondUuid: "1cdc77e5-93fc-879c-99d5-4c8c36a41ea5"
uuid: "bbb036c9-9cb7-8d86-8e67-c8df9f8eaff8"
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
  computationUuid: "b9f090fb-870e-80e7-8a5f-a24d41766598"
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
      stageUuid: "7087607f-1215-8c5a-86a0-a6e5dc8a8ea9"
    - stage: seal
      stageUuid: "ef407894-7f90-83ba-a7c2-c01cbfe55747"
    - stage: uuid
      stageUuid: "f63d6a9e-1747-869a-a166-36faf9e431a2"
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
