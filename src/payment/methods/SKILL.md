---
name: methods
description: "Use when storing or querying billing instruments — Stripe-tokenized cards (brand, last4, expiry) and bank accounts — with PCI-DSS scope minimized via tokenization and AES-GCM encryption of sensitive fields. The payment-method vault collection."
atomPath: "payment/methods"
coordinate: "payment/methods · 5/round · 87a22f12"
contentUuid: "7d2602da-68f8-5192-96f8-018566db9442"
diamondUuid: "2cbae7d1-8baf-8f7c-8deb-fb6f01976ae3"
uuid: "87a22f12-7201-8754-9a94-b92a59702e21"
horo: 5
typography:
  partition: payment
  bondDegree: 22
standards:
  - "5116 authenticated-encryption-with-associated-data"
  - "GDPR Art.32 security-of-processing"
  - "ISO-13616-1:2020 iban bank-account-reference"
  - "ISO-13616-1:2020 iban bank-account-reference`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-9362:2022 bic bank-routing"
  - "ISO-9362:2022 bic bank-routing`"
  - "NIST SP-800-38D aes-gcm"
  - "NIST SP-800-38D aes-gcm`"
  - "NIST-SP-800-38D"
  - "PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data"
  - "PCI-DSS-4.0 §3.5 protect-stored-cardholder-data"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0a00b37b-25a2-85d3-933d-114bdbe5bc35"
  stages:
    - stage: path
      stageUuid: "548df8db-e8a3-8dfe-81e9-542ca18be909"
    - stage: trinity
      stageUuid: "8b17f7e7-6269-88b2-8cd6-a0ad9eebb9c1"
    - stage: boundary
      stageUuid: "fbbb38a3-eeaa-812b-a3d8-74ab990ce8a6"
    - stage: links
      stageUuid: "b04ea126-6da9-8937-80d9-796fa512023e"
    - stage: horo
      stageUuid: "0f06a60d-962b-8a05-8070-b782e6f2ad06"
    - stage: seal
      stageUuid: "7c8031b8-2fe0-81e2-a8e1-e58e928b7f9f"
    - stage: uuid
      stageUuid: "8758d6a6-579c-8a34-bc18-51cfcc046074"
version: 2
---
# payment-methods

Payment Methods — tokenized card / bank-account references for billing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-13616-1:2020 iban bank-account-reference`
- `@standard ISO-9362:2022 bic bank-routing`
- `@standard ISO-4217:2015 currency-codes`
- `@standard NIST SP-800-38D aes-gcm`

- ISO-13616-1:2020 iban bank-account-reference
- ISO-9362:2022 bic bank-routing
- ISO-4217:2015 currency-codes
- PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data
- PCI-DSS-4.0 §3.5 protect-stored-cardholder-data
- GDPR Art.32 security-of-processing
- ISO-27002 §8.24 use-of-cryptography
- NIST SP-800-38D aes-gcm

Composes: [[access]] · [[commerce]] · [[defence]] · [[proof]] · [[standard]] · [[identity]].

**Law — [[law]]: a payment-method is a tokenized billing-instrument vault — Stripe tokens and AES-GCM encryption minimize PCI-DSS scope so sensitive card/bank data is never stored raw.**
