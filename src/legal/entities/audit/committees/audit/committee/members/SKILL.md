---
name: members
description: "Use when recording individual members of an audit committee — name, title, affiliation (internal/external/independent), role (chair/vice-chair/member/financial-expert), term dates, and expertise areas. The SOX §301 committee-composition roster."
atomPath: "legal/entities/audit/committees/audit/committee/members"
coordinate: "legal/entities/audit/committees/audit/committee/members · 2/share · f13aee2f"
contentUuid: "186c51a4-b53c-513f-88a8-8d516139a34a"
diamondUuid: "3e4189e9-cdef-80b6-85f8-f1bd7c7d4e42"
uuid: "f13aee2f-bff2-8948-8fa9-799f849d8ef2"
horo: 2
typography:
  partition: legal
  bondDegree: 3
standards:
  - "NYSE 303A.07 audit-committee"
  - "SEC Rule 10A-3 audit-committee-independence"
  - "SOX §301 audit-committee-composition"
bindings: []
signatures:
  computationUuid: "de4b2b83-d9c2-8d12-9d61-e20a147ce6f4"
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
      stageUuid: "9054b81a-fca0-801d-9e44-6ea2b8e8bca8"
    - stage: seal
      stageUuid: "9ac44f9d-f298-89ff-9dd2-a2a30690d8dd"
    - stage: uuid
      stageUuid: "a0b4290b-b434-8874-bfa5-97c1fced21b2"
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
