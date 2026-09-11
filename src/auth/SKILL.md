---
name: auth
description: "Use when enabling or configuring Payload authentication on a collection — login/logout, JWT/cookies, API keys, email verification, password reset, login lockout, token expiration, or admin-panel user accounts."
atomPath: auth
coordinate: "auth · 9/unity · 9ca6cba4"
contentUuid: "2cc983c8-3428-5e3f-af09-617d700711f7"
diamondUuid: "cb528a28-0fc7-88de-ac58-3344e7320895"
uuid: "9ca6cba4-8fdb-83ea-a699-6ecc134ba6c6"
horo: 9
typography:
  partition: auth
  bondDegree: 106
standards:
  - "NIST INCITS-359-2012 rbac object-scoped-role-assignment"
  - "NIST INCITS-359-2012 role-based-access-control"
  - "NIST SP-800-162 attribute-based-access-control"
  - "NIST-INCITS-359-2012"
  - "NIST-SP-800-162"
  - "NIST-SP-800-63"
  - "OWASP-ASVS"
  - "OWASP-ASVS V4 access-control"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "3cd1fbc7-f0e4-816a-8723-4e94ac4219b8"
  stages:
    - stage: path
      stageUuid: "b7524e53-dec3-83e8-aabc-a84f5ebd1222"
    - stage: trinity
      stageUuid: "36c7bb00-1a50-886b-8863-d1ceb9c73eca"
    - stage: boundary
      stageUuid: "b17d2d8d-9ba1-8dc0-a435-4e716f6021ee"
    - stage: links
      stageUuid: "e2230da0-7d68-83ab-97f6-404745395947"
    - stage: horo
      stageUuid: "9d052b90-865e-8734-b71a-ae74ba4170ad"
    - stage: seal
      stageUuid: "59b92b17-6478-81f2-ba2f-db85cafe564c"
    - stage: uuid
      stageUuid: "98382869-bff4-8bc9-a738-bfad334ab04a"
version: 2
---
# auth — Payload authentication (position 9, the control triad)

Enable on any collection via the `auth` property; each doc becomes a "user" with full login/logout/reset flow + admin UI. `auth: true` for defaults, or an object to configure.

## `auth` config (collection-level)
| Option | Purpose |
|---|---|
| `tokenExpiration` | Seconds the login stays valid. |
| `verify` | Require email verification before login (`true` or `{ generateEmailHTML, generateEmailSubject }`). |
| `maxLoginAttempts` | Failed logins before lockout (0 = disabled). See [[harden]]. |
| `lockTime` | ms locked after exceeding attempts. |
| `useAPIKey` | Enable per-user API keys. |
| `cookies` | `{ secure, sameSite, domain }` — secure cookies in prod. |
| `loginWithUsername` | Allow username (not just email) login. |
| `depth` | Depth used when the user is populated on `req`. |
| `strategies` | Custom auth strategies (SSO, etc.). |
| `disableLocalStrategy` | Turn off built-in email/password (external-only auth). |

## Operations & API
- Operations: `login`, `logout`, `me`, `refresh`, `forgot-password`, `reset-password`, `verify`, `unlock`.
- `req.user` is the authenticated doc; `payload.auth({ headers })` resolves it.
- Auth hooks: `beforeLogin`, `afterLogin`, `afterLogout`, `afterMe`, `afterRefresh`, `afterForgotPassword` (see [[hooks]]).
- The admin panel uses one auth-enabled collection (the admin User collection).

## erpax note
Multi-tenancy is layered on top via the multi-tenant plugin (users hold a `tenants` array, not a singular `tenant`); don't add a manual `tenant` to the users collection. See [[config]], [[access]].

## Authentication is the link to the real world (email — and emails have domains)
Authentication is the **bridge between the form and the world** — the [[limit]] oracle ("is this a real party?") resolved by **measurement**: prove you control an **email** (the `verify` flow — a token sent and returned) and the form has *measured* a real-world identity, the very move that proving you control a **[[domain]]** (DNS/WHOIS) is one scale up. Email is to a person's [[identity]] what the domain is to a tenant's — the real-world link, content-addressed once proved ([[proof]]).

**And emails have domains.** `ceci@psg.bg` carries the domain `psg.bg`, so the email's domain *ties the user to the tenant*: **email : user :: domain : tenant**, and `email@domain` is the join. The local-part authenticates the person; the domain places them in their tenant — and an email *at* the domain (or the domain's WHOIS registrant email) is itself proof toward owning that tenant ([[domain]]: prove ownership and the tenant is yours). So a user's tenant is **derived from their verified email domain** (the genesis computed `psg.bg` → tenant `PSG` exactly this way), never hand-assigned. One verification, two facts: who you are, and whose tenant you are in.

## Common mistakes
- Non-secure cookies in production (set `cookies.secure: true` behind SSL).
- No `maxLoginAttempts`/`lockTime` → brute-force exposure (see [[harden]]).
- Adding a singular `tenant` to the auth/users collection (use the plugin's `tenants` array).

Composes: [[Users]] · [[api/audit/events]].

**Law — [[law]]: authentication is the measured bridge from form to the world — proving control of an email verifies a real [[identity]], and `email@domain` is the join: the local-part is who you are, the domain places you in your tenant, so a user's tenant is DERIVED from their verified email domain, never hand-assigned.**
