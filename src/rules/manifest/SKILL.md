---
name: manifest
description: "Use when a change touches many files at once — a mass edit carries a scalpel manifest naming the reason for every cut, or it is a blind sweep and is refused. Measures the DOOR rather than the discipline, because the scalpel already makes this class of damage impossible (unique-match-or-refuse, reasonless ops refused, collisions named, a red batch restored to the byte) and it changed nothing while it stayed optional: in one session, hand-rolled sweeps spliced an import into a doc comment, left 3,184 SKILL.md half-written, and reverted the work a keep-list was written to preserve."
atomPath: "rules/manifest"
coordinate: "rules/manifest · 1/base · 51679dc0"
contentUuid: "c2f9f7f6-7bf2-5f3b-8c48-d5f88eae065a"
diamondUuid: "1d6f04eb-9452-83fb-97ac-91589933f4d4"
uuid: "51679dc0-15f7-83cb-a6ee-89fb7e886c8b"
horo: 1
typography:
  partition: rules
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "31bde364-ca53-8a6b-845e-01940051a159"
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
      stageUuid: "b16de668-63e1-83b3-a29f-6b070baab84b"
    - stage: seal
      stageUuid: "b1ef9b8c-5ec3-8f7a-a2a2-ffd202ceaf8c"
    - stage: uuid
      stageUuid: "92e23df5-0a7e-86f2-8688-a4959fbc4dc0"
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
