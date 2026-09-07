---
name: stripe
description: "Use when reasoning about stripe — resolves the tenant's own Stripe credentials before charging, closes the order against that same tenant, and resolves the tenant from the event rather than trusting a default."
atomPath: "ecommerce/stripe"
coordinate: "ecommerce/stripe · 5/round · c2fb0d6e"
contentUuid: "345b1924-f996-5021-bdcb-b7ba74ef2260"
diamondUuid: "593eda25-abb7-8cf6-a5a4-22c25b24c443"
uuid: "c2fb0d6e-6060-8559-82ca-8be3f7ae3109"
horo: 5
typography:
  partition: ecommerce
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "dec5e0f0-ab2f-8198-8b2f-d64846069be5"
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
      stageUuid: "ef807fce-7289-87c1-a761-cf92836541cc"
    - stage: seal
      stageUuid: "88b7fcdc-669f-8161-a75e-1f79d32ef438"
    - stage: uuid
      stageUuid: "97b63808-cba6-80db-98e2-0e24d7e87489"
version: 2
---
# ecommerce/stripe — every call carries the tenant, because one tenant's key must never charge another

`tenantAwareInitiatePayment` resolves the tenant's own Stripe credentials before charging,
`tenantConfirmOrder` closes the order against that same tenant, and `tenantStripeWebhookEndpoint`
resolves the tenant from the event rather than trusting a default.

A shared key would make every tenant's revenue land in one account and every refund a manual
correction. Card data is tokenised by Stripe and never observed here.

Composes: [[law]].
