---
name: payment
description: "Use when reasoning about payment — The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method Stripe holds, never the instrument itself — the tokenisation boundary is what…"
atomPath: "ecommerce/stripe/payment"
coordinate: "ecommerce/stripe/payment · 1/base · 9668fb09"
contentUuid: "8e3b2c1c-e891-5f3d-822c-80776b3e34db"
diamondUuid: "cded2bfe-b74e-8009-a841-b5f8d0d6be8a"
uuid: "9668fb09-5c4f-84e4-adb5-377bf5dc60a6"
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
  computationUuid: "030b7cf5-1801-8769-939c-1413b213ef5c"
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
      stageUuid: "cdc169a4-67c6-8774-8abe-d63c87088f9c"
    - stage: seal
      stageUuid: "ea481889-e6a8-85b9-835a-081ab97bbc21"
    - stage: uuid
      stageUuid: "aff29c63-3a96-8197-9e75-6ee213656641"
version: 2
---
# ecommerce/stripe/payment — a tenant's payment method is stored encrypted or it is not stored

The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method
Stripe holds, never the instrument itself — the tokenisation boundary is what keeps PCI-DSS scope off
this system rather than merely defended on it.

Composes: [[law]].
