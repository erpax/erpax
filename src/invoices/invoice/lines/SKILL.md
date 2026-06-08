---
name: lines
description: "Use when adding, pricing or auditing individual line items on an invoice — EN-16931 BG-25 quantity/net-amount, BG-29 price details, BG-30 VAT category/rate, allowances, inventory recompute and GL posting. The invoice-lines collection."
atomPath: invoices/invoice/lines
coordinate: invoices/invoice/lines · 4/weave · 1280ed6a
contentUuid: "6fb5bb5d-a562-5ec6-b1e1-131d31b7dd35"
diamondUuid: "a8c8d662-978e-8506-90f0-e967d99b3023"
uuid: "1280ed6a-ddef-833f-bb16-f3e770a3679c"
horo: 4
bonds:
  in:
    - accounting
    - accounts
    - horo
    - invoice
    - invoices
    - items
    - law
    - standard
    - tax
  out:
    - accounting
    - accounts
    - horo
    - invoices
    - items
    - law
    - standard
    - tax
typography:
  partition: invoices
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 BT-126 invoice-line-identifier"
  - "EN-16931:2017 BT-131 invoice-line-net-amount"
  - "EN-16931:2017 BT-151 vat-category-code"
  - "EN-16931:2017 §BG-25 invoice-line"
  - "EN-16931:2017 §BG-27 invoice-line-allowances"
  - "EN-16931:2017 §BG-28 invoice-line-charges"
  - "EN-16931:2017 §BG-29 price-details"
  - "EN-16931:2017 §BG-30 line-vat-information"
  - "EN-16931:2017 §BT-151 invoiced-item-vat-category-code"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - "Peppol-BIS-3.0 billing line-detail"
  - "UN-CEFACT"
  - "UN-CEFACT-5305 tax-category-codes"
  - "UN-EDIFACT INVOIC §LIN line-segment"
  - "UN/CEFACT 5305 duty-tax-fee-category-coded"
  - "US-GAAP"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
neighbors:
  wikilink:
    - accounting
    - accounts
    - horo
    - invoices
    - items
    - law
    - standard
    - tax
  matrix:
    - accounting
    - accounts
    - horo
    - invoices
    - items
    - law
    - standard
    - tax
  backlinks:
    - accounting
    - accounts
    - horo
    - invoices
    - items
    - law
    - standard
    - tax
signatures:
  computationUuid: "12536ff0-3c7f-830b-9c37-2c6a53da7463"
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
      stageUuid: "e7b6f960-505e-828c-91be-157a197fd324"
    - stage: seal
      stageUuid: "53302f78-1023-89b7-94ab-a0334a54f5ed"
    - stage: uuid
      stageUuid: "824d1269-c6ec-89a2-88c5-4aa827397492"
version: 2
---
# invoice-lines

Invoice Lines — line items (BG-25) for an invoice header.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
