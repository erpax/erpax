---
name: bits
description: "Use when pricing the cost of ATTACK — the entropy cost-kind. Derived digest widths (ERPAX_DIGEST_BITS, the typed-106 defect kept as its own proof), the harmonic security floors D·D/2·D/3 (second-preimage · birthday/Grover · BHT), and the coverage/replication/invariant amplifiers a forger must pay. Pure functions over bit counts; the cost hub re-exports them."
atomPath: "cost/bits"
coordinate: "cost/bits · 4/weave · 41bd67d1"
contentUuid: "91ae98fe-2cdf-5a9b-8766-7a66f24fa8f8"
diamondUuid: "87edcd2a-31ad-84cb-bf81-d0a429e92e89"
uuid: "41bd67d1-352c-8b40-b271-9b645226127e"
horo: 4
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
bindings: []
signatures:
  computationUuid: "62407255-0403-85fd-9f23-87034685fd0c"
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
      stageUuid: "b76d2459-e8b6-8fd1-a5e9-be835e3676fb"
    - stage: seal
      stageUuid: "cc450af7-b06d-85b6-82e8-b36737aa6aea"
    - stage: uuid
      stageUuid: "4ae2e448-d505-8ee7-b137-d4bb33e2f51e"
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

## The digest tiles the uuid and the torus, wholly

Four quantities, one arithmetic:

| | bits | |
| --- | ---: | --- |
| content digest | 256 | what an anchor should commit |
| uuid | 128 | **two boards** — the word half and the digit half |
| torus board | 64 | what this tree addresses on |
| uuid, usable | 122 | 128 less version (4) and variant (2) |

`256 = 2 × 128 = 4 × 64` and `128 = 2 × 64`, all whole — so **a content digest is exactly two uuids
and four boards**, and *one uuid is the double torus*. That last equality is not decoration: it is
why [[quantum]]/fold has a word half and a digit half at all, and the test checks it against
`combineArchitectures` rather than restating it — the packed word is exactly `UUID_IN_BOARDS ×
TORUS_BITS` wide at its maximum.

**`TRUNCATION_COST_BITS` was a sentence.** *"Truncation costs erpax 134 bits so the fold's address
can LOOK like a UUID"* sat in a docstring with no constant and nothing able to contradict it — the
exact shape this atom already records twice, in the typed `106` and in the mirror that claimed a pin
it did not have. It is now `CONTENT_DIGEST_BITS − ERPAX_DIGEST_BITS`, so it moves when either side
does, and the 134 the prose carried is a test assertion rather than a claim.

`TORUS_BITS` is **mirrored** from `architectureBits()` rather than imported, because the import would
add an edge to the tangle ([[rules]]/cycle) — and the pin is real this time: `test.ts` imports both
and asserts the equality, which is the whole of that constant's safety.

**Honest boundary.** These are structural facts about **widths**, and none of them is a security
result. That SHA-256 resists collision, that a 2^61 birthday floor is adequate for a given corpus —
no arithmetic here touches either, and calling a tiling law a security proof would be the overreach
[[rules]]/forge refuses.

Composes: [[cost]] · [[algebra]] · [[tamper]] · [[quantum]] · [[harmony]].
