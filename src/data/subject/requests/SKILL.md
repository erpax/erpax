---
name: requests
description: "Use when handling a data subject's GDPR rights request — access, rectification, erasure, restriction, portability, objection, or consent withdrawal — tracking identity verification, fulfilment evidence, and the Art.12(3) one-month deadline through to completion or DPA escalation. The GDPR DSR/DSAR workflow collection."
atomPath: "data/subject/requests"
coordinate: "data/subject/requests · 8/crest · f565e965"
contentUuid: "494bc21e-1d6f-5318-af36-7cf0d6065df2"
diamondUuid: "dab52903-3797-8ab1-9ea6-1c692c290e1e"
uuid: "f565e965-febd-86c7-9db2-35a6714c5424"
horo: 8
typography:
  partition: data
  bondDegree: 37
standards:
  - "GDPR Art.12(3) one-month-response-deadline"
  - "GDPR Art.15 right-of-access"
  - "GDPR Art.16 right-to-rectification"
  - "GDPR Art.17 right-to-erasure"
  - "GDPR Art.18 right-to-restriction"
  - "GDPR Art.20 right-to-data-portability"
  - "GDPR Art.21 right-to-object"
  - "ISO-8601-1:2019 date-time submitted-at completed-at"
  - "ISO-8601-1:2019 date-time submitted-at completed-at`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6414e25a-2309-8a12-a359-419afc1cf09a"
  stages:
    - stage: path
      stageUuid: "28925805-056e-8035-9a44-b88e23a1a67b"
    - stage: trinity
      stageUuid: "1c40eecc-ae89-8259-81ec-772c76469aa6"
    - stage: boundary
      stageUuid: "53f3e3ca-f207-8254-9f05-685e9162881f"
    - stage: links
      stageUuid: "58ff38e4-f50e-84bd-aecd-90798812f470"
    - stage: horo
      stageUuid: "6807b79f-0e33-8951-8660-fb1ded85e52f"
    - stage: seal
      stageUuid: "53e7d3f6-7d08-8260-9a70-01dcf94624de"
    - stage: uuid
      stageUuid: "740e8be8-6adb-88d8-8e94-0157982350a1"
version: 2
---
# data-subject-requests

Data Subject Requests — GDPR Art.15-22 (DSR/DSAR) workflow.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time submitted-at completed-at`

- ISO-8601-1:2019 date-time submitted-at completed-at
- GDPR Art.15 right-of-access
- GDPR Art.16 right-to-rectification
- GDPR Art.17 right-to-erasure
- GDPR Art.18 right-to-restriction
- GDPR Art.20 right-to-data-portability
- GDPR Art.21 right-to-object
- GDPR Art.12(3) one-month-response-deadline
- ISO-19011:2018 audit-trail dsr-evidence
- ISO-27001 A.5.34 privacy-and-pii

Composes: [[access]] · [[identity]] · [[proof]] · [[standard]].
