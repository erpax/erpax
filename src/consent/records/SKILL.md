---
name: records
description: "Use when recording or auditing data-subject consent events — marketing, analytics, profiling, third-party sharing, cookies — with lawful-basis, exact consent text, version, capture method, IP/user-agent evidence, and withdrawal tracking; GDPR Art.6(1)(a)/Art.7 lawful-basis and right-to-withdraw. The append-mostly consent-evidence ledger."
atomPath: "consent/records"
coordinate: "consent/records · 4/weave · f0619056"
contentUuid: "30ba18cf-2aa8-5377-9633-1b83da2b0440"
diamondUuid: "f79ad602-0959-801d-8086-8292e51b72cf"
uuid: "f0619056-5fa1-86d8-b80e-701bd533f385"
horo: 4
typography:
  partition: consent
  bondDegree: 30
standards:
  - "GDPR Art.6(1)(a) lawful-basis-consent"
  - "GDPR Art.7 conditions-for-consent"
  - "GDPR Art.7(3) right-to-withdraw-consent"
  - "ISO-27701:2019 §6.3.1.4 record-of-consent"
  - "ISO-8601-1:2019 date-time given-at withdrawn-at"
  - "ISO-8601-1:2019 date-time given-at withdrawn-at`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7666945c-6904-8aad-a1cc-38775512dee8"
  stages:
    - stage: path
      stageUuid: "82c5246a-69c9-8a5b-8c1f-8a387dae48dc"
    - stage: trinity
      stageUuid: "b10145e6-eb20-8887-80e8-8ccb0917bf2b"
    - stage: boundary
      stageUuid: "973c6f80-0352-8d14-87fa-dee9324e7b7c"
    - stage: links
      stageUuid: "2c2208ad-7ab5-8821-8e86-8ededa218409"
    - stage: horo
      stageUuid: "58884f5b-4158-8156-8271-d91dff69aa75"
    - stage: seal
      stageUuid: "812331dd-6c70-829f-bdb0-90903b6b3af3"
    - stage: uuid
      stageUuid: "09674198-82d9-8c24-8e08-a87648358a57"
version: 2
---
# consent-records

Consent Records — GDPR Art.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time given-at withdrawn-at`

- ISO-8601-1:2019 date-time given-at withdrawn-at
- GDPR Art.6(1)(a) lawful-basis-consent
- GDPR Art.7 conditions-for-consent
- GDPR Art.7(3) right-to-withdraw-consent
- ISO-27701:2019 §6.3.1.4 record-of-consent
- ISO-19011:2018 audit-trail consent-evidence
- ISO-27001 A.5.34 privacy-and-pii

Composes: [[identity]] · [[standard]] · [[access]] · [[hooks]] · [[field]].
