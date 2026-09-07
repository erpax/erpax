---
name: lines
description: "Use when adding, pricing or auditing individual line items on an invoice — EN-16931 BG-25 quantity/net-amount, BG-29 price details, BG-30 VAT category/rate, allowances, inventory recompute and GL posting. The invoice-lines collection."
atomPath: "invoices/invoice/lines"
coordinate: "invoices/invoice/lines · 5/round · 09870fe5"
contentUuid: "bce249cd-9e27-5a97-b117-bd1ebf521d09"
diamondUuid: "a1f2a3d7-bdb3-8201-8f8b-8c636b246915"
uuid: "09870fe5-5571-80ec-83f1-a86e4147af98"
horo: 5
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
  computationUuid: "af2d9451-cc1f-8c18-aa7d-d71b1e9aa16a"
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
      stageUuid: "6af969c1-8cc1-8c42-b76d-f033b99f4d47"
    - stage: seal
      stageUuid: "53302f78-1023-89b7-94ab-a0334a54f5ed"
    - stage: uuid
      stageUuid: "a0680edb-693a-8153-bdfc-cb757c29ef54"
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
