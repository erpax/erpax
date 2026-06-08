---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: subscription/plans
coordinate: subscription/plans · 5/round · b3e45b42
contentUuid: "ad545797-1882-54a7-b4e7-23d6666c4954"
diamondUuid: "ef63a50b-b7f4-82ea-8d24-4ae3220e4642"
uuid: "b3e45b42-babb-8193-b6ed-2fe38fb6079b"
horo: 5
bonds:
  in:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscription
    - subscriptions
  out:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscriptions
typography:
  partition: subscription
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation"
  - "ISO-4217:2015 currency-codes"
  - "NIST-SP-800-38D"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - commerce
    - fields
    - standard
  matrix:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscriptions
  backlinks:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscriptions
signatures:
  computationUuid: "87be1520-64e6-8fbe-a1b4-2e7828493213"
  stages:
    - stage: path
      stageUuid: "0a27e08f-44d1-8b6a-8887-be59f488e5a5"
    - stage: trinity
      stageUuid: "10129d9d-0f80-81f0-bc28-eff542eb7f17"
    - stage: boundary
      stageUuid: "4d23c417-e880-80a2-8b3a-e42484622e44"
    - stage: links
      stageUuid: "5eab1604-a334-87b4-b168-5eba49707068"
    - stage: horo
      stageUuid: "f5bd273a-da46-8af7-9514-f97e52622cab"
    - stage: seal
      stageUuid: "0aeb1f21-7999-8ca0-b6de-4089d0261c27"
    - stage: uuid
      stageUuid: "f519ba42-28a5-8897-b670-d6bed6b2fbf2"
version: 2
---
# subscription-plans

Subscription Plans — pricing-plan catalog (super-admin maintained).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- SOX §404 internal-controls

Composes: [[access]] · [[fields]] · [[accounting]] · [[standard]] · [[commerce]].
