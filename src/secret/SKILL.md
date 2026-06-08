---
name: secret
description: "Use when sealing Payload CMS secrets at rest or unsealing them at boot — encrypt under AES-256-GCM with the content-uuid in AAD; decrypt only when the presented uuid matches the expected content identity (fail-closed)."
atomPath: secret
coordinate: secret · 2/share · 2d237c54
contentUuid: "ddb1a136-79d3-5b9f-9ab9-a82f0c3148dc"
diamondUuid: "a329b3df-fa51-8e11-95c5-6c3363dbb74c"
uuid: "2d237c54-837a-881a-bb99-f6464bb048e3"
horo: 2
bonds:
  in:
    - "38"
    - ai
    - cloudflare
    - config
    - deploy
    - innovation
    - integrity
    - seal
  out:
    - "38"
    - ai
    - cloudflare
    - config
    - deploy
    - innovation
    - integrity
    - seal
typography:
  partition: secret
  bondDegree: 28
  neighbors:
    - ai
    - cloudflare
    - innovation
standards:
  - "NIST SP 800-38D AES-GCM"
  - RFC 5869 HKDF
bindings: []
neighbors:
  wikilink:
    - "38"
    - config
    - deploy
    - integrity
    - seal
  matrix:
    - "38"
    - ai
    - cloudflare
    - config
    - deploy
    - innovation
    - integrity
    - seal
  backlinks:
    - "38"
    - ai
    - cloudflare
    - config
    - deploy
    - innovation
    - integrity
    - seal
signatures:
  computationUuid: "3757508d-ad3b-86bd-952d-77a81bddbc13"
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
      stageUuid: "57a1b14f-67d1-8e3c-a101-ad20fed12b15"
    - stage: seal
      stageUuid: "48f71197-9b4b-8171-8256-02c061cba23b"
    - stage: uuid
      stageUuid: "9fedb7fa-9851-8469-8e56-25675b491c3a"
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
