---
name: minutes
description: "Use when capturing formal audit committee meeting records — agenda, attendees, discussion summary, key decisions, action items with due dates, auditor observations, compliance matters, and the approved minutes document. The SOX §301 committee-records evidence collection."
atomPath: "legal/entities/audit/committees/audit/committee/minutes"
coordinate: "legal/entities/audit/committees/audit/committee/minutes · 4/weave · 8e741aef"
contentUuid: "0c7b0753-b18c-5d15-8e02-fa933130869b"
diamondUuid: "7bc0c2fc-0d88-86d9-b894-5b697bb71064"
uuid: "8e741aef-72a1-88d9-9e3b-48f7b272d7ee"
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
  computationUuid: "e6170794-1c08-87cd-90e5-913fc15c37dd"
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
      stageUuid: "b17e1c6f-d255-888f-b5d2-f005158f8cce"
    - stage: seal
      stageUuid: "ef407894-7f90-83ba-a7c2-c01cbfe55747"
    - stage: uuid
      stageUuid: "4da919ed-3e04-88d1-8943-ddf43acdf426"
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
