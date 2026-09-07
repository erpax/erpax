---
name: records
description: "Use when recording or auditing data-subject consent events — marketing, analytics, profiling, third-party sharing, cookies — with lawful-basis, exact consent text, version, capture method, IP/user-agent evidence, and withdrawal tracking; GDPR Art.6(1)(a)/Art.7 lawful-basis and right-to-withdraw. The append-mostly consent-evidence ledger."
atomPath: "consent/records"
coordinate: "consent/records · 7/descent · b1b16768"
contentUuid: "ea050649-8ca6-5d35-8ff8-2919f5e5745d"
diamondUuid: "2422c345-99d6-84c8-bbe7-15c74560cb5e"
uuid: "b1b16768-b668-85ed-aacf-fc375dea827c"
horo: 7
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
  computationUuid: "f20baefd-f904-8b21-924f-ed3cf2c3395d"
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
      stageUuid: "27743b69-2bcc-8e4f-8a6b-fd2053d6c2bc"
    - stage: seal
      stageUuid: "812331dd-6c70-829f-bdb0-90903b6b3af3"
    - stage: uuid
      stageUuid: "5ce82e73-0979-80cd-8e72-f530bd228e10"
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
