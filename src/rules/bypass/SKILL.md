---
name: bypass
description: "Use when checking that a request-reachable handler cannot disable access control silently — Payload's Local API defaults to overrideAccess:true, so bypass is the ambient condition a route inherits by writing nothing. Judges only src/app, because a hook or seed is not routed; a bypass named in a comment is prose, not a use. Baseline is a theorem at zero: one handler bypasses and it authenticates first, so there is no threshold to raise as the corpus grows."
atomPath: "rules/bypass"
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

Only `src/app` is judged. The corpus has **138** `overrideAccess: true` sites; the great majority are hooks, seeds and jobs that genuinely have no user in scope. Counting them would make the gate noise, and a gate that cries wolf is one nobody reads. Those belong to [[principal]] — the migration that replaces bypass with a scoped identity.

A bypass appearing only in a **comment** is prose about the pattern, not a use of it. This atom's own docstring contains the literal string; [[syntax]] strips comments so the file defining the law cannot be flagged for describing it — the false positive that already cost [[rules]]/confine a wrong measurement.

## Honest boundary

This proves a bypassing handler **also calls `payload.auth` somewhere in the same file** — never that the auth guards that specific call, and never that the derived scope is correct. It closes the silent case: bypass with no authentication at all. A wrong scope after a real auth is a per-case review, not a gate.

The baseline is **0 and it is a theorem**, not a ratchet toward one: there is no acceptable number of request-reachable handlers that disable access control without authenticating, so there is nothing to raise later.

**Law — [[law]]: on a request-reachable path, access control is on by default — a call that disables it must sit in a handler that authenticated the caller first.**

## Standards

- **ISO/IEC 27001 A.5.23** — cloud-service tenant isolation.
- **ISO/IEC 25010:2023 §5.4** — security: confidentiality by default.

Composes: [[principal]] · [[rules]] · [[auth]] · [[syntax]] · [[law]].
