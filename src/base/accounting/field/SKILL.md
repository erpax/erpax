---
name: field
description: "Use when a Payload collection needs a shared accounting field — currency, unit-of-measure, measured quantity, status, reference, GL account, country/legal-entity/NACE, audit/timestamp/notes — built from one factory instead of an inlined field literal."
atomPath: "base/accounting/field"
coordinate: "base/accounting/field · 5/round · be000177"
contentUuid: "5d0140c2-6df5-59fb-8208-42e606f11525"
diamondUuid: "ba306d86-b506-8b05-a7dd-b00ed4fbee45"
uuid: "be000177-b299-81d4-a7b8-19fa0e3b97c9"
horo: 5
typography:
  partition: base
  bondDegree: 322
standards:
  - "EN-16931"
  - "EN-16931 §BT-130 invoiced-quantity-unit-of-measure"
  - "EU Regulation (EC) No 1893/2006 NACE Rev.2"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO 3166-1:2020 country-codes"
  - "ISO-19011"
  - "ISO-19011:2018 audit-trail"
  - "ISO-3166-1"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes · UN/CEFACT Rec 20 unit-of-measure-codes"
  - "ISO-8601-1:2019 date-time"
  - "ISO/IEC 25010:2023 quality-model maintainability-modularity"
  - NACE
  - "UN-CEFACT"
  - "UN/CEFACT Recommendation 20 unit-of-measure-codes"
bindings: []
signatures:
  computationUuid: "7876ce50-615e-8e11-acec-022e99130ed0"
  stages:
    - stage: path
      stageUuid: "bf3497ec-f4dc-8553-9f95-9f739375a8d0"
    - stage: trinity
      stageUuid: "4570ccd0-da75-850b-86f8-d277626580fe"
    - stage: boundary
      stageUuid: "f6c2886f-0223-8c94-befd-6c26c9690ed9"
    - stage: links
      stageUuid: "528fdff6-3ee3-8773-8ad8-459ab0bdaf24"
    - stage: horo
      stageUuid: "4f87f56c-d839-8ff6-a721-09981fca2b12"
    - stage: seal
      stageUuid: "183e7989-4b93-8210-a5d0-f0dfb6eabcbe"
    - stage: uuid
      stageUuid: "7b3cbe2e-7b98-8411-aac2-fffa19abb2db"
version: 2
---
# base/accounting/field — the shared accounting field factories

The single home for the field shapes that recur across every accounting collection. Each export is a factory returning a Payload `Field` (or `Field[]`): `currencyField` (ISO 4217 text, any valid code, `allowBlank` admits the `XXX` identity), `unitOfMeasureField` (UN/CEFACT Rec 20, blank ⇒ `C62`), `measureFields` (quantity + unit pair), `statusField`, `referenceField` (tenant-unique text), `glAccountField`, `legalEntityField`, `countryCodeField`, `naceCodeField`, `taxonomySelect`, plus `auditFields` / `timestampFields` / `notesField`. Collections compose these instead of inlining `options: [...]` or `type: 'text'` literals, so the shape is decided once.

Matter-twin: `src/base/accounting/field/index.ts` (`currencyField` · `unitOfMeasureField` · `measureFields` · `statusField` · `referenceField` · `taxonomySelect` · `glAccountField` · `legalEntityField` · `countryCodeField` · `naceCodeField` · `auditFields` · `timestampFields` · `notesField`). Composes [[currency]] · [[measure]] · [[accounting]] · [[base]].

**Law — [[law]]: every recurring accounting field is built by one factory — currency is amount+code (never a code-baked name), measure is value+unit (blank ⇒ C62) — so the field shape lives in exactly one place ([[dry]]).**

@standard ISO-4217:2015 currency-codes · UN/CEFACT Rec 20 unit-of-measure-codes
@accounting IFRS IAS-1 presentation-of-financial-statements
