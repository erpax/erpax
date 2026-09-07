---
name: variances
description: "Use when closing a work order and reconciling standard vs actual manufacturing costs — material price/quantity, labour rate/efficiency, and overhead spending/volume variances per IAS-2 §21. The variance-decomposition record generated on work-order close."
atomPath: "items/bills/of/materials/work/orders/cost/variances"
coordinate: "items/bills/of/materials/work/orders/cost/variances · 1/base · 72b20e6c"
contentUuid: "2908ec81-ce5d-5efb-8ff8-d19f0db06f45"
diamondUuid: "b4b84074-e42c-8d4c-9b01-7d04dcb7653c"
uuid: "72b20e6c-3e0a-8152-bb95-038024c2b896"
horo: 1
typography:
  partition: items
  bondDegree: 36
standards:
  - "IFRS IAS-2 §21 standard-cost-method"
  - "ISO-8601-1:2019 date-time variance-date"
  - "ISO-8601-1:2019 date-time variance-date`"
  - "SOX §404 internal-controls variance-disposition TOM-PROD-03"
  - "US-GAAP ASC-330-10-30 standard-cost-variance-recognition"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "120acee9-da6b-8d3d-a3aa-6ae49f32a34e"
  stages:
    - stage: path
      stageUuid: "441288ac-8b0a-8d7b-b5eb-4842416d6954"
    - stage: trinity
      stageUuid: "00b001c2-6dc3-8b46-a31f-cd1dd270b445"
    - stage: boundary
      stageUuid: "51e61e0f-8534-8f53-8457-bc6b4b432f1d"
    - stage: links
      stageUuid: "99dd99c0-62be-8142-a5ad-afc59b4fcee7"
    - stage: horo
      stageUuid: "99dce66e-8b24-8830-9594-4819d617a651"
    - stage: seal
      stageUuid: "49348af1-bf22-8954-87c6-bc72f71f7bbd"
    - stage: uuid
      stageUuid: "3f0ffc5d-553e-84a5-8835-8dacbf3230b8"
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
- [[field]] — currencyField, statusField, auditFields, referenceField

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
