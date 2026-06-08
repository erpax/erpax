---
name: requisitions
description: "Use when capturing spend requests before a purchase order is issued — SOX §404 four-eyes gate (requisitioner ≠ approver), multi-line item costing, GL account, preferred vendor, and auditor-traceable PO→requisition→approval chain. The pre-PO approval-gate collection."
atomPath: cost/centers/purchase/requisitions
coordinate: cost/centers/purchase/requisitions · 1/base · ebc72cfb
contentUuid: "67f792d2-fec4-591c-b687-d552ecdd8b0d"
diamondUuid: "111f1179-be22-8851-8017-4a6f7a4603d5"
uuid: "ebc72cfb-d865-870e-95e8-c50d07f230b3"
horo: 1
bonds:
  in:
    - accounting
    - identity
    - law
    - privilege
    - proof
    - purchase
    - quotes
    - requisition
    - standard
    - transaction
  out:
    - accounting
    - identity
    - law
    - privilege
    - proof
    - quotes
    - requisition
    - standard
    - transaction
typography:
  partition: cost
  bondDegree: 27
  neighbors: []
standards:
  - "ISO-19011:2018 audit-trail requisition-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls four-eyes"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - privilege
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - identity
    - law
    - privilege
    - proof
    - quotes
    - requisition
    - standard
    - transaction
  backlinks:
    - accounting
    - identity
    - law
    - privilege
    - proof
    - quotes
    - requisition
    - standard
    - transaction
signatures:
  computationUuid: "bd14408e-c2a1-805d-a96f-b01ef1689ad3"
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
      stageUuid: "063f53d0-4d97-809c-885f-619ba86340c1"
    - stage: seal
      stageUuid: "1d544be2-e1da-86bd-b8a3-901d65272e17"
    - stage: uuid
      stageUuid: "12cbac37-20c7-828a-bb3e-a46cfdb0aef1"
version: 2
---
# purchase-requisitions

Purchase Requisitions — pre-PO approval chain (SOX §404 four-eyes).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- SOX §404 internal-controls four-eyes
- ISO-27002 §5.4 segregation-of-duties
- ISO-19011:2018 audit-trail requisition-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a requisition is the pre-PO approval gate — requisitioner ≠ approver (SOX §404 four-eyes / segregation-of-duties), and the PO→requisition→approval chain stays auditor-traceable.**

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]] · [[privilege]].
