---
name: stripe
description: "Use when reasoning about stripe — resolves the tenant's own Stripe credentials before charging, closes the order against that same tenant, and resolves the tenant from the event rather than trusting a default."
atomPath: "ecommerce/stripe"
coordinate: "ecommerce/stripe · 4/weave · b691a9cf"
contentUuid: "0c4544a8-e936-5fe7-82ae-f64013d017db"
diamondUuid: "f2845ece-7009-8bc8-893d-84021008bd03"
uuid: "b691a9cf-dfa9-86fd-ab2b-ecd0cb433808"
horo: 4
typography:
  partition: ecommerce
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "18ec41dc-d483-8ea3-8d06-72875b0453c1"
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
      stageUuid: "10bb19fb-d99f-89fb-9383-f8760e52a04b"
    - stage: seal
      stageUuid: "88b7fcdc-669f-8161-a75e-1f79d32ef438"
    - stage: uuid
      stageUuid: "8671f4b2-57b8-8c3e-a8c0-e382be6fad87"
version: 2
---
# ecommerce/stripe — every call carries the tenant, because one tenant's key must never charge another

`tenantAwareInitiatePayment` resolves the tenant's own Stripe credentials before charging,
`tenantConfirmOrder` closes the order against that same tenant, and `tenantStripeWebhookEndpoint`
resolves the tenant from the event rather than trusting a default.

A shared key would make every tenant's revenue land in one account and every refund a manual
correction. Card data is tokenised by Stripe and never observed here.

Composes: [[law]].
