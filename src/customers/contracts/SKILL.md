---
name: contracts
description: "Use when recording, approving, or recognizing revenue from customer contracts — IFRS-15 §10 master record with transaction price decomposition (fixed, variable, financing), performance obligations, contract combination, amendments, and SOX-gated approval. The canonical revenue-contract collection."
atomPath: "customers/contracts"
coordinate: "customers/contracts · 7/descent · daf0dab7"
contentUuid: "081a4ebc-d576-5923-b844-69f0b0f98e7c"
diamondUuid: "925f280d-3239-8625-8af3-703af61ae40b"
uuid: "daf0dab7-6fd8-8a2f-9093-c7b7ea312774"
horo: 7
typography:
  partition: customers
  bondDegree: 97
standards:
  - "ASC-606"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IAS-1"
  - "IAS-8"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-1 presentation-of-financial-statements`"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §10 contract-with-customer`"
  - "IFRS IFRS-15 §17 contract-combination"
  - "IFRS IFRS-15 §17 contract-combination`"
  - "IFRS IFRS-15 §22 performance-obligations"
  - "IFRS IFRS-15 §22 performance-obligations`"
  - "IFRS IFRS-15 §47 transaction-price decomposition"
  - "IFRS IFRS-15 §47 transaction-price decomposition`"
  - "IFRS IFRS-15 §50-59 variable-consideration"
  - "IFRS IFRS-15 §50-59 variable-consideration`"
  - "IFRS IFRS-15 §60-65 financing-component"
  - "IFRS IFRS-15 §60-65 financing-component`"
  - "IFRS-15"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time effective-from effective-to"
  - "ISO-8601-1:2019 date-time effective-from effective-to`"
  - SOX
  - "SOX §404 internal-controls contract-approval"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25 contract-existence"
  - "US-GAAP ASC-606-10-25-13 contract-modifications"
  - "US-GAAP ASC-606-10-25-9 contract-combination"
  - eIDAS
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "10d144e5-0d11-81e3-85fb-b6bf531617b7"
  stages:
    - stage: path
      stageUuid: "18721974-e2b6-8318-9112-35ae1d2a4a37"
    - stage: trinity
      stageUuid: "cc6ce20c-41cd-8c2c-8770-d7c21cb7d694"
    - stage: boundary
      stageUuid: "44bd1f24-a67c-8093-baa1-597f49be0dc7"
    - stage: links
      stageUuid: "632e0ccd-8050-8be6-b8dd-5f0e7f19abeb"
    - stage: horo
      stageUuid: "f5aae1eb-bf5f-8fb7-836f-bbab736c43e2"
    - stage: seal
      stageUuid: "7e0fc517-0bfd-87e3-b04b-1f133806be6d"
    - stage: uuid
      stageUuid: "9d66935a-36aa-8fb9-b561-912075126862"
version: 2
---
# contracts

Contracts — IFRS-15 §10 master contract-with-customer record.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-15 §10 contract-with-customer`
- `@standard IFRS IFRS-15 §17 contract-combination`
- `@standard IFRS IFRS-15 §22 performance-obligations`
- `@standard IFRS IFRS-15 §47 transaction-price decomposition`
- `@standard IFRS IFRS-15 §50-59 variable-consideration`
- `@standard IFRS IFRS-15 §60-65 financing-component`
- `@standard IFRS IAS-1 presentation-of-financial-statements`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time effective-from effective-to`

- IFRS IFRS-15 §10 contract-with-customer
- IFRS IFRS-15 §17 contract-combination
- IFRS IFRS-15 §22 performance-obligations
- IFRS IFRS-15 §47 transaction-price decomposition
- IFRS IFRS-15 §50-59 variable-consideration
- IFRS IFRS-15 §60-65 financing-component
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-606-10-25 contract-existence
- US-GAAP ASC-606-10-25-9 contract-combination
- US-GAAP ASC-606-10-25-13 contract-modifications
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time effective-from effective-to
- SOX §404 internal-controls contract-approval
- GDPR Art.6(1)(b) lawful-basis-contract
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail contract-lifecycle

Composes: [[customers/contracts/contract/amendments]] · [[customers/contracts/contract/performances]] · [[customers/contracts/contract/signatures]] · [[customers/contracts/performance/obligations]].

**Law — [[law]]: the transaction price decomposes into fixed, variable, and financing components that sum to the contract total, and no revenue is recognised before approval.**
