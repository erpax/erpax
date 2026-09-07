---
name: requisitions
description: "Use when capturing spend requests before a purchase order is issued — SOX §404 four-eyes gate (requisitioner ≠ approver), multi-line item costing, GL account, preferred vendor, and auditor-traceable PO→requisition→approval chain. The pre-PO approval-gate collection."
atomPath: "cost/centers/purchase/requisitions"
coordinate: "cost/centers/purchase/requisitions · 7/descent · fcafee99"
contentUuid: "5b3a87b6-82a2-55b7-86fc-0eb49caeba0f"
diamondUuid: "f3cd3385-44b6-8894-a411-f11577c9f6b6"
uuid: "fcafee99-5f0a-8847-9c21-40f21c34eac9"
horo: 7
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
  computationUuid: "6ce905ae-3e68-887f-849e-2c8d9c84fbbd"
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
      stageUuid: "6f64888e-0df6-82df-b23d-55c6cec47559"
    - stage: seal
      stageUuid: "1d544be2-e1da-86bd-b8a3-901d65272e17"
    - stage: uuid
      stageUuid: "bdb9169b-8592-8882-ad94-a61fef185e9b"
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
