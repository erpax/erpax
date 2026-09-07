---
name: edifact
description: "Use when implementing or referencing UN/EDIFACT — UN rules for Electronic Data Interchange For Administration, Commerce and Transport."
atomPath: "un/edifact"
coordinate: "un/edifact · 8/crest · a1c32897"
contentUuid: "9ef45e9a-3da0-5390-8303-1f5cd8d68d3c"
diamondUuid: "2ee12c50-4506-8852-a5eb-7f834e752cae"
uuid: "a1c32897-38ac-8b8e-a61c-9d90d2fdcbcc"
horo: 8
typography:
  partition: un
  bondDegree: 3
standards:
  - "ISO-9735"
  - "ISO-9735:2002 edifact-syntax-rules"
  - "ISO-9735:2002 edifact-syntax-rules`"
  - "UN-EDIFACT D.96A"
  - "UN-EDIFACT INVOIC d96a`."
  - "UN-EDIFACT INVOIC §LIN line-segment` — owning the canonical types here means the future EDI gateway service can project the project's data onto a typed structure before serialising the segment-based wire format."
  - "UN-EDIFACT INVOIC §LIN line-segment`."
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "df5125df-140e-8973-a630-768086dfae2f"
  stages:
    - stage: path
      stageUuid: "bad7961c-0a8e-8779-8ccb-34853ae787e1"
    - stage: trinity
      stageUuid: "e1122048-645d-8e53-b1b1-a36f6e2876cf"
    - stage: boundary
      stageUuid: "b1481376-3c6b-8f81-ac82-1c2c02cfdda5"
    - stage: links
      stageUuid: "ad32b6c8-d115-8968-8ddf-666869482ea0"
    - stage: horo
      stageUuid: "576c1a5b-7ef3-8479-b126-8eebe3cc9b3f"
    - stage: seal
      stageUuid: "d1f7c322-1b26-801b-9b76-52e5880b69b0"
    - stage: uuid
      stageUuid: "a0c9f910-5f31-8597-9d6e-9132e0d8b2fa"
version: 2
---
# UN/EDIFACT — UN rules for Electronic Data Interchange For Administration, Commerce and Transport

**Edition:** UN/EDIFACT D.96A (the version cited in this codebase). UN/CEFACT publishes a new directory roughly twice a year (D.YYA / D.YYB); the syntax + segment grammar are stable across directories.
**Syntax:** ISO 9735 — segment-based plain-text with composite delimiters.
**Publishers:**
- UN/CEFACT — <https://unece.org/trade/uncefact/introducing-unedifact>
- UN/EDIFACT directory tree — <https://service.unece.org/trade/untdid/>

## What's here

Canonical types for the three message families this codebase touches:

- **Envelope segments** — `UNB` (interchange header), `UNH` (message header), `UNT` (message trailer), `UNZ` (interchange trailer).
- **INVOIC d96a** — invoice / credit-note. The most-cited message in `Invoices` / `InvoiceLines` collection banners.
- **DESADV** — despatch advice (shipping notification).
- **PAYMUL** — multiple-payment instruction (banking / treasury bulk-payment leg).

Files:

- `types.ts` — segment + message types.
- `validate.ts` — runtime guards (`isEdifactMessageType`, `isEdifactSyntaxId`).
- `index.ts` — barrel.

## Why a canonical types module

Pre-Peppol/EN-16931, UN/EDIFACT INVOIC was the lingua franca for B2B invoice EDI in EU manufacturing + retail. Many trading-partner agreements still mandate INVOIC d96a alongside EN 16931. The `Invoices` and `InvoiceLines` collection banners cite `@standard UN-EDIFACT INVOIC §LIN line-segment` — owning the canonical types here means the future EDI gateway service can project the project's data onto a typed structure before serialising the segment-based wire format.

This module defines the SEMANTIC structure. The wire-format serialiser (segment delimiters `'`, composite separator `+`, element separator `:`, escape `?`) lives in a future `src/edifact/export/service/index.ts`.

## Segment-based syntax

UN/EDIFACT messages are plain-text, segment-based:

```
UNH+1+INVOIC:D:96A:UN'
BGM+380+2026-001+9'
DTM+137:20260509:102'
NAD+SE+++Acme Lda::PT500000000+...'
LIN+1++WIDGET-1:GTIN'
IMD+F++:::Widget Pro 2026'
QTY+47:10'
PRI+AAA:100.00'
MOA+125:1000.00'
UNS+S'
MOA+9:1200.00'
UNT+11+1'
```

Each segment ends with `'`; composites are `+`-separated; elements are `:`-separated.

## Out of scope

- The wire-format serialiser (segment / composite / element / escape rules) — implement under `src/edifact/export/service/index.ts`.
- Other UN/EDIFACT message types (ORDERS, ORDRSP, RECADV, REMADV, INSDES, SLSRPT, etc.) — extend this module when consumers arrive.
- D.99B / D.16A / newer directories — add as separate modules if the segment grammar diverges.
- AS2 / VAN transport — operations / network concern.

## Used by

- `src/collections/Invoices/index.ts` — banner cites `@standard UN-EDIFACT INVOIC d96a`.
- `src/collections/InvoiceLines/index.ts` — banner cites `@standard UN-EDIFACT INVOIC §LIN line-segment`.
- (Future) `src/edifact/export/service/index.ts` — projects the project's invoices + shipments + payments into typed EDIFACT messages, then serialises.

## References

- UN/EDIFACT D.96A INVOIC — <https://service.unece.org/trade/untdid/d96a/trmd/invoic_c.htm>.
- ISO 9735:2002 — UN/EDIFACT syntax rules.
- UN/CEFACT TR 1001 — document name codes (consumed via `@/standards/en-16931`).
- UN/CEFACT TR 5305 — duty/tax/fee category codes (consumed via `@/standards/en-16931`).
- UN/CEFACT TR 4461 — payment means codes (consumed via `@/standards/en-16931`).

**Law — [[law]]: this module defines only the semantic segment structure — every message is bracketed by a matching UNH/UNT envelope, and the wire-format serialiser stays out of scope.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-9735:2002 edifact-syntax-rules`
