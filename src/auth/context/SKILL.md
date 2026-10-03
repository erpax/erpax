---
name: context
description: "Use when code needs to know WHO is acting on a request without depending on the access predicates — getUser narrows the User | API-key union, getUserContext derives id · tenant · roles. A type-only leaf, split out of @/auth so the subscription gate can read identity without closing the auth ↔ gate import loop the cycle law named."
atomPath: "auth/context"
---

# auth/context — who is acting, read from the request and nothing else

`@/auth` is the access-control atom: tenant scoping, role predicates, the feature-gated accounting
access. Two of its exports are not predicates at all — `getUser` narrows `req.user` from the
`User | PayloadMcpApiKey` union to the app `User` (a machine identity has no `roles` and resolves to
`null`), and `getUserContext` derives `{ id, tenant, roles }` from it. They read the request and
depend on types only.

## The loop they were holding open

`accountingAccess` in `@/auth` wraps every operation with the subscription **feature guard**, lazily
imported from `@/subscription/gate` — lazily, the comment says, "to avoid a cycle". The gate in turn
imported `getUserContext` from `@/auth`. A deferred import is still an edge ([[rules]]/cycle counts
`import()` as one, because it decides nothing about initialisation order and everything about who
depends on whom), so the two files formed a tangle of two, and the frontier named `subscription/gate`
as a cycle debt — rank 3, blocks-everything, tagged `theorem` by the population dual.

The gate never needed the predicates; it needed the identity readers. So the readers are a leaf, the
gate imports `@/auth/context`, `@/auth` re-exports both names so its face is unchanged
([[rules]]/face: a refactor may move anything except a name), and the tangle dissolves without
touching the lazy import that keeps the collection schemas out of `@/auth`'s load.

**Honest boundary.** This removes one edge of one two-file loop. `@/auth` still lazily reaches the
gate, which is fine for initialisation and is not a loop any more. The 45-file core tangle the cycle
law also names is untouched here.

**Law — [[law]]: a dependency that exists to read identity must not drag the access policy with it.
Identity is a leaf; policy composes on top of it.**

## Standards

- **NIST INCITS-359-2012** — role-based access control: the subject's roles are read, not decided, here.
- **ISO/IEC 27001 A.5.23** — cloud-service tenant isolation: the tenant is derived from the canonical membership array.

Composes: [[auth]] · [[subscription]] · [[rules]]/cycle · [[law]].
