---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: "legal/entities/audit/committees"
coordinate: "legal/entities/audit/committees · 8/crest · 72da1a2e"
contentUuid: "3e73f796-e730-567e-8137-4a1e6ef28a21"
diamondUuid: "3df148e9-ac6a-8a1d-83f2-91f89598b4e8"
uuid: "72da1a2e-7604-82ed-ac9b-50ad4488a284"
horo: 8
typography:
  partition: legal
  bondDegree: 12
standards:
  - "SEC Rule 10A-3 audit-committee"
  - "SOX §301 audit-committee"
bindings: []
signatures:
  computationUuid: "e79fafc8-92ad-8819-84af-c624cbf48fc7"
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
      stageUuid: "b2289d57-3181-895d-9c5c-cc1c2a893c7c"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "a86296d7-3a60-86f9-969f-6360956afe50"
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
