---
name: auth
description: "Use when enabling or configuring Payload authentication on a collection — login/logout, JWT/cookies, API keys, email verification, password reset, login lockout, token expiration, or admin-panel user accounts."
atomPath: auth
coordinate: "auth · 3/3 · f8e7de5f"
contentUuid: "bb993672-5927-5d63-97bf-b32376dd8f44"
diamondUuid: "bf1c7542-2db4-8c1e-9bc7-504e39000ea4"
uuid: "f8e7de5f-2e3e-82e3-9e5b-39b9729dad99"
horo: 3
bonds:
  in:
    - access
    - accounts
    - admin
    - agent
    - atom
    - authenticated
    - axis
    - biometric
    - coil
    - collections
    - config
    - cross
    - domain
    - events
    - harden
    - hooks
    - horo
    - identity
    - law
    - limit
    - mcp
    - messages
    - obligations
    - owners
    - proof
    - published
    - rodin
    - skills
    - submissions
    - trinity
    - users
  out:
    - access
    - accounts
    - admin
    - agent
    - atom
    - authenticated
    - axis
    - biometric
    - coil
    - collections
    - config
    - cross
    - domain
    - events
    - harden
    - hooks
    - horo
    - identity
    - law
    - limit
    - mcp
    - messages
    - obligations
    - owners
    - proof
    - published
    - rodin
    - skills
    - submissions
    - trinity
    - users
typography:
  partition: auth
  bondDegree: 97
  neighbors: []
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
neighbors:
  wikilink:
    - access
    - config
    - domain
    - events
    - harden
    - hooks
    - identity
    - law
    - limit
    - proof
    - users
  matrix:
    - access
    - accounts
    - admin
    - agent
    - atom
    - authenticated
    - axis
    - biometric
    - coil
    - collections
    - config
    - cross
    - domain
    - events
    - harden
    - hooks
    - horo
    - identity
    - law
    - limit
    - mcp
    - messages
    - obligations
    - owners
    - proof
    - published
    - rodin
    - skills
    - submissions
    - trinity
    - users
  backlinks:
    - access
    - accounts
    - admin
    - agent
    - atom
    - authenticated
    - axis
    - biometric
    - coil
    - collections
    - config
    - cross
    - domain
    - events
    - harden
    - hooks
    - horo
    - identity
    - law
    - limit
    - mcp
    - messages
    - obligations
    - owners
    - proof
    - published
    - rodin
    - skills
    - submissions
    - trinity
    - users
signatures:
  computationUuid: "f7ff607c-3f33-80db-892e-39b693c68e3c"
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
      stageUuid: "525bca55-40e0-8b67-b010-a089d5fcdd84"
    - stage: seal
      stageUuid: "59b92b17-6478-81f2-ba2f-db85cafe564c"
    - stage: uuid
      stageUuid: "6e0bb746-d381-88d8-ab3e-b2c038545a9f"
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
