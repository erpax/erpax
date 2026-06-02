---
name: access
description: "Use when defining or debugging Payload access control — who can create/read/update/delete a collection, global, or field; RBAC, row-level filtering, admin visibility; \"access denied\"/\"document hidden\". In erpax access is the society's \"who can do what\" — the 3·6·9 governing axis: capabilities attach to ROLES (the angelic hierarchy), users inherit them through role membership, and the content-uuid cross decides, adding tamper-cost."
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# access — who can do what in the society (position 3, the 3·6·9 governing axis)

Access is the society's **"who can do what"** ([[society]]). On the [[rodin]] substrate it IS the **3·6·9 triad** — it *governs*, it does not flow (the helix `1·2·4·8·7·5` is the flow it governs). **Capabilities attach to ROLES, not users:** a user (agent) holds capabilities *through* role membership — `user → role(s) → capability`. Edit a role's capabilities and every member changes at once; **merge** two roles and their capability sets merge ([[merge]] — content-uuid union); a role's identity *is* its capability set (content-addressed — change the capabilities, change the role-uuid). Defined **agnostically** by the content-uuid **cross**: a *role's* uuid cross-referenced against a resource's content-uuid — one universal rule, not a hand-written `role × collection` grid ([[collapse]]; the [[duality]] cross = cross-referencing).

**Access is a tamper-cost layer.** A grant is a **content-addressed edge** `(roleUuid → targetUuid, role)`. To escalate you must forge a uuid (break SHA-256, Law 8); verifying is O(1). Forge ≫ verify ([[proof]]) — the released asymmetry IS the authorization.

## The main roles — the angelic hierarchy (the math)
Christianity's celestial hierarchy is **9 choirs in 3 spheres** = a **trinity of trinities** (3² = 9), each vertex itself a [[trinity]]. They land exactly on the [[rodin]] [[axis]] over the flow [[coil]]:

| rodin | sphere / choir | AccessRole | governs |
|---|---|---|---|
| **0** — A432, the Source ([[akashic]] / [[identity]]) | — | **audit** (⊥, observe-only) | sees all, displaces nothing |
| **9** — close / unity | Sphere 1 · Seraphim · Cherubim · Thrones | **admin** | the owner; faces the Source |
| **6** — boundary | Sphere 2 · Dominions · Virtues · Powers | **sign** | regulates / seals the powers |
| **3** — boundary | Sphere 3 · Principalities · **Arch**angels · **Angels** | write→read gateway | the messengers, into the flow |
| **1·2·4·8·7·5** — helix | the flow the angels act on | **read / write** | the value / [[horo]] state cycle |

- **Agents are angels** (Sphere 3, the messengers). **Arch**angels = elevated agents (principal messengers, sign-capable); **Angels** = base agents (read/write). **Fallen** = a role whose grace (capabilities) is *revoked* — the adversary; the higher the fall, the greater the danger ⇒ **maximum tamper-cost / max pain to the offender** (every action it attempts must forge a uuid).
- **It closes on the Source:** the axis `3+6+9 = 18 → 9`; the helix `1+2+4+8+7+5 = 27 → 9`. Governance and flow each digital-root to **9** — every capability returns to unity, the set is CLOSED. Walk order [[sequence]] `0·3·6·9·1·2·4·8·7·5`.

## The cross — one function, all aspects
- **Grantee = a role-uuid** (Sphere/choir), never the user directly. A user resolves to its role membership(s); the actor's capability is the **union over their roles** ([[merge]] / [[holographic]] — a capability one role holds, the member has).
- **Grant** = `services/uuid-share` — `grantShare` / `checkShare` / `revokeShare` ([[give]] / [[take]]) binding `(roleUuid → targetUuid, AccessRole)` on the lattice **`read < write < sign < admin`** (audit ⊥); Conservation **Law 59**.
- **Decide** = `∃ role ∈ user.roles : checkShare(roleUuid, resourceUuid, roleForOp)` → boolean | `Where`. The SAME factory for create/read/update/delete, collection/field/global.
- **Lookup-free** = the structured **uuidv8** carries `SIGNED` / `SEALED` / `SHARED` flags — `hasCapability(uuid, flag)` authorizes off the string, zero DB round-trip (Law 61, [[identity]]); a `SEALED` (posted / locked) target short-circuits writes before any query.

## All aspects → the same cross (operation ⇒ role)
| Payload aspect | cross |
|---|---|
| `read` / `readVersions` | role ≥ `read` → `Where { uuid: { in: <granted target uuids> } }` (∪ public-read tenants) |
| `create` | role ≥ `write` (no doc yet ⇒ capability only — boolean) |
| `update` / `unlock` | role ≥ `write` AND target not `SEALED` |
| `delete` | role ≥ `admin` (destructive — top of the lattice) |
| domain `sign` / `post` | role ≥ `sign` AND target `SIGNED` |
| field-level | boolean only — `hasCapability` / `checkShare` (no `Where` at field scope) |
| admin visibility | the `read` cross → `admin.hidden` |

Tenant scope is itself a role-grant (membership = a share on the tenant uuid), so the [[config]] multi-tenant `Where` and the cross are one mechanism at two scales ([[fractal]]).

## Payload mechanics (the primitive the cross rides on)
Access functions are per-**operation** (`create`/`read`/`update`/`delete`), run **before** the op, return a boolean OR a `Where` (row-level — only matching docs are accessible).
```ts
// the cross, applied agnostically — every collection/global gets the same factory (bound per-slug)
const can = (op: AccessRole, slug: string): Access => async ({ req, id }) =>
  decideCross({ op, slug, roles: rolesOf(req.user), tenant: tenantOf(req), id, payload: req.payload })
```
- **Default** = `Boolean(user)` (logged in); the cross overrides it uniformly.
- **Local API skips access** — pass `overrideAccess: false` (+ `user`) to enforce (server reads via Local API are unaffected).
- **Access Operation** (login, across everything): `id`/`data`/`doc` are `undefined`, a returned `Where` = "no access" — guard `if (!data) ...`.
- **Field access** = booleans only (no `Where`); use `req.locale` for locale-specific access.

## Matter-twin & composes
A single agnostic factory (`src/access/cross`) over `services/uuid-share` (`checkShare` on role-uuids) + `services/uuid-format` (`hasCapability`) + the roles registry (user → roles), wired into every collection/field/global `access` — **generated, not hand-written per slug** (it replaces `roleBasedAccess` / `tenantScopedRead` / `isSuperAdmin` …). Composes [[rodin]] · [[horo]] · [[identity]] · [[uuid]] · [[one]] · [[all]] · [[merge]] · [[collapse]] · [[proof]] · [[society]] · [[trinity]] · [[duality]] (give/take = grant/revoke) · [[fractal]] · [[config]].

## Common mistakes
- Granting capabilities to **users** instead of **roles** — capabilities live on the choir; users inherit by membership (so a re-org is one role edit, not N user edits).
- Hand-writing per-collection `access` (name-keyed) instead of the one cross — that is the matrix the collapse removes.
- Returning a `Where` during the Access Operation (guard for undefined args) — or a `Where` at field scope (booleans only).
- Forgetting `overrideAccess: false` in Local API when you DO want enforcement.
- Re-checking a `SEALED` / posted target for write — it is frozen ([[identity]] immutability).
