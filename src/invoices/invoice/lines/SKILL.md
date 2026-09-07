---
name: lines
description: "Use when adding, pricing or auditing individual line items on an invoice — EN-16931 BG-25 quantity/net-amount, BG-29 price details, BG-30 VAT category/rate, allowances, inventory recompute and GL posting. The invoice-lines collection."
atomPath: "invoices/invoice/lines"
coordinate: "invoices/invoice/lines · 8/crest · 1f0e232b"
contentUuid: "75756c58-ad34-5cef-8c31-fc5bbdeea439"
diamondUuid: "56e6e2a2-573b-8df6-89ad-93be3a1a63f5"
uuid: "1f0e232b-b4d2-8637-b503-5a25bb844467"
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
  computationUuid: "8750e4c0-460d-8d18-b655-636dd7253ff4"
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
      stageUuid: "db79400f-d2e7-88fc-8b75-b2e2b9bd120c"
    - stage: seal
      stageUuid: "53302f78-1023-89b7-94ab-a0334a54f5ed"
    - stage: uuid
      stageUuid: "72c71f11-5b6d-89ab-a740-d001789f23ea"
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
