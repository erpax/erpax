---
name: manifest
description: "Use when a change touches many files at once — a mass edit carries a scalpel manifest naming the reason for every cut, or it is a blind sweep and is refused. Measures the DOOR rather than the discipline, because the scalpel already makes this class of damage impossible (unique-match-or-refuse, reasonless ops refused, collisions named, a red batch restored to the byte) and it changed nothing while it stayed optional: in one session, hand-rolled sweeps spliced an import into a doc comment, left 3,184 SKILL.md half-written, and reverted the work a keep-list was written to preserve."
atomPath: "rules/manifest"
coordinate: "rules/manifest · 5/round · 596159ce"
contentUuid: "fad303b7-0262-5588-a061-27b9c42dd65b"
diamondUuid: "77088780-4cec-8788-b1a2-ee2f547ccfc2"
uuid: "596159ce-1bf8-8270-be1a-00adc8d9d2cd"
horo: 5
typography:
  partition: rules
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "bae15503-c971-8c0d-a016-a533f68a622f"
  stages:
    - stage: path
      stageUuid: "a0f99ff4-10de-8b97-b0eb-db0fbcd4355c"
    - stage: trinity
      stageUuid: "e0702f7f-4fa6-8d32-a17f-d11533e27dfb"
    - stage: boundary
      stageUuid: "9180b014-00f3-8f33-a043-b3bf80acaf82"
    - stage: links
      stageUuid: "473c3f86-fd0b-8a73-b1a7-4973ea99b2d8"
    - stage: horo
      stageUuid: "dff6e3db-d417-8c7a-8528-ac48ea5b0549"
    - stage: seal
      stageUuid: "b1ef9b8c-5ec3-8f7a-a2a2-ffd202ceaf8c"
    - stage: uuid
      stageUuid: "0518d2f9-7418-80d6-94de-7d21e88a6794"
version: 2
---
# rules/manifest — a mass edit without a manifest is a sweep

The [[scalpel]] already makes a whole class of damage **impossible**, not discouraged: a `find` matching zero times or twice **refuses**, a reasonless op refuses, a collision is named before a byte moves, and a batch failing the ring is restored to its pre-batch bytes. The engine has no code path that does otherwise.

And it changed nothing, because **the scalpel was optional.**

| what a hand-rolled sweep did, in one session | what the scalpel does |
| --- | --- |
| a regex spliced an import **into a doc comment** — the import became text, symbols unbound, an accounting service throwing at runtime | `find` must match **exactly once**; 0 or 2+ refuse |
| a killed corpus-wide run left **3,184 `SKILL.md`** half-written and compounding | batches of ≤30 with the ring between; a kill loses one batch, rolled back |
| a revert whose keep-list **destroyed the work it was written to preserve** | a red batch restores every touched file **to the byte** |

Three cracks, all in the same session, with the instrument sitting unused two atoms away. That is the corpus's own law about its own gates: **a gate that can be skipped is prose** ([[rules]]).

So this axis measures the **door**, not the discipline. A changeset touching `SWEEP_THRESHOLD` files or more, with no manifest naming the reason for its cuts, is a **sweep**. `sweeps()` counts them, `assertNoSweeps` fails closed on getting worse, and zero is the horizon — reaching it means the scalpel is the only door rather than the right one.

An **empty reason is not a reason** (the scalpel's own refusal, restated here so a manifest cannot be satisfied by an empty array), and a partial manifest does not cover a wider changeset.

## Honest boundary

This proves a mass edit was **planned and reasoned**, never that the plan was **wise** — a well-formed manifest can encode a bad idea, which the [[scalpel]] says of itself too, and the reason line is where a human catches it. It also reads a **changeset**, so bytes written by a route outside the repo's own tooling are invisible to it until they land: it closes the door that was standing open, not every door. `SWEEP_THRESHOLD` is **declared** in the open so it can be argued with, not derived.

**Law — [[law]]: a changeset above the sweep threshold carries a scalpel manifest — every cut named with its reason before a byte moves — or it is a sweep, and a sweep is refused.**

## Code

entry `@/rules/manifest` · sealed `1` · trinity `1·1·1`
exports const · function · interface
imports —

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is reviewable when its intent is attached to it.
- **ISO-19011:2018 §6.4** — audit evidence: the reason is what a reviewer reads.

Composes: [[scalpel]] · [[rules]] · [[confirm]] · [[constitution]] · [[law]].
