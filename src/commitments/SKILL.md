---
name: commitments
description: "Use when authorizing and tracking pre-contract spending commitments — SOX §302 authorization matrix, spending-authority validation, budget reservation (reserved/committed/spent/available), segregation-of-duties enforcement, PO or contract linkage, and Bulgaria ZKOD notarization. The commitment-ledger collection."
atomPath: commitments
coordinate: "commitments · 5/round · a5cf722e"
contentUuid: "fdc0abc9-c832-537f-a02b-5f24c7e3bc60"
diamondUuid: "1b0b7866-67b8-8d01-bf7d-c3667a904412"
uuid: "a5cf722e-915b-80db-a697-d6e969c5dd69"
horo: 5
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
  computationUuid: "f462da05-a7ea-8ec2-a443-22ba15a2aba4"
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
      stageUuid: "e5623cce-8459-8ca7-80a0-93b6f549cd4f"
    - stage: seal
      stageUuid: "0b09f723-83d6-86a7-acac-4b1a62ff3677"
    - stage: uuid
      stageUuid: "44fc0f8b-fa19-84f1-9f39-a1d8cb4afeb4"
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
