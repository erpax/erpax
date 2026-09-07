---
name: subscriptions
description: "Use when managing a tenant's active subscription — plan binding, billing-period dates, trial/active/past-due/grace/suspended/cancelled state machine, Stripe subscription and customer IDs, cancellation and pause events, IFRS-15/ASC-606 deferred-revenue lifecycle hooks. The tenant-to-plan binding collection."
atomPath: "subscription/plans/subscriptions"
coordinate: "subscription/plans/subscriptions · 4/weave · 62272d4f"
contentUuid: "bf3e7e08-7e7e-5668-9d2b-324a87248bc1"
diamondUuid: "7d360e10-296e-8a7b-937b-d5d4a9cba65a"
uuid: "62272d4f-b523-880e-a7b6-4f062c70fdaa"
horo: 4
typography:
  partition: subscription
  bondDegree: 27
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
  computationUuid: "fc3f31a9-9220-8851-9cd0-54ad59d666fe"
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
      stageUuid: "610636bd-1ab5-88fb-a9fc-f7c1737c7b34"
    - stage: seal
      stageUuid: "fdbbf58c-8bff-89bb-a22e-40b54afb0c3b"
    - stage: uuid
      stageUuid: "853f0023-9aa1-86cd-bca5-998019bb687a"
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
