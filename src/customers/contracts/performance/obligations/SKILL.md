---
name: obligations
description: "Use when decomposing a contract into its distinct promises for IFRS-15 §22 revenue allocation — kind (distinct or series), recognition timing (point-in-time §38 or over-time §35), progress measurement method, standalone selling price, and allocated amount. The IFRS-15 performance-obligation collection."
atomPath: customers/contracts/performance/obligations
coordinate: customers/contracts/performance/obligations · 4/weave · b585e77e
contentUuid: "f9f8c923-8fc7-5ad7-8fe5-45697829d51a"
diamondUuid: "fab0ef29-bec8-82e1-becf-f0370174a7b4"
uuid: "b585e77e-ac22-8205-a154-99245c79e546"
horo: 4
bonds:
  in:
    - accounting
    - auth
    - contracts
    - hooks
    - law
    - obligation
    - performance
    - performances
    - revenue
    - standard
  out:
    - accounting
    - auth
    - contracts
    - hooks
    - law
    - obligation
    - performances
    - revenue
    - standard
typography:
  partition: customers
  bondDegree: 28
  neighbors: []
standards:
  - "IFRS IFRS-15 §22 distinct-performance-obligation"
  - "IFRS IFRS-15 §31 satisfaction-of-performance-obligation"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §38 point-in-time-recognition"
  - "IFRS IFRS-15 §41-§43 progress-measurement"
  - "ISO-19011:2018 audit-trail po-satisfaction"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time satisfaction-date"
  - "SOX §404 internal-controls revenue-recognition"
  - "US-GAAP ASC-606-10-25-14 distinct-goods-services"
  - "US-GAAP ASC-606-10-25-31 progress-measurement"
bindings: []
neighbors:
  wikilink:
    - accounting
    - auth
    - contracts
    - hooks
    - law
    - standard
  matrix:
    - accounting
    - auth
    - contracts
    - hooks
    - law
    - obligation
    - performances
    - revenue
    - standard
  backlinks:
    - accounting
    - auth
    - contracts
    - hooks
    - law
    - obligation
    - performances
    - revenue
    - standard
signatures:
  computationUuid: "966a2c07-607e-80fc-b20c-87bfe3e14036"
  stages:
    - stage: path
      stageUuid: "fc62e037-117b-8f30-b5d8-f0d29725b571"
    - stage: trinity
      stageUuid: "a4babf19-6d14-882e-9c24-01024a5edc65"
    - stage: boundary
      stageUuid: "6caa9fa6-cd54-8afa-8120-0ca1402dc61e"
    - stage: links
      stageUuid: "f57ced79-e4e8-8742-acc5-a4b95f239144"
    - stage: horo
      stageUuid: "a5abe079-9760-8352-8491-075836c4c6d8"
    - stage: seal
      stageUuid: "545c13c8-0931-85dd-9f7c-b290e53396c4"
    - stage: uuid
      stageUuid: "af3d43dc-3037-8813-bfc9-1688a86e4cee"
version: 2
---
# performance-obligations

Performance Obligations — IFRS 15 §22 distinct promises within a contract.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time satisfaction-date
- IFRS IFRS-15 §22 distinct-performance-obligation
- IFRS IFRS-15 §31 satisfaction-of-performance-obligation
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §38 point-in-time-recognition
- IFRS IFRS-15 §41-§43 progress-measurement
- US-GAAP ASC-606-10-25-14 distinct-goods-services
- US-GAAP ASC-606-10-25-31 progress-measurement
- ISO-19011:2018 audit-trail po-satisfaction
- SOX §404 internal-controls revenue-recognition

Composes: [[Contracts]] · [[hooks]] · [[accounting]] · [[auth]] · [[standard]].

**Law — [[law]]: the amounts allocated across a contract's distinct obligations sum exactly to its transaction price, each by standalone selling price.**
