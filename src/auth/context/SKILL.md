---
name: context
description: "Use when code needs to know WHO is acting on a request without depending on the access predicates — getUser narrows the User | API-key union, getUserContext derives id · tenant · roles. A type-only leaf, split out of @/auth so the subscription gate can read identity without closing the auth ↔ gate import loop the cycle law named."
atomPath: "auth/context"
coordinate: "auth/context · 3/3 · 0178e1a2"
contentUuid: "40a4a6fa-6396-5cbe-87fa-c3c15361f62a"
diamondUuid: "b4335da4-be79-8079-992d-a1b35c3228e6"
uuid: "0178e1a2-6f14-8f87-bd4e-77faa8aa16f1"
horo: 3
typography:
  partition: auth
  bondDegree: 23
standards:
  - "NIST INCITS-359-2012 role-based-access-control"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "8393af63-2886-83cd-8ada-66c837f9579a"
  stages:
    - stage: path
      stageUuid: "03d4d309-0fea-88de-9e6d-c589e63a12d2"
    - stage: trinity
      stageUuid: "5a2052e6-82f1-868d-bcd0-c6dd62356199"
    - stage: boundary
      stageUuid: "509af6a5-38f5-8221-9b6b-9cedb4a19847"
    - stage: links
      stageUuid: "98ff75c9-7af3-8815-9983-d20740293a47"
    - stage: horo
      stageUuid: "73b90ab0-fd0a-861e-b6ed-35d0308a1564"
    - stage: seal
      stageUuid: "3db5d2e5-176e-83db-998b-90cbadd5c92d"
    - stage: uuid
      stageUuid: "b7b1517f-8fa4-8ae5-8476-8e59db6f4f37"
version: 2
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
