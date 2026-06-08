---
name: "108"
description: "Use when implementing or referencing NIST SP 800-108 — Recommendation for Key Derivation."
atomPath: nist/sp/800/108
coordinate: nist/sp/800/108 · 5/round · 90307b56
contentUuid: "659c31cc-ceb1-5dc3-8ec6-6bb53537ff2b"
diamondUuid: "9775656e-641f-88de-aa48-36c082de2494"
uuid: "90307b56-db01-829d-996e-006e5366fd32"
horo: 5
bonds:
  in: []
  out:
    - "359"
typography:
  partition: nist
  bondDegree: 0
  neighbors: []
standards:
  - "CoE-108+"
  - "NIST SP-800-108 key-derivation-function"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-108"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "61711bd0-38c7-8657-b57c-d1c3c07bbdf2"
  stages:
    - stage: path
      stageUuid: "f8c8ccb7-85e6-8279-a498-ab67ffac6e22"
    - stage: trinity
      stageUuid: "e560e31e-13f1-8fc2-bcd5-0fe56ba96d4a"
    - stage: boundary
      stageUuid: "fb2e7d6a-5c5c-85a5-a2a7-dbd592f9ab22"
    - stage: links
      stageUuid: "04479110-e782-8523-8dda-5ee4ce7957fb"
    - stage: horo
      stageUuid: "5c4ed5b9-ef12-8df8-bd16-896e20090e95"
    - stage: seal
      stageUuid: "3eccab13-08e9-8d8e-87c0-10a5b728b585"
    - stage: uuid
      stageUuid: "cd2088e6-f50d-8261-a601-8943c69435ff"
version: 2
---
# NIST SP 800-108 — Recommendation for Key Derivation

**Edition in use:** NIST SP 800-108r1:2022 (HMAC counter-mode KDF).
**Publisher:** <https://csrc.nist.gov/publications/detail/sp/800-108/rev-1/final>

## What's here

- `kdf.ts` — `deriveSecretFromPayloadSecret(purpose)` and the
  `internalSecretPurpose` enum (preview / cron / fieldEncryption).
  Implementation is HMAC-SHA256 over a versioned label
  (`erpax:derived:v1:<purpose>`), which conforms to RFC 5869 HKDF (extract +
  expand) for our short single-block output.

## Companion standards

- **NIST FIPS-198-1** — HMAC.
- **NIST FIPS-180-4** — SHA-256.
- **RFC 2104** — HMAC.
- **RFC 5869** — HKDF (HMAC-based key derivation).

## Used by

- `src/standards/nist-sp-800-38/aes-gcm.ts` — derives the field-encryption KEK.
- `src/payload.config.ts` — derives the cron-trigger bearer secret.
- `src/utilities/getPreviewSecret.ts` — derives the live-preview signing secret.
- All other internal authentication tokens that should not have their own env var.

Imports through the legacy `@/utilities/deriveSecret` path still work via the
deprecated shim.

## Out of scope

- Key rotation policy — `DERIVED_V1` prefix lets us bump the version when
  rotating without re-keying every consumer at once. New callers should pin
  their version.
- KMS / HSM-backed master secrets — application-layer code only here.
