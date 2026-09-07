---
name: bits
description: "Use when pricing the cost of ATTACK — the entropy cost-kind. Derived digest widths (ERPAX_DIGEST_BITS, the typed-106 defect kept as its own proof), the harmonic security floors D·D/2·D/3 (second-preimage · birthday/Grover · BHT), and the coverage/replication/invariant amplifiers a forger must pay. Pure functions over bit counts; the cost hub re-exports them."
atomPath: "cost/bits"
coordinate: "cost/bits · 1/base · b30b1ec7"
contentUuid: "36ca5eb9-9fc3-5458-a409-14fbe81f82e1"
diamondUuid: "a47093e6-d11a-8239-ab86-44fb3d0a8a67"
uuid: "b30b1ec7-7d70-81c7-8c32-b3be79f5064d"
horo: 1
typography:
  partition: cost
  bondDegree: 18
standards:
  - "CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication"
  - "CRAQ — Terrace & Freedman, USENIX ATC 2009"
  - "DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)"
  - "DeepSeek-Prover-V2 — recursive, kernel-checked invariants"
  - "NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2"
  - "NIST-SP-800-63"
  - RFC 9562 §5.8 (uuidv8) · §4.1 (variant)
  - RFC 9562 §8 — UUID security considerations
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "dd043ddc-554d-8c9b-8da1-9468cc95922e"
  stages:
    - stage: path
      stageUuid: "e71086e7-e0ef-8f4e-90df-b3d90bf0253d"
    - stage: trinity
      stageUuid: "d1c024fb-3412-89c6-b438-d8f002666670"
    - stage: boundary
      stageUuid: "17502a13-7bc4-8bcd-a294-7637d939001d"
    - stage: links
      stageUuid: "965aeec3-c113-8722-87a3-3b11c1ba2096"
    - stage: horo
      stageUuid: "e1869b3b-cfbb-8205-8550-bcd286241218"
    - stage: seal
      stageUuid: "cc450af7-b06d-85b6-82e8-b36737aa6aea"
    - stage: uuid
      stageUuid: "2865a686-19e7-8e68-a15c-c6594d2d2520"
version: 2
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
