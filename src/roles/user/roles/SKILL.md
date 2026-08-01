---
name: roles
description: "Use when assigning or revoking a role definition for a user — the HABTM join that grants a user the capabilities and skill routes of the linked role; duplicate assignments are prevented by hook. The NIST INCITS-359 role-assignment collection."
atomPath: "roles/user/roles"
coordinate: "roles/user/roles · 7/descent · 30faa2a0"
contentUuid: "5ae692f4-6ab2-5b6f-b826-cc92f404f2b9"
diamondUuid: "2eb91f3a-1c2e-813a-98b4-a66cc8037660"
uuid: "30faa2a0-9066-8989-89a5-881d29e5d43f"
horo: 7
typography:
  partition: roles
  bondDegree: 0
standards:
  - "NIST INCITS-359-2012 role-based-access-control role-assignment"
  - "NIST INCITS-359-2012 role-based-access-control role-assignment`"
  - "SOC-2 CC6.3 access-removal"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "67caee23-9d50-8faf-8e55-59828015628a"
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
      stageUuid: "45ae0291-5401-86c6-b60e-bd9653d1fa7f"
    - stage: seal
      stageUuid: "6e4ac23a-51da-8a87-b893-80cdb43a2394"
    - stage: uuid
      stageUuid: "94214ad0-86fb-842f-8108-399289612e8e"
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
