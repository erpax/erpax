---
name: contracts
description: "Use when recording, approving, or recognizing revenue from customer contracts — IFRS-15 §10 master record with transaction price decomposition (fixed, variable, financing), performance obligations, contract combination, amendments, and SOX-gated approval. The canonical revenue-contract collection."
atomPath: customers/contracts
coordinate: customers/contracts · 7/descent · 466abf44
contentUuid: "73c76bc3-a858-5096-9676-8284ffede492"
diamondUuid: "038ec629-2d43-879b-a036-7ed688c79530"
uuid: "466abf44-407e-8a6b-baa6-a9be8d04b628"
horo: 7
bonds:
  in:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - customers
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
  out:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
typography:
  partition: customers
  bondDegree: 0
  neighbors: []
standards:
  - "ASC-606"
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IAS-1"
  - "IAS-8"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §17 contract-combination"
  - "IFRS IFRS-15 §22 performance-obligations"
  - "IFRS IFRS-15 §47 transaction-price decomposition"
  - "IFRS IFRS-15 §50-59 variable-consideration"
  - "IFRS IFRS-15 §60-65 financing-component"
  - "IFRS-15"
  - "ISO-19011:2018 audit-trail contract-lifecycle"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time effective-from effective-to"
  - SOX
  - "SOX §404 internal-controls contract-approval"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25 contract-existence"
  - "US-GAAP ASC-606-10-25-13 contract-modifications"
  - "US-GAAP ASC-606-10-25-9 contract-combination"
  - eIDAS
bindings: []
neighbors:
  wikilink:
    - amendments
    - law
    - obligations
    - performances
    - signatures
  matrix:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
  backlinks:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
signatures:
  computationUuid: "bf2590ff-af45-8990-8433-f0d53dfe68b9"
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
      stageUuid: "48f065cc-c38f-813e-9a35-fc58996d41c2"
    - stage: seal
      stageUuid: "69f1a37a-6261-8ed9-9de0-183821889f48"
    - stage: uuid
      stageUuid: "ad401e74-d288-8dc1-ae43-6f11894ee70b"
version: 2
---
# contracts

Contracts — IFRS-15 §10 master contract-with-customer record.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
