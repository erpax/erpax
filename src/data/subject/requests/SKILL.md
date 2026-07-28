---
name: requests
description: "Use when handling a data subject's GDPR rights request — access, rectification, erasure, restriction, portability, objection, or consent withdrawal — tracking identity verification, fulfilment evidence, and the Art.12(3) one-month deadline through to completion or DPA escalation. The GDPR DSR/DSAR workflow collection."
atomPath: "data/subject/requests"
coordinate: "data/subject/requests · 2/share · 71728c70"
contentUuid: "e0fab7fd-3dc3-5bb1-bab9-d2fdea1f1acb"
diamondUuid: "ec868636-afe2-8ffd-a604-31d54ae509ae"
uuid: "71728c70-ede2-870f-b4f4-85429f7d05b5"
horo: 2
bonds:
  in:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - subject
    - users
  out:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
typography:
  partition: data
  bondDegree: 37
  neighbors: []
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
neighbors:
  wikilink:
    - access
    - identity
    - proof
    - standard
  matrix:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
  backlinks:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
signatures:
  computationUuid: "cbc1db81-2d52-88f6-8f4a-bf9c35c2b1a8"
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
      stageUuid: "d1058a97-5a49-833f-a7a6-2357fc69d815"
    - stage: seal
      stageUuid: "53e7d3f6-7d08-8260-9a70-01dcf94624de"
    - stage: uuid
      stageUuid: "e5f080b7-b1df-8ac0-a44f-799aabc72040"
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
