---
name: items
description: "Use when managing the product/service catalogue — code, SKU, GTIN barcode, pricing, VAT rate, inventory quantity, GL posting; EN-16931 BG-31 item-information, UNSPSC classification. The items collection."
atomPath: items
coordinate: items · 7/descent · b55aa460
contentUuid: "10813e93-49f5-590a-8edc-01f5abb4cab5"
diamondUuid: "13a13d87-4f45-8538-bacf-07e9d6fb5dbd"
uuid: "b55aa460-556c-8600-9bab-539a0d1bdcb7"
horo: 7
bonds:
  in:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
  out:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
typography:
  partition: items
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 §BG-31 item-information"
  - "EU-1007/2011 textile-fibre-names + composition-labelling (the `contents` field)"
  - "EU-2005/29"
  - "EU-2011/83"
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "GS1 GTIN global-trade-item-number"
  - "GS1-GTIN"
  - "IFRS IAS-2 inventories"
  - "ILO-C100"
  - "INCOTERMS-2020"
  - "ISA-95"
  - "ISO-22400-2"
  - "ISO-4217:2015 currency-codes price-currency"
  - "ISO-9001"
  - "ISO-9735"
  - "UN-CEFACT"
  - "UN-CEFACT UNSPSC product-classification"
  - UNSPSC
  - "US-GAAP ASC-330 inventory"
bindings: []
neighbors:
  wikilink:
    - batches
    - crop
    - cropplan
    - currency
    - inspections
    - law
    - materials
    - measure
    - merge
    - movements
    - orders
    - packages
    - packs
    - seed
    - share
  matrix:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
  backlinks:
    - agriculture
    - apiculture
    - aquaculture
    - batches
    - biomass
    - bundle
    - crop
    - cropplan
    - currency
    - declarations
    - forestry
    - harvest
    - inspections
    - lactation
    - law
    - lines
    - livestock
    - materials
    - measure
    - merge
    - movements
    - num
    - orders
    - packages
    - packs
    - postharvest
    - quotes
    - seed
    - share
    - upsell
    - variant
signatures:
  computationUuid: "1f51f3a8-fae4-8755-96e9-bb580a7643b7"
  stages:
    - stage: path
      stageUuid: "966285a0-056b-8fe0-94b4-9ced326c71b1"
    - stage: trinity
      stageUuid: "f7b6d763-bd2e-801f-8d4c-41d48d7335f7"
    - stage: boundary
      stageUuid: "919e4772-7d43-81ab-94f5-04f8a2b456ce"
    - stage: links
      stageUuid: "31c384c8-dc3b-8450-828d-f1e9bbe391aa"
    - stage: horo
      stageUuid: "430a21b0-6ccc-8838-a527-d55e64dc2eed"
    - stage: seal
      stageUuid: "cc10ed21-6c84-8c19-9834-5e61d6462f11"
    - stage: uuid
      stageUuid: "b54c951a-7d5e-8f97-abe7-ac7178e7f80a"
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
