---
name: "20022"
description: Use when implementing or referencing ISO 20022 — Universal financial industry message scheme.
atomPath: iso/20022
coordinate: iso/20022 · 7/descent · 9e018710
contentUuid: "a444c99d-c483-54fd-a802-2a39ec57ec5c"
diamondUuid: "1816fef4-e56b-8f36-b708-f1f5a51d803a"
uuid: "9e018710-3c8f-8d5f-81c9-4f54da89aafd"
horo: 7
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-13616-1"
  - "ISO-17442-1"
  - "ISO-20022:2022 universal-financial-industry-message-scheme"
  - "ISO-20022` should grep to a single home that owns the types. Before this module, four places defined overlapping shapes:"
  - "ISO-9362"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "aba9a0c3-a64b-8b8a-a467-00b79601c112"
  stages:
    - stage: path
      stageUuid: "27e61418-1c77-8dd0-847c-cca5bd6854d4"
    - stage: trinity
      stageUuid: "d510c73d-4869-83fd-b573-421e04735092"
    - stage: boundary
      stageUuid: "fdfd72e3-07e2-8cf9-b9f5-772f1e407bce"
    - stage: links
      stageUuid: "00f02ed2-3107-8d7f-ad55-93f364f7dcea"
    - stage: horo
      stageUuid: "704c5d42-264c-83fc-bf36-0b1880293748"
    - stage: seal
      stageUuid: "46f60061-4f30-87ed-ba43-05afb05c188d"
    - stage: uuid
      stageUuid: "dbcecdd9-bbaf-8e99-a344-9b19e130718a"
version: 2
---
# ISO 20022 — Universal financial industry message scheme

**Edition:** ISO 20022:2022 (with annual revisions to message-set catalogues).
**Publisher:** <https://www.iso.org/standard/82071.html>
**Message catalogue:** <https://www.iso20022.org/iso-20022-message-definitions>
**Implementation guidelines (SEPA):** <https://www.europeanpaymentscouncil.eu>

## What's here

Semantic types for the four ISO 20022 message families this codebase touches:

- `camt.053` — Bank-to-customer account statement (incoming).
- `pain.001` — Customer credit-transfer initiation (outgoing).
- `pain.008` — Customer direct-debit initiation (outgoing).
- `pacs.004` — Payment return (incoming, used by Refunds).

Plus the cross-cutting code lists / structures every message reuses:

- `BankTransactionCode` — domain / family / subfamily triplet from the
  Bank Transaction Code Set (replaces the legacy bank proprietary codes).
- `RemittanceInformation` — structured (Creditor Reference, RF) +
  unstructured pairing.
- `PartyIdentification` — name + postal address + party id (BIC / LEI /
  organisation id).
- `BookingStatus` — `'BOOK' | 'PDNG' | 'INFO' | 'FUTR'` from camt.053
  ReportEntry.

Files:

- `types.ts` — canonical types (the module's whole reason for existing).
- `validate.ts` — runtime guards for the code lists.
- `index.ts` — barrel for the public surface.

## Why a canonical types module

Per the project's standards convention (`docs/STANDARDS.md` §3), every governing standard cited via `@standard ISO-20022` should grep to a single home that owns the types. Before this module, four places defined overlapping shapes:

- `src/types/bank-reconciliation.ts` — `BankStatement` / `BankTransaction`
- `src/types/events.ts` — `BankStatementImportedEvent.payload.transactions`
- `src/services/bank-statement-import.service.ts` — CSV / OFX intermediate
- `src/plugins/accounting/collections/BankStatements.ts` — Payload field config

Now they all reference the canonical `Camt053Statement` / `Camt053Transaction` types. Drift becomes a compile-time error.

## Out of scope

- Full XSD-validated wire serialisation — implement under
  `peppol-bis-3/`-style code generators if needed.
- Business model groups beyond the four families above (e.g.
  `pacs.008` interbank credit transfer, `acmt.*` account management) —
  add when first consumer arrives.
- The SEPA implementation guidelines (PSD2, EPC rulebooks) layered
  on top — those are operations / payment-rail concerns, not the
  data model.

## Used by

- `src/types/bank-reconciliation.ts` — the project's bank-rec wire types
  re-export / extend the canonical `Camt053Statement`.
- `src/types/events.ts` — `BankStatementImportedEvent` payload references
  canonical types.
- `src/services/bank-reconciliation.service.ts` — uses the
  `BankTransactionCode` triplet to classify auto vs manual reconciliation.
- `src/services/bank-statement-import.service.ts` — CSV / OFX adapters
  produce `Camt053Statement`-shaped output.
- `src/plugins/accounting/collections/BankTransactions.ts` — line-level
  fields mirror the camt.053 ReportEntry / EntryDetails / TransactionDetails
  hierarchy.

## References

- ISO 20022 Part 1: 2022 — Overall methodology.
- ISO 20022 Message Definition Reports (latest cyclical update on iso20022.org).
- EPC114-06 — SEPA Credit Transfer scheme rulebook (pain.001 mapping).
- EPC130-08 — SEPA Direct Debit scheme rulebook (pain.008 mapping).
- ISO 13616-1:2020 — IBAN structure (consumed via `@/standards/iso-13616`).
- ISO 9362:2022 — BIC structure (consumed via `@/standards/iso-9362`).
