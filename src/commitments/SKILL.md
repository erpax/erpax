---
name: commitments
description: "Use when authorizing and tracking pre-contract spending commitments — SOX §302 authorization matrix, spending-authority validation, budget reservation (reserved/committed/spent/available), segregation-of-duties enforcement, PO or contract linkage, and Bulgaria ZKOD notarization. The commitment-ledger collection."
atomPath: commitments
coordinate: "commitments · 4/weave · b2f4017c"
contentUuid: "5365cdbe-0247-515b-b964-4094532eaa12"
diamondUuid: "95ae8976-fa7e-87b8-bbe7-b6d8c060cae5"
uuid: "b2f4017c-7a95-87ba-8c53-312850d42972"
horo: 4
typography:
  partition: commitments
  bondDegree: 0
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
  computationUuid: "01885adb-4db0-8dfa-8045-788d720dbd5c"
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
      stageUuid: "f856d2dd-ed3d-8783-8d0c-6505ea5ba113"
    - stage: seal
      stageUuid: "402aecac-2306-82ae-b9b3-e1acec77cd17"
    - stage: uuid
      stageUuid: "1c6c5831-f702-8b23-a19e-a545476377bf"
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
