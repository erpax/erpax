---
name: biomass
description: "Use when a living stock is valued by its total mass, not per-individual — standing biomass (kg) is the IAS-41 fair-value unit for an aquaculture stock, a forest stand, or a bee colony's strength: mass × forward price − costs-to-sell. Its growth rate is biological transformation. The non-individuated living-asset measure, shared across aquaculture/forestry/apiculture."
atomPath: biomass
coordinate: "biomass · 8/crest · 6b072c73"
contentUuid: "0a7c6fa7-b76a-596d-ab6b-ab41c74a1b22"
diamondUuid: "906dfd75-0001-8629-a058-906724236eae"
uuid: "6b072c73-4345-8799-a0d4-9eb4fb9c7312"
horo: 8
bonds:
  in:
    - apiculture
    - aquaculture
    - assets
    - capacity
    - conservation
    - ecosystem
    - forecast
    - forestry
    - harvest
    - herd
    - items
    - livestock
    - measure
    - mortality
    - mycelium
    - rate
    - sustainability
    - yield
  out:
    - apiculture
    - aquaculture
    - assets
    - capacity
    - conservation
    - ecosystem
    - forecast
    - forestry
    - harvest
    - herd
    - items
    - livestock
    - measure
    - mortality
    - mycelium
    - rate
    - sustainability
    - yield
typography:
  partition: biomass
  bondDegree: 61
  neighbors: []
standards:
  - "FAO — forest growth-and-yield / mean annual increment (MAI)"
  - "IAS-41"
  - "IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split"
  - "IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - apiculture
    - aquaculture
    - assets
    - capacity
    - ecosystem
    - forecast
    - forestry
    - harvest
    - herd
    - items
    - livestock
    - measure
    - mortality
    - rate
    - sustainability
    - yield
  matrix:
    - apiculture
    - aquaculture
    - assets
    - capacity
    - conservation
    - ecosystem
    - forecast
    - forestry
    - harvest
    - herd
    - items
    - livestock
    - measure
    - mortality
    - mycelium
    - rate
    - sustainability
    - yield
  backlinks:
    - apiculture
    - aquaculture
    - assets
    - capacity
    - conservation
    - ecosystem
    - forecast
    - forestry
    - harvest
    - herd
    - items
    - livestock
    - measure
    - mortality
    - mycelium
    - rate
    - sustainability
    - yield
signatures:
  computationUuid: "2068b595-6159-8f54-978f-6faa49dfd357"
  stages:
    - stage: path
      stageUuid: "89f60642-c0ca-8467-b5aa-e02a0fd16eca"
    - stage: trinity
      stageUuid: "fb2c984e-5b5e-8614-81eb-160ccfa5f338"
    - stage: boundary
      stageUuid: "2ad254e9-695d-80d1-a8d4-b894dc1bc280"
    - stage: links
      stageUuid: "efb65edd-8e10-8fda-8399-a85bc27baeef"
    - stage: horo
      stageUuid: "68732356-e5cc-8cbc-ad00-64c846c0620e"
    - stage: seal
      stageUuid: "da4bd91a-383c-84fa-a2c2-f4d1fc1bd47e"
    - stage: uuid
      stageUuid: "47d754d2-a598-89b9-beb5-7f3b2ac94d63"
version: 2
---
# biomass — the living mass of a stock; the fair-value unit of non-individuated life

**biomass** is the total live mass of a stock — the unit a living asset that is *not* counted head-by-head is measured and fair-valued by. It is the load-bearing [[measure]] across the non-livestock living-production domains: an [[aquaculture]] pen's standing fish weight, a [[forestry]] stand's standing-timber volume, a bee [[apiculture|colony]]'s strength. Its IAS-41 fair value is **biomass × forward price − costs-to-sell** ([[biological/assets]]); its growth ([[rate]]) is the **biological transformation** the standard splits from price change.

Biomass is to the [[aquaculture]]/[[forestry]] stock what the counted [[herd]] is to [[livestock]] — the aggregate the [[biological/assets|biological asset]] is carried at, drawn down by [[mortality]] and realized at [[harvest]] (felling, cropping) into [[items|inventory]]. Stocking density is its [[capacity]] ceiling; growth-and-yield models [[forecast]] it.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split`

- IFRS IAS-41 (fair-value-less-costs-to-sell on biomass; biological-transformation vs price-change split)
- FAO (aquaculture/forestry biomass); forest growth-and-yield models (MAI)

Composes [[biological/assets]] · [[measure]] · [[rate]] · [[aquaculture]] · [[forestry]] · [[apiculture]] · [[mortality]] · [[harvest]] · [[capacity]] · [[forecast]] · [[items]] · [[yield]] · [[sustainability]] · [[ecosystem]].

## Matter-twin

`src/biomass/index.ts` exports five pure functions:

- `standingStock(individuals, meanMass)` — total live mass of the stock (n × mean mass; the IAS-41 carrying unit)
- `fairValue(biomass, forwardPrice, costsToSell)` — IAS-41 balance-sheet value: mass × forward price − costs to sell
- `biologicalTransformation(massStart, massEnd)` — signed period mass change; positive = growth, negative = mortality drawdown
- `meanAnnualIncrement(volume, age)` — FAO forestry MAI = volume / age; returns 0 for age ≤ 0
- `stockingDensity(biomass, area)` — carrying-capacity density = biomass / area; returns 0 for area ≤ 0
