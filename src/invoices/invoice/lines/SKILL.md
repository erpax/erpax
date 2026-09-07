---
name: lines
description: "Use when adding, pricing or auditing individual line items on an invoice — EN-16931 BG-25 quantity/net-amount, BG-29 price details, BG-30 VAT category/rate, allowances, inventory recompute and GL posting. The invoice-lines collection."
atomPath: "invoices/invoice/lines"
coordinate: "invoices/invoice/lines · 8/crest · 8a973838"
contentUuid: "4182cd03-4082-5ad5-a499-12ac74a5ec90"
diamondUuid: "dee89f0c-fc62-86e3-a1f6-c1e4877a8011"
uuid: "8a973838-336b-825f-9b0e-ff2aabb2089a"
horo: 8
typography:
  partition: invoices
  bondDegree: 25
standards:
  - "EN-16931:2017 BT-126 invoice-line-identifier"
  - "EN-16931:2017 BT-126 invoice-line-identifier`"
  - "EN-16931:2017 BT-131 invoice-line-net-amount"
  - "EN-16931:2017 BT-131 invoice-line-net-amount`"
  - "EN-16931:2017 BT-151 vat-category-code"
  - "EN-16931:2017 BT-151 vat-category-code`"
  - "EN-16931:2017 §BG-25 invoice-line"
  - "EN-16931:2017 §BG-25 invoice-line`"
  - "EN-16931:2017 §BG-27 invoice-line-allowances"
  - "EN-16931:2017 §BG-27 invoice-line-allowances`"
  - "EN-16931:2017 §BG-28 invoice-line-charges"
  - "EN-16931:2017 §BG-28 invoice-line-charges`"
  - "EN-16931:2017 §BG-29 price-details"
  - "EN-16931:2017 §BG-29 price-details`"
  - "EN-16931:2017 §BG-30 line-vat-information"
  - "EN-16931:2017 §BG-30 line-vat-information`"
  - "EN-16931:2017 §BT-151 invoiced-item-vat-category-code"
  - "EN-16931:2017 §BT-151 invoiced-item-vat-category-code`"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - "Peppol-BIS-3.0 billing line-detail"
  - "UN-CEFACT"
  - "UN-CEFACT-5305 tax-category-codes"
  - "UN-EDIFACT INVOIC §LIN line-segment"
  - "UN/CEFACT 5305 duty-tax-fee-category-coded"
  - "US-GAAP"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9f68fb91-80c4-8b73-87a7-c46c74d46cd3"
  stages:
    - stage: path
      stageUuid: "71bec5e8-d878-8778-a6c2-4fe8313a729b"
    - stage: trinity
      stageUuid: "d0489342-77c3-821a-9584-5582fa5b6d3f"
    - stage: boundary
      stageUuid: "cfe9d219-c8b1-88c3-b3c5-7a428d958f2e"
    - stage: links
      stageUuid: "778097c8-933d-84d7-9b7c-ee4dbe9c52de"
    - stage: horo
      stageUuid: "291a4fbb-7916-834e-9a0b-bc174878ffb9"
    - stage: seal
      stageUuid: "53302f78-1023-89b7-94ab-a0334a54f5ed"
    - stage: uuid
      stageUuid: "9d0bcaec-786e-81db-829c-50eb5aa91773"
version: 2
---
# invoice-lines

Invoice Lines — line items (BG-25) for an invoice header.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931:2017 §BG-25 invoice-line`
- `@standard EN-16931:2017 §BG-29 price-details`
- `@standard EN-16931:2017 §BG-30 line-vat-information`
- `@standard EN-16931:2017 §BG-27 invoice-line-allowances`
- `@standard EN-16931:2017 §BG-28 invoice-line-charges`
- `@standard EN-16931:2017 BT-126 invoice-line-identifier`
- `@standard EN-16931:2017 BT-131 invoice-line-net-amount`
- `@standard EN-16931:2017 BT-151 vat-category-code`
- `@standard ISO-4217:2015 currency-codes`
- `@standard EN-16931:2017 §BT-151 invoiced-item-vat-category-code`

- EN-16931:2017 §BG-25 invoice-line
- EN-16931:2017 §BG-29 price-details
- EN-16931:2017 §BG-30 line-vat-information
- EN-16931:2017 §BG-27 invoice-line-allowances
- EN-16931:2017 §BG-28 invoice-line-charges
- EN-16931:2017 BT-126 invoice-line-identifier
- EN-16931:2017 BT-131 invoice-line-net-amount
- EN-16931:2017 BT-151 vat-category-code
- Peppol-BIS-3.0 billing line-detail
- UN-EDIFACT INVOIC §LIN line-segment
- ISO-4217:2015 currency-codes
- UN-CEFACT-5305 tax-category-codes
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers

Composes: [[Invoices]] (the BG-25 header it lines) · [[Items]] (buyer/seller/source refs + inventory recompute) · [[gl/accounts]] (debit/credit + tax debit/credit posting) · [[horo]] (the draft·active·delivered·returned·cancelled status ring) · [[tax]] (BG-30 line VAT: BT-151 category, BT-152 rate, exemption reasons) · [[accounting]] (the double-entry the net/tax/total feed) · [[standard]] (the EN-16931 / Peppol-BIS / UN-EDIFACT form projected).

**Law — [[law]]: each EN-16931 BG-25 line carries its own net + VAT (BG-30) that feed the GL double-entry and recompute inventory; the line is content-addressed, summing into its header without drift.**
