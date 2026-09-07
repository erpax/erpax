---
name: reconciliation
description: "Use when closing tax periods against fiscal periods — tax↔fiscal alignment (same period-end date) and transfer-pricing documentation completeness (OECD), each a proven, refutable invariant with a real tolerance rather than a bare assertion."
atomPath: "tax/period/reconciliation"
coordinate: "tax/period/reconciliation · 4/weave · 80d6c225"
contentUuid: "32121d5c-9382-59d2-b1cb-4fa253a0226e"
diamondUuid: "4444d4c1-9faa-8f9e-9d2a-08162da825e8"
uuid: "80d6c225-da45-812f-b911-5001f4b8bde2"
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
  computationUuid: "0277297a-1dd4-840c-a25f-94f2510b3967"
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
      stageUuid: "34bfa96f-3a28-8f31-8cb8-5c531f91e94e"
    - stage: seal
      stageUuid: "898a87b2-f638-830b-81b7-29a89c1a5f32"
    - stage: uuid
      stageUuid: "1db12c22-7c52-8aeb-8663-22371a0acfab"
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
