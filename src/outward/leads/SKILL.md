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

**Law — [[law]]: the boundary is memory, not a poll. Content-address every answer, remember the
address, and let only a MOVED one cost attention — one shape for the whole boundary, or the half
with no receipts silently produces no leads at all.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a receipt is what makes a later claim checkable.

Composes: [[outward]] · [[outward]]/eu · [[outward]]/coverage · [[publish]]/live · [[law]].
