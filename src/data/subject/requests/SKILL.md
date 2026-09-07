---
name: requests
description: "Use when handling a data subject's GDPR rights request — access, rectification, erasure, restriction, portability, objection, or consent withdrawal — tracking identity verification, fulfilment evidence, and the Art.12(3) one-month deadline through to completion or DPA escalation. The GDPR DSR/DSAR workflow collection."
atomPath: "data/subject/requests"
coordinate: "data/subject/requests · 5/round · 223b5723"
contentUuid: "70345eb1-526d-53d0-a14f-3e3863a4eea2"
diamondUuid: "218e02f5-1f56-8098-bc9f-2bbbb93ca302"
uuid: "223b5723-952b-8bfc-aee4-fc4b3572c13e"
horo: 5
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
  computationUuid: "f4dcf67c-773f-8de8-83f7-fa253f1c6d2a"
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
      stageUuid: "52336fe3-5e8a-8865-8180-203dfded3ab3"
    - stage: seal
      stageUuid: "53e7d3f6-7d08-8260-9a70-01dcf94624de"
    - stage: uuid
      stageUuid: "fdc4b234-8e65-89a0-a4c5-8f28bdd3bffc"
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
