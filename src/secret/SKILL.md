---
name: secret
description: "Use when sealing Payload CMS secrets at rest or unsealing them at boot — encrypt under AES-256-GCM with the content-uuid in AAD; decrypt only when the presented uuid matches the expected content identity (fail-closed)."
atomPath: secret
coordinate: "secret · 7/descent · f55a9431"
contentUuid: "961551cc-9d30-5cd4-8bb5-af8f5e4c0521"
diamondUuid: "7d66b001-bea3-86dc-b9e0-9dfcee926bb4"
uuid: "f55a9431-39dd-85de-9d50-9e34064113f0"
horo: 7
typography:
  partition: secret
  bondDegree: 28
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
  computationUuid: "473761d6-c482-8d06-95df-05271f2103aa"
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
      stageUuid: "fcc0492a-dc2f-8227-885d-514ae14771fd"
    - stage: seal
      stageUuid: "a1e7e5e6-b628-8c5a-b3ea-21251d58227c"
    - stage: uuid
      stageUuid: "1779e2eb-e0da-8dff-968d-78e77a7617fb"
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
