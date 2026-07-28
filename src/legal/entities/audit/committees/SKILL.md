---
name: committees
description: "Use when managing the audit committee for a legal entity — charter upload, meeting frequency, membership roster, and status lifecycle. The SOX §301 audit-committee master for corporate governance oversight."
atomPath: "legal/entities/audit/committees"
coordinate: "legal/entities/audit/committees · 1/base · 32360af2"
contentUuid: "ec81b997-9c7c-5547-94cd-fd9c2ecf56a9"
diamondUuid: "14aca376-7b4e-8358-9e0a-bdae89595c27"
uuid: "32360af2-8409-8121-8b3b-70e43657ef4f"
horo: 1
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
  computationUuid: "8b942b6c-d361-8af3-b955-de3bf52f9e66"
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
      stageUuid: "fd638357-be36-8112-b55e-10f49c90f52e"
    - stage: seal
      stageUuid: "db52c85d-379e-8600-900f-f03acf5bd60c"
    - stage: uuid
      stageUuid: "5638cd26-44be-81f5-8400-71c2ffd46f7d"
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
