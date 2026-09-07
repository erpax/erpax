---
name: stripe
description: "Use when reasoning about stripe — resolves the tenant's own Stripe credentials before charging, closes the order against that same tenant, and resolves the tenant from the event rather than trusting a default."
atomPath: "ecommerce/stripe"
coordinate: "ecommerce/stripe · 7/descent · 41e0e293"
contentUuid: "cdf3a2a8-3dea-5fe0-99da-95f5bf13fba2"
diamondUuid: "4695d05d-f1e7-82df-ac93-1a4be2fbf3ef"
uuid: "41e0e293-4ae8-817a-9b3d-782f3e44282c"
horo: 7
typography:
  partition: ecommerce
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "fb0c4bdf-9d90-816f-86dd-351b21ab8265"
  stages:
    - stage: path
      stageUuid: "738c5d45-5cfd-8cc4-83df-b67bff50c458"
    - stage: trinity
      stageUuid: "2d053010-1916-87bb-a298-8d0cae4dfeea"
    - stage: boundary
      stageUuid: "9e5897c2-1f76-8d2f-9dd3-fed7749b0556"
    - stage: links
      stageUuid: "677fec6c-4fe1-859d-aa2f-1b2f6a357223"
    - stage: horo
      stageUuid: "bd536c31-9269-8ae9-bcbb-cb4035a3a33d"
    - stage: seal
      stageUuid: "88b7fcdc-669f-8161-a75e-1f79d32ef438"
    - stage: uuid
      stageUuid: "d379a352-6efc-874c-8a4b-800125d2da29"
version: 2
---
# ecommerce/stripe — every call carries the tenant, because one tenant's key must never charge another

`tenantAwareInitiatePayment` resolves the tenant's own Stripe credentials before charging,
`tenantConfirmOrder` closes the order against that same tenant, and `tenantStripeWebhookEndpoint`
resolves the tenant from the event rather than trusting a default.

A shared key would make every tenant's revenue land in one account and every refund a manual
correction. Card data is tokenised by Stripe and never observed here.

Composes: [[law]].
