---
name: members
description: "Use when recording individual members of an audit committee — name, title, affiliation (internal/external/independent), role (chair/vice-chair/member/financial-expert), term dates, and expertise areas. The SOX §301 committee-composition roster."
atomPath: "legal/entities/audit/committees/audit/committee/members"
coordinate: "legal/entities/audit/committees/audit/committee/members · 5/round · 6e0df9d3"
contentUuid: "d2be7c4f-43f9-50ef-b913-4066656a908b"
diamondUuid: "8311f259-ad96-8c27-af62-fc1fae215ab3"
uuid: "6e0df9d3-8c7e-81c9-8cd1-af700b21e616"
horo: 5
typography:
  partition: legal
  bondDegree: 3
standards:
  - "NYSE 303A.07 audit-committee"
  - "SEC Rule 10A-3 audit-committee-independence"
  - "SOX §301 audit-committee-composition"
bindings: []
signatures:
  computationUuid: "de168da1-b7bf-8345-b1fd-03d0d76859ed"
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
      stageUuid: "f2cdfc3d-6923-8023-8309-ba6fe8312362"
    - stage: seal
      stageUuid: "9ac44f9d-f298-89ff-9dd2-a2a30690d8dd"
    - stage: uuid
      stageUuid: "dd008eac-0a05-840d-9a62-37ab94555e8f"
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
