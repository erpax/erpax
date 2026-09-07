---
name: drift
description: "Use when reasoning about drift — The corpus computes its own size. Prose states it too, and the two drift apart the moment an atom is minted."
atomPath: "rules/drift"
coordinate: "rules/drift · 2/share · 92bcd3e4"
contentUuid: "09c5ddfa-c256-53c8-a199-81a173f17488"
diamondUuid: "49069f3a-4529-8e3a-a998-fed2c12a3582"
uuid: "92bcd3e4-0ca4-8e8f-b656-511ffaa98fc3"
horo: 2
typography:
  partition: rules
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "22d48fe1-09ee-8c49-b83b-a2ef358e3e54"
  stages:
    - stage: path
      stageUuid: "f0341797-e669-8474-9922-fa097a18406d"
    - stage: trinity
      stageUuid: "301beedd-21df-82f7-b532-3231f9c11520"
    - stage: boundary
      stageUuid: "acabb619-327e-81a3-8656-3c1e3aced896"
    - stage: links
      stageUuid: "586dfa76-ef2c-8b04-9be4-fa3436ab9c33"
    - stage: horo
      stageUuid: "e167c289-23ac-8357-a3b2-cdc7f89d5e4c"
    - stage: seal
      stageUuid: "74f43639-d338-80f0-8100-239009ccdb29"
    - stage: uuid
      stageUuid: "c237c016-f62d-8f4c-8977-1010732d9338"
version: 2
---
# rules/drift — a number typed into prose is a copy of an answer, and copies go stale

The corpus computes its own size. Prose states it too, and the two drift apart the moment an atom
is minted. Measured twice in one hour: `rodin/state/SKILL.md` said **3,411 nodes** on 2026-09-02 and was
wrong by four before the session ended — *because writing that SKILL is what added the atoms*. The sentence
was false by the act of writing it.

| | count (2026-09-02) |
| --- | ---: |
| SKILL.md files scanned | 3,415 |
| stating a corpus node count | 7 |
| **disagreeing with the matrix** | **7 → 0** |

## The arbiter is asked, never restated

`UUID_MATRIX_NODES.length` is the generated matrix — computed from the tree, regenerable, already
sealed. This gate **reads** it, so when the corpus grows the expected value moves by itself and no
constant here is touched. A gate that hardcoded the number would be the very defect it measures.

## Three of the seven were not the defect — reading them changed the fix

| line | what it is | fix |
| --- | --- | --- |
| *"…all 3178 matrix nodes"* (as of 2026-07-16) | a **record** of a past run | date it |
| *"2108/2108 nodes carry a `bind`"* (2026-07-16) | a **record** — the ratio is the claim | date it |
| *"a live run (2770 nodes, 100% reciprocal)"* (2026-07-16) | a **record** | date it |
| *"4.2 MB and 3,411 nodes"* ×3 · *"a graph: 3,193 nodes"*, all as of 2026-09-02 | present-tense **restatements** | stop restating |

Bumping a dated record to today's number would **falsify the measurement it exists to report**. So
`DATED` exempts a line carrying a `YYYY-MM-DD`, because **a date is checkable and tense is not**:
*"the matrix has N nodes"* and *"had N nodes"* differ by one letter, and no scanner should be
trusted to read intent. A number worth keeping is a number worth dating.

The four restatements were fixed by **deleting the number**, not by correcting it — *"one node per
atom in the corpus"* cannot go stale, because it says the invariant instead of the answer.

## The instrument was wrong before the corpus was

The first pass matched across newlines and reported `3000\nnode` — a **dev-server port** — as a
claim about matrix nodes. Same-line matching took 16 → 8; reading each sentence excluded two
scoped illustrations ([[sparsity]] *"593 atoms"* beside *"671B parameters"*, [[vocabulary]]
*"2241 atoms grounded"* against its own arbiter) and took 8 → 7. **Default to not changing when
the signal is ambiguous** — a wrong correction is worse than a stale one, because it reads as
freshly verified.

**Honest boundary.** This proves a stated node count **disagrees with the matrix**, never that the
prose around it is right — a sentence can state the correct number and describe it wrongly. It
covers the corpus-wide node noun only; every other restated quantity in the corpus (bond degrees,
export counts, byte sizes) is the same class and is not yet gated. The floor is a **theorem at
zero**, not a ratchet: there is no acceptable number of sentences that disagree with the arbiter
sitting beside them.

**Law — [[law]]: prose may not restate a number the corpus computes. Ask the arbiter, or state the
invariant instead of the answer — and if a number is worth keeping, date it, because a dated
record is true forever and an undated one rots the day it is written.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: a stated figure must agree with its source.
- **ISO/IEC 25010:2023 §5.6** — maintainability: a copied answer is a second source of truth.

Composes: [[rules]] · [[uuid]]/matrix · [[law]].
