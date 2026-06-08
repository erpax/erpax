---
name: t
description: "Use when implementing or referencing OECD SAF-T — Standard Audit File for Tax."
atomPath: saf/t
coordinate: saf/t · 1/base · 9a41197f
contentUuid: "5167563a-51ff-5929-8601-c14a1f796ed8"
diamondUuid: "40aca2c2-87b6-8a83-bcdd-046ac8d930ef"
uuid: "9a41197f-0134-8af5-a98e-84006f0d83a3"
horo: 1
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: saf
  bondDegree: 0
  neighbors: []
standards:
  - "OECD SAF-T 2.0 standard-audit-file-for-tax"
  - "SAF-T"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "331dc2ec-4255-86ac-9312-e87f00b87c69"
  stages:
    - stage: path
      stageUuid: "ba188100-552c-8994-b928-6f44f4117880"
    - stage: trinity
      stageUuid: "817588bc-3b36-89de-b19c-8e72298a746c"
    - stage: boundary
      stageUuid: "837089db-873d-8c8f-b559-d274fc064a4a"
    - stage: links
      stageUuid: "683f77c1-65eb-8060-b4f9-069de7d56c61"
    - stage: horo
      stageUuid: "27e9cf84-e002-89dc-bd90-ce21b351bd83"
    - stage: seal
      stageUuid: "e816edec-46e3-8dc2-8bdf-f4a177ed4ff4"
    - stage: uuid
      stageUuid: "08189f4b-ff66-89d5-9955-69e88a6db4af"
version: 2
---
# OECD SAF-T — Standard Audit File for Tax

**Edition:** OECD SAF-T 2.0 (May 2005, current OECD reference). Country variants (PT 1.04, NO 1.10, LU 2.0, RO D406) extend this baseline with national tax codes and required tables.
**Publisher:** <https://www.oecd.org/tax/forum-on-tax-administration/publications-and-products/saf-t/>

## What's here

Canonical types for the four top-level SAF-T sections every implementation produces:

- `Header` — audit file identification + reporting period + company id
- `MasterFiles` — chart of accounts, customers, suppliers, products, tax table
- `GeneralLedgerEntries` — journal-by-journal posting trail
- `SourceDocuments` — sales invoices, purchase invoices, payments, movements of goods

Plus the cross-cutting code lists / structures every section reuses:

- `SafTAddressStructure` — postal address with country (ISO 3166-1)
- `SafTPartyId` — name + tax id + address + bank account
- `SafTAmountStructure` — amount + currency + exchange rate (when functional ≠ tx currency)
- `SafTTaxInformation` — tax type / code / amount / base + exemption reason

Files:

- `types.ts` — canonical types for Header + four sections + cross-cutting structures.
- `validate.ts` — runtime guards (`isSafTSourceDocumentType`, `isSafTPaymentMechanism`).
- `index.ts` — barrel.

## Why a canonical types module

The OECD SAF-T schema is the lingua franca every tax authority is converging on for digital audit-file submissions (PT requires SAF-T-PT monthly; NO requires SAF-T-NO on demand; RO requires D406 monthly; LU requires SAF-T-LU annually with VAT return). A future export service in `src/services/saf-t-export.service.ts` will project the project's GL postings + master data onto these canonical types, then a serializer renders the XSD-validated XML. By owning the canonical types here, all consumers (export service, country-specific extensions, test fixtures) reference the same shape.

## Out of scope

- The XSD-validated XML wire serialisation — implement under `src/services/saf-t-export.service.ts` once the consumers are wired.
- Country-specific extensions (SAF-T PT / NO / LU / RO D406) — separate `saf-t-{country}/` modules if/when consumers arrive. Each extends the canonical types here with national tax codes + required tables (e.g. PT requires `MovementOfGoods.WorkingDocuments`).
- Cancellation / correction lifecycle (PT-only "AT WebService" interactive submission) — operations concern.

## Used by

- (Future) `src/services/saf-t-export.service.ts` — projects the project's GL + master data onto these canonical types.
- (Future) Country extensions in `src/standards/saf-t-pt/`, `src/standards/saf-t-no/`, etc.
- `src/services/journal-entry.service.ts` — the project's JournalEntry maps onto `SafTTransaction.Lines`.
- `src/plugins/accounting/collections/GLAccounts.ts` — the project's GL chart maps onto `SafTGeneralLedgerAccount`.
- `src/plugins/accounting/collections/Customers.ts` / `Vendors.ts` — `SafTCustomer` / `SafTSupplier`.
- `src/plugins/accounting/collections/InventoryMovements.ts` — `SafTMovementOfGoods`.

## References

- OECD SAF-T 2.0 (2005) — original schema and guidance.
- Portugal SAF-T-PT 1.04 — `Decreto-Lei n.º 198/2012`.
- Norway SAF-T 1.10 — Skatteetaten implementation guide.
- Romania D406 — ANAF monthly e-tax submission.
- Luxembourg SAF-T 2.0 — annual with VAT return.
- ISO 3166-1:2020 — country codes (consumed via `@/standards/iso-3166-1`).
- ISO 4217:2015 — currency codes (consumed via `@/standards/iso-4217`).
- ISO 8601-1:2019 — date-time (consumed via `@/standards/iso-8601`).

**Law — [[law]]: SAF-T owns ONE canonical set of types for the four top-level sections (Header · MasterFiles · GeneralLedgerEntries · SourceDocuments) plus the cross-cutting code-list structures — the single shape every consumer (export service, country profile, fixtures) projects the GL + master data onto, so country variants extend the baseline rather than fork it.**
