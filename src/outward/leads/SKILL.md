---
name: leads
description: "Use when reasoning about leads — outward already holds the machinery: an answer is content-addressed, a remembers the last address, and returns **fresh · unchanged · moved · unreachable**."
atomPath: "outward/leads"
coordinate: "outward/leads · 1/base · 5189a648"
contentUuid: "d3a7e83b-e3bc-54cf-b609-e3823ceef4c6"
diamondUuid: "7c7854cc-2a05-8663-a64f-4122cf05314c"
uuid: "5189a648-5844-87e2-8123-e19e1b5a9142"
horo: 1
typography:
  partition: outward
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "cfe613ae-d90f-899e-bb25-c53eeb723fce"
  stages:
    - stage: path
      stageUuid: "b864253c-03bc-8cb3-8fe3-75f4dadcd26e"
    - stage: trinity
      stageUuid: "d37cf256-7d7f-8073-8706-7bce7ebd8317"
    - stage: boundary
      stageUuid: "b9c6fe75-f629-86ff-89dc-358daa4e7222"
    - stage: links
      stageUuid: "235ac3a7-4c1b-8730-95b7-8934d4c21c47"
    - stage: horo
      stageUuid: "fd8ae89b-e7c2-801b-9c6c-2132111f7a0b"
    - stage: seal
      stageUuid: "62b87651-1782-8128-9316-0ed4c329919f"
    - stage: uuid
      stageUuid: "ae6e6a4b-ec6d-83e1-b668-8462bc24d79d"
version: 2
---
# outward/leads — every API is a lead source, and the boundary had two shapes

[[outward]] already holds the machinery: an answer is content-addressed, a `ReceiptBook` remembers
the last address, and `receiptState` returns **fresh · unchanged · moved · unreachable**. A `moved`
receipt is the world disagreeing with what was last recorded — that *is* a new lead, and a reason to
cut a release.

It was running for one region.

| | before | after |
| --- | ---: | ---: |
| callers of `runOutward` | **1** (`outward/eu`) | 1, composed by this atom |
| boundaries asked per run | 4 | **12** |
| scheduled runs | **0** — no workflow carried `schedule:` | nightly |

`outward/bg` and `outward/world` emitted a different shape — `ContractCheck { rail, holds, detail }`,
a boolean verdict with no address — so they could answer *"is the contract intact?"* and could never
answer *"has it moved?"*. Two shapes for one job, and only one of them produced leads.
`contractRows` routes them through the same receipts.

## What the first live harvest said

```
= unchanged   vies · ecb · peppol
? unreachable sanctions                HTTP 403
+ fresh       bg:bnb                   29 currencies; USD = 0.877 EUR/unit
+ fresh       bg:tr                    269 заявления
+ fresh       world:brreg              EQUINOR ASA (ASA)
+ fresh       world:sec                CIK 0000320193, operating, 1000 recent filing(s)
+ fresh       world:frankfurter · world:erapi · world:off · world:ofac
              asked 12 · leads 8 · unreachable 1
```

Eight `fresh` — not because the world changed, but because **nobody had ever asked these eight
through the machinery that remembers**. That is the honest reading of a first run, and it is why
`fresh` is a distinct state rather than being folded into `moved`.

## The detail is deliberately not folded

`contractAddress` folds `{rail, holds}` and **drops `detail`**. `checkFrankfurter`'s success detail
reads `EUR on 2026-09-25: 31 rate(s)` — it carries the date, so folding it whole would report
`moved` **every single day** and the lead stream would be pure noise. This corpus has paid for a
noise floor above its signal four times ([[rules]]/prose 1,261→15, [[rules]]/reference 97→48,
[[standards]]/emit, [[rules]]/cycle's own DFS). A release needs to know a verdict **flipped**.

## A lead is not a failure

The runner exits 0 with leads. `moved` and `fresh` are release *reasons*; `unchanged` is silence;
and `unreachable` is an **unanswered question**, never evidence of change — a source that throws
keeps its prior receipt and is reported separately, which is the same refusal
[[publish]]/live makes about a registry that cannot be reached. It exits non-zero only when the
*whole* boundary was unreachable, because then nothing was measured at all.

**Honest boundary.** This proves a contract's verdict changed, never **why**, and never that the
change matters to a release — that is a human's call reading `outward-leads.json`. It asks the
**12** rails these three registries wire; [[outward]]/coverage catalogues **178** endpoints of which
**44** are covered, so 134 remain silent and no lead can ever arrive from them. A rail whose
`holds` stays true while its payload shape drifts is invisible here, because `detail` is not folded —
that is the price paid for a usable signal, stated rather than hidden.

## Fused to next — the leads ARE the candidate space

*"Why is next not fused yet to autonomous coverage of all leads and news?"* Because nothing composed
them. [[quantum]]/chat's `nextAsk(answered, candidates)` is **generic over candidates** — it returns
the first candidate whose uuid the answered set does not contain — and `harvestLeads` produced leads,
and no line put one into the other. So "what is next" could not see the world changing.

`leadCoverage(harvest, answered)` is that composition and **no new logic**: `coverage` and `nextAsk`
are unchanged, and a lead becomes a candidate through `leadCandidate`.

```
covered      = coverage(answered, leadCandidates(h))     fraction of the boundary answered
next         = nextAsk(answered, leadCandidates(h))      the first lead nothing has answered
outstanding  = candidates not in answered
```

A **`moved`** lead carries its note; a `fresh` one does not. So one rail moving twice is **two**
candidates, and answering the first does not mark the second covered — the coverage key is the uuid
of the candidate text, which is the corpus's own addressing applied to news.

`answered` persists in `outward-leads.json` beside the agenda, so coverage survives runs, and the
runner prints `covered NN% · outstanding N` and the single `next →` line. Live: **asked 12 · leads 0
· covered 100%**, because the receipts were written and every rail agrees with them.

**Seen is not acted on.** The ReceiptBook records that a boundary was *asked*; `answered` records
that a lead was *dealt with*. Conflating them would mark every lead covered the moment it was
harvested, which is the same defect as a gate that reports green because it never ran.

**The runner goes LAST in the file.** It uses top-level `await`, which suspends module evaluation, so
anything declared below it is still in its temporal dead zone when it runs — it read `leadCandidates`
before initialisation until it moved. [[rules]]/cycle's law inside a single file.

**Honest boundary.** `next` is the first *uncovered* lead in harvest order, not the most important
one — there is no priority here, and ordering leads by consequence would need a model of what each
rail feeds. And coverage measures that a lead was answered, never that the answer was right.

**Law — [[law]]: the boundary is memory, not a poll. Content-address every answer, remember the
address, and let only a MOVED one cost attention — one shape for the whole boundary, or the half
with no receipts silently produces no leads at all.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a receipt is what makes a later claim checkable.

Composes: [[outward]] · [[outward]]/eu · [[outward]]/coverage · [[publish]]/live · [[law]].
