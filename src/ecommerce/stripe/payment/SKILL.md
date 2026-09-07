---
name: payment
description: "Use when reasoning about payment — The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method Stripe holds, never the instrument itself — the tokenisation boundary is what…"
atomPath: "ecommerce/stripe/payment"
coordinate: "ecommerce/stripe/payment · 5/round · 1c0f6c5b"
contentUuid: "e50d160e-df82-5d25-b600-f607cc64c08b"
diamondUuid: "55436622-8bc3-8368-9f4e-72e1957a50a1"
uuid: "1c0f6c5b-e488-847a-9a14-e784605680bc"
horo: 5
typography:
  partition: ecommerce
  bondDegree: 76
standards:
  - "ISO-4217:2015 currency-codes"
  - "PCI-DSS-4.0 §3.2 tokenized-card-data"
  - "PCI-DSS-4.0 §3.5 protect-stored-cardholder-data"
  - "PSD2 EU-2015/2366 strong-customer-authentication"
bindings: []
signatures:
  computationUuid: "10fb3694-2ca0-869f-8d71-d233615a6a1e"
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
      stageUuid: "0ff9568c-729d-8d36-89f2-efdf506f13ac"
    - stage: seal
      stageUuid: "ea481889-e6a8-85b9-835a-081ab97bbc21"
    - stage: uuid
      stageUuid: "c513a05d-ec11-8c14-abcb-619db9b305e6"
version: 2
---
# ecommerce/stripe/payment — a tenant's payment method is stored encrypted or it is not stored

The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method
Stripe holds, never the instrument itself — the tokenisation boundary is what keeps PCI-DSS scope off
this system rather than merely defended on it.

Composes: [[law]].
