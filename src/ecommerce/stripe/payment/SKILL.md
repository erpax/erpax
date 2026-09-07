---
name: payment
description: "Use when reasoning about payment — The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method Stripe holds, never the instrument itself — the tokenisation boundary is what…"
atomPath: "ecommerce/stripe/payment"
coordinate: "ecommerce/stripe/payment · 2/share · e0b9830b"
contentUuid: "07b85ea5-3e1e-5fb7-8494-f111d6d10970"
diamondUuid: "fa1d1b27-df8a-8909-9619-117d01f909a3"
uuid: "e0b9830b-eb0c-8f8d-b5dc-35ab9a59bdee"
horo: 2
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
  computationUuid: "30b01d24-a381-89b0-ba42-5bd4463fdb73"
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
      stageUuid: "760d63b7-31d0-8419-9904-3f22547d72c3"
    - stage: seal
      stageUuid: "ea481889-e6a8-85b9-835a-081ab97bbc21"
    - stage: uuid
      stageUuid: "f7454b4a-1471-80e6-abf8-63f2660147f1"
version: 2
---
# ecommerce/stripe/payment — a tenant's payment method is stored encrypted or it is not stored

The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method
Stripe holds, never the instrument itself — the tokenisation boundary is what keeps PCI-DSS scope off
this system rather than merely defended on it.

Composes: [[law]].
