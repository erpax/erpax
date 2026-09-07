---
name: methods
description: "Use when storing or querying billing instruments — Stripe-tokenized cards (brand, last4, expiry) and bank accounts — with PCI-DSS scope minimized via tokenization and AES-GCM encryption of sensitive fields. The payment-method vault collection."
atomPath: "payment/methods"
coordinate: "payment/methods · 2/share · 3d9cbbde"
contentUuid: "b2bf96bb-c177-5d7a-a9cb-b5234b77433d"
diamondUuid: "a5b360dc-7cd9-850b-8489-c03782a51a01"
uuid: "3d9cbbde-df16-8e7c-a858-ab1f550e5465"
horo: 2
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
  computationUuid: "02cd1b41-048a-8c51-89b7-a0bbe6932fb4"
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
      stageUuid: "36532787-3257-8ce1-a0ed-ce5fdf16c765"
    - stage: seal
      stageUuid: "7c8031b8-2fe0-81e2-a8e1-e58e928b7f9f"
    - stage: uuid
      stageUuid: "dd8fe9bd-72ef-83e0-9c46-0319c3583f16"
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
