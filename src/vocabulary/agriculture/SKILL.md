---
name: agriculture
description: "Use when reasoning about growing living produce to a market — agriculture is the domain molecule whose production is planned BACKWARD: from a sales plan (CSA shares + market channels) through per-crop demand to the land, seed, and fertility the season requires. The agricultural twin of manufacturing; every quantity carries a unit and a currency that convert automatically and account by double-entry."
atomPath: "vocabulary/agriculture"
coordinate: "vocabulary/agriculture · 4/weave · 90eea27f"
contentUuid: "7f78167a-b12d-5d9c-93d3-4d2aba46a654"
diamondUuid: "ec5e94c1-5ae6-8fae-9678-11375fce22da"
uuid: "90eea27f-dd49-8153-9fa5-191ac6e5ba81"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 205
standards:
  - "IAS-41"
  - "IFRS-15"
bindings: []
signatures:
  computationUuid: "89214fb0-b28a-8910-9e36-13228360adf9"
  stages:
    - stage: path
      stageUuid: "f9a424cc-b2d7-8773-b895-645b73ea9637"
    - stage: trinity
      stageUuid: "7ec7a7b7-c6dc-8aeb-aa97-db506167e09f"
    - stage: boundary
      stageUuid: "7582051d-481c-8470-88e6-202f41a34230"
    - stage: links
      stageUuid: "d43b2e3a-5ff4-8df2-8e35-d8e170ba7100"
    - stage: horo
      stageUuid: "b86ba1a9-d564-8468-84bb-4ecad9fa0e76"
    - stage: seal
      stageUuid: "d83d3e9b-04a0-8cc1-b9b8-99142e7dbe04"
    - stage: uuid
      stageUuid: "c30fbd2f-a13d-8622-9731-791045655f72"
version: 2
---
# agriculture — growing living produce to a market, planned backward from demand to land

**agriculture** is a domain molecule ([[atom]]) — the cultivation of living things ([[biological/assets]]) over a season for [[harvest]] — built from the same universal atoms as [[accounting]], [[commerce]], and [[manufacturing]]. It spans every living-production domain — annual crops, perennial orchards/vineyards, livestock, aquaculture, forestry, and apiculture — each running the same atoms (a living asset measured by [[biological/assets|IAS-41]], grown over a season, realized at [[harvest]]). Its defining law is **backward planning**: you do not ask *"I have N decares, what fits?"* — you **picture the harvest, then reverse-engineer the land**. Grow to a market; never market what you happened to grow.

The chain (the CSA planning calculator, read right-to-left):

```
sales plan ([[share]] boxes × composition + market channels)
  → demand per crop per week     (farm totals)
  → produce weight                   (× unit weight — measure)
  → row-/bed-length                  (÷ yield per length)
  → land area                        (÷ row-length per area)  ── the binding bottleneck: land × season
  → seed + fertility (N · K₂O)   (× rate per length/area — rate)
  → gross revenue                    (× unit price — [[currency]])
```

This is **agricultural MRP** — a [[manufacturing|bill-of-materials]] explosion run from a demand forecast: the finished good (the [[share]] box) explodes into component crops, then into raw inputs (seed, nitrogen, potassium) and [[capacity]] (bed-length, transplant flats). planting (successions) and [[harvest]] (pickings) spread that footprint across the season's weeks; [[allocation]] and bottleneck govern the land-and-season constraint that caps the [[whole]].

**agriculture mints no new collections** — it is the knowledge layer over existing ones: the crop catalogue is [[items]], the living asset is [[biological/assets]], the [[share]] is a prepaid subscription, sales are [[customers/sales/orders]]. Every quantity it touches is a measure (value + unit) priced in a [[currency]] (amount + ISO-4217); both **convert automatically** along a rate and **[[balance|account by double-entry]]** — so a Bulgarian farm reads `kg/decare` and `лв` while the engine carries one substance and one ledger, never the spreadsheet's `#VALUE!` text.

**The accountable matter** lives in `src/agriculture/accountable.ts` — pure builders over the universal [[entry]] double-entry engine that turn each agriculture event into a balanced posting: `harvestEntry` (biological asset → inventory, IAS-41 §13), `sharePrepayEntry`/`shareDeliveryEntry` (the prepay ⊕ deliveries that NET TO ZERO when the season's obligation is discharged — recognition over the deferred [[share]] liability, IFRS 15), `nutrientRemovalEntry`/`nutrientApplicationEntry` (the soil fertility budget as debit/credit), and `fxGainLossEntry` (a moved-rate conversion books an FX gain/loss; a unit conversion conserves). All is accountable — agriculture closes onto the ledger like every other domain.

## Standards
- USDA National Agricultural Library — Community Supported Agriculture definition (sharing the risks and benefits of food production)
- Coleman, *The New Organic Grower* (standardized permanent-bed system); Fortier, *The Market Gardener* (intensive demand-driven planning); Wiswall, *The Organic Farmer's Business Handbook* (crop enterprise budgets)
- CEFS / NC State — Gruver, *Planning Spreadsheets for CSA and Farmers' Markets* & *Crop Scheduling for Continuous Harvest* (the source artifact's lineage)
- Southeastern U.S. Vegetable Crop Handbook (regional commercial recommendations)
- IFRS IAS-41 (biological assets); UN/CEFACT Rec 20 (units); ISO 4217:2015 (currency)
- Permaculture design — Mollison & Holmgren's principles + ethics (earth care · people care · fair share) — and the regenerative/organic certification the produce can carry: IFOAM Norms, EU Organic Regulation 2018/848, USDA NOP, Demeter (biodynamic), Regenerative Organic Certified, GLOBALG.A.P., Savory EOV (Land to Market), FAO agroecology. Registered upstream in the [[standards]] catalogue; cited as the matter layer grows.

## Common mistakes
- Planning by area instead of by market — filling the land then hunting for buyers produces gluts; the backward chain exists to prevent it.
- Storing a price as text (`2.00 лв`) or keeping parallel imperial/metric sheets — both break totals and drift; carry measure + [[currency]] and let conversion be automatic.
- Treating the plan as static — yield/spacing/fertility coefficients are farm- and season-specific; re-measure, never copy blind.

Composes crop · livestock · perennial · aquaculture · forestry · apiculture · [[harvest]] · yield · season · planting · fertility · [[share]] · soil · rotation · covercrop · tillage · cultivation · irrigation · postharvest · grade · cropplan · organic · certification · permaculture · pickup · choice · enterprisebudget · [[biological/assets]] · [[manufacturing]] · [[commerce]] · measure · [[currency]] · conversion · bottleneck · [[capacity]] · [[allocation]] · [[items]] · [[entry]] · recognition · deferral · [[ecosystem]].

**Law — [[law]]: plan backward from the harvest you intend to sell, never forward from the land you happen to hold — land × season is the binding bottleneck, and every quantity along the chain carries a unit and a currency that convert automatically and post by double-entry.**
