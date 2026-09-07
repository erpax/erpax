---
name: members
description: "Use when recording individual members of an audit committee — name, title, affiliation (internal/external/independent), role (chair/vice-chair/member/financial-expert), term dates, and expertise areas. The SOX §301 committee-composition roster."
atomPath: "legal/entities/audit/committees/audit/committee/members"
coordinate: "legal/entities/audit/committees/audit/committee/members · 7/descent · c804804e"
contentUuid: "a6b0724d-78d9-50a7-a62b-631a0b6e60d3"
diamondUuid: "d5a99ab5-b0fd-8bb4-9bf0-7470875b3bae"
uuid: "c804804e-3c06-8786-af0b-a2e6fc4e350e"
horo: 7
typography:
  partition: legal
  bondDegree: 3
standards:
  - "NYSE 303A.07 audit-committee"
  - "SEC Rule 10A-3 audit-committee-independence"
  - "SOX §301 audit-committee-composition"
bindings: []
signatures:
  computationUuid: "d1470644-9820-8c63-bcd0-1eff0b7280cf"
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
      stageUuid: "149468ea-c051-8674-9d3a-6bf55ff0c74a"
    - stage: seal
      stageUuid: "9ac44f9d-f298-89ff-9dd2-a2a30690d8dd"
    - stage: uuid
      stageUuid: "78c52813-fe0d-85ab-ba7a-2c7a083187c0"
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
