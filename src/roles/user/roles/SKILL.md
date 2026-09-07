---
name: roles
description: "Use when assigning or revoking a role definition for a user — the HABTM join that grants a user the capabilities and skill routes of the linked role; duplicate assignments are prevented by hook. The NIST INCITS-359 role-assignment collection."
atomPath: "roles/user/roles"
coordinate: "roles/user/roles · 4/weave · 118bc6e0"
contentUuid: "08edef62-40c1-575a-ab7b-2e1b3d41e710"
diamondUuid: "7f3a464f-0cfe-875f-9f73-194eb2b29c19"
uuid: "118bc6e0-527b-82ed-9ac7-2478134f1299"
horo: 4
typography:
  partition: roles
  bondDegree: 27
standards:
  - "NIST INCITS-359-2012 role-based-access-control role-assignment"
  - "NIST INCITS-359-2012 role-based-access-control role-assignment`"
  - "SOC-2 CC6.3 access-removal"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3891d89c-6007-8b49-bb3c-d348a3ea8253"
  stages:
    - stage: path
      stageUuid: "a733e72e-c7e2-8931-a61d-4b03861cb20e"
    - stage: trinity
      stageUuid: "fe676753-d452-8b7c-9e1c-711cf6fe60d8"
    - stage: boundary
      stageUuid: "ed9a2292-02f0-858e-9feb-2cebe2ea2f7c"
    - stage: links
      stageUuid: "6d1ecf43-ad40-89d3-a91a-8bf0f17d1a7b"
    - stage: horo
      stageUuid: "fbacc0e9-a725-8f22-b372-18d693847adf"
    - stage: seal
      stageUuid: "6e4ac23a-51da-8a87-b893-80cdb43a2394"
    - stage: uuid
      stageUuid: "99e7c43b-3885-8135-b7fe-5c4ed85723a1"
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
