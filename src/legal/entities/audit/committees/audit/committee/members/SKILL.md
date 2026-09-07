---
name: members
description: "Use when recording individual members of an audit committee — name, title, affiliation (internal/external/independent), role (chair/vice-chair/member/financial-expert), term dates, and expertise areas. The SOX §301 committee-composition roster."
atomPath: "legal/entities/audit/committees/audit/committee/members"
coordinate: "legal/entities/audit/committees/audit/committee/members · 4/weave · 66113775"
contentUuid: "a7015680-cb09-52ed-8489-1689f17d5a2d"
diamondUuid: "c6448a17-aadc-8cab-8e7b-6306d3408a5f"
uuid: "66113775-fe60-8992-81b5-5a5dad9b038a"
horo: 4
typography:
  partition: legal
  bondDegree: 3
standards:
  - "NYSE 303A.07 audit-committee"
  - "SEC Rule 10A-3 audit-committee-independence"
  - "SOX §301 audit-committee-composition"
bindings: []
signatures:
  computationUuid: "461a7ddc-3a00-82ff-b747-83a75a465051"
  stages:
    - stage: path
      stageUuid: "cf88a4d2-e636-8912-a3ab-cfebaab3fb46"
    - stage: trinity
      stageUuid: "12f414ad-2aae-85e7-9770-471175e425ba"
    - stage: boundary
      stageUuid: "aa09dfad-1ef3-868f-a100-94e6a6d51f1e"
    - stage: links
      stageUuid: "c1e2d989-260a-8fee-86d2-91e12e1fbcd8"
    - stage: horo
      stageUuid: "74e0933b-76b9-852a-b009-d4a165a7f0cf"
    - stage: seal
      stageUuid: "9ac44f9d-f298-89ff-9dd2-a2a30690d8dd"
    - stage: uuid
      stageUuid: "238875a0-428b-8d84-a071-66a1e2d363b8"
version: 2
---
# audit-committee-members

AuditCommitteeMembers.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §301 audit-committee-composition
- SEC Rule 10A-3 audit-committee-independence
- NYSE 303A.07 audit-committee
- ISO-27001 A.5.23 cloud-service-tenant-isolation
