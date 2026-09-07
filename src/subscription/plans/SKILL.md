---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: "subscription/plans"
coordinate: "subscription/plans · 4/weave · a7d7dbd8"
contentUuid: "cfaa01ea-1eef-5046-962a-905940d2d855"
diamondUuid: "5ff8c34f-f469-8784-b6c5-a8cac639c91c"
uuid: "a7d7dbd8-fcaa-8458-a1d4-2c3f57ad3ce9"
horo: 4
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
  computationUuid: "7cffc226-4e6d-819c-91f9-5a8562414b24"
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
      stageUuid: "9d9eb284-c2cb-8b27-9fb0-6e0054a5f822"
    - stage: seal
      stageUuid: "eb544582-9ca1-8f9b-9259-e605fe395551"
    - stage: uuid
      stageUuid: "bd9a0434-1ad8-85e5-b52d-8efbe61ff748"
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
