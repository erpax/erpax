---
name: subscriptions
description: "Use when managing a tenant's active subscription — plan binding, billing-period dates, trial/active/past-due/grace/suspended/cancelled state machine, Stripe subscription and customer IDs, cancellation and pause events, IFRS-15/ASC-606 deferred-revenue lifecycle hooks. The tenant-to-plan binding collection."
atomPath: "subscription/plans/subscriptions"
coordinate: "subscription/plans/subscriptions · 4/weave · 7a9c589d"
contentUuid: "68b71c6c-a513-5969-8c97-54c3e949a7d8"
diamondUuid: "f9a00304-9295-8dec-a1cd-4a247dd2b3f1"
uuid: "7a9c589d-2243-8691-a1f0-c5d5408ece0c"
horo: 4
typography:
  partition: subscription
  bondDegree: 0
standards:
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time period-start period-end"
  - "ISO-8601-1:2019 date-time period-start period-end`"
  - "NIST-SP-800-38D"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-340-40 deferred-contract-costs"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "324dd519-cdf0-8a94-a148-74144cf5400d"
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
      stageUuid: "4ee1edb1-23f9-8986-a2cd-dbd30f4b3735"
    - stage: seal
      stageUuid: "7b93214f-291a-8376-9c9f-9948090b4261"
    - stage: uuid
      stageUuid: "cede1c62-053a-8f5e-a4a3-c11eda532801"
version: 2
---
# subscriptions

Subscriptions — tenant-to-plan binding with period state and Stripe sync.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time period-start period-end`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period-start period-end
- IFRS IFRS-15 revenue-from-contracts-with-customers
- US-GAAP ASC-606 revenue-from-contracts-with-customers
- US-GAAP ASC-340-40 deferred-contract-costs
- GDPR Art.6(1)(b) lawful-basis-contract
- SOX §404 internal-controls
- ISO-27002 §8.24 use-of-cryptography

Composes: [[subscription/plans]] · [[collections]] · [[access]] · [[proof]] · [[horo]] · [[sequence]] · [[standard]].
