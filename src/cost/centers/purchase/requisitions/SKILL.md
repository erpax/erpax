---
name: requisitions
description: "Use when capturing spend requests before a purchase order is issued — SOX §404 four-eyes gate (requisitioner ≠ approver), multi-line item costing, GL account, preferred vendor, and auditor-traceable PO→requisition→approval chain. The pre-PO approval-gate collection."
atomPath: "cost/centers/purchase/requisitions"
coordinate: "cost/centers/purchase/requisitions · 8/crest · 027a7e73"
contentUuid: "316c624a-0719-5a0d-a30f-f2b23655b85b"
diamondUuid: "6a61c91b-314d-8339-a6ee-c017b203d7d0"
uuid: "027a7e73-3e23-8f8a-b10d-c39fea81f8eb"
horo: 8
typography:
  partition: cost
  bondDegree: 27
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls four-eyes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "09355e96-eaa9-80dd-b410-65e0be83a174"
  stages:
    - stage: path
      stageUuid: "c2e89d2a-b5e8-81cb-9429-458353f2337d"
    - stage: trinity
      stageUuid: "5cfdf41e-71f2-8400-a2d7-154ac6e2c87e"
    - stage: boundary
      stageUuid: "6afe717f-b505-8e74-acda-49833922441c"
    - stage: links
      stageUuid: "dde586d1-1224-8a90-b83e-bfb6f3ce82f2"
    - stage: horo
      stageUuid: "5808d594-e985-8b83-a6a4-4afe39e74fcc"
    - stage: seal
      stageUuid: "1d544be2-e1da-86bd-b8a3-901d65272e17"
    - stage: uuid
      stageUuid: "04a4b0e6-a6e8-88c9-a016-0f9f84159bbb"
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

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]] · [[privilege]].
