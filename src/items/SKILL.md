---
name: items
description: Use when managing the product/service catalogue — code, SKU, GTIN barcode, pricing, VAT rate, inventory quantity, GL posting; EN-16931 BG-31 item-information, UNSPSC classification. The items collection.
---

# items

Items — sellable / purchasable inventory rows with GL posting. Also the unified product
**catalog**: the etrima `products` table (3,543 garment rows) merged in HERE, not a parallel
collection ([[merge]] — DRY, one catalog/inventory model). The merge was **data-driven** — its
costing tiers (CM/CMT/FPS) were 0% populated (empty speculative columns, dropped) and `hsCode`
already existed, so the only genuinely new fields are `name` (display name) and `contents`
(fibre composition, 93.7% populated; feeds customs + EU fibre-labelling). The lesson: trust the
data over the schema — most of a "missing" collection can be empty accident.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- UN-CEFACT UNSPSC product-classification
- GS1 GTIN global-trade-item-number
- ISO-4217:2015 currency-codes price-currency
- EN-16931:2017 §BG-31 item-information
- EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)
- IFRS IAS-2 inventories
- US-GAAP ASC-330 inventory

Composes: [[Batches]] · [[items/bills/of/materials]] · [[items/inventory/movements]] · [[Packages]] · [[items/purchase/orders]] · [[items/quality/inspections]].
