---
name: items
description: "Use when managing the product/service catalogue — code, SKU, GTIN barcode, pricing, VAT rate, inventory quantity, GL posting; EN-16931 BG-31 item-information, UNSPSC classification. The items collection."
atomPath: items
coordinate: "items · 8/crest · 9318457f"
contentUuid: "ca7632a3-c240-5abe-8406-35108deaeac9"
diamondUuid: "76061536-11f2-8412-9d27-d775ca706aca"
uuid: "9318457f-066b-8883-824f-df2cdbc1201c"
horo: 8
typography:
  partition: items
  bondDegree: 112
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
  computationUuid: "88379776-6fd2-82ce-8dc0-a449bba29bc5"
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
      stageUuid: "952f98b0-b578-8b40-af36-8a8e9ef08fdc"
    - stage: seal
      stageUuid: "c34453bf-ba64-8732-9b91-e44427d4dba1"
    - stage: uuid
      stageUuid: "af5f4259-21de-83ed-a91b-babd2f198a9b"
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
