---
name: "359"
description: "Use when implementing or referencing NIST INCITS 359 — Role-Based Access Control."
atomPath: "nist/incits/359"
coordinate: "nist/incits/359 · 7/descent · 1ba87209"
contentUuid: "c6aa884e-d47b-5206-9639-0cdfb82a59ca"
diamondUuid: "b70d88a5-5f55-8a75-94ee-ddc95a103963"
uuid: "1ba87209-66f1-8927-a8e0-1c680af56305"
horo: 7
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
  computationUuid: "5f04c0ab-a318-8ac3-adc6-7d2e886c88a0"
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
      stageUuid: "7b9f7ff7-5944-8c48-8947-e87d11d8db02"
    - stage: seal
      stageUuid: "cbbb38f4-a2f8-8116-8fdb-4603e613f8c1"
    - stage: uuid
      stageUuid: "cc618f19-cccc-8356-a19e-4723cf63b0fa"
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
