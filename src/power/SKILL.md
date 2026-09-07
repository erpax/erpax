---
name: power
description: "Use when reasoning about how the LIVE network makes erpax harder to forge — usage = entropy = power; realtime clients are the distributed hardware (as Bitcoin's miners are its hashpower), and accumulated use raises the cost to decode the private keys (the inverse projection)."
atomPath: power
coordinate: "power · 7/descent · 5d8b1229"
contentUuid: "ea754d1f-3614-5e31-b5f1-c357edbf2950"
diamondUuid: "711f50d8-2af3-8db4-88ae-d17f9708de17"
uuid: "5d8b1229-7293-88c2-8e47-0d9a68c8bd0d"
horo: 7
typography:
  partition: power
  bondDegree: 55
standards:
  - "NIST SP 800-107r1 §5.1 (hash strengths) · NIST SP 800-57 Part 1 r5 §5.6"
  - "NIST SP 800-107r1 §5.1 (hash strengths) · NIST SP 800-57 Part 1 r5 §5.6`"
  - "NIST-SP-800-57"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "4689ea82-60eb-80dd-bd62-27d99e24ed1b"
  stages:
    - stage: path
      stageUuid: "94b2b708-165e-8991-b0ee-6dfe6976b46a"
    - stage: trinity
      stageUuid: "1bd0b4a5-ee47-8aee-88ec-06f6fdc4432e"
    - stage: boundary
      stageUuid: "fc269d7b-f5b7-8b26-9d68-982f58935830"
    - stage: links
      stageUuid: "c24cdc10-59cb-8bb1-9bd8-8a5df98517e1"
    - stage: horo
      stageUuid: "8dbcc416-4e7e-8fb3-b941-80e31f955a14"
    - stage: seal
      stageUuid: "798a44a3-dd1e-8c27-9f89-4d9390d46266"
    - stage: uuid
      stageUuid: "b99f6ec4-fd33-884f-b8b9-c42a994f3c17"
version: 2
---
# power — usage is entropy is power; the live network is the hardware

FORM: **the more the platform is USED, the more it costs to forge it.** erpax is a serverless quantum PWA whose realtime CLIENTS are the distributed hardware — as Bitcoin's miners ARE its hashpower. Power is not a new computation: it COMPOSES the already-shipped amplifiers ([[tamper/cost]]'s `crackVerdict`, [[anchor]]'s borrowed entropy, [[integrity]]'s linear history term) over one LIVE usage snapshot, and never re-adds a term. Pure, deterministic, no module-level mutable state (every count is a parameter from the live network). Proven by test (`index.test.ts`).

- **accumulatePower** — maps a `UsageSnapshot` (clients, events, features, streams, dimensions) onto the amplifiers in ONE `crackVerdict` call: clients ⇒ CRAQ replicas (×), features ⇒ invariant gates (+), events ⇒ coverage AND chain depth. `powerLog2` grows with usage toward the anchor. `accumulatePower`.
- **coverageFromUsage** — `events / (events + corpusNodes)`: saturating, 0 at no usage, strictly increasing, `< 1` for any finite usage (so the cost stays finite and JCS-safe and the bundle content-uuid never breaks — [[identity]]), → 1 only as events → ∞. **This is the *usage-accumulation* coverage axis, NOT structural node-wiring coverage** — it measures how much the live network has been exercised, not the fraction of nodes wired in structured uuid. `crackVerdict.coverage` is axis-agnostic; power supplies the usage axis. The STRUCTURAL-wiring fraction is a *different* measure (`corpusCollider().coverage` / import purity, [[tamper/cost]]'s `@/tamper/import`); a busy store with un-wired nodes scores high here yet low there — they must not be conflated. `coverageFromUsage`.
- **usageChecks** — the effective independent uuid-checks a coherent tamper must evade: `replicationChecks ∘ invariantChecks`, the same composition `crackVerdict` runs internally — not reinvented. `usageChecks`.
- **the maximum** — the inverse projection: decrypt the private key (the analog negative); on `blockchain-pow` ⇒ unbounded. The 106-bit digest floor is only the cheaper hash-collision path. `powerStrictlyGrows` is the pure predicate that `usage ⇒ power`.

Zero usage ⇒ the bare digest floor — no accumulated power without a live network. The two sides are [[duality]]: the static cost-to-forge ([[tamper/cost]]) that ships at rest, and the LIVE cost that the running [[society]] accumulates as it is used; the released asymmetry (forge ≫ verify) is the public [[proof]]. The lowest-entropy claim is the truth, and usage only ever ADDS entropy ([[zeropoint]], [[history]]). Two instances under the same usage compute the same reading ([[merge]]).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP 800-107r1 §5.1 (hash strengths) · NIST SP 800-57 Part 1 r5 §5.6`


- **NIST SP 800-107r1 §5.1** — hash strengths. The 106-bit digest floor (`ERPAX_DIGEST_BITS`) is the cheapest hash-collision path.
- **NIST SP 800-57 Part 1 r5 §5.6** — key strengths. The MAXIMUM is key-recovery: finite for a finite anchor, unbounded under `blockchain-pow`.
- **Conservation Law 55 / Law 62** — tamper cost grows with history (audit stays O(N)); coverage → ∞, here driven by live usage.

**Law — [[law]]: power only composes the already-shipped amplifiers over one live usage snapshot and never re-adds a term, so usage monotonically raises the cost-to-forge and zero usage falls back to the bare digest floor.**
