---
name: witness
description: "Use when a test derives over the whole corpus and hangs — the bounded-witness helper: sample a large domain (bounded-witness) or take the whole when it is small (finite-complete), replacing every ad-hoc slice."
atomPath: testing/witness
---

# testing/witness — the bounded witness

The session's most-repeated fix, named by ceccec.psg.bg's proof taxonomy and made one tool. A unit test that maps a corpus-scale derivation over EVERY atom runs for minutes; the law it broke is **bounded-witness** — verify a representative SAMPLE when the domain is large. Its sibling **finite-complete** exhausts the whole domain when it is small (a 4-rung ladder, a 7-position ring). `boundedWitness(domain, n)` returns the sample — or the whole, when the domain is already ≤ n (then it IS finite-complete, `isFiniteComplete`). `spreadWitness` touches the whole range when a prefix would miss the tail.

This replaces the scattered `.slice(0, 12)` in balance, the fixture-cwd in educate/intelligence, the sample in skill-context — one helper both proof classes reach for.

**Honest boundary.** A bounded witness proves the aggregation's SHAPE, never a corpus-wide value — a whole-corpus fact is the audit lane's job, not a unit test's. The witness is representative by content-order, not by adversarial coverage; `spreadWitness` mitigates but does not guarantee.

**Law — [[law]]: a test over a large domain verifies a bounded witness; over a small one, the finite-complete whole — never the whole of a large domain in a unit test.**

Composes: [[testing]] · [[theorem]] · [[law]].
