---
name: requests
description: "Use when handling a data subject's GDPR rights request — access, rectification, erasure, restriction, portability, objection, or consent withdrawal — tracking identity verification, fulfilment evidence, and the Art.12(3) one-month deadline through to completion or DPA escalation. The GDPR DSR/DSAR workflow collection."
atomPath: "data/subject/requests"
coordinate: "data/subject/requests · 4/weave · 4c3c6b03"
contentUuid: "a61dd309-cfb1-545d-b450-e8b5525d622b"
diamondUuid: "e3eb4d8a-9162-861c-9f4a-f77ac844e10d"
uuid: "4c3c6b03-cdb8-8203-af78-40c616358e44"
horo: 4
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
  computationUuid: "58ab46a1-246d-8e39-9282-507dfcf06cb9"
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
      stageUuid: "f973b6f0-f89a-8b35-af10-d284a1a5a6ec"
    - stage: seal
      stageUuid: "53e7d3f6-7d08-8260-9a70-01dcf94624de"
    - stage: uuid
      stageUuid: "700ff7f4-abd8-8312-8ab5-446b76f29d48"
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
