---
name: "108"
description: "Use when implementing or referencing NIST SP 800-108 — Recommendation for Key Derivation."
atomPath: "nist/sp/800/108"
coordinate: "nist/sp/800/108 · 2/share · 1dff656b"
contentUuid: "a845cc0e-6e7b-5b92-858a-038762fac4d0"
diamondUuid: "19f68d61-b954-827f-820d-962c3c4d83f1"
uuid: "1dff656b-4540-87eb-926c-37db4cd7372e"
horo: 2
typography:
  partition: nist
  bondDegree: 0
standards:
  - "CoE-108+"
  - "NIST SP-800-108 key-derivation-function"
  - "NIST SP-800-108 key-derivation-function`"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-108"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "67e88ae4-805d-8b49-b2bf-df8498b2433d"
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
      stageUuid: "cfc7c27a-f700-8501-ada9-40b50045d4e9"
    - stage: seal
      stageUuid: "3eccab13-08e9-8d8e-87c0-10a5b728b585"
    - stage: uuid
      stageUuid: "f007859f-cd26-8829-a0d7-5ea48844a5ac"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP-800-108 key-derivation-function`
