---
name: inventories
description: "Use when tracking per-SKU on-hand inventory balance at a consignee location — shipments in, sales out, returns, cycle-count reconciliation, IAS-2 §6 balance-sheet ownership retained by consignor, valuation method, and GL account mapping. The consignment per-SKU running-balance collection."
atomPath: "warehouse/locations/consignment/arrangements/consignment/inventories"
coordinate: "warehouse/locations/consignment/arrangements/consignment/inventories · 8/crest · 8bc4257b"
contentUuid: "08d2336b-8d9f-5deb-97db-2a22a501a30e"
diamondUuid: "c73980c1-855a-8d34-bd55-f71b2c888f96"
uuid: "8bc4257b-16ac-83fa-87e6-43375e27460d"
horo: 8
typography:
  partition: warehouse
  bondDegree: 32
standards:
  - "IFRS IAS-2 §6 inventories-held-at-other-location"
  - "IFRS IFRS-15 §B77-B78 consignment-arrangements"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time as-of-date"
  - "ISO-8601-1:2019 date-time as-of-date`"
  - "SOX §404 internal-controls inventory-segregation TOM-INV-03"
  - "US-GAAP ASC-330 inventory-location-tracked"
  - "US-GAAP ASC-606-10-55-79 consignment-indicators"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5d5ae8c5-7711-8f0b-ae88-579ff8f08545"
  stages:
    - stage: path
      stageUuid: "68d8a9b7-112c-8daa-b4d8-8fcf66151625"
    - stage: trinity
      stageUuid: "7a948277-c020-88e7-943e-d832cd0f33a7"
    - stage: boundary
      stageUuid: "00b7fba1-80e4-83f6-8ee7-1f84696b8a2d"
    - stage: links
      stageUuid: "f527bdb7-8286-8844-be69-b5c234cd391e"
    - stage: horo
      stageUuid: "0aee40e5-ec86-88db-9115-4e0f6bbe5261"
    - stage: seal
      stageUuid: "3e475b3c-5740-808e-8070-9c31ac16f091"
    - stage: uuid
      stageUuid: "322b8c71-b8b0-816d-b388-f5b5447a037e"
version: 2
---
# consignment-inventory

Per-SKU on-hand running balance at consignee location per [[warehouse/locations/consignment/arrangements|arrangement]]. The asset side of the IFRS-15 §B77-B78 ledger, paired with [[warehouse/locations/consignment/arrangements/consignment/sales|sale-by-consignee events]] and [[items/inventory/movements|underlying movements]].

This is the single-folder collection node: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here. One folder per collection ⇒ no scatter ⇒ no drift.

The consignor (tenant) keeps the rows on its **own** balance sheet under IAS-2 §6 (inventory held at another location); the consignee never recognises them. Slice ZZZZ (2026-05-10): every shipment to / sale from / return from a consignee mutates this row's `quantityOnHand` + `valueOnHand`.

## Composition

- [[warehouse/locations/consignment/arrangements]] — master agreement per arrangement
- [[warehouse/locations/consignment/arrangements/consignment/sales]] — sale events that decrement on-hand
- [[items/inventory/movements]] — underlying double-entry stock movements
- [[accounting]] — GL posting and entry generation
- [[transaction]] — transactional semantics
- [[identity]] — consignee party identification
- [[proof]] — audit trail evidence
- [[standard]] — regulatory compliance framework

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time as-of-date`


- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time as-of-date
- IFRS IAS-2 §6 inventories-held-at-other-location
- IFRS IFRS-15 §B77-B78 consignment-arrangements
- US-GAAP ASC-330 inventory-location-tracked
- US-GAAP ASC-606-10-55-79 consignment-indicators
- ISO-19011:2018 audit-trail consignment-on-hand-evidence
- SOX §404 internal-controls inventory-segregation TOM-INV-03
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the per-SKU running balance at a consignee location that stays on the consignor's own balance sheet — every shipment in, [[warehouse/locations/consignment/arrangements/consignment/sales|sale]] out, and return mutates quantityOnHand + valueOnHand ([[balance]]).**
