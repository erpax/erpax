---
name: bypass
description: "Use when checking that a request-reachable handler cannot disable access control silently — Payload's Local API defaults to overrideAccess:true, so bypass is the ambient condition a route inherits by writing nothing. Judges only src/app, because a hook or seed is not routed; a bypass named in a comment is prose, not a use. Baseline is a theorem at zero: one handler bypasses and it authenticates first, so there is no threshold to raise as the corpus grows."
atomPath: "rules/bypass"
coordinate: "rules/bypass · 4/weave · f20ed224"
contentUuid: "a0ff8bb0-93c1-5807-a6b3-cdd1573b76f6"
diamondUuid: "7fa03ed6-b157-810b-a1a2-3942dbce365b"
uuid: "f20ed224-ff21-846f-b986-e63d2162623e"
horo: 4
typography:
  partition: rules
  bondDegree: 15
standards:
  - "ISO/IEC 25010:2023 §5.4 — security: confidentiality by default"
  - "ISO/IEC 27001 A.5.23 — cloud-service tenant isolation"
bindings: []
signatures:
  computationUuid: "7ebfb331-395c-8b6f-b344-ed08614a2084"
  stages:
    - stage: path
      stageUuid: "f048a546-8aa5-8be2-90c4-e64dc1b5327a"
    - stage: trinity
      stageUuid: "e5fb2c23-31f9-8cf2-a773-9356bf3c357b"
    - stage: boundary
      stageUuid: "0e3600d1-c3ac-8e14-bcd5-f7cb186fc304"
    - stage: links
      stageUuid: "9f945866-52dc-8e3a-ae5a-074452196d5d"
    - stage: horo
      stageUuid: "69b660d9-dee1-855b-9d7f-40c06f462616"
    - stage: seal
      stageUuid: "18cb0986-8ee2-8f05-aaa3-82ef4f31a981"
    - stage: uuid
      stageUuid: "cad22aaa-04ee-86a6-93de-31be97048665"
version: 2
---
# rules/bypass — a route may not disable the check silently

Payload's Local API defaults to `overrideAccess: true`. That default is defensible — it is how hooks and seeds act with no user — but it means **the ambient condition on a server is bypass**, and a route handler inherits it by writing nothing at all.

So the corpus inverts it where a request can reach:

```
request-reachable bypasses: 1 file · unauthenticated: 0
  AUTHED  src/app/(api)/api/subscriptions/create/route.ts  ×8
```

That handler does it correctly: `payload.auth({ headers })` first, rejects a principal with no email (an API key has no tenant), derives the tenant **from the authenticated user** rather than from the request body, and only then bypasses. Its own comment says *"it IS the authorization boundary."*

**What it lacked was a gate.** Nothing stopped the next route from doing the first half and forgetting the second — and that failure is silent: a `200` carrying another tenant's rows. [[rules]]/unraised names the shape: the check that never runs.

## Scope, and why it is narrow

Only `src/app` is judged. The corpus has **132** `overrideAccess: true` sites; the great majority are hooks, seeds and jobs that genuinely have no user in scope. Counting them would make the gate noise, and a gate that cries wolf is one nobody reads. Those belong to [[principal]] — the migration that replaces bypass with a scoped identity.

A bypass appearing only in a **comment** is prose about the pattern, not a use of it. This atom's own docstring contains the literal string; [[syntax]] strips comments so the file defining the law cannot be flagged for describing it — the false positive that already cost [[rules]]/confine a wrong measurement.

## The MCP gateway is a request path too

The scope was `src/app` — "the directory Next.js routes" — and the gap was in the security direction.
The MCP gateway is mounted at **`/api/mcp`**, its tool handlers run with `req.payload` on a caller's
behalf, and it sat **entirely outside** this axis. That is [[rules]]/domain's law arriving in a security
gate: a law reaches exactly the file classes its checker opens, and on the rest it is not passing, it is
silent.

Measured before widening: the MCP surface performs the construct **7 times** and every one is
`overrideAccess: false` — access control deliberately left ON, in `tool-defs`, `tool/versions` and
`tool/batch`. So the widening is a **theorem at zero over a non-empty population**: the gate now stands
where traffic passes rather than being a check that cannot fire ([[rules]]/unraised).

Proved by planting: a handler under `src/agents/mcp/tool` doing `overrideAccess: true` with no
`payload.auth` is reported `UNAUTHENTICATED`. Under the old scope it was invisible.

### the law describing itself

Widening it immediately flagged `atom-catalogue.generated.ts` **twice**, and one of the two strings is
*this atom's own SKILL description* — "Payload's Local API defaults to overrideAccess:true, so bypass is
the ambient condition a route inherits". The gate would have charged the law for describing itself.

Comment-stripping could not catch it: those are **string literals in generated data**, not comments.
Every other gate in this corpus already refuses a generated face as evidence — it restates every symbol
and every SKILL description — and this one now does too. Third time this class appeared in one session,
after a paginated `from` read as a currency and Google's response-format `alt` read as an altitude.

**Honest boundary, unchanged and now wider.** This still proves a bypassing handler *also calls*
`payload.auth` somewhere in the same file — never that the auth guards that call, and never that the
derived scope is correct. What widened is the set of files where that question is asked at all.

## Honest boundary

This proves a bypassing handler **also calls `payload.auth` somewhere in the same file** — never that the auth guards that specific call, and never that the derived scope is correct. It closes the silent case: bypass with no authentication at all. A wrong scope after a real auth is a per-case review, not a gate.

The baseline is **0 and it is a theorem**, not a ratchet toward one: there is no acceptable number of request-reachable handlers that disable access control without authenticating, so there is nothing to raise later.

**Law — [[law]]: on a request-reachable path, access control is on by default — a call that disables it must sit in a handler that authenticated the caller first.**

## Code

entry `@/rules/bypass` · sealed `1` · trinity `1·1·1`
exports function · interface
imports @/syntax

## Standards

- **ISO/IEC 27001 A.5.23** — cloud-service tenant isolation.
- **ISO/IEC 25010:2023 §5.4** — security: confidentiality by default.

Composes: [[principal]] · [[rules]] · [[auth]] · [[syntax]] · [[law]].
