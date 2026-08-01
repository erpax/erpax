---
name: "6585"
description: Use when implementing or referencing RFC 6585 — Additional HTTP Status Codes.
atomPath: "rfc/6585"
coordinate: "rfc/6585 · 8/crest · 4493ce7a"
contentUuid: "41c47373-8f74-5649-82ad-3005e5e4f2c6"
diamondUuid: "de85fa6e-de43-8b84-b3ad-bdeb543ea92b"
uuid: "4493ce7a-a5be-87f5-8452-4dbf3ffff253"
horo: 8
typography:
  partition: rfc
  bondDegree: 0
standards:
  - "6585 §4 too-many-requests-429"
  - "OWASP-ASVS"
bindings: []
signatures:
  computationUuid: "0d09c57d-7d93-8477-ae43-7db33c8dc864"
  stages:
    - stage: path
      stageUuid: "a0ced5ca-4291-8dba-b516-8cf794f431f2"
    - stage: trinity
      stageUuid: "ee59759e-bf2c-8b65-a3d8-15d669d5f2f9"
    - stage: boundary
      stageUuid: "0bfccefd-db6c-876c-ae25-4b4110972403"
    - stage: links
      stageUuid: "b42849c7-6687-800f-a56f-ef22fe0ecbea"
    - stage: horo
      stageUuid: "ab4e6964-2a60-811c-a875-f721e919f2e9"
    - stage: seal
      stageUuid: "b4e181a2-5f88-8d80-b211-a9b4554c728a"
    - stage: uuid
      stageUuid: "092b075b-d26b-8b0a-8317-7a40bbf29590"
version: 2
---
# RFC 6585 — Additional HTTP Status Codes

**Edition:** RFC 6585 (Apr 2012).
**Publisher:** <https://www.rfc-editor.org/info/rfc6585>

## What's here

- `rate-limit.ts` — `getRateLimitKey`, `checkRateLimit`, `clearRateLimit`,
  `getRateLimitResetSeconds`. Implements the **§4 `429 Too Many Requests`**
  response semantics with an in-memory window-counter.

## Companion citations

- **RFC 9110 §15.5.29** — current `429 Too Many Requests` definition (RFC 9110
  superseded RFC 7231 which superseded RFC 6585).
- **OWASP ASVS V2.2** — authentication-throttling.
- **NIST SP-800-63B §5.2.2** — rate-limiting recommendations.

## Used by

- `src/collections/Users/endpoints/externalUsersLogin.ts` — credential-stuffing
  mitigation on the external-users login route.

## Production note

The current implementation uses an in-memory `Map<>` and is correct only on a
single-process deployment. For multi-worker / Cloudflare-Workers / edge
deployments, swap the `Map<>` for KV / Redis so the limit window is shared.

## Out of scope

- `428 Precondition Required` — defined in RFC 6585 §3 but not used.
- `431 Request Header Fields Too Large` — RFC 6585 §5; not used.
- `511 Network Authentication Required` — RFC 6585 §6; not used.
