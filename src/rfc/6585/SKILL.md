---
name: "6585"
description: Use when implementing or referencing RFC 6585 — Additional HTTP Status Codes.
atomPath: rfc/6585
coordinate: rfc/6585 · 4/weave · 26cb44dc
contentUuid: "ff77ed4b-703b-5086-8a8b-53e151a026af"
diamondUuid: "fecbacac-03e2-8237-bff0-3ea6f442c142"
uuid: "26cb44dc-4954-8441-b900-47fc573cc747"
horo: 4
bonds:
  in: []
  out:
    - "3986"
typography:
  partition: rfc
  bondDegree: 0
  neighbors: []
standards:
  - "6585 §4 too-many-requests-429"
  - "OWASP-ASVS"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "a7fdaff3-54a5-8e90-894c-1053d9db5293"
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
      stageUuid: "e9ffffb7-d6f0-8175-9d75-d5222f1b0072"
    - stage: seal
      stageUuid: "b4e181a2-5f88-8d80-b211-a9b4554c728a"
    - stage: uuid
      stageUuid: "8b5b4a01-2a2d-81d2-ae92-43ea9fa0380c"
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
