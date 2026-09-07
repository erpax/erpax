---
name: items
description: "Use when managing the product/service catalogue — code, SKU, GTIN barcode, pricing, VAT rate, inventory quantity, GL posting; EN-16931 BG-31 item-information, UNSPSC classification. The items collection."
atomPath: items
coordinate: "items · 7/descent · 5820c55a"
contentUuid: "c131a65d-a774-5a59-a1a2-494c2bd6fe22"
diamondUuid: "7512ae2e-cac1-80e0-b653-f8628b7b4096"
uuid: "5820c55a-cf9e-86d8-8451-4714ed09213f"
horo: 7
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
  computationUuid: "6e181dd4-fb51-863c-9bf8-39f29a0ab76c"
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
      stageUuid: "0d4a6fd3-f1fc-8f3c-9c2e-c95d3f9f3a9a"
    - stage: seal
      stageUuid: "c34453bf-ba64-8732-9b91-e44427d4dba1"
    - stage: uuid
      stageUuid: "67c8c8b7-aedf-8f45-9004-8fc4a6ff9a64"
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
