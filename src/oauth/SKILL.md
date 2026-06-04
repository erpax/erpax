---
name: oauth
description: "Use when acquiring or refreshing an external OAuth 2.0 token — the credential lifecycle (acquire → use → expire → refresh) and scope/least-privilege check, encoded as pure policy. The token-endpoint HTTP is a runtime boundary; the lifecycle logic is native and tested. One atom serves every external API (Google Workspace, country-apis…), with secrets resolved per-tenant via the credential broker — never in the registry."
---

# oauth — the external-credential lifecycle (acquire · refresh · scope), one atom

FORM: **the OAuth 2.0 token lifecycle is pure policy; the token-endpoint call is the only I/O boundary.** `nextGrant(token, now)` decides what to do — no token ⇒ acquire (`authorization_code` or `client_credentials`), a valid token ⇒ nothing, an expired token with a refresh token ⇒ `refresh_token`. `isExpired` honours a refresh skew so a token is renewed BEFORE it lapses. `scopesCovered(granted, requested)` enforces least-privilege — an action may run only if its scopes fit within the grant ([[access]]). The actual HTTPS call to the provider's token endpoint is a runtime boundary the policy drives, exactly like [[sandbox]]'s isolation edge.

**One atom, every external API, secrets per-tenant.** The same lifecycle serves [[google/workspace]], the country-apis, and any OAuth provider — DRY, no per-service duplication. A tenant's client id / secret / refresh token live in the per-tenant config sandbox and are released only through the credential broker ([[sandbox]] `brokerCredential`: the holder names a handle, the host injects the value, the token never sits in the registry) — the same `country-apis` law. erpax acquires and holds external credentials without ever embedding them, and rotates them by lifecycle, not by hand.

Matter-twin: `src/services/oauth/index.ts` (`GrantType`·`OAuthToken`·`isExpired`·`nextGrant`·`scopesCovered`) + `index.test.ts`. Composes: [[sandbox]] · [[access]] · [[identity]] · [[google/workspace]] · [[self]].

## Standards

- IETF RFC 6749 OAuth 2.0 (grant types, token lifecycle)
- IETF RFC 6750 Bearer token usage

## Common mistakes
- Refreshing only after a 401 — refresh on a skew BEFORE expiry (`isExpired` with `skewSeconds`); a just-expired token mid-request is avoidable.
- Requesting broad scopes up front — request the minimum and check `scopesCovered`; widen only when an action needs it ([[access]] least-privilege).
- Storing the client secret in the API registry — it lives per-tenant and flows through the broker ([[sandbox]]); the registry is credential-free (the `country-apis` law).
