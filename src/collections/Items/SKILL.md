---
name: items
description: Use when managing the product/service catalogue — code, SKU, GTIN barcode, pricing, VAT rate, inventory quantity, GL posting; EN-16931 BG-31 item-information, UNSPSC classification. The items collection.
---

# items

Items — sellable / purchasable inventory rows with GL posting.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- UN-CEFACT UNSPSC product-classification
- GS1 GTIN global-trade-item-number
- ISO-4217:2015 currency-codes price-currency
- EN-16931:2017 §BG-31 item-information
- IFRS IAS-2 inventories
- US-GAAP ASC-330 inventory

Composes: [[Batches]] · [[BillsOfMaterials]] · [[InventoryMovements]] · [[Packages]] · [[PurchaseOrders]] · [[QualityInspections]].
