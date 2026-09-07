---
name: secret
description: "Use when sealing Payload CMS secrets at rest or unsealing them at boot — encrypt under AES-256-GCM with the content-uuid in AAD; decrypt only when the presented uuid matches the expected content identity (fail-closed)."
atomPath: secret
coordinate: "secret · 5/round · 4b13107f"
contentUuid: "52a54129-d715-556b-ba3f-261d7cbb748e"
diamondUuid: "4d32c622-01d9-8344-80c1-25ba2a5e2fa5"
uuid: "4b13107f-c344-8b98-a276-4ff04750c939"
horo: 5
typography:
  partition: secret
  bondDegree: 31
standards:
  - "NIST SP 800-38D AES-GCM"
  - "NIST SP 800-38D AES-GCM`"
  - "NIST-SP-800-38D"
  - RFC 5869 HKDF
  - "RFC 5869 HKDF — extract-and-expand key derivation"
  - "RFC 5869 HKDF`"
  - "RFC 9562 §5.8 — content-address as the derivation salt"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b4f24972-4569-8b75-8684-45e2c39a8ca0"
  stages:
    - stage: path
      stageUuid: "69df74c1-cc11-8dc3-bb61-9c55f22fe829"
    - stage: trinity
      stageUuid: "8e411cd7-000d-87c8-84a8-10c5ff352769"
    - stage: boundary
      stageUuid: "79ecec34-cc46-8ec7-8d9a-bef1796fa754"
    - stage: links
      stageUuid: "a0b9bf89-aaea-8c03-b543-6e61a49dae52"
    - stage: horo
      stageUuid: "b2024c1e-5dd6-8f4b-8517-736ecd7aa973"
    - stage: seal
      stageUuid: "a1e7e5e6-b628-8c5a-b3ea-21251d58227c"
    - stage: uuid
      stageUuid: "e9cc6d23-4e6b-80ff-b376-29d300affad2"
version: 2
---
# secret — sealed at rest; decrypt iff uuid proves identity

Payload CMS secrets (`PAYLOAD_SECRET`, database URLs, API keys in env) must not live as plaintext in the repo. **Seal** them: `sealSecret(plaintext, contextUuid)` produces a `SealedBlob` (AES-256-GCM, context uuid bound as AAD + HKDF salt). **Unseal** only through identity proof: `decryptIfUuid(sealed, presentedUuid, expectedContent)` returns plaintext **only when** `identityUuidForContent(expectedContent) === presentedUuid` and the sealed `contextUuid` matches — otherwise throws (fail-closed). No uuid match ⇒ no decrypt.

Bootstrap key material is **`ERPAX_SEAL_KEY`** in env (openssl rand -hex 32) — never embedded in source. Per-context DEK = HKDF-SHA256(`ERPAX_SEAL_KEY`, salt=`contextUuid`). This is the env-secret ceremony complement to [[integrity]] envelope encryption (tenant KEK + row uuid): here the uuid IS the key ceremony for *platform* secrets.

## Boot pattern (`PAYLOAD_SECRET`)

1. Prefer plain `PAYLOAD_SECRET` in local `.env` (development).
2. Production: store `PAYLOAD_SECRET_SEALED` (JSON `SealedBlob` or path to file); at boot `resolvePayloadSecret()` decrypts when the canonical descriptor `PAYLOAD_SECRET_IDENTITY` recomputes to the sealed `contextUuid`.
3. Optional override: `PAYLOAD_SECRET_IDENTITY_JSON` for custom identity descriptors.

**Law — payload secrets are sealed at rest; decryption requires content-uuid identity proof. Wrong uuid, tampered ciphertext, or missing `ERPAX_SEAL_KEY` ⇒ fail closed.**

@see [[integrity]] · [[seal]] · [[nist/sp/800/38]] · [[config]] · [[deploy]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP 800-38D AES-GCM`
- `@standard RFC 5869 HKDF`
