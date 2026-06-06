---
name: testing
description: "Use when writing or debugging erpax's own tests — discovering the live config to assert against, seeding isolated fixtures by level (unit/integration/e2e), transactional cleanup, parallel runners, or snapshot/restore — the society's self-test infrastructure that validates the running app against its own generated schema."
---

# testing — the society proving itself against its own schema

Testing is how erpax **verifies itself**: it reads the live [[config]] at runtime (`PayloadConfigDiscovery` — every collection, field, relationship, enum, access rule) and asserts the running app against the schema it *generated from itself* ([[schema]] · [[akashic]]). No hand-kept fixture list to drift: the test introspects the same source of truth the app boots from, so what the test knows IS what the app is. This is [[proof]] turned inward — the trustless O(N) audit, run against your own store before anyone else runs it against you.

It composes three organs. **Discovery** introspects + coerces/validates field values against the discovered types ([[config]]). **The seed factory** mints fixtures at three levels — unit (<500ms), integration (realistic business data), e2e (full cycles) — each validated against `SEED_VALIDATION_REGISTRY`, a per-[[collections]] required-field contract that needs no live Payload (a `MockPayload` yields the same `<Label>: <field> is required` error contract integration tests assert), so the seed law holds at every scale ([[fractal]] · [[seed]]). **Setup** wraps a seed in an `IsolatedTestEnvironment` / `ParallelTestRunner` with `SeedSnapshot` restore + transactional cleanup — same isolation form whether one test or many run in parallel.

Seeds are identified by content — same input ⇒ same fixture, so two runners that seed the same data converge instead of colliding ([[identity]] · [[merge]]). One workflow definition generates many materializations (e2e test, help tip, evidence) from one source — see [[spec]].

Matter-twin: `src/testing/config-discovery` (runtime introspection + coercion/validation), `src/testing/test-seed-factory` (3-level seeds + `SEED_VALIDATION_REGISTRY` + transactional cleanup), `src/testing/test-setup` (`IsolatedTestEnvironment` · `ParallelTestRunner` · `SeedSnapshot`).
Composes: [[config]] · [[schema]] · [[collections]] · [[seed]] · [[spec]] · [[proof]] · [[akashic]] · [[identity]] · [[merge]] · [[fractal]] · [[society]].

**Law — [[gate]]** Testing enforces one consistency-invariant: the instant any field type, access rule, enum, or [[schema]]-to-[[config]] alignment breaks, the test fails. Rather than asserting the happy path (what *should* work), each test is a [[consistency]] tripwire — config-driven, so new fields auto-add to `SEED_VALIDATION_REGISTRY` without hand-kept boilerplate ([[collapse]]). The invariant runs at every [[seed]] level ([[fractal]]), ensuring the moment [[akashic]] diverges from runtime, the gate snaps shut.

## Warn wide, fail narrow

A test reports an **error** only when an invariant is *broken* — but it should **warn** for far more than that. The error surface is narrow (the contract snapped); the warning surface is **wide**: drift creeping toward a break, [[aura]] gaps, thinning [[coverage]], an [[entropy]] uptick, an overclaim where a "literal" should read "metaphor" ([[harmony]] dissonance), an anomaly that is legal but suspect. Most signals are **warn-only** (the architecture-invariants pattern — advisory by default, `STRICT_INVARIANTS=1` to refuse boot); only a true contract break is an error. So the test layer is a **continuous early-warning field**, not a pass/fail gate alone — it tells you what is *becoming* wrong while it is still cheap to fix, the way [[harmony]] and the [[aura]] scan surface gaps long before they throw. Verify-in-harmony ([[law]]): warn at every dissonance, fail only at a contradiction.
