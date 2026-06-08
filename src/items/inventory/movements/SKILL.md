---
name: movements
description: "Use when tracking any stock quantity change — receipts, sales/issues, production consumption, transfers, returns, cycle-count adjustments, write-offs, or opening balances — with from/to warehouse locations and GL hook for COGS/variance posting. The append-only stock ledger per IAS-2 cost-flow assumption."
atomPath: items/inventory/movements
coordinate: items/inventory/movements · 1/base · 5ccc3079
contentUuid: "8448fbf1-b217-5803-9624-be377b1ec39d"
diamondUuid: "91ef041f-c177-8c92-b524-bdb8ad7a5357"
uuid: "5ccc3079-0a39-8bd4-9a04-053790c1031d"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - commerce
    - inventories
    - inventory
    - items
    - law
    - locations
    - movement
    - orders
    - transaction
  out:
    - accounting
    - balance
    - commerce
    - inventories
    - items
    - law
    - locations
    - movement
    - orders
    - transaction
typography:
  partition: items
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-2 §10 §36 inventories cost-formulas"
  - "IFRS IAS-2 §25 cost-formulas"
  - "ISO-19011:2018 audit-trail stock-ledger"
  - "ISO-3166-1:2020 country-codes via location"
  - "ISO-8601-1:2019 date-time movement-at posted-at"
  - "SOX §404 internal-controls inventory-cycle-count"
  - "US-GAAP ASC-330 inventory cost-flow"
  - "US-GAAP ASC-330-10-30 inventory-valuation"
  - "US-GAAP ASC-606 cogs-recognition"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - items
    - law
    - locations
    - transaction
  matrix:
    - accounting
    - balance
    - commerce
    - inventories
    - items
    - law
    - locations
    - movement
    - orders
    - transaction
  backlinks:
    - accounting
    - balance
    - commerce
    - inventories
    - items
    - law
    - locations
    - movement
    - orders
    - transaction
signatures:
  computationUuid: "1d12fafe-517e-8681-aa3c-93281ab1189c"
  stages:
    - stage: path
      stageUuid: "9d9b856b-a92d-8cb8-8238-a6c274078938"
    - stage: trinity
      stageUuid: "7dacdfb6-6b1f-8f87-9dd8-7f04c708af71"
    - stage: boundary
      stageUuid: "3cce9769-fe54-835b-9b52-b6ee68e0e236"
    - stage: links
      stageUuid: "d0b3c040-bb58-8c01-846b-10ef355df92b"
    - stage: horo
      stageUuid: "11595294-f245-85ef-b111-cf05a3179dc9"
    - stage: seal
      stageUuid: "af6eec69-3941-8be1-af17-cc9607733e93"
    - stage: uuid
      stageUuid: "59ffb43c-f114-82cf-89c1-30fc4dd0cc50"
version: 2
---
# inventory-movements

Inventory Movements — every quantity change with source/destination.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time movement-at posted-at
- ISO-3166-1:2020 country-codes via location
- ISO-19011:2018 audit-trail stock-ledger
- SOX §404 internal-controls inventory-cycle-count
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the append-only stock ledger — every quantity change records its source and destination location and posts COGS/variance to the GL, never an in-place edit ([[balance]]).**

Composes: [[Items]] · [[warehouse/locations]] · [[accounting]] · [[transaction]].
