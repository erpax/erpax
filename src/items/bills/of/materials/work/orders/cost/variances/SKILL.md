---
name: variances
description: "Use when closing a work order and reconciling standard vs actual manufacturing costs — material price/quantity, labour rate/efficiency, and overhead spending/volume variances per IAS-2 §21. The variance-decomposition record generated on work-order close."
atomPath: "items/bills/of/materials/work/orders/cost/variances"
coordinate: "items/bills/of/materials/work/orders/cost/variances · 4/weave · 8482d7d3"
contentUuid: "67740605-b8ba-55b7-bd90-3c12019fe03c"
diamondUuid: "b2260470-8665-81a0-b098-20a5f2ba38e6"
uuid: "8482d7d3-e5fa-8c8b-9cc9-063d91936573"
horo: 4
bonds:
  in:
    - accounting
    - balance
    - cost
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - orders
    - proof
    - standard
    - transaction
    - variance
  out:
    - accounting
    - balance
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - orders
    - proof
    - standard
    - transaction
    - variance
typography:
  partition: items
  bondDegree: 36
  neighbors: []
standards:
  - "IFRS IAS-2 §21 standard-cost-method"
  - "ISO-8601-1:2019 date-time variance-date"
  - "ISO-8601-1:2019 date-time variance-date`"
  - "SOX §404 internal-controls variance-disposition TOM-PROD-03"
  - "US-GAAP ASC-330-10-30 standard-cost-variance-recognition"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - orders
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - balance
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - orders
    - proof
    - standard
    - transaction
    - variance
  backlinks:
    - accounting
    - balance
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - orders
    - proof
    - standard
    - transaction
    - variance
signatures:
  computationUuid: "b7909b0b-3800-834c-acbe-1f6d91c3e439"
  stages:
    - stage: path
      stageUuid: "441288ac-8b0a-8d7b-b5eb-4842416d6954"
    - stage: trinity
      stageUuid: "00b001c2-6dc3-8b46-a31f-cd1dd270b445"
    - stage: boundary
      stageUuid: "51e61e0f-8534-8f53-8457-bc6b4b432f1d"
    - stage: links
      stageUuid: "22e6aa62-3c6d-8c09-b953-eb44bea288d4"
    - stage: horo
      stageUuid: "bd539f8a-8d25-87f1-ba90-2b4f5d7d74d6"
    - stage: seal
      stageUuid: "49348af1-bf22-8954-87c6-bc72f71f7bbd"
    - stage: uuid
      stageUuid: "54a9b0b6-537a-8dd8-8c47-c7a2cf289530"
version: 2
---
# cost-variances

Cost Variances — IAS-2 §21 standard-cost vs actual-cost variances.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Composition

- [[accounting]] — double-entry disposition journal entries (cogs/inventory/period)
- [[standard]] — IAS-2 §21, ASC-330-10-30, ISO-8601-1, ISO-19011, SOX §404, ISO-27001
- [[transaction]] — work-order close → cost-variance posting (balanced)
- [[manufacturing]] — work-order lifecycle & completion trigger
- [[balance]] — variance disposition must balance (debit = credit)
- [[identity]] — audit trail (ISO-19011:2018)
- [[proof]] — immutable variance-evidence
- [[hooks]] — standardCollectionHooks + invariant checks
- [[fields]] — currencyField, statusField, auditFields, referenceField

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time variance-date`


The answer-path: `index.ts` implements these standards directly via schema design and hooks.

- ISO-8601-1:2019 date-time variance-date
- IFRS IAS-2 §21 standard-cost-method
- US-GAAP ASC-330-10-30 standard-cost-variance-recognition
- ISO-19011:2018 audit-trail variance-evidence
- SOX §404 internal-controls variance-disposition TOM-PROD-03
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: generated on [[work/orders|work-order]] close, it decomposes standard vs actual cost into material/labour/overhead variances whose disposition journal entries must balance (debit = credit, [[balance]]).**
