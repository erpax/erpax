---
name: milestones
description: "Use when managing IFRS-15 §126 milestone-billing events on a project — defining billing, acceptance, or payment trigger points, marking milestones achieved, and firing the invoice + revenue-recognition GL post for the milestone amount. The milestone register under a project."
atomPath: "customers/projects/project/milestones"
coordinate: "customers/projects/project/milestones · 8/crest · 673720e7"
contentUuid: "baf257e3-5ad4-5518-b376-c7818af4832c"
diamondUuid: "2436d202-5d84-8774-a962-865202385a85"
uuid: "673720e7-b835-8087-bab2-18023f34150e"
horo: 8
typography:
  partition: customers
  bondDegree: 36
standards:
  - "IFRS IFRS-15 §126 milestone-billing"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "US-GAAP ASC-606-10-25-30 milestone-method"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7e23387b-d2d9-817c-b16d-0f7607ebf7b8"
  stages:
    - stage: path
      stageUuid: "bdab54e2-97ee-8ee5-ad3d-05b2c6a88bdb"
    - stage: trinity
      stageUuid: "082174d3-ed43-8b9d-abe0-38bb65177ea0"
    - stage: boundary
      stageUuid: "102f7071-0cfe-8c70-863a-086aae669d9b"
    - stage: links
      stageUuid: "74caf248-0b5e-8279-9a65-e4f768080a51"
    - stage: horo
      stageUuid: "63bd8677-79b2-8307-958a-bce3a6afbeca"
    - stage: seal
      stageUuid: "1f65602e-51ed-87e6-bd2c-848f454d26c2"
    - stage: uuid
      stageUuid: "dc8212ab-34e8-8904-8c63-0a37fd15c92e"
version: 2
---
# project-milestones

Project Milestones — IFRS-15 §126 milestone-billing trigger points.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §126 milestone-billing
- IFRS IFRS-15 §35 over-time-recognition
- US-GAAP ASC-606-10-25-30 milestone-method
- ISO-19011:2018 audit-trail milestone-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

## Composition

Slice AAAA (2026-05-10): contracts that recognise revenue at discrete milestones (rather than over time via cost-to-cost) need a structured milestone register. When a milestone is marked `achieved`, the GL handler emits a `milestone:achieved` event that triggers invoicing + revenue recognition for the milestone amount.

Composes: [[accounting]] · [[transaction]] · [[invoices]] · [[identity]] · [[proof]] · [[standard]] · [[hooks]] · [[field]].

**Law — [[law]]: invoicing and revenue fire only when a milestone is marked achieved, and each milestone amount is recognised exactly once.**
