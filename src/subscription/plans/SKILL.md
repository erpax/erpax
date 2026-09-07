---
name: plans
description: "Use when defining or displaying the SaaS pricing-plan catalog — plan names, slugs, monthly/yearly prices, Stripe product/price IDs, feature-limit JSON, billing cycle, sort order. The super-admin-maintained plan catalog collection; public read, mutations locked to super-admin."
atomPath: "subscription/plans"
coordinate: "subscription/plans · 4/weave · 4b9dfc77"
contentUuid: "a3ffc9b1-2b46-5593-93e2-866a79fee78b"
diamondUuid: "f131dc8c-477a-8931-bc0a-9d55e22c61a7"
uuid: "4b9dfc77-40dd-8209-b149-66062ba28aa4"
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
  computationUuid: "3207fd15-8c2f-8974-af86-db84febf31ca"
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
      stageUuid: "0582f58e-b32a-8c61-b490-3f68a85c3e0e"
    - stage: seal
      stageUuid: "eb544582-9ca1-8f9b-9259-e605fe395551"
    - stage: uuid
      stageUuid: "ada9e9ec-0191-8b49-bf5b-3557dab5fb8c"
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
