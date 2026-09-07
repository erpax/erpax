---
name: secret
description: "Use when sealing Payload CMS secrets at rest or unsealing them at boot — encrypt under AES-256-GCM with the content-uuid in AAD; decrypt only when the presented uuid matches the expected content identity (fail-closed)."
atomPath: secret
coordinate: "secret · 4/weave · 9fdad87e"
contentUuid: "06885dea-f1c4-517e-a7bf-3d9718779be8"
diamondUuid: "947e5ca7-6730-8708-881d-e57a2f41cc9e"
uuid: "9fdad87e-97bc-8aa7-9ccc-91c15bdba40b"
horo: 4
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
  computationUuid: "81bdf4a0-758b-88d9-be40-61e4251e7f4a"
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
      stageUuid: "8e38158c-a399-811e-9241-eb9fe98fcfaf"
    - stage: seal
      stageUuid: "a1e7e5e6-b628-8c5a-b3ea-21251d58227c"
    - stage: uuid
      stageUuid: "3c4ced6f-fbb2-848a-921d-f7353b727b3d"
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
