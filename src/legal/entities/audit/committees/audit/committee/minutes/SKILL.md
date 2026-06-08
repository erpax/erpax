---
name: minutes
description: "Use when capturing formal audit committee meeting records — agenda, attendees, discussion summary, key decisions, action items with due dates, auditor observations, compliance matters, and the approved minutes document. The SOX §301 committee-records evidence collection."
atomPath: legal/entities/audit/committees/audit/committee/minutes
coordinate: legal/entities/audit/committees/audit/committee/minutes · 4/weave · 41d6a5bc
contentUuid: "c28ba6c7-3b7f-55ab-9770-d332c7392ced"
diamondUuid: "cdf00023-873e-8de5-9c2f-bfec315ab0de"
uuid: "41d6a5bc-4c6e-8a27-97a7-1da0de1e3f09"
horo: 4
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
  - "ISO-19011:2018 audit-evidence"
  - "ISO-8601-1:2019 meeting-date"
  - "SOX §301 audit-committee-records"
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
  computationUuid: "14c09d9f-1130-86d7-911b-6330577736b8"
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
      stageUuid: "1376a879-9e6e-84cb-b83d-04af91747065"
    - stage: seal
      stageUuid: "ef407894-7f90-83ba-a7c2-c01cbfe55747"
    - stage: uuid
      stageUuid: "25527e2b-17fe-802e-8eac-ebe28c879df6"
version: 2
---
# audit-committee-minutes

AuditCommitteeMinutes.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §301 audit-committee-records
- ISO-19011:2018 audit-evidence
- ISO-8601-1:2019 meeting-date
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[legal/entities/board/actions]].
