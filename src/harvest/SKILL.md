---
name: harvest
description: "Use when modelling the gathering of matured output from a growth process — the IAS-41 transformation event where a biological asset becomes inventory, and the per-week harvest window (the produce calendar) over which a crop yields. Harvest is the realization point: value created by living growth crosses into sellable stock; the window is non-uniform — a 1 in the calendar marks presence, not constant volume."
atomPath: harvest
coordinate: harvest · 7/descent · 1bf1e6d2
contentUuid: "a0ea8c7a-5017-5d0f-8d7d-cb8da2889e3e"
diamondUuid: "80bc42e1-ee12-81d4-9be8-6be8fa16b018"
uuid: "1bf1e6d2-ec7c-8ac2-a423-78532cc21789"
horo: 7
bonds:
  in:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - assets
    - balance
    - biomass
    - choice
    - commerce
    - compost
    - covercrop
    - crop
    - cropplan
    - degreeday
    - dormancy
    - entries
    - fodder
    - forestry
    - grade
    - hardiness
    - items
    - lactation
    - lineage
    - livestock
    - maturity
    - perennial
    - planting
    - pollination
    - postharvest
    - recognition
    - season
    - share
    - tunnel
    - withdrawal
    - yield
  out:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - assets
    - balance
    - biomass
    - choice
    - commerce
    - compost
    - covercrop
    - crop
    - cropplan
    - degreeday
    - dormancy
    - entries
    - fodder
    - forestry
    - grade
    - hardiness
    - items
    - lactation
    - lineage
    - livestock
    - maturity
    - perennial
    - planting
    - pollination
    - postharvest
    - recognition
    - season
    - share
    - tunnel
    - withdrawal
    - yield
typography:
  partition: harvest
  bondDegree: 111
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - assets
    - balance
    - commerce
    - crop
    - entries
    - items
    - planting
    - recognition
    - season
    - share
    - yield
  matrix:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - assets
    - balance
    - biomass
    - choice
    - commerce
    - compost
    - covercrop
    - crop
    - cropplan
    - degreeday
    - dormancy
    - entries
    - fodder
    - forestry
    - grade
    - hardiness
    - items
    - lactation
    - lineage
    - livestock
    - maturity
    - perennial
    - planting
    - pollination
    - postharvest
    - recognition
    - season
    - share
    - tunnel
    - withdrawal
    - yield
  backlinks:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - assets
    - balance
    - biomass
    - choice
    - commerce
    - compost
    - covercrop
    - crop
    - cropplan
    - degreeday
    - dormancy
    - entries
    - fodder
    - forestry
    - grade
    - hardiness
    - items
    - lactation
    - lineage
    - livestock
    - maturity
    - perennial
    - planting
    - pollination
    - postharvest
    - recognition
    - season
    - share
    - tunnel
    - withdrawal
    - yield
signatures:
  computationUuid: "c22be7ec-37c5-89ff-8af3-dd39c9ad9e4f"
  stages:
    - stage: path
      stageUuid: "88a976ed-73dd-8615-9dcb-bd8e4c7a261e"
    - stage: trinity
      stageUuid: "329b9b24-aa58-8faf-b31b-a9eb3a427e7e"
    - stage: boundary
      stageUuid: "4d714460-41ff-8cee-9a96-499940a621a4"
    - stage: links
      stageUuid: "6f3b75b2-80ee-8c3f-acce-a6f34c69010b"
    - stage: horo
      stageUuid: "dc8492d5-3bb9-889b-9d73-132a7e910a4d"
    - stage: seal
      stageUuid: "c9ca9766-5471-82b6-bb75-359b6cb1383b"
    - stage: uuid
      stageUuid: "d79cfb71-1585-85c0-acf7-22c8c9dee3cc"
version: 2
---
# harvest — the gathering event, and the window over which a crop yields

**harvest** is the event that turns living growth into sellable output — and the **window** of weeks over which it recurs. Two faces:

**The event.** At harvest a [[biological/assets|biological asset]] transforms into [[items|inventory]] — the IAS-41 §13 biological-transformation point the [[biological/assets]] atom forward-references as its `harvest-events` pairing. It is a **[[recognition]] moment**: value created by the asset *living* (growth, not price change) is realized and crosses the standards boundary into stock that [[commerce]] can sell. The matching [[journal/entries|journal entry]] keeps the [[balance]] — the asset de-recognized, inventory recognized at fair-value-less-costs-to-sell.

**The window.** A **harvest calendar** is a matrix of week-of-year × [[crop]] marking the weeks each crop is *projected available* — the spring and fall waves of cool-season crops, the summer wave of warm-season ones ([[season]]). Each crop has a **number of harvests** (pickings across the window) — the demand-spreading twin of its number of [[planting]]s. The window is **regional**: built from local frost dates and heat accumulation, never a copied calendar.

**The trap: the window is not flat.** A `1` in the calendar marks *presence*, not constant volume — real [[yield]] ramps up, peaks, and tails off. Distributing a season's total yield evenly across the window (as the source spreadsheet itself warns it does) mis-sizes both the [[share]] box at the shoulders and the labor peak in the middle.

## Standards
- IFRS IAS-41 §13 (biological-transformation / harvest event), §12 (fair-value-less-costs-to-sell)
- Southeastern U.S. Vegetable Crop Handbook; CEFS — *Crop Scheduling for Continuous Harvest*
- Penn State Extension — cool-/warm-season harvest windows
- ISO-8601 (week-of-year dating)

## Common mistakes
- Carrying harvested produce still at biological-asset fair value — at harvest it transfers to [[items|inventory]] (IAS-41 §13); the status flips and a [[journal/entries|journal entry]] posts.
- Reading the availability `1` as constant weekly volume — it is presence, not quantity; yield is front/back-loaded across the window.
- Copying another farm's harvest calendar — windows are local to frost dates and [[season]] heat accumulation.

Composes [[agriculture]] · [[biological/assets]] · [[crop]] · [[season]] · [[planting]] · [[yield]] · [[recognition]] · [[journal/entries]] · [[balance]] · [[items]] · [[commerce]].
