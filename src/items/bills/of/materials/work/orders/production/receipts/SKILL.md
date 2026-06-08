---
name: receipts
description: "Use when receiving finished goods from an internal manufacturing work order into inventory — absorbed cost (material/labour/overhead), lot/serial tracking, target warehouse, and IAS-2 §10 cost-of-conversion booking. The produced-inventory receipt record — distinct from vendor goods receipts."
atomPath: items/bills/of/materials/work/orders/production/receipts
coordinate: items/bills/of/materials/work/orders/production/receipts · 2/share · 6a7a0a9a
contentUuid: "f89c858e-6524-5264-a343-6fcbb0413c58"
diamondUuid: "456fa721-caa9-83ab-84b7-67210ea469f1"
uuid: "6a7a0a9a-6678-8610-9964-882b5b0eb33f"
horo: 2
bonds:
  in:
    - accounting
    - collections
    - fields
    - law
    - production
    - proof
    - sales
    - supto
    - versions
  out:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
typography:
  partition: items
  bondDegree: 34
  neighbors: []
standards:
  - "IFRS IAS-2 §10 §12 cost-of-conversion"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-execution"
  - "ISO-19011:2018 audit-trail production-receipt-evidence"
  - "ISO-8601-1:2019 date-time receipt-date"
  - "SOX §404 internal-controls production-control TOM-PROD-02"
  - "US-GAAP ASC-330-10-30 inventory-cost"
bindings: []
neighbors:
  wikilink:
    - accounting
    - horo
    - identity
    - law
    - orders
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
  backlinks:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
signatures:
  computationUuid: "84e85346-fda3-8f5f-b70a-b73437601cc5"
  stages:
    - stage: path
      stageUuid: "5fa42070-58ce-8159-98f4-a9baf7f592ad"
    - stage: trinity
      stageUuid: "1ad6d5ad-6c6f-82b7-b452-8c1f193d4c7d"
    - stage: boundary
      stageUuid: "84d56bcf-a742-8520-a970-c26b650bbea5"
    - stage: links
      stageUuid: "cae361e1-7abf-866e-8fd2-c54cf65e4034"
    - stage: horo
      stageUuid: "834f3f9c-d50b-8c0f-8eb5-b8ef640a092c"
    - stage: seal
      stageUuid: "04bb44d3-fe71-89aa-aea0-b37a8f78e755"
    - stage: uuid
      stageUuid: "da4b22a6-7d50-8731-9c92-23197e1e7861"
version: 2
---
# production-receipts

Production Receipts — finished-good receipts from a work-order into.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time receipt-date
- ISA-95:2013 §B.5 production-execution
- IFRS IAS-2 §10 §12 cost-of-conversion
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail production-receipt-evidence
- SOX §404 internal-controls production-control TOM-PROD-02
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the receipt of finished goods from an internal [[work/orders|work order]] into inventory at absorbed cost (material + labour + overhead) — distinct from a vendor goods receipt.**

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[proof]] · [[standard]] · [[horo]].
