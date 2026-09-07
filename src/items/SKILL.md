---
name: items
description: "Use when managing the product/service catalogue — code, SKU, GTIN barcode, pricing, VAT rate, inventory quantity, GL posting; EN-16931 BG-31 item-information, UNSPSC classification. The items collection."
atomPath: items
coordinate: "items · 8/crest · d5a5fb79"
contentUuid: "cac82958-1156-507a-b2b9-42d067e8acde"
diamondUuid: "9aec5a56-1f70-803c-a0f2-5ad8fe85e17f"
uuid: "d5a5fb79-5300-8f02-b2fe-7efbf80f165b"
horo: 8
typography:
  partition: items
  bondDegree: 116
standards:
  - "EN-16931:2017 §BG-31 item-information"
  - "EN-16931:2017 §BG-31 item-information`"
  - "EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "GS1 GTIN global-trade-item-number"
  - "GS1-GTIN"
  - "IFRS IAS-2 inventories"
  - "INCOTERMS-2020"
  - "ISA-95"
  - "ISO-22400-2"
  - "ISO-4217:2015 currency-codes price-currency"
  - "ISO-4217:2015 currency-codes price-currency`"
  - "ISO-9001"
  - "ISO-9735"
  - "UN-CEFACT"
  - "UN-CEFACT UNSPSC product-classification"
  - UNSPSC
  - "US-GAAP ASC-330 inventory"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b058a6d7-2667-8925-bbd5-fb774a90b2d9"
  stages:
    - stage: path
      stageUuid: "966285a0-056b-8fe0-94b4-9ced326c71b1"
    - stage: trinity
      stageUuid: "f7b6d763-bd2e-801f-8d4c-41d48d7335f7"
    - stage: boundary
      stageUuid: "4935a89f-7556-87f7-8a0f-4b2675ff4d3a"
    - stage: links
      stageUuid: "31c384c8-dc3b-8450-828d-f1e9bbe391aa"
    - stage: horo
      stageUuid: "a18b2d8e-a2bb-8b5e-bf75-c86ba90d0334"
    - stage: seal
      stageUuid: "c34453bf-ba64-8732-9b91-e44427d4dba1"
    - stage: uuid
      stageUuid: "301d9542-326a-8530-887d-5f60bda5db86"
version: 2
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes price-currency`
- `@standard EN-16931:2017 §BG-31 item-information`

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
