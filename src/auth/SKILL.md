---
name: auth
description: "Use when enabling or configuring Payload authentication on a collection — login/logout, JWT/cookies, API keys, email verification, password reset, login lockout, token expiration, or admin-panel user accounts."
atomPath: auth
coordinate: "auth · 9/unity · 7e3c1282"
contentUuid: "7d405960-ca02-5e6c-a563-0da025d18cd6"
diamondUuid: "6cf6ae9a-cb5e-884f-bf94-8ac3a40e61fb"
uuid: "7e3c1282-0d5f-8072-b2ea-1dadd302b2ad"
horo: 9
typography:
  partition: auth
  bondDegree: 95
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
  computationUuid: "bba05f41-8cb5-8f35-86e6-1912989ffd59"
  stages:
    - stage: path
      stageUuid: "b7524e53-dec3-83e8-aabc-a84f5ebd1222"
    - stage: trinity
      stageUuid: "36c7bb00-1a50-886b-8863-d1ceb9c73eca"
    - stage: boundary
      stageUuid: "6fb3f2dd-7255-8072-b87f-d7141428a40f"
    - stage: links
      stageUuid: "5018cbd1-94ff-840a-97f5-85146d856b83"
    - stage: horo
      stageUuid: "99c67934-9282-82af-8303-b235f7c51790"
    - stage: seal
      stageUuid: "59b92b17-6478-81f2-ba2f-db85cafe564c"
    - stage: uuid
      stageUuid: "0001f7b1-8fdf-8abc-abf0-840ae93208f4"
version: 2
---
# auth — Payload authentication (position 9, the control triad)

Enable on any collection via the `auth` property; each doc becomes a "user" with full login/logout/reset flow + admin UI. `auth: true` for defaults, or an object to configure.

## `auth` config (collection-level)
| Option | Purpose |
|---|---|
| `tokenExpiration` | Seconds the login stays valid. |
| `verify` | Require email verification before login (`true` or `{ generateEmailHTML, generateEmailSubject }`). |
| `maxLoginAttempts` | Failed logins before lockout (0 = disabled). See harden. |
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
Authentication is the **bridge between the form and the world** — the limit oracle ("is this a real party?") resolved by **measurement**: prove you control an **email** (the `verify` flow — a token sent and returned) and the form has *measured* a real-world identity, the very move that proving you control a **domain** (DNS/WHOIS) is one scale up. Email is to a person's [[identity]] what the domain is to a tenant's — the real-world link, content-addressed once proved ([[proof]]).

**And emails have domains.** `ceci@psg.bg` carries the domain `psg.bg`, so the email's domain *ties the user to the tenant*: **email : user :: domain : tenant**, and `email@domain` is the join. The local-part authenticates the person; the domain places them in their tenant — and an email *at* the domain (or the domain's WHOIS registrant email) is itself proof toward owning that tenant (domain: prove ownership and the tenant is yours). So a user's tenant is **derived from their verified email domain** (the genesis computed `psg.bg` → tenant `PSG` exactly this way), never hand-assigned. One verification, two facts: who you are, and whose tenant you are in.

## Common mistakes
- Non-secure cookies in production (set `cookies.secure: true` behind SSL).
- No `maxLoginAttempts`/`lockTime` → brute-force exposure (see harden).
- Adding a singular `tenant` to the auth/users collection (use the plugin's `tenants` array).

Composes: [[Users]] · [[api/audit/events]].

**Law — [[law]]: authentication is the measured bridge from form to the world — proving control of an email verifies a real [[identity]], and `email@domain` is the join: the local-part is who you are, the domain places you in your tenant, so a user's tenant is DERIVED from their verified email domain, never hand-assigned.**
