---
name: oauth
description: "Use when acquiring or refreshing an external OAuth 2.0 token — the credential lifecycle (acquire → use → expire → refresh) and scope/least-privilege check, encoded as pure policy. The token-endpoint HTTP is a runtime boundary; the lifecycle logic is native and tested. One atom serves every external API (Google Workspace, country-apis…), with secrets resolved per-tenant via the credential broker — never in the registry."
atomPath: oauth
coordinate: "oauth · 4/weave · fbdf93c8"
contentUuid: "95a09007-7a5c-5fc8-a2d7-0808e7081636"
diamondUuid: "5eb69d12-9393-8ad4-9bf2-c1feb7187840"
uuid: "fbdf93c8-8ce6-81bc-821a-5be0f0fc6009"
horo: 4
typography:
  partition: oauth
  bondDegree: 21
standards:
  - "IETF RFC 6749 OAuth 2.0 (grant types, token lifecycle)"
  - IETF RFC 6750 Bearer token usage
  - "RFC-6749"
  - "RFC-6749`"
  - "RFC-6750"
  - "RFC-6750`"
bindings: []
signatures:
  computationUuid: "5b4b88e9-e58b-8f57-9711-4a608329d7b0"
  stages:
    - stage: path
      stageUuid: "d07fbf41-c23b-8f0d-a2d7-62625618a7f3"
    - stage: trinity
      stageUuid: "ae9f069c-fae3-8ab6-97e3-67c4a47a58c4"
    - stage: boundary
      stageUuid: "77857131-80c4-8c65-b0c6-f3313baa2226"
    - stage: links
      stageUuid: "0cb2eee2-19df-8e3b-9355-47f2fef8b615"
    - stage: horo
      stageUuid: "99f51460-d891-8c38-852c-549dab69b5c3"
    - stage: seal
      stageUuid: "a4603486-5c74-8e5b-9b76-ca6b7c897db2"
    - stage: uuid
      stageUuid: "6b68b59a-31bc-8698-a505-d8f5b6a22525"
version: 2
---
# oauth — the external-credential lifecycle (acquire · refresh · scope), one atom

FORM: **the OAuth 2.0 token lifecycle is pure policy; the token-endpoint call is the only I/O boundary.** `nextGrant(token, now)` decides what to do — no token ⇒ acquire (`authorization_code` or `client_credentials`), a valid token ⇒ nothing, an expired token with a refresh token ⇒ `refresh_token`. `isExpired` honours a refresh skew so a token is renewed BEFORE it lapses. `scopesCovered(granted, requested)` enforces least-privilege — an action may run only if its scopes fit within the grant ([[access]]). The actual HTTPS call to the provider's token endpoint is a runtime boundary the policy drives, exactly like [[sandbox]]'s isolation edge.

**One atom, every external API, secrets per-tenant.** The same lifecycle serves [[google/workspace]], the country-apis, and any OAuth provider — DRY, no per-service duplication. A tenant's client id / secret / refresh token live in the per-tenant config sandbox and are released only through the credential broker ([[sandbox]] `brokerCredential`: the holder names a handle, the host injects the value, the token never sits in the registry) — the same `country-apis` law. erpax acquires and holds external credentials without ever embedding them, and rotates them by lifecycle, not by hand.

Matter-twin: `src/services/oauth/index.ts` (`GrantType`·`OAuthToken`·`isExpired`·`nextGrant`·`scopesCovered`) + `index.test.ts`. Composes: [[sandbox]] · [[access]] · [[identity]] · [[google/workspace]] · [[self]].

**Law — [[law]]: the OAuth 2.0 token lifecycle (acquire · refresh · scope) is pure policy and the token-endpoint call is the only I/O boundary; one atom serves every external API with least-privilege [[access]] and per-tenant secrets released only through the [[sandbox]] broker — never in the registry.**

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard RFC-6749`
- `@standard RFC-6750`


- IETF RFC 6749 OAuth 2.0 (grant types, token lifecycle)
- IETF RFC 6750 Bearer token usage

## Common mistakes
- Refreshing only after a 401 — refresh on a skew BEFORE expiry (`isExpired` with `skewSeconds`); a just-expired token mid-request is avoidable.
- Requesting broad scopes up front — request the minimum and check `scopesCovered`; widen only when an action needs it ([[access]] least-privilege).
- Storing the client secret in the API registry — it lives per-tenant and flows through the broker ([[sandbox]]); the registry is credential-free (the `country-apis` law).
