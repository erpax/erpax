---
name: roles
description: "Use when assigning or revoking a role definition for a user — the HABTM join that grants a user the capabilities and skill routes of the linked role; duplicate assignments are prevented by hook. The NIST INCITS-359 role-assignment collection."
atomPath: "roles/user/roles"
coordinate: "roles/user/roles · 4/weave · 76d9d619"
contentUuid: "5d63fad6-cb4b-56a1-b3c0-f1de64d6f55b"
diamondUuid: "2b8e7940-9d63-8f3a-af93-b4716d54a5b6"
uuid: "76d9d619-a075-830b-b870-f350b8ca3959"
horo: 4
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
  computationUuid: "a0e20df2-983b-887a-b0ea-cfc0aeee3942"
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
      stageUuid: "bdefe8a7-bafa-8e70-94a8-24c522e8ed8c"
    - stage: seal
      stageUuid: "6e4ac23a-51da-8a87-b893-80cdb43a2394"
    - stage: uuid
      stageUuid: "5df0958b-9317-8719-a64e-a449755afb5b"
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
