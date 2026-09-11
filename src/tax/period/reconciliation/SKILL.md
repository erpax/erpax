---
name: reconciliation
description: "Use when closing tax periods against fiscal periods — tax↔fiscal alignment (same period-end date) and transfer-pricing documentation completeness (OECD), each a proven, refutable invariant with a real tolerance rather than a bare assertion."
atomPath: "tax/period/reconciliation"
coordinate: "tax/period/reconciliation · 4/weave · e822d293"
contentUuid: "3679fd02-8603-5816-9228-95fdca748723"
diamondUuid: "997d3aff-cee9-8844-a891-bcb6b755dcbf"
uuid: "e822d293-3cdd-81b1-bf2a-b03f97b29e95"
horo: 4
typography:
  partition: tax
  bondDegree: 35
standards:
  - BEPS
  - "BEPS Action 13:2021 (transfer pricing documentation)"
  - "IAS-12"
  - "IAS-12:2023 (income taxes)"
  - "IFRS-16"
  - "IFRS-16:2023 (leases — tax implications)"
  - "OECD Pillar Two:2023 (global minimum tax)"
  - "OECD Transfer Pricing Guidelines:2022"
  - "OECD-Pillar-Two"
  - "OECD-Transfer-Pricing"
  - "SAF-T:3.0.2 (multi-entity, multi-jurisdiction audit trail)"
bindings: []
signatures:
  computationUuid: "e65f80df-500f-8372-b72f-add7c697a217"
  stages:
    - stage: path
      stageUuid: "7f64fe74-9ab1-83a5-94ec-0162bdb6afae"
    - stage: trinity
      stageUuid: "131ea644-4e53-81ac-8143-62d3221ec542"
    - stage: boundary
      stageUuid: "be04dce5-68bb-83e7-b526-842c85600839"
    - stage: links
      stageUuid: "10983c62-85c7-8643-a97a-b93c1768d031"
    - stage: horo
      stageUuid: "cabbeade-f589-80d0-a8a4-c290107a358b"
    - stage: seal
      stageUuid: "898a87b2-f638-830b-81b7-29a89c1a5f32"
    - stage: uuid
      stageUuid: "04cf3963-e0f2-8bdd-ba04-1f5eb9708fc4"
version: 2
---
# tax/period/reconciliation — tax↔fiscal alignment + transfer-pricing documentation, proven

Closing a tax period requires two things to hold: the tax period must **align** with the fiscal period (same period-end date), and every transfer-pricing adjustment must be **documented** to OECD standard. Both were bare `@invariant`s — asserted with no proof beside them ([[rules]]/refutable). Now each has a proof leg:

- **Alignment** — `validateTaxFiscalAlignment(taxEnd, fiscalEnd)` holds iff the dates match; a different date **refutes** it.
- **Documentation** — `validateTransferPricingDocumentation` scores four required fields (transaction type · method · reason · supporting docs) and holds iff completeness ≥ tolerance (`TRANSFER_PRICING_DOC_TOLERANCE`, 9/10). Three of four falls short — a **real threshold**, refutable, not all-or-nothing.

**Honest boundary.** These prove the *structural* invariants — dates align, fields present. They do not verify the *content* (that the arm's-length method was correctly applied, or the supporting document actually supports the figure) — that is the tax authority's review, gated: tax-period eliminations are prepared, posted only after approval.

**Law — [[law]]: a tax period aligns with its fiscal period and its transfer-pricing adjustments are documented to a real completeness threshold — each invariant refutable, so each forbids something, rather than a bare claim nothing can contradict.**

Composes: [[accounting]] · [[rules]]/refutable · [[law]].

Composes: [[currency/reconciliation]].
