---
name: requisitions
description: "Use when capturing spend requests before a purchase order is issued — SOX §404 four-eyes gate (requisitioner ≠ approver), multi-line item costing, GL account, preferred vendor, and auditor-traceable PO→requisition→approval chain. The pre-PO approval-gate collection."
atomPath: "cost/centers/purchase/requisitions"
coordinate: "cost/centers/purchase/requisitions · 8/crest · 3a9cd5c3"
contentUuid: "ad7ee154-11db-56fe-b751-720d7b0f005e"
diamondUuid: "137369b2-748a-8a0e-b9db-2f811c7dcec0"
uuid: "3a9cd5c3-e85c-8772-af85-bcd0debf42e5"
horo: 8
typography:
  partition: cost
  bondDegree: 21
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls four-eyes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3519956a-febe-8faf-9411-b6f5459bdfcc"
  stages:
    - stage: path
      stageUuid: "c2e89d2a-b5e8-81cb-9429-458353f2337d"
    - stage: trinity
      stageUuid: "5cfdf41e-71f2-8400-a2d7-154ac6e2c87e"
    - stage: boundary
      stageUuid: "6afe717f-b505-8e74-acda-49833922441c"
    - stage: links
      stageUuid: "b82ef407-11ea-85ab-8291-637cc5c59b4c"
    - stage: horo
      stageUuid: "934be2ed-4197-8290-931f-d0aef33db8be"
    - stage: seal
      stageUuid: "1d544be2-e1da-86bd-b8a3-901d65272e17"
    - stage: uuid
      stageUuid: "b922b68f-017f-8fca-9430-38f030d611ba"
version: 2
---
# purchase-requisitions

Purchase Requisitions — pre-PO approval chain (SOX §404 four-eyes).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- SOX §404 internal-controls four-eyes
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail requisition-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a requisition is the pre-PO approval gate — requisitioner ≠ approver (SOX §404 four-eyes / segregation-of-duties), and the PO→requisition→approval chain stays auditor-traceable.**

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]] · privilege.
