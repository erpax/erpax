---
name: reconciliation
description: "Use when closing tax periods against fiscal periods — tax↔fiscal alignment (same period-end date) and transfer-pricing documentation completeness (OECD), each a proven, refutable invariant with a real tolerance rather than a bare assertion."
atomPath: tax/period/reconciliation
---

# tax/period/reconciliation — tax↔fiscal alignment + transfer-pricing documentation, proven

Closing a tax period requires two things to hold: the tax period must **align** with the fiscal period (same period-end date), and every transfer-pricing adjustment must be **documented** to OECD standard. Both were bare `@invariant`s — asserted with no proof beside them ([[rules]]/refutable). Now each has a proof leg:

- **Alignment** — `validateTaxFiscalAlignment(taxEnd, fiscalEnd)` holds iff the dates match; a different date **refutes** it.
- **Documentation** — `validateTransferPricingDocumentation` scores four required fields (transaction type · method · reason · supporting docs) and holds iff completeness ≥ tolerance (`TRANSFER_PRICING_DOC_TOLERANCE`, 9/10). Three of four falls short — a **real threshold**, refutable, not all-or-nothing.

**Honest boundary.** These prove the *structural* invariants — dates align, fields present. They do not verify the *content* (that the arm's-length method was correctly applied, or the supporting document actually supports the figure) — that is the tax authority's review, gated: tax-period eliminations are prepared, posted only after approval.

**Law — [[law]]: a tax period aligns with its fiscal period and its transfer-pricing adjustments are documented to a real completeness threshold — each invariant refutable, so each forbids something, rather than a bare claim nothing can contradict.**

Composes: [[tax]] · [[rules]]/refutable · [[law]].
