---
name: requests
description: "Use when handling a data subject's GDPR rights request — access, rectification, erasure, restriction, portability, objection, or consent withdrawal — tracking identity verification, fulfilment evidence, and the Art.12(3) one-month deadline through to completion or DPA escalation. The GDPR DSR/DSAR workflow collection."
atomPath: data/subject/requests
coordinate: data/subject/requests · 5/round · 5e312305
contentUuid: "7d68333e-7f53-5801-aefd-59ec599d9fe8"
diamondUuid: "360ac082-50df-8f57-a04e-a145f56b7400"
uuid: "5e312305-07d3-8245-9597-7228bc4dc0a2"
horo: 5
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
  - "ISO-19011:2018 audit-trail dsr-evidence"
  - "ISO-8601-1:2019 date-time submitted-at completed-at"
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
  computationUuid: "711bb2e8-505e-882a-af93-2b4179c16006"
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
      stageUuid: "21b0a21b-79e1-8245-acd6-3ddb0684834e"
    - stage: seal
      stageUuid: "53e7d3f6-7d08-8260-9a70-01dcf94624de"
    - stage: uuid
      stageUuid: "6eb6c22d-0214-836b-bd2f-5736eda5cdfd"
version: 2
---
# data-subject-requests

Data Subject Requests — GDPR Art.15-22 (DSR/DSAR) workflow.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
