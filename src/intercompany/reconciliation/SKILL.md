---
name: reconciliation
description: "Use when reconciling intercompany payable/receivable balances for multi-entity period close — the 'payable = receivable, net' invariant is the conservation algebra (netFlow = 0) at entity scale, proven at 0 and at scale, refutable on any break."
atomPath: "intercompany/reconciliation"
coordinate: "intercompany/reconciliation · 5/round · bb9bf12e"
contentUuid: "4092f938-c004-5038-a4f3-d9c9809f98f2"
diamondUuid: "8c5432e9-5845-800b-98ba-a896ec9c8552"
uuid: "bb9bf12e-961b-80dc-8920-e436948b9081"
horo: 5
bonds:
  in:
    - balance
    - currency
    - law
    - proof
    - uuid
  out:
    - balance
    - currency
    - law
    - proof
    - uuid
typography:
  partition: intercompany
  bondDegree: 25
  neighbors: []
standards:
  - "IAS-27:2023 (consolidated and separate financial statements)"
  - "IAS-28:2023 (associates and joint ventures)"
  - "IFRS-10:2023 (consolidated financial statements)"
  - "IFRS-11:2023 (joint arrangements)"
  - "IFRS-3"
  - "IFRS-3:2023 (business combinations)"
  - "SAF-T"
  - "SAF-T:3.0.2 (multi-entity audit trail)"
bindings: []
neighbors:
  wikilink:
    - conservation
    - law
    - rules
  matrix:
    - balance
    - currency
    - law
    - proof
    - uuid
  backlinks:
    - balance
    - currency
    - law
    - proof
    - uuid
signatures:
  computationUuid: "06d20c1b-f495-8a71-9409-8db0c082d145"
  stages:
    - stage: path
      stageUuid: "38e4f755-dc98-803c-bbdc-816592099d35"
    - stage: trinity
      stageUuid: "e849e205-4e2e-8266-8e3c-1d5e71cd75cf"
    - stage: boundary
      stageUuid: "f5bee406-a583-8cf0-b006-72a64ab2c0ac"
    - stage: links
      stageUuid: "afa9b908-a574-8b60-b4f6-31bc69e47e50"
    - stage: horo
      stageUuid: "1b8d0ece-46d2-8463-8f4e-e0331046d96a"
    - stage: seal
      stageUuid: "bbbb288a-7f35-8fce-8e39-8eb9f11a57d3"
    - stage: uuid
      stageUuid: "a13355ce-f65a-8061-8213-325a5808f247"
version: 2
---
# intercompany/reconciliation — payable = receivable, net: conservation at entity scale

Multi-entity close requires every intercompany balance to reconcile: what one entity records **payable** to another, the other records **receivable** — and across the consolidation they **net to zero**. `validateIntercompanyBalance` checks `|payable − receivable| ≤ tolerance`; the consolidation is ready only when every pair reconciles.

This was a bare **axiom** — the `@invariant "payable = receivable, net"` asserted with no proof beside it ([[rules]]/refutable found it holding the claim with nothing to contradict it). It is now a **theorem**: the proof leg shows it is the **same conservation algebra as double-entry** ([[conservation]] `netFlow = 0`), one scale up — the ledger's Σdebit = Σcredit becomes the consolidation's Σpayable = Σreceivable.

## Proven at 0 and at scale

- **At 0** — the empty consolidation conserves by vacuity (`netFlow([]) = 0`); a zero balance reconciles.
- **At scale** — N=1000 entity-pairs each balanced ⇒ the whole consolidation nets to 0, and **one broken receivable refutes it** (the crack breaks conservation). Refutable at both ends, so it forbids something — a real law, not decoration.

**Honest boundary.** Reconciliation is a **tolerance** (`|Δ| ≤ 0.01`), never float equality — a sub-cent rounding difference reconciles, a larger one is refused. And polarity/elimination are *prepared*, not auto-posted (they require approval). The theorem proves the netting invariant; the posting of eliminations remains a gated human step.

**Law — [[law]]: intercompany balances conserve — Σpayable = Σreceivable across the consolidation, the same netFlow = 0 as the ledger, one scale up. Proven at 0 (empty) and at scale (N pairs), and refuted by any single break.**

Composes: [[conservation]] · [[rules]]/refutable · [[law]].
