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
