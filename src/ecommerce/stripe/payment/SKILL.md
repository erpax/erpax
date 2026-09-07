---
name: payment
description: "Use when reasoning about payment — The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method Stripe holds, never the instrument itself — the tokenisation boundary is what…"
atomPath: "ecommerce/stripe/payment"
coordinate: "ecommerce/stripe/payment · 5/round · 0be04823"
contentUuid: "242fd412-b4ee-54a4-a2a3-9e2b5f0e28e8"
diamondUuid: "daa58cad-0c28-8c89-a7c5-49980c246b61"
uuid: "0be04823-0d07-8d9f-94a2-a11e28892a09"
horo: 5
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
  computationUuid: "a7d31b1c-7a64-84f3-babf-3c4aba0f03d8"
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
      stageUuid: "6f308c21-80ab-8683-be88-c15570285302"
    - stage: seal
      stageUuid: "ea481889-e6a8-85b9-835a-081ab97bbc21"
    - stage: uuid
      stageUuid: "2294f5e5-7fae-8678-832c-07a3585c5802"
version: 2
---
# ecommerce/stripe/payment — a tenant's payment method is stored encrypted or it is not stored

The payment child of the tenant-aware Stripe stack. What is held here is a reference to a method
Stripe holds, never the instrument itself — the tokenisation boundary is what keeps PCI-DSS scope off
this system rather than merely defended on it.

Composes: [[law]].
