---
name: commitments
description: "Use when authorizing and tracking pre-contract spending commitments — SOX §302 authorization matrix, spending-authority validation, budget reservation (reserved/committed/spent/available), segregation-of-duties enforcement, PO or contract linkage, and Bulgaria ZKOD notarization. The commitment-ledger collection."
atomPath: commitments
coordinate: commitments · 5/round · 3e7e0f94
contentUuid: "bde2164b-787f-5888-b028-4f2572d42cc3"
diamondUuid: "7309fce2-d8cb-8942-9a51-0853b50003cd"
uuid: "3e7e0f94-6ed4-875d-9a0f-8423de66613f"
horo: 5
bonds:
  in:
    - accounting
    - collections
    - commitment
    - identity
    - law
    - orders
    - proof
    - special
    - standard
    - transaction
  out:
    - accounting
    - collections
    - commitment
    - identity
    - law
    - orders
    - proof
    - special
    - standard
    - transaction
typography:
  partition: commitments
  bondDegree: 0
  neighbors: []
standards:
  - "COSO Internal-Control-Integrated-Framework 2013 authorization"
  - "GDPR Art.6(1)(b) lawful-basis-contract-processing"
  - "IAS-1"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS-15"
  - "ISO-19011:2018 audit-trail authorization-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time authorization-date"
  - SOX
  - "SOX §302 management-certification internal-controls"
  - "SOX §404 internal-controls spending-authority"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
    - identity
    - law
    - orders
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - collections
    - commitment
    - identity
    - law
    - orders
    - proof
    - special
    - standard
    - transaction
  backlinks:
    - accounting
    - collections
    - commitment
    - identity
    - law
    - orders
    - proof
    - special
    - standard
    - transaction
signatures:
  computationUuid: "ec881d95-10d2-8d05-9411-d4b3a7f1d284"
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
      stageUuid: "cc11d676-d945-8723-8b1d-c023ede32eaf"
    - stage: seal
      stageUuid: "402aecac-2306-82ae-b9b3-e1acec77cd17"
    - stage: uuid
      stageUuid: "57fac17b-f5c3-83f1-b235-e0bfb0966271"
version: 2
---
# commitments

Commitments — SOX §302 authorized commitment ledger for budget control.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
