---
name: bits
description: "Use when pricing the cost of ATTACK — the entropy cost-kind. Derived digest widths (ERPAX_DIGEST_BITS, the typed-106 defect kept as its own proof), the harmonic security floors D·D/2·D/3 (second-preimage · birthday/Grover · BHT), and the coverage/replication/invariant amplifiers a forger must pay. Pure functions over bit counts; the cost hub re-exports them."
atomPath: "cost/bits"
---

# cost/bits — the cost of attack, computed

The `entropy` cost-kind of the [[cost]] atom: what an undetected tamper or forgery
costs against a content-addressed, all-directions-wired store. Every number here is
**derived**, not typed — because the one that was typed (`ERPAX_DIGEST_BITS = 106`)
was wrong by 16 bits and became a security constant nobody could contradict.

- **Digest widths** — `ERPAX_DIGEST_BITS` (122, the v8 non-constant bits) and
  `CONTENT_DIGEST_BITS` (256, the full SHA-256 an anchor should commit).
- **The harmonic floors** — `secondPreimageLog2` (D), `birthdayLog2`/`groverPreimageLog2`
  (D/2), `bhtCollisionLog2`/`quantumFloorLog2` (D/3): a digest of D bits has the first
  three harmonics of D as its security floors; the binding floor is the lowest in the
  threat model.
- **The amplifiers** — `coverageCostLog2` (→ ∞ as coverage → 1), `replicationChecks`
  (CRAQ: strong consistency multiplies), `invariantChecks` (kernel-checked gates add),
  and `CONFIRM_GATE_CHECKS` (the live gate-axis count, pinned to `@/confirm` in test).

**Extracted** from the cost hub so the parent `index.ts` re-exports only ([[rules]]/concentration);
`test.ts` is the tool that MEASURED the typed-106 defect against the live primitive,
kept as the proof it stays fixed — a number you cannot re-derive is a number you cannot trust.

Composes: [[cost]] · [[algebra]] · [[tamper]] · [[quantum]] · [[harmony]].
