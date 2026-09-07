---
name: "359"
description: "Use when implementing or referencing NIST INCITS 359 — Role-Based Access Control."
atomPath: "nist/incits/359"
coordinate: "nist/incits/359 · 5/round · d7ac372b"
contentUuid: "814d393f-5a2a-54b0-b6b3-4f79b3805782"
diamondUuid: "7c02b1ff-17f6-8b6f-8bc9-4b57e2658487"
uuid: "d7ac372b-d200-87a1-ae72-efbef39fed6a"
horo: 5
typography:
  partition: nist
  bondDegree: 12
standards:
  - "NIST INCITS-359-2012 role-based-access-control"
  - "NIST INCITS-359-2012 role-based-access-control`"
  - "NIST SP-800-162 attribute-based-access-control"
  - "NIST SP-800-162 attribute-based-access-control`"
  - "NIST-INCITS-359-2012"
  - "NIST-SP-800-162"
  - "SOC-2 CC6.1 logical-access-controls"
  - "SOC-2 CC6.3 access-removal"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ba3faa45-3ebc-8dc9-9550-ed40b6f1cdfd"
  stages:
    - stage: path
      stageUuid: "0e9bb9a2-627a-8ca4-8e8c-ec3b6a75c51a"
    - stage: trinity
      stageUuid: "30177c4c-8cc4-8411-be9f-6057dd97987f"
    - stage: boundary
      stageUuid: "96624772-b3df-8499-aa93-af69088134e8"
    - stage: links
      stageUuid: "4a27dc48-f471-823c-9b23-787df4dd1be1"
    - stage: horo
      stageUuid: "edf5bdd9-51ee-8f80-a0d9-14d0e1ab8afd"
    - stage: seal
      stageUuid: "cbbb38f4-a2f8-8116-8fdb-4603e613f8c1"
    - stage: uuid
      stageUuid: "92b94822-71e8-880d-92e4-68937cfcd167"
version: 2
---
# NIST INCITS 359 — Role-Based Access Control

**Edition in use:** INCITS 359-2012 (R2017).
**Publisher:** <https://standards.incits.org/apps/group_public/project/details.php?project_id=2074>
**Companion:** NIST SP 800-162 (ABAC), used at the same checkpoints when
attribute-based decisions complement role-based ones.

## What's here

- `index.ts` — public re-exports.
- `predicates.ts` — pure `RoleDefinition` predicates: `hasRole`,
  `hasStrictRole`, `hasAnyRole`, `hasAllRoles`, `hasCachedRole`.
- `payload.ts` — Payload `roles` / `user_roles` mutations: `addRole` /
  `grant`, `removeRole` / `revoke`.
- `types.ts` — `RoleDefinition`, `ScopeResourceCollection`, `ScopedResource`,
  `AnyScope`, `RoleMatch`.
- `conventions.ts` — Unix `rwx`-style triplet vocabulary (`BIT_READ`,
  `BIT_WRITE`, `BIT_DELETE`, `permissionTripletToString`,
  `permissionStringToTriplet`). The `rwx` letters are a *naming* layer over
  Payload's `access` block; every check still runs through Payload's auth
  stack, not a parallel ACL engine.

## Bindings

| Binding      | Meaning                                                       |
|--------------|---------------------------------------------------------------|
| `global`     | Definition applies app-wide (super-admin, etc.).              |
| `collection` | Definition applies to every row in `scopedCollection`.        |
| `document`   | Definition applies to one specific row (`resource: { ... }`). |

## Used by

- `src/collections/Roles/index.ts` — collection schema + access predicates.
- `src/roles/hooks/validateRoleDefinition.ts` — ensures
  `binding`/`scopedCollection`/`resource` triple is internally consistent.

Imports through the legacy `@/utilities/permissions` path still work via the
deprecated shim.

## Out of scope

- Cross-role inheritance (parent-child role hierarchies in INCITS 359 §6) —
  not used today; add when the assignment graph needs it.
- Constrained role activation (`SoD` static / dynamic separation, INCITS 359
  §7) — enforced at the auth stack today; promote to formal SoD records when
  audit requires it.

## Companion standard

- **NIST SP 800-162** — Attribute-Based Access Control (ABAC) — cited where
  predicates accept tenant-attribute or resource-attribute filters.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST INCITS-359-2012 role-based-access-control`
- `@standard NIST SP-800-162 attribute-based-access-control`

Composes: [[standards]] · [[access]].
