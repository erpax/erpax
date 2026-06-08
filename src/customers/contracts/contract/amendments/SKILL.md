---
name: amendments
description: "Use when recording formal changes to an executed contract — IFRS-15 §20 classification (separate obligation vs. integrated modification), revenue impact amount, modification reason, approval chain, and immutable original/new terms snapshot. The contract-modification audit collection."
atomPath: customers/contracts/contract/amendments
coordinate: customers/contracts/contract/amendments · 7/descent · d39dc842
contentUuid: "784a5b9a-f5a8-515e-b2a4-255594620b4a"
diamondUuid: "b9e89fbf-5be6-850c-80bd-da2752b416ea"
uuid: "d39dc842-a8ea-868f-ba06-a64f7dc7e0a0"
horo: 7
bonds:
  in:
    - access
    - accounting
    - amendment
    - contract
    - contracts
    - identity
    - law
    - proof
    - standard
    - transaction
  out:
    - access
    - accounting
    - amendment
    - contracts
    - identity
    - law
    - proof
    - standard
    - transaction
typography:
  partition: customers
  bondDegree: 28
  neighbors: []
standards:
  - "ASC-606"
  - "GDPR Art.6(1)(b) lawful-basis-contract-modification"
  - "IAS-1"
  - "IAS-8"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies changes"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §20 contract-modifications"
  - "IFRS-15"
  - "ISO-19011:2018 audit-trail amendment-lifecycle"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time amendment-effective-date"
  - "SOX §302 management-certification contract-approvals"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-13 contract-modifications"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - contracts
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - access
    - accounting
    - amendment
    - contracts
    - identity
    - law
    - proof
    - standard
    - transaction
  backlinks:
    - access
    - accounting
    - amendment
    - contracts
    - identity
    - law
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "a18a0ab4-fed0-85f6-81c6-f219159fcb2f"
  stages:
    - stage: path
      stageUuid: "95564245-ed1e-8974-be19-55ed0a9fdbff"
    - stage: trinity
      stageUuid: "a8176ac5-74f6-8036-a9c2-3d9eceeec012"
    - stage: boundary
      stageUuid: "4b271b9d-ae1d-89a8-bf5c-703592690b72"
    - stage: links
      stageUuid: "ddb1a57d-0e25-84de-8c62-e3f93976305c"
    - stage: horo
      stageUuid: "9ac75bf6-a893-8797-a61a-4a5fbd228e6a"
    - stage: seal
      stageUuid: "a797dff8-564e-8153-b87e-1971aeb838fe"
    - stage: uuid
      stageUuid: "b04c07f5-c014-8135-9d57-da13010ae2ed"
version: 2
---
# contract-amendments

Contract Amendments — IAS-8 accounting for contract modifications.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IFRS-15 §20 contract-modifications
- IFRS IFRS-15 §10 contract-with-customer
- IFRS IAS-8 accounting-policies changes
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-606-10-25-13 contract-modifications
- ISO-8601-1:2019 date-time amendment-effective-date
- ISO-4217:2015 currency-codes
- SOX §302 management-certification contract-approvals
- GDPR Art.6(1)(b) lawful-basis-contract-modification
- ISO-19011:2018 audit-trail amendment-lifecycle

Composes: [[Contracts]] · [[accounting]] · [[transaction]] · [[proof]] · [[standard]] · [[access]] · [[identity]].

**Law — [[law]]: an amendment is classified as a separate or integrated modification before any revenue impact, and its original-versus-new terms snapshot is immutable once recorded.**
