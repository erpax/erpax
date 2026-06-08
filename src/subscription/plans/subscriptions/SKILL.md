---
name: subscriptions
description: "Use when managing a tenant's active subscription — plan binding, billing-period dates, trial/active/past-due/grace/suspended/cancelled state machine, Stripe subscription and customer IDs, cancellation and pause events, IFRS-15/ASC-606 deferred-revenue lifecycle hooks. The tenant-to-plan binding collection."
atomPath: subscription/plans/subscriptions
coordinate: subscription/plans/subscriptions · 1/base · f153f7bc
contentUuid: "f6921b65-88b5-5bbc-9fb0-fbb82bc013f2"
diamondUuid: "b4dd1ddc-d905-896c-9fe2-ef836bcb9616"
uuid: "f153f7bc-88c7-8e82-a1f9-8e8b8c9d1d05"
horo: 1
bonds:
  in:
    - access
    - churn
    - collections
    - horo
    - invoices
    - plans
    - proof
    - sequence
    - standard
  out:
    - access
    - churn
    - collections
    - horo
    - invoices
    - plans
    - proof
    - sequence
    - standard
typography:
  partition: subscription
  bondDegree: 0
  neighbors: []
standards:
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period-start period-end"
  - "NIST-SP-800-38D"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-340-40 deferred-contract-costs"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
neighbors:
  wikilink:
    - access
    - collections
    - horo
    - plans
    - proof
    - sequence
    - standard
  matrix:
    - access
    - churn
    - collections
    - horo
    - invoices
    - plans
    - proof
    - sequence
    - standard
  backlinks:
    - access
    - churn
    - collections
    - horo
    - invoices
    - plans
    - proof
    - sequence
    - standard
signatures:
  computationUuid: "a284c64b-8e15-8bc4-b1b5-67cb260b0902"
  stages:
    - stage: path
      stageUuid: "8a6b4be8-8660-8607-a803-17dbc5bf5473"
    - stage: trinity
      stageUuid: "fffb7f10-9de3-80f2-9cb8-bd12cc4815fc"
    - stage: boundary
      stageUuid: "781c8b94-4688-8897-b0c1-5135fe55bf03"
    - stage: links
      stageUuid: "3828dfd8-4fbd-8d50-a4b0-1d986f302d54"
    - stage: horo
      stageUuid: "edad147a-19fe-8dc5-8d1d-4e1893027d87"
    - stage: seal
      stageUuid: "7b93214f-291a-8376-9c9f-9948090b4261"
    - stage: uuid
      stageUuid: "83569415-3844-84b1-a605-eeb7eea89335"
version: 2
---
# subscriptions

Subscriptions — tenant-to-plan binding with period state and Stripe sync.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period-start period-end
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- US-GAAP ASC-340-40 deferred-contract-costs
- GDPR Art.6(1)(b) lawful-basis-contract
- SOX §404 internal-controls
- ISO-27002 §8.24 use-of-cryptography

Composes: [[subscription/plans]] · [[collections]] · [[access]] · [[proof]] · [[horo]] · [[sequence]] · [[standard]].
