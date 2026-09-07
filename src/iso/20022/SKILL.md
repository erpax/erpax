---
name: "20022"
description: Use when implementing or referencing ISO 20022 — Universal financial industry message scheme.
atomPath: "iso/20022"
coordinate: "iso/20022 · 7/descent · 82a5a8ba"
contentUuid: "55e6a73a-3a10-5258-897f-313fc59a5196"
diamondUuid: "f8caf240-f413-84a9-abf1-c0de1af148c9"
uuid: "82a5a8ba-9427-89e0-aae4-5ea79ea350d5"
horo: 7
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-20022:2022 universal-financial-industry-message-scheme"
  - "ISO-20022` should grep to a single home that owns the types. Before this module, four places defined overlapping shapes:"
  - "ISO-9362"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "edb95c71-1012-8db1-80cf-d399d0e3ebce"
  stages:
    - stage: path
      stageUuid: "27e61418-1c77-8dd0-847c-cca5bd6854d4"
    - stage: trinity
      stageUuid: "d510c73d-4869-83fd-b573-421e04735092"
    - stage: boundary
      stageUuid: "743b44be-7fba-8033-b79d-a84c839c3edb"
    - stage: links
      stageUuid: "6e65f0d4-5576-8875-9eaf-08465a2b88b7"
    - stage: horo
      stageUuid: "e2428653-003c-856e-a352-fae90e6b6e91"
    - stage: seal
      stageUuid: "24d51d5c-81ec-8104-9d23-6c04c77799e9"
    - stage: uuid
      stageUuid: "abd328bb-53df-8b6a-bcd8-9ebec96dd2a0"
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

- `src/types/bank/reconciliation/index.ts` — `BankStatement` / `BankTransaction`
- `src/types/events/index.ts` — `BankStatementImportedEvent.payload.transactions`
- `src/bank/statement/import/service/index.ts` — CSV / OFX intermediate
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

- `src/types/bank/reconciliation/index.ts` — the project's bank-rec wire types
  re-export / extend the canonical `Camt053Statement`.
- `src/types/events/index.ts` — `BankStatementImportedEvent` payload references
  canonical types.
- `src/bank/reconciliation/service/index.ts` — uses the
  `BankTransactionCode` triplet to classify auto vs manual reconciliation.
- `src/bank/statement/import/service/index.ts` — CSV / OFX adapters
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

Composes: [[standards]] · [[money]].
