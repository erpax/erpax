---
name: methods
description: "Use when storing or querying billing instruments — Stripe-tokenized cards (brand, last4, expiry) and bank accounts — with PCI-DSS scope minimized via tokenization and AES-GCM encryption of sensitive fields. The payment-method vault collection."
atomPath: "payment/methods"
coordinate: "payment/methods · 2/share · 63032b8c"
contentUuid: "e2f3bd61-e1e2-5268-ab2e-91490857e053"
diamondUuid: "7d82eccd-1fe5-80e5-866f-8e1aa9d7b0b9"
uuid: "63032b8c-3e07-8b92-822a-1c15a8636ae8"
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
  computationUuid: "43bdf243-5b3d-8b4d-bed5-b2719e18c36e"
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
      stageUuid: "131ef0e2-39b0-828f-b92c-52804218950a"
    - stage: seal
      stageUuid: "7c8031b8-2fe0-81e2-a8e1-e58e928b7f9f"
    - stage: uuid
      stageUuid: "611eb0cf-e8cd-835c-99e4-4371b6b8b41b"
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
