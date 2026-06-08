---
name: milestones
description: "Use when managing IFRS-15 §126 milestone-billing events on a project — defining billing, acceptance, or payment trigger points, marking milestones achieved, and firing the invoice + revenue-recognition GL post for the milestone amount. The milestone register under a project."
atomPath: customers/projects/project/milestones
coordinate: customers/projects/project/milestones · 4/weave · 3098569f
contentUuid: "795e4445-0595-59b8-bf42-fe470c336a20"
diamondUuid: "992aeedb-ca21-8859-87f0-8f7131819a77"
uuid: "3098569f-a1f2-88fc-9d50-5bfc9bc3ab53"
horo: 4
bonds:
  in:
    - accounting
    - fields
    - hooks
    - identity
    - invoices
    - law
    - milestone
    - project
    - projects
    - proof
    - roadmap
    - standard
    - transaction
  out:
    - accounting
    - fields
    - hooks
    - identity
    - invoices
    - law
    - milestone
    - projects
    - proof
    - roadmap
    - standard
    - transaction
typography:
  partition: customers
  bondDegree: 36
  neighbors: []
standards:
  - "IFRS IFRS-15 §126 milestone-billing"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "ISO-19011:2018 audit-trail milestone-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "US-GAAP ASC-606-10-25-30 milestone-method"
bindings: []
neighbors:
  wikilink:
    - accounting
    - fields
    - hooks
    - identity
    - invoices
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - fields
    - hooks
    - identity
    - invoices
    - law
    - milestone
    - projects
    - proof
    - roadmap
    - standard
    - transaction
  backlinks:
    - accounting
    - fields
    - hooks
    - identity
    - invoices
    - law
    - milestone
    - projects
    - proof
    - roadmap
    - standard
    - transaction
signatures:
  computationUuid: "6be28325-ce1f-862b-b5e9-d671cb9bff47"
  stages:
    - stage: path
      stageUuid: "bdab54e2-97ee-8ee5-ad3d-05b2c6a88bdb"
    - stage: trinity
      stageUuid: "082174d3-ed43-8b9d-abe0-38bb65177ea0"
    - stage: boundary
      stageUuid: "102f7071-0cfe-8c70-863a-086aae669d9b"
    - stage: links
      stageUuid: "bd019b5a-01f1-8171-9834-2de6175e8435"
    - stage: horo
      stageUuid: "cc8d1320-8f95-8915-ad82-ccb8eb865bbd"
    - stage: seal
      stageUuid: "1f65602e-51ed-87e6-bd2c-848f454d26c2"
    - stage: uuid
      stageUuid: "eca57250-e7eb-89ab-9ee1-d5d1b77cf30e"
version: 2
---
# project-milestones

Project Milestones — IFRS-15 §126 milestone-billing trigger points.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §126 milestone-billing
- IFRS IFRS-15 §35 over-time-recognition
- US-GAAP ASC-606-10-25-30 milestone-method
- ISO-19011:2018 audit-trail milestone-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

## Composition

Slice AAAA (2026-05-10): contracts that recognise revenue at discrete milestones (rather than over time via cost-to-cost) need a structured milestone register. When a milestone is marked `achieved`, the GL handler emits a `milestone:achieved` event that triggers invoicing + revenue recognition for the milestone amount.

Composes: [[accounting]] · [[transaction]] · [[invoices]] · [[identity]] · [[proof]] · [[standard]] · [[hooks]] · [[fields]].

**Law — [[law]]: invoicing and revenue fire only when a milestone is marked achieved, and each milestone amount is recognised exactly once.**
