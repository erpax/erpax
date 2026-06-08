---
name: refunds
description: "Use when tracking the actual cash payment back to a customer for a credit memo — Stripe, ACH, SEPA, check or cash; ISO-20022 pacs.004 return, tokenised card data, GL journal entry, refund-approval SoD. The refunds collection."
atomPath: invoices/credit/memos/refunds
coordinate: invoices/credit/memos/refunds · 7/descent · 2fc27414
contentUuid: "5139b61d-5bee-5744-a37b-90f8b02b99d8"
diamondUuid: "b18b5e61-fb56-808e-9cdb-81e55138d98f"
uuid: "2fc27414-98b2-894e-be25-4f72f3c14799"
horo: 7
bonds:
  in:
    - access
    - accounting
    - entries
    - invoices
    - law
    - memos
    - orders
  out:
    - access
    - accounting
    - entries
    - invoices
    - law
    - memos
    - orders
typography:
  partition: invoices
  bondDegree: 22
  neighbors: []
standards:
  - "IFRS IFRS-15 §B22 refund-liability-settlement"
  - "ISO-19011:2018 audit-trail refund-evidence"
  - "ISO-20022 pacs.004 payment-return"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time refunded-at"
  - "PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe"
  - "SOX §404 internal-controls refund-approval"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - entries
    - invoices
    - law
    - memos
    - orders
  matrix:
    - access
    - accounting
    - entries
    - invoices
    - law
    - memos
    - orders
  backlinks:
    - access
    - accounting
    - entries
    - invoices
    - law
    - memos
    - orders
signatures:
  computationUuid: "da4f4544-a3c6-809a-90d1-ef48fc2c2a94"
  stages:
    - stage: path
      stageUuid: "b102a1cc-74f3-84f1-b992-73431a965887"
    - stage: trinity
      stageUuid: "e67804f8-7d93-875b-b992-a6dfd53c3c38"
    - stage: boundary
      stageUuid: "496e70d6-a479-8142-a871-adb7df678f55"
    - stage: links
      stageUuid: "1a286aa0-42d7-84ab-8c05-372819be4ed6"
    - stage: horo
      stageUuid: "83249246-43a5-80b4-8363-3877ffecf380"
    - stage: seal
      stageUuid: "1e1435da-6cf4-8211-a7e3-27f976534703"
    - stage: uuid
      stageUuid: "3710a88f-0b18-8b22-b4cd-2af8c5f87ecd"
version: 2
---
# refunds

Refunds — cash-out side of CreditMemos.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time refunded-at
- ISO-20022 pacs.004 payment-return
- IFRS IFRS-15 §B22 refund-liability-settlement
- US-GAAP ASC-606-10-32-10 variable-consideration
- ISO-19011:2018 audit-trail refund-evidence
- SOX §404 internal-controls refund-approval
- PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe

Composes: [[invoices/credit/memos]] · [[Invoices]] · [[customers/sales/orders]] · [[journal/entries]] · [[accounting]] · [[access]].

**Law — [[law]]: a refund is the cash-out leg of a credit memo (ISO-20022 pacs.004 return) — it posts a GL journal entry, tokenises card data (never stored), and clears only through refund-approval segregation of duties.**
