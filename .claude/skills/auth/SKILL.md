---
name: auth
description: Use when enabling or configuring Payload authentication on a collection — login/logout, JWT/cookies, API keys, email verification, password reset, login lockout, token expiration, or admin-panel user accounts.
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

## Common mistakes
- Non-secure cookies in production (set `cookies.secure: true` behind SSL).
- No `maxLoginAttempts`/`lockTime` → brute-force exposure (see [[harden]]).
- Adding a singular `tenant` to the auth/users collection (use the plugin's `tenants` array).
