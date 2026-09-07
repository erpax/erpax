---
name: users
description: "Use when managing authenticated actors — employees, agents, customers, authors — their cross-tenant roles, held competencies, per-user locale/display config, email login, and access credentials. The typeless universal actor and identity root."
atomPath: users
coordinate: "users · 8/crest · 42211147"
contentUuid: "7f831de6-3de8-54fa-aaf7-bad8e5074d9d"
diamondUuid: "00522e91-c597-83c0-af40-20ea9ce1150c"
uuid: "42211147-c86d-8ff2-8634-5678d347140c"
horo: 8
typography:
  partition: users
  bondDegree: 49
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
  computationUuid: "7242662c-aab4-81ba-b8b4-2f631f60a15e"
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
      stageUuid: "4f13c461-1d95-890d-ac02-79de401653d7"
    - stage: seal
      stageUuid: "af36f393-0108-8314-85ab-0d24fd9ca813"
    - stage: uuid
      stageUuid: "3b070246-2045-8720-becd-96a3d5aceccd"
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
