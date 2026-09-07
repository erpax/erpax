---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: "legal/entities/audit/committees"
coordinate: "legal/entities/audit/committees · 8/crest · 8034871a"
contentUuid: "5198f08a-a89a-599f-90ae-ddf80a18ac90"
diamondUuid: "246aa941-128d-8801-91ca-521cbbea70d4"
uuid: "8034871a-d219-83f8-b78d-e608fd3fc52b"
horo: 8
typography:
  partition: legal
  bondDegree: 12
standards:
  - "SEC Rule 10A-3 audit-committee"
  - "SOX §301 audit-committee"
bindings: []
signatures:
  computationUuid: "fd67fe10-e8e7-8706-9f0d-5b63ab1bf323"
  stages:
    - stage: path
      stageUuid: "32e16169-bf8b-816c-aff7-1477fdd3dcc8"
    - stage: trinity
      stageUuid: "8ba8e0be-4114-824e-ab1f-e8871d8c79e8"
    - stage: boundary
      stageUuid: "6520841a-410b-8a5b-935f-5ed5efb5409f"
    - stage: links
      stageUuid: "c4fae53f-91a9-87d5-9984-286f3ef35820"
    - stage: horo
      stageUuid: "603c1dbb-57d0-81ee-b3ec-4e4cef0d3d1f"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "1a38fcd6-c49b-8d6e-9caf-05825fc6a589"
version: 2
---
# audit-committees

AuditCommittees.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §301 audit-committee
- SEC Rule 10A-3 audit-committee
- ISO-19011:2018 oversight
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[legal/entities/audit/committees/audit/committee/members]] · [[legal/entities/audit/committees/audit/committee/minutes]].
