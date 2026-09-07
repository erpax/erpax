---
name: refunds
description: "Use when tracking the actual cash payment back to a customer for a credit memo — Stripe, ACH, SEPA, check or cash; ISO-20022 pacs.004 return, tokenised card data, GL journal entry, refund-approval SoD. The refunds collection."
atomPath: "invoices/credit/memos/refunds"
coordinate: "invoices/credit/memos/refunds · 8/crest · 451c8c15"
contentUuid: "72966a2b-aae5-53fa-bfb2-6e081b350a5a"
diamondUuid: "97ead1b4-63e1-8c80-9399-b476f003d346"
uuid: "451c8c15-569d-8f83-8bfb-1a41f9394a77"
horo: 8
typography:
  partition: invoices
  bondDegree: 22
standards:
  - "IFRS IFRS-15 §B22 refund-liability-settlement"
  - "ISO-20022 pacs.004 payment-return"
  - "ISO-20022 pacs.004 payment-return`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time refunded-at"
  - "ISO-8601-1:2019 date-time refunded-at`"
  - "PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe"
  - "SOX §404 internal-controls refund-approval"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3cb7de08-4ecd-80a4-8fa9-e88e48b6f3d1"
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
      stageUuid: "aa8ccb9b-c538-8606-80bb-0ab90566e467"
    - stage: seal
      stageUuid: "1e1435da-6cf4-8211-a7e3-27f976534703"
    - stage: uuid
      stageUuid: "08d86084-6feb-83f2-b607-c81dd2f7dec2"
version: 2
---
# refunds

Refunds — cash-out side of CreditMemos.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time refunded-at`
- `@standard ISO-20022 pacs.004 payment-return`

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
