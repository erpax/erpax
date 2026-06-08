---
name: records
description: "Use when recording or auditing data-subject consent events — marketing, analytics, profiling, third-party sharing, cookies — with lawful-basis, exact consent text, version, capture method, IP/user-agent evidence, and withdrawal tracking; GDPR Art.6(1)(a)/Art.7 lawful-basis and right-to-withdraw. The append-mostly consent-evidence ledger."
atomPath: consent/records
coordinate: consent/records · 1/base · 30f1204c
contentUuid: "0fd3affd-9247-5d46-a288-e73bfb6b9a85"
diamondUuid: "37d21ee2-ac5b-8720-b375-836ce23d9642"
uuid: "30f1204c-0a78-89f3-8d09-69ef49907f3d"
horo: 1
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
  - "ISO-19011:2018 audit-trail consent-evidence"
  - "ISO-27701:2019 §6.3.1.4 record-of-consent"
  - "ISO-8601-1:2019 date-time given-at withdrawn-at"
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
  computationUuid: "0348673d-bfb8-81da-a6d2-974570427fc0"
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
      stageUuid: "c564556f-e95c-8c65-a00c-a6bca81595e7"
    - stage: seal
      stageUuid: "38787660-e8eb-8237-8150-26567a0cfd6d"
    - stage: uuid
      stageUuid: "d22e1915-f1f8-8f8a-a52a-c9486163dab1"
version: 2
---
# consent-records

Consent Records — GDPR Art.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time given-at withdrawn-at
- GDPR Art.6(1)(a) lawful-basis-consent
- GDPR Art.7 conditions-for-consent
- GDPR Art.7(3) right-to-withdraw-consent
- ISO-27701:2019 §6.3.1.4 record-of-consent
- ISO-19011:2018 audit-trail consent-evidence
- ISO-27001 A.5.34 privacy-and-pii

Composes: [[identity]] · [[standard]] · [[access]] · [[hooks]] · [[fields]].
