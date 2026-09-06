---
name: reverse
description: "Use when reasoning about reverse — A reversal is not a new computation; it is the **mirror of an existing balanced entry**: take the source accounting journal entry's , swap each line's and , keep the SAME . Because"
atomPath: reverse
coordinate: "reverse · 7/descent · 381f55f3"
contentUuid: "f8150c3a-7864-5e71-9efc-6ebd933b83ef"
diamondUuid: "4630daf8-62a4-82f8-ab77-c28f9972970e"
uuid: "381f55f3-2d03-8e74-8bc5-8fceffb23aab"
horo: 7
typography:
  partition: reverse
  bondDegree: 79
standards:
  - "IFRS IAS-1 presentation; IAS-34 §B interim-period reversals · @standard OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link."
  - "ISO-19011`"
  - "OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link."
  - "OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link.\""
  - "SAF-T"
  - SOX
  - "SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link.\""
  - "SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link.\\\"\""
bindings: []
signatures:
  computationUuid: "978d5cc6-cbd7-8ec2-9b01-1db2c994e620"
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
      stageUuid: "26b4f436-d680-8749-963f-681355184c87"
    - stage: seal
      stageUuid: "ce204f8d-b998-8269-ab87-64097497b587"
    - stage: uuid
      stageUuid: "9eb8a82d-81e1-8c50-885b-496282b2cc9e"
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

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-19011`

@accounting IFRS IAS-1 presentation; IAS-34 §B interim-period reversals · @standard OECD SAF-T §3 reversal-entries (distinct GL + posting date) · @compliance SOX §404 reversal-traceability · @audit ISO-19011 mirror↔origin link.

## Common mistakes
- Building a reversal from a flat `{ account, debitAmount, creditAmount }` net — it can't satisfy the lines-based, ≥2-line double-entry schema; read the source's lines.
- Posting the reversal in the same (now-sealed) period instead of next-period-start.
- Re-keying amounts (drift) instead of swapping the source lines (exact mirror).

Composes: [[accounting]] · [[balance]] · [[give]]/[[take]] · [[duality]] · [[close]]/[[begin]] · [[identity]].

## The code, and why it preserves rather than recomputes

`reverseLines` swaps each line's debit and credit, keeping the account and the **amount**. The
amounts are preserved, never re-derived: a reversal that recomputed its figures could disagree with
the entry it reverses, and then the pair would not net to zero — the one thing a reversal exists to
guarantee. `netsToZero` checks that by SUMMING both sides rather than trusting that swapping two
fields must work out.

An unbalanced origin still reverses to something that nets with it. Reversal does not repair a bad
entry and must not pretend to: the imbalance survives in both and cancels in the pair.

Reversing twice is the identity — the involution [[duality]]/mirror describes, here on money. And a
zero side stays absent rather than becoming an explicit `0`, so a reversed line has the same shape as
an original and nothing downstream special-cases it.

`reverseEntry` carries the origin id and its own posting date, both of which SAF-T §3 requires: a
reversal with no origin is an adjustment wearing the word, and nothing could pair the two.
