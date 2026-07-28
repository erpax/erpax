---
name: items
description: "Use when modeling a pack line — the units of one produced lot-variant packed into one carton; header-primary with an optional option breakdown whose double-entry holds when supplied. Evolved from 200,993 rows of etrima pack_items."
atomPath: "pack/items"
coordinate: "pack/items · 4/weave · f0478c92"
contentUuid: "4acb0a9c-538d-5beb-91da-8098a817746a"
diamondUuid: "b67d675b-f2fa-8b90-8ad3-c366e3f09f91"
uuid: "f0478c92-9544-8b71-b965-ec432f039de4"
horo: 4
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
    - pack
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
  partition: pack
  bondDegree: 116
  neighbors: []
standards:
  - "IFRS IAS-2 §10 finished-goods at dispatch"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-operations dispatch line"
  - "ISO/IEC-29119"
  - "UN-CEFACT"
  - "UN/CEFACT Rec20 mass (gram) per-unit"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - coordinate
    - fields
    - law
    - packs
    - variants
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
  computationUuid: "3dc44b99-9779-86f6-8c6a-754857b4ac5a"
  stages:
    - stage: path
      stageUuid: "2d61d636-2b0d-8b4f-8144-c1aba7d389c3"
    - stage: trinity
      stageUuid: "28cfe5f8-cced-8893-9a24-07e003ee4541"
    - stage: boundary
      stageUuid: "33dfa343-3097-88b6-9313-a081cdc95e45"
    - stage: links
      stageUuid: "7bb8dd91-2a33-8d04-b306-a854bd2376c7"
    - stage: horo
      stageUuid: "98115367-7400-877b-a337-80ddac130159"
    - stage: seal
      stageUuid: "3a93a549-a764-85bc-be3f-cd3d1e70751b"
    - stage: uuid
      stageUuid: "23e886a3-d112-85bf-91d7-2fc5ed628be4"
version: 2
---
# pack/items — the pack line

One pack line is the units of one produced [[lot/variants|lot-variant]] packed into one [[packs|pack]] — the entry the carton's `unitsPacked` total rolls up from. Evolved from 200,993 rows of etrima `pack_items`.

**Header-primary, options optional.** AUDIT: the header `unitsPacked` carries the quantity on 99.92% of rows; the 12 fixed `option_N` slots are used on only 0.17%. So `options[]` is an OPTIONAL fine-grained breakdown ([[fields|discriminator]] — many columns ⇒ one array). `rollUpOptions` (beforeChange) enforces the law: **options present ⇒ header = Σ options** (the double-entry held at 100.0000% in the data); options absent ⇒ the recorded header stands. Always `unitsBackordered = max(0, ordered − packed)` — the unpacked remainder ([[balance]]).

**The cross is `pack` ⊕ `lotVariant`, both real relationships** now those collections are minted. AUDIT dropped the DEAD `item_id` (NULL in 100% of rows): the line does not point at the catalog item — it points at the produced [[lot/variants|lot-variant]] (0% null). Per-option grams (`unitGrams` / `netUnitGrams`) ride the option line for the rare weighed breakdown, feeding the [[packs|pack]] mass balance.

Matter-twin: `src/pack/items/index.ts`. Composes [[packs]] · [[lot/variants]] · [[balance]] · [[fields|discriminator]] · [[coordinate]] · [[accounting]].

**Law — [[law]]: a pack line is the units of one produced [[lot/variants|lot-variant]] packed into one [[packs|pack]] — header-primary with an optional option breakdown whose double-entry holds when supplied (options present ⇒ header = Σ options; `unitsBackordered = max(0, ordered − packed)`).**
