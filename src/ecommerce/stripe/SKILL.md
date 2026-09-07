---
name: stripe
description: "Use when reasoning about stripe — resolves the tenant's own Stripe credentials before charging, closes the order against that same tenant, and resolves the tenant from the event rather than trusting a default."
atomPath: "ecommerce/stripe"
coordinate: "ecommerce/stripe · 5/round · 1dbf5d33"
contentUuid: "ad035404-e4f2-5f38-ab2b-c53833417d92"
diamondUuid: "f64e9361-2139-842e-9bf1-d39d5dbd5417"
uuid: "1dbf5d33-8dc0-8680-9054-31ba0020caad"
horo: 5
typography:
  partition: ecommerce
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "263251f2-008f-81d9-8a31-9d3259664ac0"
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
      stageUuid: "4dc225b4-f8ae-8e48-a2e3-d30d2105bb8b"
    - stage: seal
      stageUuid: "88b7fcdc-669f-8161-a75e-1f79d32ef438"
    - stage: uuid
      stageUuid: "e6dd8b27-c50f-8a02-afcc-15ab6222ed18"
version: 2
---
# ecommerce/stripe — every call carries the tenant, because one tenant's key must never charge another

`tenantAwareInitiatePayment` resolves the tenant's own Stripe credentials before charging,
`tenantConfirmOrder` closes the order against that same tenant, and `tenantStripeWebhookEndpoint`
resolves the tenant from the event rather than trusting a default.

A shared key would make every tenant's revenue land in one account and every refund a manual
correction. Card data is tokenised by Stripe and never observed here.

Composes: [[law]].
