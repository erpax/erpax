---
name: payment-methods
description: The payment-methods collection — Payment Methods — tokenized card / bank-account references for billing
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
