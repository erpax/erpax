---
name: plugin
description: "Use when reasoning about plugin — wires the storefront to Stripe with per-tenant keys, so each tenant transacts under its own account and one tenant's credentials never authorise another's charge."
atomPath: "ecommerce/plugin"
coordinate: "ecommerce/plugin · 7/descent · 08504414"
contentUuid: "6192b66b-01ba-57c5-87b9-12f11c2f756d"
diamondUuid: "908bbe65-3021-8dcc-9e53-f513e616632d"
uuid: "08504414-15e9-80f3-8575-c1c763252dae"
horo: 7
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
  computationUuid: "4e2a9afb-da80-80e6-ab43-dd0fb5ba4b6d"
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
      stageUuid: "07549947-952a-8c99-92d8-0c673bf09ba6"
    - stage: seal
      stageUuid: "42ce4c45-625e-8206-83a8-c69c70cba163"
    - stage: uuid
      stageUuid: "25662bc6-001d-808b-a6e1-29d79bb615eb"
version: 2
---
# ecommerce/plugin — the card never reaches this system

`createEcommercePlugin` wires the storefront to Stripe with per-tenant keys, so each tenant
transacts under its own account and one tenant's credentials never authorise another's charge.

Card data is tokenised by Stripe and never observed here. That is the whole PCI-DSS argument:
scope is minimised by not holding the data, not by protecting it better.

Composes: [[law]].
