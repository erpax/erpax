---
name: amendments
description: "Use when recording formal changes to an executed contract — IFRS-15 §20 classification (separate obligation vs. integrated modification), revenue impact amount, modification reason, approval chain, and immutable original/new terms snapshot. The contract-modification audit collection."
atomPath: "customers/contracts/contract/amendments"
coordinate: "customers/contracts/contract/amendments · 8/crest · 22eb623d"
contentUuid: "8a00377e-ea5b-549e-8d29-8ddd0fa250f4"
diamondUuid: "3412f3df-ba41-8a99-bfbc-a0448f79d650"
uuid: "22eb623d-958d-884f-880a-04695f699aed"
horo: 8
typography:
  partition: customers
  bondDegree: 28
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
signatures:
  computationUuid: "acbc94b3-ecb9-8e60-a265-b2e131ab7ec4"
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
      stageUuid: "7590b7b3-7698-8f0f-9abe-4bd89795f8b1"
    - stage: seal
      stageUuid: "a797dff8-564e-8153-b87e-1971aeb838fe"
    - stage: uuid
      stageUuid: "e26dfe1a-3649-82b9-93c8-39832eefbdf9"
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
