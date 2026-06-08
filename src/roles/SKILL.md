---
name: roles
description: "Use when defining RBAC roles — global, collection-scoped, or document-scoped — each carrying an optional capability (read/write/sign/admin/audit) and skill routes that users inherit on assignment. The NIST INCITS-359 role-definition collection."
atomPath: roles
coordinate: roles · 8/crest · 7c782a28
contentUuid: "76246aa4-0d3f-5238-8e9b-466f5eabe9ee"
diamondUuid: "d7833ce1-9cbd-8d7f-8783-a69c45e94d85"
uuid: "7c782a28-b863-8a63-9bac-ea8a3396ad34"
horo: 8
bonds:
  in:
    - access
    - agent
    - classroom
    - cross
    - identity
    - law
    - rodin
    - roles
  out:
    - access
    - agent
    - classroom
    - cross
    - identity
    - law
    - rodin
    - roles
typography:
  partition: roles
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "SOC-2 CC6.1 logical-access-controls"
  - SOX
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - access
    - classroom
    - identity
    - law
    - rodin
  matrix:
    - access
    - agent
    - classroom
    - cross
    - identity
    - law
    - rodin
    - roles
  backlinks:
    - access
    - agent
    - classroom
    - cross
    - identity
    - law
    - rodin
    - roles
signatures:
  computationUuid: "287bd1b1-37f3-8fbc-b7e6-665ef36792f3"
  stages:
    - stage: path
      stageUuid: "c2462caf-3a26-8139-bb34-a7aa31fec32d"
    - stage: trinity
      stageUuid: "c8efac5e-98ce-82de-87f8-48d5ec8810be"
    - stage: boundary
      stageUuid: "8f2232a5-7e70-8c0b-a950-a23a09d6e002"
    - stage: links
      stageUuid: "613e1af0-0fd9-8258-8792-e208dfeab713"
    - stage: horo
      stageUuid: "b98cbfe5-1236-87b5-a51e-5c6d2cf9f6a3"
    - stage: seal
      stageUuid: "98cb9111-a695-8a03-959d-1806ee76c5c9"
    - stage: uuid
      stageUuid: "53e6b2d4-dd3b-8a83-b93f-5326ca44683c"
version: 2
---
# roles

Role **definitions** (`name` + binding).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- NIST INCITS-359-2012 role-based-access-control
- ISO-27001 A.5.18 access-rights
- ISO-27002 §5.15 access-control
- ISO-27002 §5.16 identity-management
- SOC-2 CC6.1 logical-access-controls
- SOX §404 internal-controls

Composes: [[access]] · [[classroom]] · [[identity]] · [[rodin]].

**Law — [[law]]: a role is a definition (name + binding) carrying an optional capability and skill routes that users inherit on assignment — capabilities live on the role, not the user ([[access]]).**
