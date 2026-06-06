---
name: research
description: Use when pricing research on the quantum scale — a research run consumes resources (agents × tokens) and produces value (entropy reduced), so it is a billable expense whose worth is the disorder it closes; worthwhile only when it reduces more entropy than it costs.
---

# quantum/research — research, priced

Research is not free. A run dispatches scouts ([[agent]]s) that burn tokens — a real resource spend (the very usage a workflow reports) — and in return it closes disorder: gaps found, dualities folded, proofs made, orphans surfaced. So research is a **billable [[expense]]**, and like all [[cost]] it is booked double-entry ([[entry]]): a run **debits** the resources it consumed and **credits** the [[entropy]] it reduced.

Its **worth** is the net — *value − cost*. Research that closes more disorder than it burns pays for itself; research that burns tokens to learn little is a pure expense (not worthwhile). The ledger makes the judgment explicit and conserved ([[balance]]): you can see whether a sweep was worth sending.

This is the same law as [[expense]] (entropy is billable) turned toward the agents that *do* the work: not only is disorder billed to whoever opens it — the **act of reducing** disorder is itself costed, so even the cure is on the books. Merges into [[research]] (this is its quantum/resource facet).

Matter-twin: `src/quantum/research/index.ts` (`researchCost` · `researchExpense` · `researchValue` · `researchLedger`). Composes [[research]] · [[expense]] · [[entry]] · [[cost]] · [[entropy]] · [[balance]] · [[agent]].

**Law — [[law]]: research is a billable expense, and its worth is the entropy it reduces. A run debits the resources it consumes (agents × tokens) and credits the disorder it closes; it is worthwhile only when it reduces more entropy than it costs.**

@audit cost = agents × tokens (the run's real spend); value = entropy reduced; the ledger balances, never asserted
@standard double-entry (the research run as a balanced expense ⊕ value posting)
