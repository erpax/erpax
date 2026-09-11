---
name: "6585"
description: Use when implementing or referencing RFC 6585 — Additional HTTP Status Codes.
atomPath: "rfc/6585"
coordinate: "rfc/6585 · 7/descent · 4b790b5d"
contentUuid: "7a184a14-b5d5-527b-ac2c-bd192b3721e7"
diamondUuid: "0b3bac9a-4168-86ed-91b2-b6179b5162c8"
uuid: "4b790b5d-7975-8e6b-a3c5-6b0ea2aec25a"
horo: 7
typography:
  partition: rfc
  bondDegree: 3
standards:
  - "6585 §4 too-many-requests-429"
  - "OWASP-ASVS"
bindings: []
signatures:
  computationUuid: "45705699-7048-8e8e-bd53-f8a2db6728c5"
  stages:
    - stage: path
      stageUuid: "a0ced5ca-4291-8dba-b516-8cf794f431f2"
    - stage: trinity
      stageUuid: "ee59759e-bf2c-8b65-a3d8-15d669d5f2f9"
    - stage: boundary
      stageUuid: "0bfccefd-db6c-876c-ae25-4b4110972403"
    - stage: links
      stageUuid: "9a87a8b0-e431-8d52-84e9-25002d42289c"
    - stage: horo
      stageUuid: "c1244629-2879-8871-8bed-d75819d06544"
    - stage: seal
      stageUuid: "b4e181a2-5f88-8d80-b211-a9b4554c728a"
    - stage: uuid
      stageUuid: "f1f948b8-b53e-8d08-821e-8cb189a357d5"
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

- `src/users/endpoints/externalUsersLogin.ts` — credential-stuffing
  mitigation on the external-users login route.

## Production note

The current implementation uses an in-memory `Map<>` and is correct only on a
single-process deployment. For multi-worker / Cloudflare-Workers / edge
deployments, swap the `Map<>` for KV / Redis so the limit window is shared.

## Out of scope

- `428 Precondition Required` — defined in RFC 6585 §3 but not used.
- `431 Request Header Fields Too Large` — RFC 6585 §5; not used.
- `511 Network Authentication Required` — RFC 6585 §6; not used.

Composes: [[standards]].
