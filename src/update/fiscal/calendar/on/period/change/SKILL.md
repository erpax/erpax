---
name: change
description: "Use when a fiscal period config is amended — the beforeChange hook that validates the amended config and chains its audit leaf. Read the gap before relying on it: it does NOT regenerate the calendar and does NOT write a snapshot, though its banner claimed both, and fiscal-calendars is written by a seed and nothing else."
---

# change — it validates and stamps, and the banner claimed a workflow

[[rules]]/refutable named this hook: **4 `@invariant` claims, no proof**. It described a seven-step workflow — detect the amendment, validate it, **regenerate the calendar**, **write FiscalPeriodSnapshots**, link `supercedes`, chain the leaf, **emit an error-uuid**.

**Steps 3, 4, 5 and 7 do not exist.** The file said so itself, at the bottom, in a note nobody reads before the banner:

> *"Calendar regeneration and snapshot creation should happen in afterChange hook to have access to persisted data. This hook only validates and prepares metadata."*

There is no afterChange hook. `@invariant Snapshots created before calendar regeneration` was a claim about the ordering of **two things that never happen**, and nothing could contradict it.

## The tenth stub — and it hid the same way the ninth did

```ts
// Simplified hash computation (production: use crypto.subtle.digest + NIST FIPS 180-4)
const hashBase = Buffer.from(payload + (priorChainLeaf || '')).toString('base64')
const newChainLeafUuid = hashBase.substring(0, 32)
```

Under `@invariant All changes auditable via chainLeafUuid`. Auditable by a **reversible encoding covering the first 24 bytes** of its input — which here is the opening of `periodType`. The year start, the regulatory framework, the custom boundaries all sat past the window, so **amending any of them left the audit leaf unchanged**. It escaped the sweep that folded the first eight ([[merge]]/chainLeaf) by splitting `.toString('base64')` and `.substring(0, 32)` across two statements — a line-based grep cannot see it. Each of those is now a passing assertion.

## A validation that could never run

A second boundary check lived here behind an `isAmendment` guard. It was **unreachable**: `validateConfiguration` already folds `validatePeriodBoundary`'s errors in for a custom `periodType`, so an invalid boundary throws before the copy is reached. The test that found it expected the copy's error message and got the real one. The same law stated twice, where the second statement never runs and is free to drift from the first — exactly how one audit leaf became eight. It is stated once, in the resolver.

## The gap — load-bearing, and not built

**`fiscal-calendars` is written by a seed and by nothing else.** Amending a fiscal period config does not regenerate it. `validate/fiscal/period/posting` now **READS** that calendar to stamp every posting's fiscal period — so a config amended after the calendar was generated leaves postings on the **old structure, silently**, because the stale calendar still resolves cleanly.

The `FiscalPeriodSnapshots` collection exists and nothing writes to it.

Neither this hook nor the posting hook is attached to a collection, so nothing is broken today. That is the honest state: **the amendment path is a validated config and a chained leaf, and the machinery its banner described is the next thing to build.**

**Honest boundary.** The leaf makes an amendment **detectable** to whoever recomputes it — it does not make the config immutable, and it does not audit anything on its own. `JSON.stringify` is not JCS ([[merge]]/chainLeaf), so the payload's key order is part of the address.

**Law — [[law]]: a hook claims only what it does. A banner listing seven steps over an implementation of three is not a roadmap — it is four lies, and the reader cannot tell which three are real.**

## Standards

- **SOX §404** — change log, access-control evidence.
- **GDPR Art. 32** — audit trail.

Composes: [[rules]]/refutable · [[merge]] · [[law]].
