---
name: "3"
description: "Use when implementing or referencing Peppol BIS Billing 3.0."
---

# Peppol BIS Billing 3.0

**Edition:** Peppol BIS Billing 3.0 (effective 2019, current revision May 2024).
**Underlying syntax:** UBL 2.1 (`urn:oasis:names:specification:ubl:schema:xsd:Invoice-2`).
**Semantic model:** EN 16931:2017+A1:2019 (consumed via `@/standards/en-16931`).
**Publisher:** OpenPeppol AISBL — <https://docs.peppol.eu/poacc/billing/3.0/>

## What's here

Canonical types for the Peppol-specific envelope that wraps an EN 16931 invoice/credit-note when transmitted over the Peppol network:

- `PeppolCustomizationId` — the BIS profile id (`urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0`).
- `PeppolProfileId` — the process identifier (`urn:fdc:peppol.eu:2017:poacc:billing:01:1.0` for invoice-response).
- `PeppolDocumentTypeId` — `urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017...` (Invoice / CreditNote).
- `PeppolParticipantIdentifier` — sender / receiver participant id with ISO 6523 scheme (`0088` GLN, `9925` BE VAT, `9930` DE VAT, etc.).
- `PeppolEndpointId` — the endpoint id buyer / seller publishes via SMP (Service Metadata Publisher).
- `PeppolBillingMessage<T>` — composes the EN-16931 invoice / credit-note with the Peppol envelope.

Files:

- `types.ts` — envelope + identifier types.
- `validate.ts` — runtime guards (`isPeppolParticipantIdentifierScheme`, `isPeppolDocumentTypeId`).
- `index.ts` — barrel.

## Why a canonical types module

The codebase cites `@standard Peppol-BIS-3.0 billing line-detail` on InvoiceLines and Invoices. That citation grounds the wire format the EU's e-invoicing network expects. The EN-16931 module (already shipped) covers the semantic model; this module covers the Peppol-specific envelope (CustomizationID + ProfileID + ParticipantIdentifier + EndpointID) so the e-invoice export service can construct a complete Peppol-compliant message without composing types from two modules in user code.

## ISO 6523 participant identifier schemes (cited subset)

Each participant on the Peppol network has an id of the form `<scheme>:<value>` (e.g. `9930:DE123456789`). Common schemes:

| Scheme | Code | Country |
|---|---|---|
| GS1 GLN | 0088 | Global |
| FR SIRENE | 0009 | FR |
| SE Org Number | 0007 | SE |
| DK CVR | 0184 | DK |
| NO Org Number | 0192 | NO |
| AT VAT | 9914 | AT |
| BE VAT | 9925 | BE |
| DE VAT | 9930 | DE |
| FI Y-tunnus | 9933 | FI |
| FR VAT | 9957 | FR |
| IT VAT | 9906 | IT |
| LU VAT | 9938 | LU |
| NL VAT | 9944 | NL |
| PT VAT | 9946 | PT |
| ES VAT | 9920 | ES |
| BG VAT | 9956 | BG |

Full list: <https://docs.peppol.eu/edelivery/policies/PolicyForUseOfIdentifiers/>.

## Out of scope

- The full UBL 2.1 XSD wire serialisation — implement under `src/services/peppol-export.service.ts` (mirrors `saf-t-export.service.ts`) when consumers arrive.
- AS4 / Peppol eDelivery (the transport layer) — operations / network concern.
- PINT — the next-generation Peppol International Invoice (a successor to BIS 3.0). Add under `src/standards/peppol-pint/` when adopted.
- BIS Procurement / Order documents — separate modules if/when consumers arrive.

## Used by

- `src/collections/Invoices/index.ts` — banner cites `@standard Peppol-BIS-3.0`.
- `src/collections/InvoiceLines/index.ts` — banner cites `@standard Peppol-BIS-3.0 billing line-detail`.
- (Future) `src/services/peppol-export.service.ts` — projects an EN-16931 invoice + a Peppol envelope into UBL 2.1 XML.

## References

- Peppol BIS Billing 3.0 docs — <https://docs.peppol.eu/poacc/billing/3.0/>.
- EN 16931-1:2017+A1:2019 — semantic model (consumed via `@/standards/en-16931`).
- UBL 2.1 OASIS Standard — invoice/credit-note XSD.
- ISO 6523-1:1998 — Information technology — Structure for the identification of organizations and organization parts.
- OpenPeppol Service Metadata Publisher (SMP) — endpoint discovery.
