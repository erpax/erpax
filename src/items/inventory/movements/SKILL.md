---
name: movements
description: "Use when tracking any stock quantity change — receipts, sales/issues, production consumption, transfers, returns, cycle-count adjustments, write-offs, or opening balances — with from/to warehouse locations and GL hook for COGS/variance posting. The append-only stock ledger per IAS-2 cost-flow assumption."
atomPath: "items/inventory/movements"
coordinate: "items/inventory/movements · 8/crest · caf7335b"
contentUuid: "c7acf3bf-0fb7-56d8-8c9e-a111f36a8d71"
diamondUuid: "c03c0836-9852-84f5-b36a-2501eede9876"
uuid: "caf7335b-0117-8176-81f5-921ef3fda0ef"
horo: 8
typography:
  partition: items
  bondDegree: 32
standards:
  - "IFRS IAS-2 §10 §36 inventories cost-formulas"
  - "IFRS IAS-2 §25 cost-formulas"
  - "ISO-3166-1:2020 country-codes via location"
  - "ISO-3166-1:2020 country-codes via location`"
  - "ISO-8601-1:2019 date-time movement-at posted-at"
  - "ISO-8601-1:2019 date-time movement-at posted-at`"
  - "SOX §404 internal-controls inventory-cycle-count"
  - "US-GAAP ASC-330 inventory cost-flow"
  - "US-GAAP ASC-330-10-30 inventory-valuation"
  - "US-GAAP ASC-606 cogs-recognition"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "bdad6ac2-3ac0-82c0-82fe-322376ccf65e"
  stages:
    - stage: path
      stageUuid: "9d9b856b-a92d-8cb8-8238-a6c274078938"
    - stage: trinity
      stageUuid: "7dacdfb6-6b1f-8f87-9dd8-7f04c708af71"
    - stage: boundary
      stageUuid: "8492f721-fc0e-8d13-ac3c-cf715ed0028a"
    - stage: links
      stageUuid: "d0b3c040-bb58-8c01-846b-10ef355df92b"
    - stage: horo
      stageUuid: "9411a251-889a-8cf8-86b1-a19318dba74f"
    - stage: seal
      stageUuid: "af6eec69-3941-8be1-af17-cc9607733e93"
    - stage: uuid
      stageUuid: "883e3fe8-17d7-8538-8912-0fa5b315e9b6"
version: 2
---
# inventory-movements

Inventory Movements — every quantity change with source/destination.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time movement-at posted-at`
- `@standard ISO-3166-1:2020 country-codes via location`

- ISO-8601-1:2019 date-time movement-at posted-at
- ISO-3166-1:2020 country-codes via location
- ISO-19011:2018 audit-trail stock-ledger
- SOX §404 internal-controls inventory-cycle-count
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the append-only stock ledger — every quantity change records its source and destination location and posts COGS/variance to the GL, never an in-place edit ([[balance]]).**

Composes: [[Items]] · [[warehouse/locations]] · [[accounting]] · [[transaction]].
