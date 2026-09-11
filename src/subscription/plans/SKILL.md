---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: "subscription/plans"
coordinate: "subscription/plans · 7/descent · 875db640"
contentUuid: "8ba6b021-19ba-54ac-8c59-ab6dc1d9f303"
diamondUuid: "7ac01ba6-a6e2-8848-81a1-3bd90f3afb77"
uuid: "875db640-82a8-83e2-a5de-194e09d7a6fb"
horo: 7
typography:
  partition: subscription
  bondDegree: 20
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "NIST-SP-800-38D"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f36e87bc-0c11-83ad-9fb2-9b7e2e621490"
  stages:
    - stage: path
      stageUuid: "0a27e08f-44d1-8b6a-8887-be59f488e5a5"
    - stage: trinity
      stageUuid: "10129d9d-0f80-81f0-bc28-eff542eb7f17"
    - stage: boundary
      stageUuid: "4d23c417-e880-80a2-8b3a-e42484622e44"
    - stage: links
      stageUuid: "eeaa1644-35f8-842a-af04-300f7403ca44"
    - stage: horo
      stageUuid: "c9b7acc9-2a07-84e2-8726-3ed339bbe413"
    - stage: seal
      stageUuid: "eb544582-9ca1-8f9b-9259-e605fe395551"
    - stage: uuid
      stageUuid: "1caa9646-3fda-870d-8f21-22e64f438756"
version: 2
---
# subscription-plans

Subscription Plans — pricing-plan catalog (super-admin maintained).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`

- ISO-4217:2015 currency-codes
- IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- SOX §404 internal-controls

Composes: [[access]] · [[field]] · [[accounting]] · [[standard]] · [[commerce]].
