---
name: commitments
description: "Use when authorizing and tracking pre-contract spending commitments — SOX §302 authorization matrix, spending-authority validation, budget reservation (reserved/committed/spent/available), segregation-of-duties enforcement, PO or contract linkage, and Bulgaria ZKOD notarization. The commitment-ledger collection."
atomPath: commitments
coordinate: "commitments · 2/share · dbf89009"
contentUuid: "5a84c55d-4ce5-50e4-b6c2-ef62c2d9b43c"
diamondUuid: "84a966b3-bc31-8a13-adf4-7eafc3513779"
uuid: "dbf89009-c1d7-86e9-afec-9da34a8b21b3"
horo: 2
typography:
  partition: commitments
  bondDegree: 31
standards:
  - "COSO Internal-Control-Integrated-Framework 2013 authorization"
  - "GDPR Art.6(1)(b) lawful-basis-contract-processing"
  - "IAS-1"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-1 presentation-of-financial-statements`"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §10 contract-with-customer`"
  - "IFRS-15"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time authorization-date"
  - "ISO-8601-1:2019 date-time authorization-date`"
  - SOX
  - "SOX §302 management-certification internal-controls"
  - "SOX §302 management-certification internal-controls`"
  - "SOX §404 internal-controls spending-authority"
  - "SOX §404 internal-controls spending-authority`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ba19698b-676c-82aa-9282-8b0d6e433ad8"
  stages:
    - stage: path
      stageUuid: "6b454458-5665-8fda-a6ae-b53b3ef171db"
    - stage: trinity
      stageUuid: "2548760c-06aa-893b-be8e-a038a6d186f6"
    - stage: boundary
      stageUuid: "d0fcccaa-6074-8a5d-a4a6-b9da45bfd38c"
    - stage: links
      stageUuid: "2c6db537-bfc3-814b-8a5a-88a457198bdc"
    - stage: horo
      stageUuid: "ec100cae-9059-8d8a-aade-34ceee8e3da1"
    - stage: seal
      stageUuid: "0b09f723-83d6-86a7-acac-4b1a62ff3677"
    - stage: uuid
      stageUuid: "2a6fb1b1-1a49-8610-8bb6-fa8959cc6ae3"
version: 2
---
# commitments

Commitments — SOX §302 authorized commitment ledger for budget control.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard SOX §302 management-certification internal-controls`
- `@standard SOX §404 internal-controls spending-authority`
- `@standard IFRS IFRS-15 §10 contract-with-customer`
- `@standard IFRS IAS-1 presentation-of-financial-statements`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time authorization-date`

- SOX §302 management-certification internal-controls
- SOX §404 internal-controls spending-authority
- COSO Internal-Control-Integrated-Framework 2013 authorization
- IFRS IFRS-15 §10 contract-with-customer
- IFRS IAS-1 presentation-of-financial-statements
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time authorization-date
- GDPR Art.6(1)(b) lawful-basis-contract-processing
- ISO-19011:2018 audit-trail authorization-evidence

Composes: [[items/purchase/orders]] · [[collections]] · [[accounting]] · [[transaction]] · [[standard]] · [[proof]] · [[identity]].

**Law — [[law]]: no pre-contract spend is committed without SOX §302 spending-authority validation and a conserved budget reservation (reserved + committed + spent + available is invariant); segregation of duties enforced.**
