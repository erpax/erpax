---
name: reverse
description: "Use when reasoning about reverse — A reversal is not a new computation; it is the **mirror of an existing balanced entry**: take the source accounting journal entry's , swap each line's and , keep the SAME . Because"
atomPath: reverse
coordinate: reverse · 5/round · 1bb38eef
contentUuid: "3c4d2053-fecb-52b5-877c-a20e95a86426"
diamondUuid: "386e6f53-014a-816a-a9f4-e7135f3fda13"
uuid: "1bb38eef-2992-8b4a-ba58-e972bf800199"
horo: 5
bonds:
  in:
    - accounting
    - balance
    - begin
    - close
    - corruption
    - duality
    - emr
    - engineering
    - finality
    - fs
    - give
    - hallucination
    - horo
    - identity
    - part
    - protestantism
    - reverse
    - sequence
    - sin
    - snapshot
    - supto
    - take
    - whole
  out:
    - accounting
    - balance
    - begin
    - close
    - corruption
    - duality
    - emr
    - engineering
    - finality
    - fs
    - give
    - hallucination
    - horo
    - identity
    - part
    - protestantism
    - reverse
    - sequence
    - sin
    - snapshot
    - supto
    - take
    - whole
typography:
  partition: reverse
  bondDegree: 78
  neighbors: []
standards:
  - "IFRS IAS-1 presentation; IAS-34 §B interim-period reversals · @standard OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link."
  - "OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link.\""
  - "SAF-T"
  - SOX
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - begin
    - close
    - duality
    - give
    - identity
    - part
    - sequence
    - take
    - whole
  matrix:
    - accounting
    - balance
    - begin
    - close
    - corruption
    - duality
    - emr
    - engineering
    - finality
    - fs
    - give
    - hallucination
    - horo
    - identity
    - part
    - protestantism
    - reverse
    - sequence
    - sin
    - snapshot
    - supto
    - take
    - whole
  backlinks:
    - accounting
    - balance
    - begin
    - close
    - corruption
    - duality
    - emr
    - engineering
    - finality
    - fs
    - give
    - hallucination
    - horo
    - identity
    - part
    - protestantism
    - reverse
    - sequence
    - sin
    - snapshot
    - supto
    - take
    - whole
signatures:
  computationUuid: "8236f06b-7300-8a72-9e02-ffe3cc4f15a2"
  stages:
    - stage: path
      stageUuid: "41402a87-7c9d-8539-bf50-38830f6553a1"
    - stage: trinity
      stageUuid: "15185d22-9cb9-8198-a548-972710a7f45d"
    - stage: boundary
      stageUuid: "eea3ce9c-b8bd-89ce-9e99-3be8f2ca2e72"
    - stage: links
      stageUuid: "a188f190-6c21-8e54-9682-4a7afd1837b8"
    - stage: horo
      stageUuid: "73f4affd-914e-88f4-88b9-5c4f2cd91301"
    - stage: seal
      stageUuid: "c8d1b6e6-28dc-86f9-9e6c-e03f6f26ac98"
    - stage: uuid
      stageUuid: "e9d5c81a-72de-8c67-99d2-3638f9eda79c"
version: 2
---
# reverse — swap the source's debit↔credit, same accounts

A reversal is not a new computation; it is the **mirror of an existing balanced entry**: take the source [[accounting]] journal entry's `lines`, swap each line's `debit` and `credit`, keep the SAME `glAccount`. Because the source satisfied Σdebit = Σcredit ([[balance]]), the swap satisfies it too — **balanced by construction, never re-keyed**. Debit↔credit is the [[give]]↔[[take]] two-step ([[duality]]); reversal walks it backward.

## The law
- **Derive, don't re-enter.** Read the source entry (`findByID` its `journalEntryId`); map `lines → { glAccount, debit: line.credit, credit: line.debit, … }`. Never reconstruct amounts from a flat net — a single account + net is not a balanced entry ([[part]] vs [[whole]]).
- **Post forward in time, not in place.** A period-close reversal posts at the NEXT period's start (`entryDate = nextPeriodStartDate`) — the `9→1` octave step ([[close]] → [[begin]]; see [[sequence]]). Same-period reversal would re-open a sealed period ([[close]] forbids it).
- **Trace the origin.** `sourceType: 'period_end_adjustment'`, `sourceId = <source entry id>`, `sourceEvent: 'closing:reversed'` — the reversal carries its source's content-uuid lineage ([[identity]]) so the audit chain links mirror↔original.
- **Status `draft`.** Generated reversals enter draft; posting follows the normal gate (SoD, period-lock).

## Standards
@accounting IFRS IAS-1 presentation; IAS-34 §B interim-period reversals · @standard OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link.

## Common mistakes
- Building a reversal from a flat `{ account, debitAmount, creditAmount }` net — it can't satisfy the lines-based, ≥2-line double-entry schema; read the source's lines.
- Posting the reversal in the same (now-sealed) period instead of next-period-start.
- Re-keying amounts (drift) instead of swapping the source lines (exact mirror).

Composes: [[accounting]] · [[balance]] · [[give]]/[[take]] · [[duality]] · [[close]]/[[begin]] · [[identity]].
