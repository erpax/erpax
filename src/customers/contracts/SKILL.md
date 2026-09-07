---
name: contracts
description: "Use when recording, approving, or recognizing revenue from customer contracts — IFRS-15 §10 master record with transaction price decomposition (fixed, variable, financing), performance obligations, contract combination, amendments, and SOX-gated approval. The canonical revenue-contract collection."
atomPath: "customers/contracts"
coordinate: "customers/contracts · 2/share · 12304cef"
contentUuid: "0ce09c3f-147c-52c7-b972-8e253bc5467f"
diamondUuid: "78803249-dadf-82ff-9683-58d1a734d764"
uuid: "12304cef-b058-822b-b740-b60fe61ff77f"
horo: 2
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
  computationUuid: "3c37929c-d6af-8338-b15a-518a7a094589"
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
      stageUuid: "d8ce7dac-17bf-8ed1-9f87-da543d01452e"
    - stage: seal
      stageUuid: "7e0fc517-0bfd-87e3-b04b-1f133806be6d"
    - stage: uuid
      stageUuid: "337af8da-dfa8-8ce8-8eda-e923261ef8c3"
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
