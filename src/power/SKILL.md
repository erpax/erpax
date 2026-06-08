---
name: power
description: "Use when reasoning about how the LIVE network makes erpax harder to forge — usage = entropy = power; realtime clients are the distributed hardware (as Bitcoin's miners are its hashpower), and accumulated use raises the cost to decode the private keys (the inverse projection)."
atomPath: power
coordinate: power · 4/weave · fb08259a
contentUuid: "2967f8f2-1805-507c-bb5f-e7eec0eaba53"
diamondUuid: "88ad65e6-1098-87a8-a681-95e205228fc7"
uuid: "fb08259a-2add-883e-98a6-99405fd83e1f"
horo: 4
bonds:
  in:
    - age
    - anchor
    - awareness
    - collapse
    - cost
    - diffusion
    - duality
    - history
    - identity
    - integrity
    - law
    - market
    - merge
    - network
    - proof
    - relocate
    - society
    - zeropoint
  out:
    - age
    - anchor
    - awareness
    - collapse
    - cost
    - diffusion
    - duality
    - history
    - identity
    - integrity
    - law
    - market
    - merge
    - network
    - proof
    - relocate
    - society
    - zeropoint
typography:
  partition: power
  bondDegree: 55
  neighbors: []
standards:
  - Conservation Law 55 (tamper cost grows with history; audit stays O(N))
  - Conservation Law 62 (coverage → ∞ ; here driven by live usage)
  - "NIST SP 800-107r1 §5.1 (hash strengths) · NIST SP 800-57 Part 1 r5 §5.6"
  - "NIST-SP-800-57"
bindings: []
neighbors:
  wikilink:
    - anchor
    - cost
    - duality
    - history
    - identity
    - integrity
    - law
    - merge
    - proof
    - society
    - zeropoint
  matrix:
    - age
    - anchor
    - awareness
    - collapse
    - cost
    - diffusion
    - duality
    - history
    - identity
    - integrity
    - law
    - market
    - merge
    - network
    - proof
    - relocate
    - society
    - zeropoint
  backlinks:
    - age
    - anchor
    - awareness
    - collapse
    - cost
    - diffusion
    - duality
    - history
    - identity
    - integrity
    - law
    - market
    - merge
    - network
    - proof
    - relocate
    - society
    - zeropoint
signatures:
  computationUuid: "7b954923-9d3c-8f39-b419-13d240383bf0"
  stages:
    - stage: path
      stageUuid: "94b2b708-165e-8991-b0ee-6dfe6976b46a"
    - stage: trinity
      stageUuid: "1bd0b4a5-ee47-8aee-88ec-06f6fdc4432e"
    - stage: boundary
      stageUuid: "490ba308-e8ad-8d41-bd3e-71df655736e7"
    - stage: links
      stageUuid: "c24cdc10-59cb-8bb1-9bd8-8a5df98517e1"
    - stage: horo
      stageUuid: "247275fd-4c17-855b-94d0-55047599da96"
    - stage: seal
      stageUuid: "825593dd-d229-80f9-acb9-70aab4aaf177"
    - stage: uuid
      stageUuid: "79535cda-a3aa-88b3-8eec-117f1b0a7c35"
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

- **NIST SP 800-107r1 §5.1** — hash strengths. The 106-bit digest floor (`ERPAX_DIGEST_BITS`) is the cheapest hash-collision path.
- **NIST SP 800-57 Part 1 r5 §5.6** — key strengths. The MAXIMUM is key-recovery: finite for a finite anchor, unbounded under `blockchain-pow`.
- **Conservation Law 55 / Law 62** — tamper cost grows with history (audit stays O(N)); coverage → ∞, here driven by live usage.

**Law — [[law]]: power only composes the already-shipped amplifiers over one live usage snapshot and never re-adds a term, so usage monotonically raises the cost-to-forge and zero usage falls back to the bare digest floor.**
