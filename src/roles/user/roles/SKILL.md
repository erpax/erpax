---
name: roles
description: "Use when assigning or revoking a role definition for a user — the HABTM join that grants a user the capabilities and skill routes of the linked role; duplicate assignments are prevented by hook. The NIST INCITS-359 role-assignment collection."
atomPath: roles/user/roles
coordinate: roles/user/roles · 7/descent · 8414414c
contentUuid: "f6f36b1d-4dd0-5232-8254-245e4a8e899b"
diamondUuid: "ff6780b7-a853-8b71-8db6-d2c511b2a9e7"
uuid: "8414414c-7a23-8a2b-b154-17403de703a4"
horo: 7
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
    - user
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
  - "ISO-19011:2018 audit-trail"
  - "NIST INCITS-359-2012 role-based-access-control role-assignment"
  - "SOC-2 CC6.3 access-removal"
bindings: []
neighbors:
  wikilink:
    - access
    - law
    - roles
    - users
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
  computationUuid: "75f36407-b712-8507-8a02-a414f0e08edf"
  stages:
    - stage: path
      stageUuid: "a733e72e-c7e2-8931-a61d-4b03861cb20e"
    - stage: trinity
      stageUuid: "fe676753-d452-8b7c-9e1c-711cf6fe60d8"
    - stage: boundary
      stageUuid: "ed9a2292-02f0-858e-9feb-2cebe2ea2f7c"
    - stage: links
      stageUuid: "51883207-37aa-85ec-b1be-83b878d945e8"
    - stage: horo
      stageUuid: "b7b575a8-a942-84e9-b348-5f5941032c37"
    - stage: seal
      stageUuid: "6e4ac23a-51da-8a87-b893-80cdb43a2394"
    - stage: uuid
      stageUuid: "fa489063-cf64-8efc-b1a7-4573e0cf04e0"
version: 2
---
# user-roles

Join collection: users ↔ roles via [[users]] and [[roles]] relationship fields.

Enforces single-folder collection pattern: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks).

Access controlled via [[access]] (superadmin only: create/read/update/delete).

## Standards
- NIST INCITS-359-2012 role-based-access-control role-assignment
- ISO-27001 A.5.18 access-rights
- ISO-27002 §5.15 access-control
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail
- SOC-2 CC6.3 access-removal

**Law — [[law]]: a user-role is the join that grants a [[users|user]] the capabilities and skill routes of one linked [[roles|role]]; the assignment is deduplicated by hook ([[access]]).**
