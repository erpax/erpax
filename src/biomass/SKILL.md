---
name: biomass
description: "Use when a living stock is valued by its total mass, not per-individual — standing biomass (kg) is the IAS-41 fair-value unit for an aquaculture stock, a forest stand, or a bee colony's strength: mass × forward price − costs-to-sell. Its growth rate is biological transformation. The non-individuated living-asset measure, shared across aquaculture/forestry/apiculture."
atomPath: biomass
coordinate: "biomass · 7/descent · 68a073fa"
contentUuid: "bb1aa11f-255b-5263-b223-4b7874965ff9"
diamondUuid: "eaefe6db-5f80-87f0-8e96-7e7ffcecbfe5"
uuid: "68a073fa-acd8-832b-9828-473ab02c14b2"
horo: 7
typography:
  partition: biomass
  bondDegree: 61
standards:
  - "FAO — forest growth-and-yield / mean annual increment (MAI)"
  - "IAS-41"
  - "IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split"
  - "IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "703ec30d-3849-898a-b653-2affb363baaf"
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
      stageUuid: "42aa416e-1ba0-80ed-b253-56a53c9470d5"
    - stage: seal
      stageUuid: "da4bd91a-383c-84fa-a2c2-f4d1fc1bd47e"
    - stage: uuid
      stageUuid: "ca58cd70-792b-825a-8335-ac8f119e791c"
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
