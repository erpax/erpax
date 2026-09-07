---
name: users
description: "Use when managing authenticated actors — employees, agents, customers, authors — their cross-tenant roles, held competencies, per-user locale/display config, email login, and access credentials. The typeless universal actor and identity root."
atomPath: users
coordinate: "users · 7/descent · 5d807121"
contentUuid: "91810e27-9796-5522-9b3a-1f3f8fa048a1"
diamondUuid: "bf110796-99ad-8ec0-886e-072417213176"
uuid: "5d807121-ade0-8262-aa57-e8af8167e3d9"
horo: 7
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
  computationUuid: "2d6a5eb0-e2ab-87eb-b231-50141fb88261"
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
      stageUuid: "08553ae8-5d12-8f9f-b202-e4aa6f761cdc"
    - stage: seal
      stageUuid: "af36f393-0108-8314-85ab-0d24fd9ca813"
    - stage: uuid
      stageUuid: "56ba10f7-7664-8dec-aea9-fb3731476918"
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
