---
name: "16931"
description: Use when implementing or referencing EN 16931 — Electronic invoicing (semantic data model).
atomPath: "en/16931"
coordinate: "en/16931 · 5/round · 782dd7cb"
contentUuid: "a49c6cb3-a551-55a4-bdaf-45db77c736fa"
diamondUuid: "a504efe7-2e4c-80bb-8cff-92fc95341a60"
uuid: "782dd7cb-2644-8c85-85c2-41af9ab7124d"
horo: 5
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: en
  bondDegree: 3
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017+A1:2019 semantic-model-electronic-invoice"
  - "EN-16931:2017` should grep to a single home that owns the types. Before this module, three places defined overlapping shapes:"
  - "EN-16931` citation greps to, so the invoice shape is defined once and referenced, never re-defined."
  - "EU-2017/1132"
  - "EU-2017/828"
  - "ILO-C100"
  - "UN-CEFACT"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "6772d029-a99b-85fa-b15d-77393fc1ad5f"
  stages:
    - stage: path
      stageUuid: "8db2dcf7-0c25-8170-89c7-57ffa1d5d653"
    - stage: trinity
      stageUuid: "e1105ec0-8448-8232-bfb7-284207df10d6"
    - stage: boundary
      stageUuid: "60af4470-eae3-87cb-aca4-73b4e25fc0f9"
    - stage: links
      stageUuid: "4b148aeb-8d93-8611-a060-2829b39b1f78"
    - stage: horo
      stageUuid: "8050ea43-894c-8759-9607-280c748b0b1b"
    - stage: seal
      stageUuid: "294263d9-f017-84b6-b99d-14e20dccc2fc"
    - stage: uuid
      stageUuid: "602f66c3-96d1-8411-8959-a373af2b9d90"
version: 2
---
# EN 16931 — Electronic invoicing (semantic data model)

**Edition:** EN 16931-1:2017+A1:2019.
**Publisher:** <https://standards.cencenelec.eu/dyn/www/f?p=205:110:0::::FSP_PROJECT,FSP_ORG_ID:60602,1228515&cs=1B61B766636F9FB34B7DBD72CE9026C72>
**Background:** EU Directive 2014/55/EU mandates EN 16931 for B2G e-invoices across the EU. Peppol BIS Billing 3.0 implements EN 16931 as a UBL profile.

## What's here

- `types.ts` — canonical EN 16931 semantic types:
  - `InvoiceLine` (BG-25) with BT-126/BT-127 line identifier + BT-129/BT-130 quantity / unit, BT-131 line net amount, plus nested BG-29 price details + BG-30 line VAT info
  - `VatBreakdown` (BG-23) — one row per VAT category × rate
  - `DocumentLevelAllowance` (BG-20) and `DocumentLevelCharge` (BG-21)
  - `DocumentTotals` (BG-22) — BT-106..BT-115 totals chain
  - `InvoiceTypeCode` (BT-3, UN/CEFACT 1001 subset)
  - `VatCategoryCode` (BT-151, UN/CEFACT 5305 subset relevant in the EU)
  - `PaymentMeansCode` (BT-81, UN/CEFACT 4461 subset)
- `validate.ts` — runtime guards (`isVatCategoryCode(s)`, `isInvoiceTypeCode(s)`, `isPaymentMeansCode(s)`).
- `index.ts` — barrel for the public surface.

## Why a canonical types module

Per the project's standards convention (`docs/STANDARDS.md` §3), every governing standard cited via `@standard EN-16931:2017` should grep to a single home that owns the types. Before this module, three places defined overlapping shapes:

- `src/types/events.ts` — `InvoiceLineItem`, `BillLineItem` (project events)
- `src/collections/InvoiceLines/index.ts` — Payload field configs for the same data
- `src/plugins/parties/types.ts` — `PartyDocument` (workflow base)

Now the canonical fields live here; project events / collections / DTOs reference these as the source of truth.

## Out of scope

- The full UBL or CII XML serialisations — implement under `peppol-bis-3/` (UBL profile) or `cii-d16b/` if needed.
- Country-specific extensions (e.g., XRechnung Leitweg-ID, FatturaPA, FacturaE) — those go in their own `<id>/` folders.
- The mandate / activation lifecycle (when EN 16931 becomes mandatory for a given B2G transaction) — that's an operations concern.

## Used by

- `src/types/events.ts` — `InvoiceActivatedEvent.payload.lineItems` and `BillActivatedEvent.payload.lineItems` reference these types.
- `src/collections/InvoiceLines/index.ts` — admin field set mirrors the BG-25 + BG-29 + BG-30 structure.
- `src/plugins/accounting/services/reports.ts` — VAT breakdown rendering for IFRS IAS-1 presentation.

## References

- EN 16931-1:2017+A1:2019 — Semantic data model of the core elements of an electronic invoice.
- EN 16931-2:2017 — List of syntaxes that comply with EN 16931-1.
- Directive 2014/55/EU — eInvoicing in public procurement.
- UN/CEFACT TR 5305 — Tax category codes.
- UN/CEFACT TR 1001 — Document name codes.
- UN/CEFACT TR 4461 — Payment means code.

**Law — [[law]]: EN 16931 is the EU's semantic data model of the core e-invoice (BG/BT codes) — the single canonical types home that every `@standard EN-16931` citation greps to, so the invoice shape is defined once and referenced, never re-defined.**
