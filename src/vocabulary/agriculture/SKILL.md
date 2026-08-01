---
name: agriculture
description: "Use when reasoning about growing living produce to a market — agriculture is the domain molecule whose production is planned BACKWARD: from a sales plan (CSA shares + market channels) through per-crop demand to the land, seed, and fertility the season requires. The agricultural twin of manufacturing; every quantity carries a unit and a currency that convert automatically and account by double-entry."
atomPath: "vocabulary/agriculture"
coordinate: "vocabulary/agriculture · 8/crest · e291f370"
contentUuid: "32f42148-1e8c-5436-a37f-acf9ffaa7c5f"
diamondUuid: "0caeedce-bdbb-8a27-84d0-1603a9fdd453"
uuid: "e291f370-dcce-8428-9f84-437dc88eaf13"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 246
standards:
  - "IAS-41"
  - "IFRS-15"
bindings: []
signatures:
  computationUuid: "d8c7a407-b83e-8b52-9b97-10ab3fd19c7b"
  stages:
    - stage: path
      stageUuid: "f9a424cc-b2d7-8773-b895-645b73ea9637"
    - stage: trinity
      stageUuid: "7ec7a7b7-c6dc-8aeb-aa97-db506167e09f"
    - stage: boundary
      stageUuid: "7582051d-481c-8470-88e6-202f41a34230"
    - stage: links
      stageUuid: "dcde079d-2ad7-8ef5-85a5-e9dc3cc9f34e"
    - stage: horo
      stageUuid: "3f56910e-094d-8a3b-b58a-be460ef3c9b5"
    - stage: seal
      stageUuid: "e8f804c3-fc1f-8207-8448-8bbc941ad6f6"
    - stage: uuid
      stageUuid: "4679ecb8-78c7-8895-bf30-44a4e3caf4fb"
version: 2
---
# agriculture — growing living produce to a market, planned backward from demand to land

**agriculture** is a domain molecule ([[atom]]) — the cultivation of living things ([[biological/assets]]) over a [[season]] for [[harvest]] — built from the same universal atoms as [[accounting]], [[commerce]], and [[manufacturing]]. It spans every living-production domain — annual [[crop]]s, [[perennial]] orchards/vineyards, [[livestock]], [[aquaculture]], [[forestry]], and [[apiculture]] — each running the same atoms (a living asset measured by [[biological/assets|IAS-41]], grown over a [[season]], realized at [[harvest]]). Its defining law is **backward planning**: you do not ask *"I have N decares, what fits?"* — you **picture the harvest, then reverse-engineer the land**. Grow to a market; never market what you happened to grow.

The chain (the CSA planning calculator, read right-to-left):

```
sales plan ([[share]] boxes × composition + [[market]] channels)
  → demand per [[crop]] per week     (farm totals)
  → produce weight                   (× unit weight — [[measure]])
  → row-/bed-length                  (÷ [[yield]] per length)
  → land area                        (÷ row-length per area)  ── the binding [[bottleneck]]: land × season
  → seed + [[fertility]] (N · K₂O)   (× rate per length/area — [[rate]])
  → gross revenue                    (× unit price — [[currency]])
```

This is **agricultural MRP** — a [[manufacturing|bill-of-materials]] explosion run from a demand [[forecast]]: the finished good (the [[share]] box) explodes into component [[crop]]s, then into raw inputs (seed, nitrogen, potassium) and [[capacity]] (bed-length, transplant flats). [[planting]] (successions) and [[harvest]] (pickings) spread that footprint across the [[season]]'s weeks; [[allocation]] and [[bottleneck]] govern the land-and-season constraint that caps the [[whole]].

**agriculture mints no new collections** — it is the knowledge layer over existing ones: the [[crop]] catalogue is [[items]], the living asset is [[biological/assets]], the [[share]] is a prepaid subscription, sales are [[customers/sales/orders]]. Every quantity it touches is a [[measure]] (value + unit) priced in a [[currency]] (amount + ISO-4217); both **[[conversion|convert automatically]]** along a [[rate]] and **[[balance|account by double-entry]]** — so a Bulgarian farm reads `kg/decare` and `лв` while the engine carries one substance and one ledger, never the spreadsheet's `#VALUE!` text.

**The accountable matter** lives in `src/agriculture/accountable.ts` — pure builders over the universal [[entry]] double-entry engine that turn each agriculture event into a balanced posting: `harvestEntry` (biological asset → inventory, IAS-41 §13), `sharePrepayEntry`/`shareDeliveryEntry` (the prepay ⊕ deliveries that NET TO ZERO when the season's obligation is discharged — [[recognition]] over the [[deferral|deferred]] [[share]] liability, IFRS 15), `nutrientRemovalEntry`/`nutrientApplicationEntry` (the soil [[fertility]] budget as debit/credit), and `fxGainLossEntry` (a moved-rate [[conversion]] books an FX gain/loss; a unit conversion conserves). All is accountable — agriculture closes onto the ledger like every other domain.

## Standards
- USDA National Agricultural Library — Community Supported Agriculture definition (sharing the risks and benefits of food production)
- Coleman, *The New Organic Grower* (standardized permanent-bed system); Fortier, *The Market Gardener* (intensive demand-driven planning); Wiswall, *The Organic Farmer's Business Handbook* (crop enterprise budgets)
- CEFS / NC State — Gruver, *Planning Spreadsheets for CSA and Farmers' Markets* & *Crop Scheduling for Continuous Harvest* (the source artifact's lineage)
- Southeastern U.S. Vegetable Crop Handbook (regional commercial recommendations)
- IFRS IAS-41 (biological assets); UN/CEFACT Rec 20 (units); ISO 4217:2015 (currency)
- Permaculture design — Mollison & Holmgren's principles + ethics (earth care · people care · fair share) — and the regenerative/organic certification the produce can carry: IFOAM Norms, EU Organic Regulation 2018/848, USDA NOP, Demeter (biodynamic), Regenerative Organic Certified, GLOBALG.A.P., Savory EOV (Land to Market), FAO agroecology. Registered upstream in the [[standards]] catalogue; cited as the matter layer grows.

## Common mistakes
- Planning by area instead of by market — filling the land then hunting for buyers produces gluts; the backward chain exists to prevent it.
- Storing a price as text (`2.00 лв`) or keeping parallel imperial/metric sheets — both break totals and drift; carry [[measure]] + [[currency]] and let [[conversion]] be automatic.
- Treating the plan as static — yield/spacing/fertility coefficients are farm- and season-specific; re-measure, never copy blind.

Composes [[crop]] · [[livestock]] · [[perennial]] · [[aquaculture]] · [[forestry]] · [[apiculture]] · [[harvest]] · [[yield]] · [[season]] · [[planting]] · [[fertility]] · [[share]] · [[soil]] · [[rotation]] · [[covercrop]] · [[tillage]] · [[cultivation]] · [[irrigation]] · [[postharvest]] · [[grade]] · [[cropplan]] · [[organic]] · [[certification]] · [[permaculture]] · [[pickup]] · [[choice]] · [[enterprisebudget]] · [[biological/assets]] · [[manufacturing]] · [[commerce]] · [[measure]] · [[currency]] · [[conversion]] · [[bottleneck]] · [[capacity]] · [[allocation]] · [[items]] · [[entry]] · [[recognition]] · [[deferral]] · [[ecosystem]].

**Law — [[law]]: plan backward from the harvest you intend to sell, never forward from the land you happen to hold — land × season is the binding bottleneck, and every quantity along the chain carries a unit and a currency that convert automatically and post by double-entry.**
