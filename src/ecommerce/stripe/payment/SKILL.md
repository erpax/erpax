---
name: payment
description: "Use when reasoning about payment — The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method Stripe holds, never the instrument itself — the tokenisation boundary is what…"
atomPath: "ecommerce/stripe/payment"
coordinate: "ecommerce/stripe/payment · 1/base · babf6dff"
contentUuid: "adaefd47-a96b-58ad-b8f8-abf5c7bf5cc6"
diamondUuid: "604af7aa-63c6-897f-ae83-7131a0818363"
uuid: "babf6dff-d120-8a0a-a313-689a2436fb51"
horo: 1
typography:
  partition: ecommerce
  bondDegree: 78
standards:
  - "ISO-4217:2015 currency-codes"
  - "PCI-DSS-4.0 §3.2 tokenized-card-data"
  - "PCI-DSS-4.0 §3.5 protect-stored-cardholder-data"
  - "PSD2 EU-2015/2366 strong-customer-authentication"
bindings: []
signatures:
  computationUuid: "c90e201b-2b48-8eea-8f46-af4e820d8464"
  stages:
    - stage: path
      stageUuid: "423a1da3-20f2-8fc0-a56c-b7151ef15a87"
    - stage: trinity
      stageUuid: "3e86fe49-4cb7-8bb4-828c-002675bce116"
    - stage: boundary
      stageUuid: "e10c0f3b-6d40-8e03-832b-7263b3455983"
    - stage: links
      stageUuid: "fa712286-0b72-8bdb-994e-1b657aa067e3"
    - stage: horo
      stageUuid: "7eabd134-2c07-89a8-899a-bf853b1fbf96"
    - stage: seal
      stageUuid: "ea481889-e6a8-85b9-835a-081ab97bbc21"
    - stage: uuid
      stageUuid: "d774e766-d2a0-8ac4-abd1-c83c60d435ad"
version: 2
---
# ecommerce/stripe/payment — a tenant's payment method is stored encrypted or it is not stored

The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method
Stripe holds, never the instrument itself — the tokenisation boundary is what keeps PCI-DSS scope off
this system rather than merely defended on it.

Composes: [[law]].
