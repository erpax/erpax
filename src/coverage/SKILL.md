---
name: coverage
description: "Use when reasoning about coverage — Use to see the development plan as a computed matrix — participants (14 roles) × standards (their concerns), each cell a theorem, each uncovered cell a wave. A cell is covered iff a control cites its standard WITH a test beside it. 100% = every standard, faced by every participant it concerns, is proven. Run: tsx src/coverage/index.ts"
atomPath: coverage
coordinate: "coverage · 7/descent · 38a76d28"
contentUuid: "47e032b2-0d20-5f23-8053-5c3638bf068a"
diamondUuid: "1c69ec61-2d43-8798-8c78-12c82873178c"
uuid: "38a76d28-4136-8231-8ad5-a04ff4839e89"
horo: 7
typography:
  partition: coverage
  bondDegree: 77
standards:
  - "ISO-19011:2018 §6.4 — audit evidence: coverage is traceable, cell by cell"
bindings: []
signatures:
  computationUuid: "c05cedfb-52db-804a-9327-e54e6cf2a21c"
  stages:
    - stage: path
      stageUuid: "1c6707ed-6029-8932-8157-b1288b84e7c9"
    - stage: trinity
      stageUuid: "21e87c4c-fc01-8d91-87ad-004358c05a18"
    - stage: boundary
      stageUuid: "c896a96f-9f0e-8995-95c5-f20c32af9c61"
    - stage: links
      stageUuid: "d64789f2-fbe3-8a5a-b03a-1b838279294c"
    - stage: horo
      stageUuid: "d715d572-dc41-8488-be11-963e7dc3ffca"
    - stage: seal
      stageUuid: "4354aa29-8db6-8dc6-9f19-37b0d313f02a"
    - stage: uuid
      stageUuid: "05362c06-a7d3-8d02-97ab-c371f5733e94"
version: 2
---
# coverage — the development waves ARE theorems, and this computes which remain

The whole session converges here. [[rules]]/audience projects a claim onto the reader it is addressed to; [[audit]]/agent turns each reader into an auditor; the auditors **define the gates**. The last step is the **plan** — and a plan of prose is what this corpus exists to refuse.

So the plan is a **matrix, computed**:

```
participants (14 roles, from the config)  ×  standards (their concerns, from audience)
```

A **cell** is `(participant, standard)`. It is **covered** when a control for that standard exists **with a proof beside it** — a theorem the participant can trace. An **uncovered cell is a WAVE**: one theorem to establish, a control plus its test, for a named reader under a named standard.

## The measured state (2026-07-16)

```
coverage — 33/39 cells proven (84.6%)

6 development waves — each a theorem, most-exposed reader first:
  compliance-officer   ⬚ ЗСч
  accountant           ⬚ IAS 34 · IAS 7
  finance              ⬚ IAS 7
  hr                   ⬚ ILO- · ISO-30414
```

**`IAS 7` appears twice — and the matrix found it, not me.** The cash-flow statement was deleted this session (it was fabricated: `investingCashFlow = -100000` hardcoded), so there is no *proven* IAS-7 control. The tool independently rediscovered the exact gap the session opened — which is the point of computing the plan instead of writing it: the hole appears the moment the control leaves, and closes the moment a tested one lands.

## Why the plan is not a backlog

A typed roadmap is the **frozen rosetta** ([[rules]]/cycle): a list someone wrote, blind to what the corpus grew. This **derives** the cells from the participant→standard map and the proof-legs on disk. A wave appears when a standard gains a concerned reader; it disappears when a test lands beside its control. **The plan recomputes; it is never maintained.** Filling a cell removes exactly its wave — measurable to the cell, asserted in `test.ts`.

Waves are ordered **most-exposed participant first** — the director (who signs SOX §302) before hr — because a theorem the director cannot trace is the shape every catastrophe here took.

**Honest boundary.** A covered cell proves a control **exists and is tested**, never that the test is **correct** — a test can assert a lie ([[rules]]/refutable's boundary, inherited through the whole chain). **100% coverage is the floor of trust, not its ceiling**: nothing unproven, not everything-proven-true. And the participant→standard map is **declared** (in [[rules]]/audience), so a standard concerning a reader nobody mapped is invisible — the map's completeness bounds the matrix's, and the map covers 8 of 14 roles.

**Law — [[law]]: the plan is the matrix, and a wave is an empty cell. Development is proven to the cell — a participant, a standard, a control, a test beside it — and 100% coverage is every standard traceable by every reader it concerns, computed, never claimed.**

## Standards

- **ISO-19011:2018 §6.4** — audit evidence: coverage is traceable, cell by cell.

Composes: [[rules]]/audience · [[syntax]] · [[law]].
