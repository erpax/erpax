---
name: harden
description: Use when hardening a Payload app against abuse/DoS or preparing for production security review — setting query-depth/complexity limits, login lockout, GraphQL exposure, CORS/CSRF, or securing upload collections.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# harden — Payload anti-abuse & security config

Source: payloadcms.com/docs/production/preventing-abuse (+ deployment). Exact config knobs:

## Query / API limits (top-level Payload config)
| Knob | Where | Rule |
|---|---|---|
| `maxDepth` | top-level config | Cap automatic relationship population (default 10). Prevents circular-relationship infinite loops/crashes. |
| `graphQL.maxComplexity` | `graphQL` object | Reject overly expensive GraphQL queries (field cost 1, relationship/upload 10 each). |
| `graphQL.disable: true` | `graphQL` object | If GraphQL is unused, disable schema + route entirely. |

## Auth lockout (collection-level `auth`)
| Knob | Rule |
|---|---|
| `maxLoginAttempts` | Limit failed logins before lockout. |
| `lockTime` | Milliseconds locked after exceeding attempts. |

## Origin / cross-site
- Configure `cors` allowed origins for headless use.
- Enable CSRF verification in cookie/auth config.
- Secure cookies via SSL (production).

## Uploads
- Restrict `create`/`update`/`read` access on upload collections.
- Require email verification for self-registration.
- Scan uploads (e.g. ClamAV) via hooks.

## Default posture
All access-control functions require a logged-in user by default — **thoroughly test all access control before production**.

## Common mistakes
- Leaving GraphQL + introspection enabled when unused.
- No `maxDepth` cap with circular relationships → server crashes.
- Public `read` on user-uploaded files.
