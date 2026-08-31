---
name: reconciliation
description: "Use when reconciling intercompany payable/receivable balances for multi-entity period close — the 'payable = receivable, net' invariant is the conservation algebra (netFlow = 0) at entity scale, proven at 0 and at scale, refutable on any break."
atomPath: "intercompany/reconciliation"
coordinate: "intercompany/reconciliation · 8/crest · 8b8e17b3"
contentUuid: "6643ba6c-e4a2-516e-9f80-f2fa83aab05e"
diamondUuid: "39426280-59cc-850b-bdc5-fd3789db2f94"
uuid: "8b8e17b3-3420-8389-aa42-c3ebc006c290"
horo: 8
typography:
  partition: intercompany
  bondDegree: 15
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
signatures:
  computationUuid: "5cd17bf6-f422-85a9-853e-482034062509"
  stages:
    - stage: path
      stageUuid: "38e4f755-dc98-803c-bbdc-816592099d35"
    - stage: trinity
      stageUuid: "e849e205-4e2e-8266-8e3c-1d5e71cd75cf"
    - stage: boundary
      stageUuid: "afc39431-fb45-8d30-a28b-9cfa9ad8757f"
    - stage: links
      stageUuid: "afa9b908-a574-8b60-b4f6-31bc69e47e50"
    - stage: horo
      stageUuid: "c4c7d42c-63b0-8d0a-aa89-3eea450ecf9b"
    - stage: seal
      stageUuid: "bbbb288a-7f35-8fce-8e39-8eb9f11a57d3"
    - stage: uuid
      stageUuid: "e14c96d0-5789-8c75-bccc-36e019fd49c0"
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

Composes: [[accounting]] · [[reconciliation]].
