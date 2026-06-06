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

The catalog also holds **agricultural produce**: each [[crop]] is an items row (its sale unit a [[measure]] — bunch/head/quart — its price a [[currency]] amount), and **[[seed]]** is items too (the propagule as purchasable inventory; the [[cropplan]] seed order = computed need − on-hand). The CSA [[share]] box and its [[packs|packing]] draw from this one inventory. Garments, produce, seed — strip the prefix and they [[merge]] into one catalog/inventory model.

## Standards
- UN-CEFACT UNSPSC product-classification
- GS1 GTIN global-trade-item-number
- ISO-4217:2015 currency-codes price-currency
- EN-16931:2017 §BG-31 item-information
- EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)
- IFRS IAS-2 inventories
- US-GAAP ASC-330 inventory
- IFRS IAS-41 → IAS-2 transfer at harvest (biological produce becomes inventory)

**Law — [[law]]: one catalog/inventory model — garments, produce, and [[seed]] strip their prefix and [[merge]] into a single sellable/purchasable row with GL posting; trust the data over the schema.**

Composes: [[Batches]] · [[items/bills/of/materials]] · [[items/inventory/movements]] · [[Packages]] · [[items/purchase/orders]] · [[items/quality/inspections]].
