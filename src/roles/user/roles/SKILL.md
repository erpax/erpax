---
name: roles
description: "Use when assigning or revoking a role definition for a user — the HABTM join that grants a user the capabilities and skill routes of the linked role; duplicate assignments are prevented by hook. The NIST INCITS-359 role-assignment collection."
atomPath: "roles/user/roles"
coordinate: "roles/user/roles · 1/base · dd417e26"
contentUuid: "19319fe2-1d8a-5363-bac4-fab845249f35"
diamondUuid: "5e788860-5365-8243-b840-36895001d611"
uuid: "dd417e26-a05f-883f-9fd1-4e868a60f418"
horo: 1
typography:
  partition: roles
  bondDegree: 29
standards:
  - "NIST INCITS-359-2012 role-based-access-control role-assignment"
  - "NIST INCITS-359-2012 role-based-access-control role-assignment`"
  - "SOC-2 CC6.3 access-removal"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "781301a8-0a93-8748-bb28-a60019d323d2"
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
      stageUuid: "464b817e-bad0-8aec-a31a-7e38bbf1b773"
    - stage: seal
      stageUuid: "6e4ac23a-51da-8a87-b893-80cdb43a2394"
    - stage: uuid
      stageUuid: "14effe80-bd8b-8c04-a09c-bdff3b0c67ae"
version: 2
---
# user-roles

Join collection: users ↔ roles via [[users]] and [[roles]] relationship fields.

Enforces single-folder collection pattern: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks).

Access controlled via [[access]] (superadmin only: create/read/update/delete).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST INCITS-359-2012 role-based-access-control role-assignment`

- NIST INCITS-359-2012 role-based-access-control role-assignment
- ISO-27001 A.5.18 access-rights
- ISO-27002 §5.15 access-control
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail
- SOC-2 CC6.3 access-removal

**Law — [[law]]: a user-role is the join that grants a [[users|user]] the capabilities and skill routes of one linked [[roles|role]]; the assignment is deduplicated by hook ([[access]]).**
