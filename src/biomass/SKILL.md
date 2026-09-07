---
name: biomass
description: "Use when a living stock is valued by its total mass, not per-individual — standing biomass (kg) is the IAS-41 fair-value unit for an aquaculture stock, a forest stand, or a bee colony's strength: mass × forward price − costs-to-sell. Its growth rate is biological transformation. The non-individuated living-asset measure, shared across aquaculture/forestry/apiculture."
atomPath: biomass
coordinate: "biomass · 7/descent · 8fc2db18"
contentUuid: "70afdefd-b0af-5cfe-90eb-d578c265a2ec"
diamondUuid: "74d5ad0b-ba9f-8354-8060-6dbb5bdb6aa2"
uuid: "8fc2db18-c989-8d69-ac2b-00e75fa9b6e4"
horo: 7
typography:
  partition: biomass
  bondDegree: 37
standards:
  - "FAO — forest growth-and-yield / mean annual increment (MAI)"
  - "IAS-41"
  - "IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split"
  - "IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e4c29223-bf36-84e4-adad-82cd14b0d7fd"
  stages:
    - stage: path
      stageUuid: "89f60642-c0ca-8467-b5aa-e02a0fd16eca"
    - stage: trinity
      stageUuid: "fb2c984e-5b5e-8614-81eb-160ccfa5f338"
    - stage: boundary
      stageUuid: "2ad254e9-695d-80d1-a8d4-b894dc1bc280"
    - stage: links
      stageUuid: "619490fa-9e41-88c8-abf4-b834964fc612"
    - stage: horo
      stageUuid: "e216d969-6d08-87ac-80db-7aa1389a0bb4"
    - stage: seal
      stageUuid: "da4bd91a-383c-84fa-a2c2-f4d1fc1bd47e"
    - stage: uuid
      stageUuid: "78932de2-02fd-860a-bb33-f2c81eb0daff"
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
