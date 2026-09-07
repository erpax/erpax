---
name: records
description: "Use when recording or auditing data-subject consent events — marketing, analytics, profiling, third-party sharing, cookies — with lawful-basis, exact consent text, version, capture method, IP/user-agent evidence, and withdrawal tracking; GDPR Art.6(1)(a)/Art.7 lawful-basis and right-to-withdraw. The append-mostly consent-evidence ledger."
atomPath: "consent/records"
coordinate: "consent/records · 2/share · ccdd023f"
contentUuid: "39c8130b-8b6e-561c-864d-db8cb4932c7d"
diamondUuid: "1c1cf36c-d722-8889-9874-c674e4ea47a8"
uuid: "ccdd023f-7c56-8e37-9eff-eb5b3f5dfe07"
horo: 2
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
  computationUuid: "07546b71-4050-82c7-8efa-aa1cb1987f1f"
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
      stageUuid: "8a3476de-34df-885f-b821-4477aac3f7a8"
    - stage: seal
      stageUuid: "812331dd-6c70-829f-bdb0-90903b6b3af3"
    - stage: uuid
      stageUuid: "c297173c-6428-89ba-85ad-5d79678ff779"
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
