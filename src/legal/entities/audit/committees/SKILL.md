---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: "legal/entities/audit/committees"
coordinate: "legal/entities/audit/committees · 1/base · b9f91c36"
contentUuid: "77177d85-134b-5431-addc-a4ef55d27819"
diamondUuid: "76f08458-42af-8518-ad9a-a3c5ab5ea3e4"
uuid: "b9f91c36-6906-8af2-940a-47de55598f7f"
horo: 1
typography:
  partition: legal
  bondDegree: 9
standards:
  - "SEC Rule 10A-3 audit-committee"
  - "SOX §301 audit-committee"
bindings: []
signatures:
  computationUuid: "7ba01d7a-8906-83af-a7ed-8f8cf3cd625a"
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
      stageUuid: "52376a9d-016f-8572-9ba4-b03c40cd1a2e"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "139d9f3d-bfd8-8412-a59b-b93a8868dde5"
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
