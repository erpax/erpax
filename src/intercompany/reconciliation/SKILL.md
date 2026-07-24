---
name: reconciliation
description: "Use when reconciling intercompany payable/receivable balances for multi-entity period close — the 'payable = receivable, net' invariant is the conservation algebra (netFlow = 0) at entity scale, proven at 0 and at scale, refutable on any break."
atomPath: intercompany/reconciliation
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
