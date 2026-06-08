---
name: "38"
description: "Use when implementing or referencing NIST SP 800-38 — Block Cipher Modes of Operation."
atomPath: nist/sp/800/38
coordinate: nist/sp/800/38 · 1/base · 5d5f341c
contentUuid: "dcd01d99-d4fa-5da5-a4e9-1a988ef73701"
diamondUuid: "73061503-af9c-8f67-a22e-68bf7db42e0d"
uuid: "5d5f341c-08e2-8899-8092-9180dc107ca8"
horo: 1
bonds:
  in:
    - secret
  out:
    - secret
typography:
  partition: nist
  bondDegree: 3
  neighbors: []
standards:
  - "NIST SP-800-38D aes-gcm authenticated-encryption"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-38D"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - secret
  backlinks:
    - secret
signatures:
  computationUuid: "10658ad1-ece3-82a8-9b47-da11d4783448"
  stages:
    - stage: path
      stageUuid: "7ac18005-6b7a-85ff-9617-01695fbfe2e6"
    - stage: trinity
      stageUuid: "df827d02-fdfa-817b-82f6-6da10cedf116"
    - stage: boundary
      stageUuid: "7e6252df-e3d1-8879-bd14-ad60575d19ad"
    - stage: links
      stageUuid: "4c502b00-587e-8c72-89f4-7b5d7c82f434"
    - stage: horo
      stageUuid: "7da46728-d2f3-8e6b-841f-83166f2ecc36"
    - stage: seal
      stageUuid: "0dcfec0f-422a-8f99-82f8-a7f6ab558e33"
    - stage: uuid
      stageUuid: "e060e3dc-4f77-8c69-a4f1-753fd87a6c8f"
version: 2
---
# NIST SP 800-38 — Block Cipher Modes of Operation

**Edition in use:** NIST SP 800-38D:2007 (GCM/GMAC).
**Publisher:** <https://csrc.nist.gov/publications/detail/sp/800-38d/final>

## What's here

- `aes-gcm.ts` — `encryptField` / `decryptField` / `encryptFields` /
  `decryptFields` / `isEncrypted` / `generateEncryptionKey`. AES-256-GCM
  authenticated encryption. Key is derived per `internalSecretPurpose.fieldEncryption`
  from `@/standards/nist-sp-800-108`.

## Companion standards

- **NIST FIPS-197** — AES-256 block cipher.
- **NIST FIPS-180-4** — SHA-256 (used in the upstream KDF).
- **RFC 5116** — Authenticated Encryption with Associated Data (AEAD).
- **NIST PQC posture** — AES-256 + SHA-2 retain ~128 effective bits under
  Grover's algorithm; both are in NIST's post-quantum-acceptable lineup for
  symmetric work.

## Used by

`src/collections/{Invoices, PaymentMethods, Subscriptions}/hooks/encryptSensitiveFields.ts`
and any other site that needs encrypt-at-rest. Imports through the legacy
`@/utilities/encryption` path still work via the deprecated shim.

## Out of scope

- Key wrapping / KEK rotation strategy (handled at the platform layer).
- Asymmetric encryption (RSA, ECDH) — add a separate folder when needed.
- Hardware-attested keys (KMS, HSM) — application-layer code only here.
