---
name: receipts
description: "Use when receiving finished goods from an internal manufacturing work order into inventory — absorbed cost (material/labour/overhead), lot/serial tracking, target warehouse, and IAS-2 §10 cost-of-conversion booking. The produced-inventory receipt record — distinct from vendor goods receipts."
atomPath: "items/bills/of/materials/work/orders/production/receipts"
coordinate: "items/bills/of/materials/work/orders/production/receipts · 5/round · 2aad1449"
contentUuid: "ad083cc5-0dfe-5caa-b993-628eb3f0164a"
diamondUuid: "ac48cd8e-be6b-8669-969c-97d213c94d67"
uuid: "2aad1449-8a23-8eb9-85c9-64f81b3ab048"
horo: 5
typography:
  partition: items
  bondDegree: 34
standards:
  - "IFRS IAS-2 §10 §12 cost-of-conversion"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-execution"
  - "ISO-8601-1:2019 date-time receipt-date"
  - "ISO-8601-1:2019 date-time receipt-date`"
  - "SOX §404 internal-controls production-control TOM-PROD-02"
  - "US-GAAP ASC-330-10-30 inventory-cost"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d4304a4b-8fc5-828e-b847-f8518dfbff5a"
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
      stageUuid: "2157acf7-e1cc-8ae8-94b5-cb33683bb04d"
    - stage: seal
      stageUuid: "04bb44d3-fe71-89aa-aea0-b37a8f78e755"
    - stage: uuid
      stageUuid: "6a8729d9-78d1-896a-a1a0-40109d8b2f1c"
version: 2
---
# production-receipts

Production Receipts — finished-good receipts from a work-order into.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time receipt-date`

- ISO-8601-1:2019 date-time receipt-date
- ISA-95:2013 §B.5 production-execution
- IFRS IAS-2 §10 §12 cost-of-conversion
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail production-receipt-evidence
- SOX §404 internal-controls production-control TOM-PROD-02
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the receipt of finished goods from an internal [[work/orders|work order]] into inventory at absorbed cost (material + labour + overhead) — distinct from a vendor goods receipt.**

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[proof]] · [[standard]] · [[horo]].
