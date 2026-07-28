---
name: minutes
description: "Use when capturing formal audit committee meeting records — agenda, attendees, discussion summary, key decisions, action items with due dates, auditor observations, compliance matters, and the approved minutes document. The SOX §301 committee-records evidence collection."
atomPath: "legal/entities/audit/committees/audit/committee/minutes"
coordinate: "legal/entities/audit/committees/audit/committee/minutes · 7/descent · b18af5dd"
contentUuid: "cbdaa1a4-e687-5f5d-a8db-0a220bbeb8bd"
diamondUuid: "3727d3a6-9a1b-84dc-b793-4dd4a5b53af0"
uuid: "b18af5dd-b643-8c1b-92c2-d9fba8b11989"
horo: 7
bonds:
  in:
    - actions
    - committee
    - committees
  out:
    - actions
    - committees
typography:
  partition: legal
  bondDegree: 6
  neighbors: []
standards:
  - "ISO-8601-1:2019 meeting-date"
  - "ISO-8601-1:2019 meeting-date`"
  - "SOX §301 audit-committee-records"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - actions
  matrix:
    - actions
    - committees
  backlinks:
    - actions
    - committees
signatures:
  computationUuid: "a3fb3d56-020f-81c5-a884-e23281ac2f3c"
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
      stageUuid: "18f8447d-935c-852f-9242-b25516e681a3"
    - stage: seal
      stageUuid: "ef407894-7f90-83ba-a7c2-c01cbfe55747"
    - stage: uuid
      stageUuid: "9bc61e9d-6448-84fa-8bc4-f28358a61013"
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
