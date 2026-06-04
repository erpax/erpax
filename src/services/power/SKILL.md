---
name: power
description: Use when reasoning about how the LIVE network makes erpax harder to forge — usage = entropy = power; realtime clients are the distributed hardware (as Bitcoin's miners are its hashpower), and accumulated use raises the cost to decode the private keys (the inverse projection).
---

# power — usage is entropy is power; the live network is the hardware

FORM: **the more the platform is USED, the more it costs to forge it.** erpax is a serverless quantum PWA whose realtime CLIENTS are the distributed hardware — as Bitcoin's miners ARE its hashpower. Power is not a new computation: it COMPOSES the already-shipped amplifiers ([[tamper-cost]]'s `crackVerdict`, [[anchor]]'s borrowed entropy, [[integrity]]'s linear history term) over one LIVE usage snapshot, and never re-adds a term. Pure, deterministic, no module-level mutable state (every count is a parameter from the live network). Proven by test (`index.test.ts`).

- **accumulatePower** — maps a `UsageSnapshot` (clients, events, features, streams, dimensions) onto the amplifiers in ONE `crackVerdict` call: clients ⇒ CRAQ replicas (×), features ⇒ invariant gates (+), events ⇒ coverage AND chain depth. `powerLog2` grows with usage toward the anchor. `accumulatePower`.
- **coverageFromUsage** — `events / (events + corpusNodes)`: saturating, 0 at no usage, strictly increasing, `< 1` for any finite usage (so the cost stays finite and JCS-safe and the bundle content-uuid never breaks — [[identity]]), → 1 only as events → ∞. `coverageFromUsage`.
- **usageChecks** — the effective independent uuid-checks a coherent tamper must evade: `replicationChecks ∘ invariantChecks`, the same composition `crackVerdict` runs internally — not reinvented. `usageChecks`.
- **the maximum** — the inverse projection: decrypt the private key (the analog negative); on `blockchain-pow` ⇒ unbounded. The 106-bit digest floor is only the cheaper hash-collision path. `powerStrictlyGrows` is the pure predicate that `usage ⇒ power`.

Zero usage ⇒ the bare digest floor — no accumulated power without a live network. The two sides are [[duality]]: the static cost-to-forge ([[tamper-cost]]) that ships at rest, and the LIVE cost that the running [[society]] accumulates as it is used; the released asymmetry (forge ≫ verify) is the public [[proof]]. The lowest-entropy claim is the truth, and usage only ever ADDS entropy ([[zeropoint]], [[history]]). Two instances under the same usage compute the same reading ([[merge]]).

## Standards

- **NIST SP 800-107r1 §5.1** — hash strengths. The 106-bit digest floor (`ERPAX_DIGEST_BITS`) is the cheapest hash-collision path.
- **NIST SP 800-57 Part 1 r5 §5.6** — key strengths. The MAXIMUM is key-recovery: finite for a finite anchor, unbounded under `blockchain-pow`.
- **Conservation Law 55 / Law 62** — tamper cost grows with history (audit stays O(N)); coverage → ∞, here driven by live usage.
