---
name: records
description: "Use when recording or auditing data-subject consent events — marketing, analytics, profiling, third-party sharing, cookies — with lawful-basis, exact consent text, version, capture method, IP/user-agent evidence, and withdrawal tracking; GDPR Art.6(1)(a)/Art.7 lawful-basis and right-to-withdraw. The append-mostly consent-evidence ledger."
atomPath: "consent/records"
coordinate: "consent/records · 4/weave · 08a47d3f"
contentUuid: "53a8c9ee-4b0a-5ee8-b0f8-a24698efc073"
diamondUuid: "5c9255c6-cddc-89a9-87f3-ae6068d6910d"
uuid: "08a47d3f-7c69-8042-a1b0-8bc130eac509"
horo: 4
bonds:
  in:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
  out:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
typography:
  partition: consent
  bondDegree: 30
  neighbors: []
standards:
  - "GDPR Art.6(1)(a) lawful-basis-consent"
  - "GDPR Art.7 conditions-for-consent"
  - "GDPR Art.7(3) right-to-withdraw-consent"
  - "ISO-27701:2019 §6.3.1.4 record-of-consent"
  - "ISO-8601-1:2019 date-time given-at withdrawn-at"
  - "ISO-8601-1:2019 date-time given-at withdrawn-at`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - fields
    - hooks
    - identity
    - standard
  matrix:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
  backlinks:
    - access
    - activities
    - consent
    - dataprotection
    - fields
    - hooks
    - identity
    - standard
signatures:
  computationUuid: "a6c8ab91-72d7-8332-a3ef-e85a18b57c6a"
  stages:
    - stage: path
      stageUuid: "82c5246a-69c9-8a5b-8c1f-8a387dae48dc"
    - stage: trinity
      stageUuid: "b10145e6-eb20-8887-80e8-8ccb0917bf2b"
    - stage: boundary
      stageUuid: "973c6f80-0352-8d14-87fa-dee9324e7b7c"
    - stage: links
      stageUuid: "29017ca4-ebd2-8e63-b630-bb0c9eb65a43"
    - stage: horo
      stageUuid: "eb284ec2-2b32-8eb7-bef8-9670fc0d3e8b"
    - stage: seal
      stageUuid: "812331dd-6c70-829f-bdb0-90903b6b3af3"
    - stage: uuid
      stageUuid: "8b7e45fc-659a-8f19-aeb6-5ec16b3a6043"
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

Composes: [[identity]] · [[standard]] · [[access]] · [[hooks]] · [[fields]].
