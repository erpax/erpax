---
name: stripe
description: "Use when reasoning about stripe — resolves the tenant's own Stripe credentials before charging, closes the order against that same tenant, and resolves the tenant from the event rather than trusting a default."
atomPath: "ecommerce/stripe"
coordinate: "ecommerce/stripe · 4/weave · 53567e07"
contentUuid: "05652e78-1ea0-5d6d-898c-f2056300acc5"
diamondUuid: "8f9c98ed-4468-8569-bfe4-5e7073169179"
uuid: "53567e07-e924-82d9-8e89-3098a3efc1e0"
horo: 4
typography:
  partition: ecommerce
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "01a2e297-2715-8f68-a896-faf2bf32c719"
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
      stageUuid: "affefc51-b126-8523-9582-8bfa18f3c34f"
    - stage: seal
      stageUuid: "88b7fcdc-669f-8161-a75e-1f79d32ef438"
    - stage: uuid
      stageUuid: "7f2528d6-ecf5-84bd-bc89-bb0f7313201b"
version: 2
---
# ecommerce/stripe — every call carries the tenant, because one tenant's key must never charge another

`tenantAwareInitiatePayment` resolves the tenant's own Stripe credentials before charging,
`tenantConfirmOrder` closes the order against that same tenant, and `tenantStripeWebhookEndpoint`
resolves the tenant from the event rather than trusting a default.

A shared key would make every tenant's revenue land in one account and every refund a manual
correction. Card data is tokenised by Stripe and never observed here.

Composes: [[law]].
