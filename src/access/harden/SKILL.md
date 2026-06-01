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

## Standards
Applying this skill *is* implementing these standards: every knob above is the enforced code path a control demands. A `@security`/`@standard`/`@compliance` banner is a true, testable claim only when its control ID exists in the current edition and maps to one of these paths — never decoration.

| Standard | Current version (June 2026) | One-line current form (answer-path) |
|---|---|---|
| ISO/IEC 27001 + 27002 | 27001:2022 (3rd ed., Oct 2022) + Amd 1:2024; 27002:2022 (3rd ed.) + Amd 1:2024 | Every asserted security control (access restriction, tenant isolation, auth/secret mgmt, PII masking, audit evidence) maps to an enforced code path AND cites a valid 2022-catalogue ID — Annex A / §5–§8 of the four-theme, 93-control set (e.g. A.5.23, §8.3 access restriction, A.5.35 / §5.35 independent review). 2013 numbers are retired: remap `§A.18.2`→`§5.35`, `§A.9.4.5`→`§8.3`. |
| NIST SP 800-53 | Rev. 5, Release 5.2.0 (Aug 2025); no Rev. 6 exists | Cite by Rev.-5 control-family ID (AC access, IA identification/auth, SC system & comms, SI integrity) backing a real path — not ISO-style §-numbers; pin the revision, never bare "NIST SP 800-53". |
| GDPR | Regulation (EU) 2016/679 (applicable since 25 May 2018), substantively unamended | Every PII field/operation carries a recorded lawful basis with the Art. 5/6/30/32 duties enforced — purpose limitation, data minimisation, storage limitation, security of processing, records of processing. The substantive instrument is 2016/679; do **not** conflate it with the procedural Regulation (EU) 2025/2518 (enforcement procedure only). |
| eIDAS | Regulation (EU) 910/2014 **as amended by** Regulation (EU) 2024/1183 ("eIDAS 2.0", in force 20 May 2024) | Every legally-binding signature/seal produced or verified is an eIDAS AdES/QES backed by a qualified trust-service certificate, preserving signer identity, signing time, and tamper-evidence. Cite the amended form ("910/2014 as amended by 2024/1183") — the number/year is **910/2014**, not "2014/910". |

Composes: [[config]] · [[auth]] · [[access]] · [[upload]] · [[optimize]] · [[deploy]].

## Common mistakes
- Leaving GraphQL + introspection enabled when unused.
- No `maxDepth` cap with circular relationships → server crashes.
- Public `read` on user-uploaded files.
