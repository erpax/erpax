---
name: users
description: "Use when managing authenticated actors — employees, agents, customers, authors — their cross-tenant roles, held competencies, per-user locale/display config, email login, and access credentials. The typeless universal actor and identity root."
atomPath: users
coordinate: users · 4/weave · 185bb242
contentUuid: "f8f4cac8-4b2c-5589-8501-67bec6375457"
diamondUuid: "5a4a32d7-5f55-8562-a684-6e047938bee7"
uuid: "185bb242-add5-8b8f-ac60-8fbf99ff9d7c"
horo: 4
bonds:
  in:
    - access
    - activities
    - agent
    - auth
    - config
    - fields
    - identity
    - instances
    - law
    - posts
    - queue
    - requests
    - roles
    - suggestions
    - ticket
    - train
  out:
    - access
    - activities
    - agent
    - auth
    - config
    - fields
    - identity
    - instances
    - law
    - posts
    - queue
    - requests
    - roles
    - suggestions
    - ticket
    - train
typography:
  partition: users
  bondDegree: 0
  neighbors: []
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
  - "ISO-19011:2018 audit-trail user-config-change"
  - "OWASP-ASVS"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
neighbors:
  wikilink:
    - access
    - auth
    - config
    - fields
    - identity
    - law
    - train
  matrix:
    - access
    - activities
    - agent
    - auth
    - config
    - fields
    - identity
    - instances
    - law
    - posts
    - queue
    - requests
    - roles
    - suggestions
    - ticket
    - train
  backlinks:
    - access
    - activities
    - agent
    - auth
    - config
    - fields
    - identity
    - instances
    - law
    - posts
    - queue
    - requests
    - roles
    - suggestions
    - ticket
    - train
signatures:
  computationUuid: "4238e516-7d86-8e0e-8e58-bf5613573062"
  stages:
    - stage: path
      stageUuid: "12589957-b73f-8bcb-b034-a2e3043d5eef"
    - stage: trinity
      stageUuid: "931fc0b4-f393-8918-9869-166055aaa9a6"
    - stage: boundary
      stageUuid: "6263b4ef-b007-8e2d-9183-c2ab6466e4be"
    - stage: links
      stageUuid: "9504a884-7be9-816c-a2e7-0fc6c1be1a58"
    - stage: horo
      stageUuid: "180661ea-433d-8a58-ae5a-1a307afdde9e"
    - stage: seal
      stageUuid: "3e07c4c8-a34d-8094-a596-b3918eda3310"
    - stage: uuid
      stageUuid: "f22fac31-6385-8df3-a6a9-a6c98151084e"
version: 2
---
# users

Users — authenticated identities (cross-tenant via tenants[] membership).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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

Composes: [[train]] · [[identity]] · [[auth]] · [[access]] · [[fields]] · [[config]].
