---
name: users
description: The users collection — Users — authenticated identities (cross-tenant via tenants[] membership)
---

# users

Users — authenticated identities (cross-tenant via tenants[] membership).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- BCP-47 language-tag user-locale
- ISO-27001 A.5.16 identity-management
- ISO-27001 A.5.17 authentication-information
- ISO-27002 §8.5 secure-authentication
- GDPR Art.6(1)(b) lawful-basis-contract
- GDPR Art.32 security-of-processing
- SOC-2 CC6.1 logical-access-controls
- BCP-47 language-tag user-locale-preference
- ECMA-402 internationalization-api
- GDPR Art.12 transparent-information user-language-of-choice
- ISO-27002 §5.15 access-control per-user-feature-flags
- ISO-19011:2018 audit-trail user-config-change

Composes: [[train]] · [[identity]] · [[auth]] · [[access]] · [[fields]] · [[config]].
