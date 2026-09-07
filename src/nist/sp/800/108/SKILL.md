---
name: "108"
description: "Use when implementing or referencing NIST SP 800-108 — Recommendation for Key Derivation."
atomPath: "nist/sp/800/108"
coordinate: "nist/sp/800/108 · 1/base · c89eaf3f"
contentUuid: "2add67d0-857a-50e8-becd-35295e759ed8"
diamondUuid: "8ade6066-5e6a-8343-83d6-bd48019e88d3"
uuid: "c89eaf3f-93e9-84ac-bb3b-93a36b22e061"
horo: 1
typography:
  partition: nist
  bondDegree: 4
standards:
  - "CoE-108+"
  - "NIST SP-800-108 key-derivation-function"
  - "NIST SP-800-108 key-derivation-function`"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-108"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "06330836-46a3-8983-a81e-40e0ee21862d"
  stages:
    - stage: path
      stageUuid: "f8c8ccb7-85e6-8279-a498-ab67ffac6e22"
    - stage: trinity
      stageUuid: "e560e31e-13f1-8fc2-bcd5-0fe56ba96d4a"
    - stage: boundary
      stageUuid: "6c815ce4-5e8f-8cbd-9ab1-bbdfff3b7fae"
    - stage: links
      stageUuid: "04479110-e782-8523-8dda-5ee4ce7957fb"
    - stage: horo
      stageUuid: "87ad33a7-be12-8a40-a4b0-2e07fe1f4c45"
    - stage: seal
      stageUuid: "3eccab13-08e9-8d8e-87c0-10a5b728b585"
    - stage: uuid
      stageUuid: "4e413e99-9cc9-8863-9aa4-780b8ba0b28d"
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

- `src/nist/sp/800/38/aes-gcm.ts` — derives the field-encryption KEK.
- `src/payload.config.ts` — derives the cron-trigger bearer secret.
- `src/get/preview/secret/index.ts` — derives the live-preview signing secret.
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
