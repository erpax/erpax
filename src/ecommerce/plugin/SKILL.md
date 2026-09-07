---
name: plugin
description: "Use when reasoning about plugin — wires the storefront to Stripe with per-tenant keys, so each tenant transacts under its own account and one tenant's credentials never authorise another's charge."
atomPath: "ecommerce/plugin"
coordinate: "ecommerce/plugin · 4/weave · b27cdd06"
contentUuid: "02bf0f8e-7259-5a10-a354-c6066ecba1e6"
diamondUuid: "e2468576-57a4-81b7-bd74-fa5671a84131"
uuid: "b27cdd06-be98-881c-b263-751704aa4f67"
horo: 4
typography:
  partition: ecommerce
  bondDegree: 47
standards:
  - "8615 well-known-uri webhook-discovery"
  - "9110 http-semantics"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data tokenized"
  - "PCI-DSS-4.0 §3.5 protect-stored-cardholder-data"
  - "PCI-DSS-4.0 §3.6 strong-cryptography"
  - "PSD2 EU-2015/2366 strong-customer-authentication"
  - "SOC-2 CC6.1 logical-access-controls"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "d8874275-598e-8445-b302-8f6af4517f1c"
  stages:
    - stage: path
      stageUuid: "58bcad0d-de0b-8954-b0bc-c5bfc966b4c1"
    - stage: trinity
      stageUuid: "edbd9ca9-eb24-80bd-b19e-52ee84e498dc"
    - stage: boundary
      stageUuid: "bb8ffc63-c618-8b8c-a885-fb2c7a377917"
    - stage: links
      stageUuid: "bfc48bc4-e27f-80a0-a249-6fc7448fb5c0"
    - stage: horo
      stageUuid: "5867c294-ccfc-87ac-b6c8-d17367f30172"
    - stage: seal
      stageUuid: "42ce4c45-625e-8206-83a8-c69c70cba163"
    - stage: uuid
      stageUuid: "d24ad8eb-1610-8691-b77e-a8d44c0fc699"
version: 2
---
# ecommerce/plugin — the card never reaches this system

`createEcommercePlugin` wires the storefront to Stripe with per-tenant keys, so each tenant
transacts under its own account and one tenant's credentials never authorise another's charge.

Card data is tokenised by Stripe and never observed here. That is the whole PCI-DSS argument:
scope is minimised by not holding the data, not by protecting it better.

Composes: [[law]].
