# plugins/auth/access — the file that claimed to be the single route, and was not

Its own docstring read: *"All access control in the codebase routes through these helpers."*
Measured 2026-09-25 across every hand-written `CollectionConfig`:

| | count |
| --- | ---: |
| collection access legs | 457 |
| named-helper legs | 233, from **16 distinct names** in 9 files |
| legs routed through **this** atom | **0** |
| access legs open to everyone (`() => true`) | **0** |

Nothing imported it. The 233 real legs route through [[auth]] (171 — `adminOrAccountant` 73,
`tenantAdmin` 50, `adminOnly` 13, `multiTenantRead` 4), [[authenticated]], [[anyone]],
`is/super/admin` (35) and `tenant/scoped/read`. A file with no callers announcing itself as the
one route is [[rules]]/copy's law exactly: **one truth at two addresses, and one of them is
unmaintained because nobody knows it is there.**

## What made it dangerous rather than merely dead

It carried eight `@standard` · `@security` · `@compliance` banners — NIST INCITS-359, ISO-27001
A.5.18 and A.5.23, ISO-27002 §5.15 · §5.18 · §8.2, SOC-2 CC6.1 — and `standards/catalogue.ts`
indexed it as the access-control implementation. [[rules]]/audience: those banners are addressed to
an **auditor**, and the trace led to a file the running system never calls. That is ISO 19011 §6.4's
failure — the citation must lead to the evidence.

Worse, two of its four predicates had **diverged under the same names**:

| name | here | the live one |
| --- | --- | --- |
| `adminOnly` | `roles.includes('admin') \|\| roles.includes('super-admin')`, hand-inlined | [[auth]]: `hasRole(user,'admin')` off the role registry |
| `userIsSuperAdmin` | a second `roles.includes('super-admin')` | `is/super/admin`: the canonical predicate |
| `tenantScoped` | `true` for super-admin, else a tenant filter | [[auth]]`.multiTenantRead`: the filter |

[[rules]]/face calls same-name shadowing lexically undecidable — and it is, in general. Here it was
decidable, because one side had **zero callers**.

## The fold

`predicates.ts` is now a re-export: `isSuperAdmin` → `is/super/admin`'s `superAdminOnly`,
`authenticated` → [[authenticated]], `adminOnly` and `tenantScoped` → [[auth]]. No name left the
face, so a future caller still finds each one — it now reaches the implementation the collections
actually use. `tenantScoped` aliases `multiTenantRead`, dropping a super-admin bypass that had no
caller; that bypass is the separate `isSuperAdmin` policy, composed rather than baked in.

`field.ts` held the same body twice — `tenantFieldAccess` and `readOnlyExceptSuperAdmin` were both
`({ req }) => userIsSuperAdmin(req.user)`, which `is/super/admin` already exports as `fieldAccess`.
Both now alias it.

**Tenant scope was already standard and is left alone.** `multiTenantPlugin` is wired from
`tenantCollectionsConfig(...)` — computed over every collection minus an explicit `GLOBAL_SPINE`,
so a new collection auto-scopes. 104 collections mention no tenant because the plugin injects the
field; that is the correct shape, not a gap.

**Honest boundary.** This proves each policy now has **one address**, never that the policy is
**right** — whether `adminOnly` returning a bare `true` is sufficiently constrained by the plugin's
own filters on a tenant-scoped collection is a per-collection read, not something folding addresses
answers. It reads hand-written `CollectionConfig` literals, so the 13 collections built through
`createAccountingCollection` and the 123 legs whose `access` is not an object literal are counted
but not classified. And a policy with one address can still be called in the wrong place.

**Law — [[law]]: an access policy has one address. Two definitions under one name is a coin flip a
reviewer cannot see, and a file that says it is the single route while nothing calls it sends the
auditor to the wrong evidence.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 27001 A.5.18** — access rights.
- **ISO/IEC 27001 A.5.23** — cloud-service tenant isolation.

Composes: [[auth]] · [[authenticated]] · [[rules]]/copy · [[rules]]/face · [[rules]]/audience · [[law]].
