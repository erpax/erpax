---
name: "6585"
description: Use when implementing or referencing RFC 6585 — Additional HTTP Status Codes.
atomPath: "rfc/6585"
coordinate: "rfc/6585 · 4/weave · d4d0690c"
contentUuid: "ccf4affb-ac60-52ab-807d-f0b757f71261"
diamondUuid: "5fb96121-f10c-85e7-ac3d-3334afd1d74d"
uuid: "d4d0690c-4775-83dc-8a15-01d84ec62e82"
horo: 4
typography:
  partition: rfc
  bondDegree: 3
standards:
  - "6585 §4 too-many-requests-429"
  - "OWASP-ASVS"
bindings: []
signatures:
  computationUuid: "0c88fdf6-c561-827f-8ab2-80b4b878c8a9"
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
      stageUuid: "67335b9a-79e5-89c0-87dd-c73ab9b04d35"
    - stage: seal
      stageUuid: "b4e181a2-5f88-8d80-b211-a9b4554c728a"
    - stage: uuid
      stageUuid: "a41c6ec3-6621-8907-b077-ab7bb191ca81"
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
