---
name: "38"
description: "Use when implementing or referencing NIST SP 800-38 — Block Cipher Modes of Operation."
atomPath: "nist/sp/800/38"
coordinate: "nist/sp/800/38 · 1/base · a01a9f88"
contentUuid: "8a6b49b8-4607-5b53-86d4-a813b1b7457f"
diamondUuid: "7a521f81-b22c-8689-ba40-551aa504b7fc"
uuid: "a01a9f88-ee00-8603-94b2-6593be39450c"
horo: 1
typography:
  partition: nist
  bondDegree: 3
standards:
  - "NIST SP-800-38D aes-gcm authenticated-encryption"
  - "NIST SP-800-38D aes-gcm authenticated-encryption`"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-38D"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e785bb15-5d69-8e3f-a91f-52c036587bee"
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
      stageUuid: "4f40d9b8-a648-802f-ada8-e84574773187"
    - stage: seal
      stageUuid: "0dcfec0f-422a-8f99-82f8-a7f6ab558e33"
    - stage: uuid
      stageUuid: "0eb74358-9a3b-8eb2-b673-2a6193f61ef8"
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
