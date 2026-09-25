---
name: bits
description: "Use when pricing the cost of ATTACK — the entropy cost-kind. Derived digest widths (ERPAX_DIGEST_BITS, the typed-106 defect kept as its own proof), the harmonic security floors D·D/2·D/3 (second-preimage · birthday/Grover · BHT), and the coverage/replication/invariant amplifiers a forger must pay. Pure functions over bit counts; the cost hub re-exports them."
atomPath: "cost/bits"
coordinate: "cost/bits · 4/weave · 068d24e3"
contentUuid: "58cb96eb-5366-52c4-9cfa-2a14bf6ac575"
diamondUuid: "0e5b7be6-fb03-8397-b304-b3a0d56e666f"
uuid: "068d24e3-c116-8b32-b9ef-e551fdc2d74e"
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
  computationUuid: "563146dd-7c39-84c3-a05b-9c98ee1dd10a"
  stages:
    - stage: path
      stageUuid: "e71086e7-e0ef-8f4e-90df-b3d90bf0253d"
    - stage: trinity
      stageUuid: "d1c024fb-3412-89c6-b438-d8f002666670"
    - stage: boundary
      stageUuid: "17502a13-7bc4-8bcd-a294-7637d939001d"
    - stage: links
      stageUuid: "682afee9-4df5-8e7b-829b-ad9e9839c65a"
    - stage: horo
      stageUuid: "bb935e96-a488-8c48-bb2d-2dccd2b9ce57"
    - stage: seal
      stageUuid: "cc450af7-b06d-85b6-82e8-b36737aa6aea"
    - stage: uuid
      stageUuid: "2b1624cd-bb82-84e9-aec6-f31923532243"
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

## Symmetry — the floors are one formula, and they prove each other

A digest of `d` bits has four security floors, and they are **one formula** `d/k` over the first
three harmonics. What decides `k` is whether the search is **symmetric** — whether the target is
free — and whether the adversary is quantum:

| floor | symmetry | adversary | `k` | exponent |
| --- | --- | --- | --: | --- |
| `secondPreimageLog2` | **asymmetric** — the target digest is FIXED | classical | 1 | `d` |
| `birthdayLog2` | **symmetric** — ANY two of the set collide | classical | 2 | `d/2` |
| `groverPreimageLog2` | **asymmetric** | quantum | 2 | `d/2` |
| `bhtCollisionLog2` | **symmetric** | quantum | 3 | `d/3` |

Four cells of a 2×2, and the harmonic indices are exactly `1, 2, 2, 3`.

### Symmetrising halves the exponent

Fix the target and only one side may vary. Free it and **both** sides vary, so the number of
candidate pairs squares — and squaring the candidates square-roots the work:

```
secondPreimageLog2(d) = 2 · birthdayLog2(d)        2^(d/2) · 2^(d/2) = 2^d
```

### The two threats meet at the octave, by different arguments

`groverPreimageLog2(d) = birthdayLog2(d)`, and **neither derives the other**. Grover is a quadratic
speedup on the *asymmetric* problem; the birthday bound is a combinatorial fact about the
*symmetric* one. They land on the same exponent from opposite corners of the 2×2 — same `harmonic`,
opposite `symmetry`, opposite `quantum`. That is why both names survive rather than being folded:
see [[rules]]/copy § formulas, where this pair is a DECLARED coincidence.

### The quantum symmetric floor refutes the obvious guess

A naive reading applies Grover *inside* the birthday problem and predicts `d/4`. It is **`d/3`** —
BHT balances queries against quantum **memory**, so the gain is smaller than a second quadratic
speedup. `bhtCollisionLog2(d) = (2/3) · birthdayLog2(d)`, asserted with the wrong answer asserted
false beside it.

### Proving each other

`d = k · floor`. So **any one floor plus its harmonic index recovers `d`**, and `d` gives every
other floor — `digestFromFloor` and `floorsFromOne` are that, and the proof runs the round trip from
all four starting points. The family is not four facts; it is one formula and a symmetry
classification.

**Honest boundary.** `d/3` is the conservative theoretical floor: BHT needs `2^(d/3)` quantum
memory, and a memory-bound quantum collision is nearer `d/2`. The binding floor is the **lowest one
present in the threat model**, which is a judgement about the adversary, not arithmetic. And a
quantum cross also breaks an RSA/ECC anchor (Shor → ~0), so keeping even the `d/2` floor needs a
hash-based post-quantum anchor — which is [[law]]'s `anchorBits` ceiling, not a floor at all.
