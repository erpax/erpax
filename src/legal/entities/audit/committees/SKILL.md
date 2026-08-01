---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: "legal/entities/audit/committees"
coordinate: "legal/entities/audit/committees · 5/round · e5238cf1"
contentUuid: "6b98e084-cd49-547c-92a7-f5e9ee0780fe"
diamondUuid: "6b1134a5-d33b-8a79-b6e4-90f6cc871272"
uuid: "e5238cf1-d938-849c-98e6-b82ad4d17337"
horo: 5
typography:
  partition: legal
  bondDegree: 0
standards:
  - "SEC Rule 10A-3 audit-committee"
  - "SOX §301 audit-committee"
bindings: []
signatures:
  computationUuid: "a5c66b5f-126f-8931-b09a-f5b02402dfa3"
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
      stageUuid: "1e5ef910-3a90-8ff2-8150-3733d9694a92"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "775c8840-bb31-813a-9a79-d0c49ac819f8"
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
