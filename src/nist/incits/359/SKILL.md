---
name: "359"
description: "Use when implementing or referencing NIST INCITS 359 — Role-Based Access Control."
atomPath: nist/incits/359
coordinate: nist/incits/359 · 2/share · a94eb8b8
contentUuid: "0e096b65-1ceb-54db-a366-ffd67943b834"
diamondUuid: "5189cf05-1bdf-84f3-a9ee-90f592331827"
uuid: "a94eb8b8-b3cd-8007-9482-a5a4ca557dfe"
horo: 2
bonds:
  in: []
  out:
    - "108"
typography:
  partition: nist
  bondDegree: 0
  neighbors: []
standards:
  - "NIST INCITS-359-2012 role-based-access-control"
  - "NIST SP-800-162 attribute-based-access-control"
  - "NIST-INCITS-359-2012"
  - "NIST-SP-800-162"
  - "SOC-2 CC6.1 logical-access-controls"
  - "SOC-2 CC6.3 access-removal"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "1b175fb4-b7bc-8af6-85db-b5bbe87bed7a"
  stages:
    - stage: path
      stageUuid: "0e9bb9a2-627a-8ca4-8e8c-ec3b6a75c51a"
    - stage: trinity
      stageUuid: "30177c4c-8cc4-8411-be9f-6057dd97987f"
    - stage: boundary
      stageUuid: "96624772-b3df-8499-aa93-af69088134e8"
    - stage: links
      stageUuid: "322a47fc-d091-85aa-b017-340427463f17"
    - stage: horo
      stageUuid: "9b810857-f2b1-8305-a6b6-648975a2b77c"
    - stage: seal
      stageUuid: "cbbb38f4-a2f8-8116-8fdb-4603e613f8c1"
    - stage: uuid
      stageUuid: "fd041e69-0dd5-8295-a8ef-7f2fa746e191"
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
- `src/collections/Roles/hooks/validateRoleDefinition.ts` — ensures
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
