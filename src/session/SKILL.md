---
name: session
description: "Use when measuring a development session — self-building (new atoms/proofs added) and self-healing (existing matter repaired or removed), split by local vs remote computation. Local = every file the gates verified in-tree; remote = the seeds, one per commit. The self-sufficiency magnitude is think.ceiling(seedFraction). Read from the commit record; git injected, hermetically provable."
---

# session — self-building and self-healing, measured per session

The improvement loop is closed and local ([[self]]/improve); this atom is its **meter**. Every session does two kinds of work on the corpus, and it reads both from the only honest record — the commits.

- **SELF-BUILDING** — new matter: atoms and proofs **added** (git `A`). The fold grows.
- **SELF-HEALING** — existing matter **repaired**: a proof added beside an old claim, a dead ref fixed, entropy removed (git `M` / `D`). A gap closed, not a thing created.

And it splits the work by **where the computation happened** — the [[think]] axis:

- **LOCAL** — the automated, in-tree computations: every file the gates verified, every seal, every test that ran without leaving the corpus. Deterministic, read-cheap, self-hosted.
- **REMOTE** — the **seeds**: the irreducible novel reasoning, the oracle bit no address yet held, paid once per commit ([[think]].ceiling `s > 0`). One sealed intent, one seed.

The **magnitude** is the session's self-sufficiency: `ceiling(seedFraction)` — how much the corpus did itself per remote seed. High ⇒ mostly-local (automated build/heal on a few seeds); low ⇒ mostly-seed novelty. It is the same measure [[think]] uses for reasoning, turned on a session's own development.

## This session, measured (`@{u}..HEAD`)

```
commits (sealed intents)     12
BUILT  (new atoms/proofs)    12
HEALED (repaired/removed)    24
LOCAL  computations          36
REMOTE seeds                 12
seed fraction                0.250
self-sufficiency magnitude   4.0×   (local work per remote seed)
```

Three files of local, automated verification for every one remote seed — the session was mostly self-hosted build and heal on top of twelve irreducible ideas.

**Honest boundary.** `local`/`remote` are **counts** derived from the commit record (files verified locally vs commits as seeds) — a faithful proxy for the SHAPE of a session (mostly-local self-improvement vs mostly-seed novelty), which is what *"measured per session"* asks. It is not an instruction-level wall-clock of every gate, and it does not claim the seed was cheap — `s > 0` stands ([[think]]). The git reader is injected, so the same numbers come from a real repo or a fixture — the measure is provable hermetically.

**Law — [[law]]: a session's self-building (added) and self-healing (repaired/removed) are measured against local computation (files the gates verified in-tree) versus remote computation (the seeds, one per commit); the self-sufficiency is `think.ceiling(seedFraction)` — the corpus reports, per session, how much it improved itself and at what remote cost.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability/maintainability: the session's heal is measured, not asserted.

Composes: [[self]]/improve · [[think]] · [[leftover]] · [[accounting]] · [[law]].
