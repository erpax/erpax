---
name: biomass
description: "Use when a living stock is valued by its total mass, not per-individual — standing biomass (kg) is the IAS-41 fair-value unit for an aquaculture stock, a forest stand, or a bee colony's strength: mass × forward price − costs-to-sell. Its growth rate is biological transformation. The non-individuated living-asset measure, shared across aquaculture/forestry/apiculture."
atomPath: biomass
coordinate: "biomass · 5/round · 0cc8c979"
contentUuid: "c824445b-5624-56fb-826a-e4c514c9369d"
diamondUuid: "9e524db7-7b08-8c5f-b3eb-81b0decc4e01"
uuid: "0cc8c979-f3f7-8604-87fa-10082a3a5084"
horo: 5
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
  computationUuid: "04e129c1-62ff-85ab-8d4d-6ead5b5db3c3"
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
      stageUuid: "713b10ed-fba4-8968-a78d-ca09663fef31"
    - stage: seal
      stageUuid: "da4bd91a-383c-84fa-a2c2-f4d1fc1bd47e"
    - stage: uuid
      stageUuid: "acbd9538-81b0-878a-a6e3-4e88467ba789"
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
