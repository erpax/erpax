---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: legal/entities/audit/committees
coordinate: legal/entities/audit/committees · 5/round · b6609291
contentUuid: "f5684bd8-274d-57e6-a325-4f294df377e4"
diamondUuid: "8e4d5b92-8c3f-8add-9f97-3dc150d2e116"
uuid: "b6609291-d7a8-84c1-a3bd-93d8cd242a28"
horo: 5
bonds:
  in:
    - audit
    - committee
    - entities
    - members
    - minutes
  out:
    - committee
    - entities
    - members
    - minutes
typography:
  partition: legal
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-19011:2018 oversight"
  - "SEC Rule 10A-3 audit-committee"
  - "SOX §301 audit-committee"
bindings: []
neighbors:
  wikilink:
    - members
    - minutes
  matrix:
    - committee
    - entities
    - members
    - minutes
  backlinks:
    - committee
    - entities
    - members
    - minutes
signatures:
  computationUuid: "e28013d6-df0f-855e-bcaa-4f5e259ff5a0"
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
      stageUuid: "51dccd35-4a47-8cb1-998e-c503058b1478"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "65eb717e-b162-878b-ac3b-390552af3384"
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
