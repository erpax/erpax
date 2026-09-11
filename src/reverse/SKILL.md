---
name: reverse
description: "Use when reasoning about reverse — A reversal is not a new computation; it is the **mirror of an existing balanced entry**: take the source accounting journal entry's , swap each line's and , keep the SAME . Because"
atomPath: reverse
coordinate: "reverse · 7/descent · ec544fc3"
contentUuid: "7651bdac-2447-5c8c-bda2-a9ca182c7ab9"
diamondUuid: "b98c0249-1e40-8ff9-9dab-daed51b9390b"
uuid: "ec544fc3-f9d3-8236-ba9c-8b8247901501"
horo: 7
typography:
  partition: reverse
  bondDegree: 86
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
  computationUuid: "ed2c1359-cb5d-84d3-abfa-49db8c158980"
  stages:
    - stage: path
      stageUuid: "41402a87-7c9d-8539-bf50-38830f6553a1"
    - stage: trinity
      stageUuid: "80e02b9b-570e-898a-979e-194a5ab55ce5"
    - stage: boundary
      stageUuid: "4ed67f4f-c998-8d8d-ac9a-56b5ef164ee1"
    - stage: links
      stageUuid: "9d279787-8bbf-80cd-8274-0067a0496f7e"
    - stage: horo
      stageUuid: "e0bdaa12-edfe-8fd0-be8b-9ed0b3946fe4"
    - stage: seal
      stageUuid: "ce204f8d-b998-8269-ab87-64097497b587"
    - stage: uuid
      stageUuid: "6d8469a9-7997-802b-b750-d02eb1c317f0"
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
