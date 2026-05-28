---
name: access
description: Use when defining or debugging Payload access control — who can create/read/update/delete a collection, global, or field, RBAC, row-level filtering by user/tenant, admin-panel visibility, or "access denied"/"document hidden" issues.
---

# access — Payload access control (position 3, the control triad)

Access functions are scoped per **operation** (`create`/`read`/`update`/`delete`), run **before** the op, and return either a boolean OR a `Where` query (row-level filter — only docs matching are accessible).

## Shapes
```ts
// boolean
const adminOnly: Access = ({ req: { user } }) => user?.roles?.includes('admin')
// row-level (returns a Where) — e.g. tenant scoping
const ownTenant: Access = ({ req }) => ({ tenant: { equals: getTenant(req) } })
```

## Scopes
| Scope | Where | Operations |
|---|---|---|
| Collection | `collection.access` | create, read, update, delete, readVersions, unlock |
| Global | `global.access` | read, update, readVersions |
| Field | `field.access` | create, read, update (booleans only — no Where) |
| Admin | `collection.admin.hidden` / access read | controls panel visibility |

## Rules
- **Default** = `Boolean(user)` (must be logged in). Override per collection/field.
- **Local API skips access by default** — pass `overrideAccess: false` (+ `user`) to enforce it.
- **Access Operation** (runs at login across everything): `id`, `data`, `doc`, `siblingData`, `blockData` are `undefined` and returned `Where` queries are treated as "no access". Always guard `if (!data) ...`.
- Use `req.locale` for locale-specific access.
- In erpax, tenant row-level filtering is provided by the multi-tenant plugin — don't hand-roll per-collection tenant `Where` (see [[config]]).

## Common mistakes
- Returning a `Where` and assuming it works during the Access Operation (it won't — guard for undefined args).
- Forgetting `overrideAccess: false` in Local API when you DO want access enforced.
- Field access returning a `Where` (only booleans allowed at field level).
