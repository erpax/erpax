---
name: sales
description: "Use when recording a consignee's sale to an end-customer that triggers IFRS-15 §B78 control transfer — revenue recognition, COGS derecognition, commission calculation, inventory decrement, and GL journal booking. The consignment sale-event collection."
atomPath: "warehouse/locations/consignment/arrangements/consignment/sales"
coordinate: "warehouse/locations/consignment/arrangements/consignment/sales · 8/crest · e92902c7"
contentUuid: "1ce0de69-4bb6-53f7-8002-8394652d0b2f"
diamondUuid: "07472fa0-64eb-86d9-b8a2-856751855ce1"
uuid: "e92902c7-05b6-8895-b51c-115c7dd18b65"
horo: 8
typography:
  partition: warehouse
  bondDegree: 37
standards:
  - "IFRS IAS-2 §34 cost-of-inventories-recognised-as-expense"
  - "IFRS IFRS-15 §31 satisfaction-of-performance-obligation"
  - "IFRS IFRS-15 §38 point-in-time-control-transfer"
  - "IFRS IFRS-15 §B77-B78 consignment-control"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time sale-date"
  - "ISO-8601-1:2019 date-time sale-date`"
  - "SOX §404 internal-controls revenue-completeness TOM-AR-04"
  - "US-GAAP ASC-606-10-25-30 control-passing"
  - "US-GAAP ASC-606-10-55-79 consignment-indicators"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "fdcf3b8d-cc27-8a9c-a59d-d5fecdc33514"
  stages:
    - stage: path
      stageUuid: "51d29834-c311-8ea0-96b4-5d7412d932d9"
    - stage: trinity
      stageUuid: "454ec7cd-b026-8768-824b-9a8d398b8b78"
    - stage: boundary
      stageUuid: "bb793cac-c8a2-83c4-9ecf-b6858ff00983"
    - stage: links
      stageUuid: "8d62d6f4-7be9-82df-bdb7-279f12ab4288"
    - stage: horo
      stageUuid: "5f6ce5fd-c2bc-8127-b4e4-e351ad89a797"
    - stage: seal
      stageUuid: "07de05d5-e98a-80e0-b971-8d39d97683f4"
    - stage: uuid
      stageUuid: "d51c8dd3-a52d-8778-8043-22281b2822e7"
version: 2
---
# consignment-sales

Consignment Sales — sale-by-consignee events that resolve the [[warehouse/locations/consignment/arrangements|arrangement]]'s IFRS-15 §B77 control-transfer indicators.

Each row is one reportable sale the consignee made to an end-customer. `saleDate` IS the IFRS-15 §B78 control-transfer moment — the point revenue recognises (dual of [[close|deferral]] while goods sit unsold). On that event the afterChange hook derecognises [[warehouse/locations/consignment/arrangements/consignment/inventories|consignment inventory]] (a [[take|decrement]] of `quantityOnHand` + an `inventory-movement` of kind `sale_from_consignee`) and emits `consignment:sold`, which books one balanced [[entry]] on the [[accounting]] equation:

    Dr Cash / AR              netAmount
    Dr Commission Expense     commissionAmount
    Dr COGS                   cogsAmount (IAS-2 §34, = quantitySold × inventory.unitCost)
    Cr Revenue                grossAmount
    Cr Inventory at Consignee carryingCost

`commissionRatePercent` is snapshotted at sale time — a rate-card change is not retroactive. The [[horo|status ring]] runs reported → validated → posted → reversed (reversal-only, no destructive edit). The booked [[journal/entries|journal entry]] and the consignor's [[Invoices|invoice]] against the consignee close the loop.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time sale-date`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time sale-date
- IFRS IFRS-15 §31 satisfaction-of-performance-obligation
- IFRS IFRS-15 §38 point-in-time-control-transfer
- IFRS IFRS-15 §B77-B78 consignment-control
- IFRS IAS-2 §34 cost-of-inventories-recognised-as-expense
- US-GAAP ASC-606-10-25-30 control-passing
- US-GAAP ASC-606-10-55-79 consignment-indicators
- ISO-19011:2018 audit-trail consignment-sale-evidence
- SOX §404 internal-controls revenue-completeness TOM-AR-04
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: the sale date IS the control-transfer moment — it derecognises consignment inventory and books one balanced [[entry]] (Dr Cash/AR + Commission + COGS = Cr Revenue + Inventory), reversal-only, never a destructive edit ([[balance]]).**

Composes: [[warehouse/locations/consignment/arrangements]] · [[warehouse/locations/consignment/arrangements/consignment/inventories]] · [[Invoices]] · [[journal/entries]] · [[entry]] · [[accounting]] · [[horo]].
