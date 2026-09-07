---
name: "38"
description: "Use when implementing or referencing NIST SP 800-38 — Block Cipher Modes of Operation."
atomPath: "nist/sp/800/38"
coordinate: "nist/sp/800/38 · 2/share · 3edec69b"
contentUuid: "0cde5188-0933-519d-97d0-499817748ca3"
diamondUuid: "e95bab59-84b7-8906-82d0-a96d6c692a9c"
uuid: "3edec69b-99f5-8c95-aa0a-5487cb3637e4"
horo: 2
typography:
  partition: nist
  bondDegree: 3
standards:
  - "NIST SP-800-38D aes-gcm authenticated-encryption"
  - "NIST SP-800-38D aes-gcm authenticated-encryption`"
  - "NIST-SP-800-38D"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1de79def-271a-87fa-8b57-a69e0b7c1268"
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
      stageUuid: "299a5401-447e-88a1-9c49-97208f0f5ac8"
    - stage: seal
      stageUuid: "0dcfec0f-422a-8f99-82f8-a7f6ab558e33"
    - stage: uuid
      stageUuid: "60114e9a-787a-8765-93ee-7bbd3d3cec84"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP-800-38D aes-gcm authenticated-encryption`
