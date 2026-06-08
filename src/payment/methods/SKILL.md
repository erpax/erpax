---
name: methods
description: "Use when storing or querying billing instruments — Stripe-tokenized cards (brand, last4, expiry) and bank accounts — with PCI-DSS scope minimized via tokenization and AES-GCM encryption of sensitive fields. The payment-method vault collection."
atomPath: payment/methods
coordinate: payment/methods · 8/crest · f10565d6
contentUuid: "056e9609-213f-5750-b1ca-d44a8dd00c6e"
diamondUuid: "43150cd3-6cae-817c-a9ae-9016bc0d2702"
uuid: "f10565d6-93bc-83c1-9bba-a01602794350"
horo: 8
bonds:
  in:
    - access
    - commerce
    - defence
    - identity
    - law
    - payment
    - proof
    - standard
  out:
    - access
    - commerce
    - defence
    - identity
    - law
    - proof
    - standard
typography:
  partition: payment
  bondDegree: 0
  neighbors: []
standards:
  - "5116 authenticated-encryption-with-associated-data"
  - "GDPR Art.32 security-of-processing"
  - "ISO-13616-1:2020 iban bank-account-reference"
  - "ISO-4217:2015 currency-codes"
  - "ISO-9362"
  - "ISO-9362:2022 bic bank-routing"
  - "NIST SP-800-38D aes-gcm"
  - "NIST-SP-800-38D"
  - "PCI-DSS-4.0 §3.2 do-not-store-sensitive-authentication-data"
  - "PCI-DSS-4.0 §3.5 protect-stored-cardholder-data"
bindings: []
neighbors:
  wikilink:
    - access
    - commerce
    - defence
    - identity
    - law
    - proof
    - standard
  matrix:
    - access
    - commerce
    - defence
    - identity
    - law
    - proof
    - standard
  backlinks:
    - access
    - commerce
    - defence
    - identity
    - law
    - proof
    - standard
signatures:
  computationUuid: "52f99d40-42d2-8760-ad32-d30a69aa5f45"
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
      stageUuid: "f2b762b3-b9a7-80bb-81db-0cdce514491c"
    - stage: seal
      stageUuid: "cdaed331-5d9c-8ee3-8d25-8680716d9ee7"
    - stage: uuid
      stageUuid: "b6c7a999-ad60-874c-9105-bbaa8caea761"
version: 2
---
# payment-methods

Payment Methods — tokenized card / bank-account references for billing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
