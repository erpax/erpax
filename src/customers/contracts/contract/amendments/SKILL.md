---
name: amendments
description: "Use when recording formal changes to an executed contract — IFRS-15 §20 classification (separate obligation vs. integrated modification), revenue impact amount, modification reason, approval chain, and immutable original/new terms snapshot. The contract-modification audit collection."
atomPath: "customers/contracts/contract/amendments"
coordinate: "customers/contracts/contract/amendments · 5/round · 3e25ff90"
contentUuid: "0fcdf062-1347-58d8-ab06-514db30d1c74"
diamondUuid: "6268bda3-2df6-81ed-b8ba-b56f8f192082"
uuid: "3e25ff90-8d33-8bf6-9a80-26b2a284d49e"
horo: 5
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
  - "IFRS IAS-1 presentation-of-financial-statements`"
  - "IFRS IAS-8 accounting-policies changes"
  - "IFRS IAS-8 accounting-policies changes`"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §10 contract-with-customer`"
  - "IFRS IFRS-15 §20 contract-modifications"
  - "IFRS IFRS-15 §20 contract-modifications`"
  - "IFRS-15"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time amendment-effective-date"
  - "ISO-8601-1:2019 date-time amendment-effective-date`"
  - "SOX §302 management-certification contract-approvals"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-13 contract-modifications"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "7168393d-3523-86cd-b5a9-232844eddc15"
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
      stageUuid: "017a1dd0-1e22-8ef8-89b3-d99c41189acf"
    - stage: seal
      stageUuid: "a797dff8-564e-8153-b87e-1971aeb838fe"
    - stage: uuid
      stageUuid: "d6129501-c623-88d6-bace-c57d455f554b"
version: 2
---
# contract-amendments

Contract Amendments — IAS-8 accounting for contract modifications.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-15 §20 contract-modifications`
- `@standard IFRS IFRS-15 §10 contract-with-customer`
- `@standard IFRS IAS-8 accounting-policies changes`
- `@standard IFRS IAS-1 presentation-of-financial-statements`
- `@standard ISO-8601-1:2019 date-time amendment-effective-date`
- `@standard ISO-4217:2015 currency-codes`

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
