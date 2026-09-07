---
name: users
description: "Use when managing authenticated actors — employees, agents, customers, authors — their cross-tenant roles, held competencies, per-user locale/display config, email login, and access credentials. The typeless universal actor and identity root."
atomPath: users
coordinate: "users · 2/share · 5f33bcea"
contentUuid: "f9e1594c-a0fa-55ea-97e0-81b5a900dc75"
diamondUuid: "07fbd677-7f86-81db-abf7-144bda6037e5"
uuid: "5f33bcea-0892-8e44-82db-5213b96645c3"
horo: 2
typography:
  partition: users
  bondDegree: 47
standards:
  - "5321 smtp envelope"
  - "5322 internet-message-format email"
  - "6532 internationalized-email-addresses"
  - "BCP-47 language-tag user-locale"
  - "BCP-47 language-tag user-locale-preference"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "GDPR Art.12 transparent-information user-language-of-choice"
  - "GDPR Art.32 security-of-processing"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "ISO-19011`"
  - "ISO-27002"
  - "ISO/IEC-27001:2022`"
  - "ISO/IEC-27002:2022"
  - "ISO/IEC-27002:2022`"
  - "OWASP-ASVS"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
signatures:
  computationUuid: "83616fa6-92cb-8786-a095-c40bec996a89"
  stages:
    - stage: path
      stageUuid: "12589957-b73f-8bcb-b034-a2e3043d5eef"
    - stage: trinity
      stageUuid: "931fc0b4-f393-8918-9869-166055aaa9a6"
    - stage: boundary
      stageUuid: "6263b4ef-b007-8e2d-9183-c2ab6466e4be"
    - stage: links
      stageUuid: "54bcc628-71f0-8ed7-ba34-ca31526f04be"
    - stage: horo
      stageUuid: "ec11d9a5-f0c0-8329-ab08-3f92fc8a5a8d"
    - stage: seal
      stageUuid: "af36f393-0108-8314-85ab-0d24fd9ca813"
    - stage: uuid
      stageUuid: "e2b835dc-09e2-819f-8cd5-1150efb8c3e1"
version: 2
---
# users

Users — authenticated identities (cross-tenant via tenants[] membership).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO/IEC-27002:2022`
- `@standard ISO-19011`

- RFC 5322 internet-message-format email
- RFC 5321 smtp envelope
- RFC 6532 internationalized-email-addresses
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

**Law — [[law]]: a user is the ONE typeless universal actor and [[identity]] root — employee = agent = customer = author — holding cross-tenant membership, competencies, per-user locale/config, and email-login credentials; the type is a role the actor carries, never a separate table.**

Composes: [[train]] · [[identity]] · [[auth]] · [[access]] · [[field]] · [[config]].
