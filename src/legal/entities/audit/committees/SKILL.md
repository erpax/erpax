---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: "legal/entities/audit/committees"
coordinate: "legal/entities/audit/committees · 5/round · 6fa3465f"
contentUuid: "d72914d2-e8cd-54f4-b448-29e0362a429f"
diamondUuid: "532d4548-f6e4-828d-aedc-6444660107f5"
uuid: "6fa3465f-00d9-8015-8b5c-44885cb3510f"
horo: 5
typography:
  partition: legal
  bondDegree: 12
standards:
  - "SEC Rule 10A-3 audit-committee"
  - "SOX §301 audit-committee"
bindings: []
signatures:
  computationUuid: "99c430c7-2eb5-8fb4-99a4-a6a11cc29c21"
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
      stageUuid: "7c901e61-f3f5-85f2-b442-6c52f9840044"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "bcd4c488-1774-8c71-b023-9f042e9744c5"
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
