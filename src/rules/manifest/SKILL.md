---
name: manifest
description: "Use when a change touches many files at once — a mass edit carries a scalpel manifest naming the reason for every cut, or it is a blind sweep and is refused. Measures the DOOR rather than the discipline, because the scalpel already makes this class of damage impossible (unique-match-or-refuse, reasonless ops refused, collisions named, a red batch restored to the byte) and it changed nothing while it stayed optional: in one session, hand-rolled sweeps spliced an import into a doc comment, left 3,184 SKILL.md half-written, and reverted the work a keep-list was written to preserve."
atomPath: "rules/manifest"
coordinate: "rules/manifest"
contentUuid: "e6577291-5765-5929-9506-79a4e40365a6"
diamondUuid: "fa8d2612-ba2b-881b-9b8a-bdc88cbe050d"
bonds:
  in:
    - rules
  out: []
typography:
  partition: rules
  bondDegree: 8
  neighbors:
    - diamond
    - hallucination
    - purity
standards: []
bindings: []
neighbors:
  wikilink:
    - confirm
    - constitution
    - law
    - rules
    - scalpel
  matrix: []
  backlinks: []
signatures:
  computationUuid: "05e4e77e-9b40-8c90-b094-a88d04c4f1fc"
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
      stageUuid: "9f28bd93-5643-8277-89e8-48e79c4c2937"
    - stage: seal
      stageUuid: "5cdfaba8-391e-8990-90b0-77372bdea95b"
    - stage: uuid
      stageUuid: "904a1fd8-21c0-8306-8121-d4ed98f2759b"
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

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is reviewable when its intent is attached to it.
- **ISO-19011:2018 §6.4** — audit evidence: the reason is what a reviewer reads.

Composes: [[scalpel]] · [[rules]] · [[confirm]] · [[constitution]] · [[law]].
