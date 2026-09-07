---
name: roles
description: "Use when defining RBAC roles — global, collection-scoped, or document-scoped — each carrying an optional capability (read/write/sign/admin/audit) and skill routes that users inherit on assignment. The NIST INCITS-359 role-definition collection."
atomPath: roles
coordinate: "roles · 8/crest · 21cc5180"
contentUuid: "e2265497-ef52-5f4f-b089-a0ed41addefb"
diamondUuid: "34d4225d-802f-8cd4-854b-9137e1ef47f8"
uuid: "21cc5180-dc2f-814c-a375-73a70a2ab3e0"
horo: 8
typography:
  partition: roles
  bondDegree: 29
standards:
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "NIST INCITS-359-2012 role-based-access-control`"
  - "SOC-2 CC6.1 logical-access-controls"
  - SOX
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "78c6c024-d985-8e8a-8cf8-5ca7ddb96a3a"
  stages:
    - stage: path
      stageUuid: "c2462caf-3a26-8139-bb34-a7aa31fec32d"
    - stage: trinity
      stageUuid: "c8efac5e-98ce-82de-87f8-48d5ec8810be"
    - stage: boundary
      stageUuid: "17e085d4-e985-8e83-8a19-62e51af7c656"
    - stage: links
      stageUuid: "613e1af0-0fd9-8258-8792-e208dfeab713"
    - stage: horo
      stageUuid: "a890b06a-16f1-873a-bcc8-eec5cd8d1189"
    - stage: seal
      stageUuid: "16991275-4158-81cf-8d8e-2306dc00b31d"
    - stage: uuid
      stageUuid: "51df4aa3-ad2b-8dd8-bdb6-4d75e7f767c1"
version: 2
---
# roles

Role **definitions** (`name` + binding).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST INCITS-359-2012 role-based-access-control`

- NIST INCITS-359-2012 role-based-access-control
- ISO-27001 A.5.18 access-rights
- ISO-27002 §5.15 access-control
- ISO-27002 §5.16 identity-management
- SOC-2 CC6.1 logical-access-controls
- SOX §404 internal-controls

Composes: [[access]] · [[classroom]] · [[identity]] · [[rodin]].

**Law — [[law]]: a role is a definition (name + binding) carrying an optional capability and skill routes that users inherit on assignment — capabilities live on the role, not the user ([[access]]).**
