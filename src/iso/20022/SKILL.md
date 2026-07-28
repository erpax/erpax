---
name: "20022"
description: Use when implementing or referencing ISO 20022 — Universal financial industry message scheme.
atomPath: "iso/20022"
coordinate: "iso/20022 · 8/crest · b872025e"
contentUuid: "cc4ffd7d-a1cc-5657-b4e3-306f3bd3dc9b"
diamondUuid: "e8710c83-a04c-8ef8-9f5d-e4a63cd54bca"
uuid: "b872025e-63ed-863e-8457-4669e1dbcc75"
horo: 8
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
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
  computationUuid: "6117bdce-d42e-85ed-a84f-592190acd867"
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
      stageUuid: "73dfd885-bb57-8d85-924b-dc7bcd7c5201"
    - stage: seal
      stageUuid: "46f60061-4f30-87ed-ba43-05afb05c188d"
    - stage: uuid
      stageUuid: "abb4d688-8915-89de-8ff2-d776d61f1699"
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

- `src/types/bank/reconciliation.ts` — `BankStatement` / `BankTransaction`
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

- `src/types/bank/reconciliation.ts` — the project's bank-rec wire types
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
