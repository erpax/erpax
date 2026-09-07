---
name: harvest
description: "Use when modelling the gathering of matured output from a growth process — the IAS-41 transformation event where a biological asset becomes inventory, and the per-week harvest window (the produce calendar) over which a crop yields. Harvest is the realization point: value created by living growth crosses into sellable stock; the window is non-uniform — a 1 in the calendar marks presence, not constant volume."
atomPath: "vocabulary/harvest"
coordinate: "vocabulary/harvest · 5/round · c5efa193"
contentUuid: "c04d7d2c-695d-5c5c-be70-4c312f7a0c54"
diamondUuid: "718f74fa-307d-8fe7-aac1-dbed748c9566"
uuid: "c5efa193-0760-8cf5-8105-d9c461627358"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 101
standards: []
bindings: []
signatures:
  computationUuid: "a8a031c4-d91a-8240-b2d8-f0ad34f2cce4"
  stages:
    - stage: path
      stageUuid: "9f1f2fad-d288-8aa1-a4f9-c4e121468e1a"
    - stage: trinity
      stageUuid: "a826e2a7-3c9c-883e-90dd-e58493fa1866"
    - stage: boundary
      stageUuid: "7c142fba-4f0a-894b-b087-b910521254b1"
    - stage: links
      stageUuid: "d779cede-6b7b-8931-82e2-02898b95ac76"
    - stage: horo
      stageUuid: "4695d737-817f-8413-82f3-190325c26bd0"
    - stage: seal
      stageUuid: "d31cc2c0-5e50-87f4-a091-cc49a3fd5223"
    - stage: uuid
      stageUuid: "8e32cd55-87ca-88ea-9c7b-817f8ec96148"
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
