---
name: records
description: "Use when recording or auditing data-subject consent events — marketing, analytics, profiling, third-party sharing, cookies — with lawful-basis, exact consent text, version, capture method, IP/user-agent evidence, and withdrawal tracking; GDPR Art.6(1)(a)/Art.7 lawful-basis and right-to-withdraw. The append-mostly consent-evidence ledger."
atomPath: "consent/records"
coordinate: "consent/records · 8/crest · 4d7f46c0"
contentUuid: "3821f559-6c61-5388-902c-4769dc21d971"
diamondUuid: "242732ca-dc78-82da-bcb2-7eef26462157"
uuid: "4d7f46c0-cc12-84a4-9b0b-def2d99849a7"
horo: 8
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
  computationUuid: "25036e72-2cb8-8d77-9cc1-567b00e9e7e5"
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
      stageUuid: "a3b67ee0-5a2a-84ed-9fcf-e8967cf8e834"
    - stage: seal
      stageUuid: "812331dd-6c70-829f-bdb0-90903b6b3af3"
    - stage: uuid
      stageUuid: "6d703fb8-5ed9-8e39-a5ba-b072b0fab187"
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
