---
name: season
description: "Use when output is bounded by a recurring climate window in the annual cycle — the growing/harvest season set by the frost-free period, the cool- vs warm-season crop split, and heat accumulation (growing degree days) rather than the calendar. The season is the time-axis bottleneck of agriculture: land × season caps how much can be grown; it is regional and probabilistic, never a copied calendar."
atomPath: season
coordinate: "season · 4/weave · bcb89871"
contentUuid: "378b890a-d8a2-510f-b41a-5cabaf621e48"
diamondUuid: "7565cd20-220f-8f3d-9e3e-615cf5a4fbf9"
uuid: "bcb89871-e62c-82c9-acbd-67f62985da58"
horo: 4
typography:
  partition: season
  bondDegree: 112
standards: []
bindings: []
signatures:
  computationUuid: "322def4b-eaeb-8083-9b0a-6601d61b0787"
  stages:
    - stage: path
      stageUuid: "a06c5aea-06e8-839a-bf73-bff93238b330"
    - stage: trinity
      stageUuid: "be938731-8c56-8b68-bd85-c022098d28d4"
    - stage: boundary
      stageUuid: "e126f8ed-12f6-8383-8b44-1b84f723844e"
    - stage: links
      stageUuid: "33644355-c2d3-8cde-99b4-7a3a545b08d7"
    - stage: horo
      stageUuid: "dd56915f-b09c-80b2-b8fb-7b95560345b3"
    - stage: seal
      stageUuid: "7ba4f872-08c1-88fc-ad93-f0e08ba8c491"
    - stage: uuid
      stageUuid: "19f22511-7a0f-837f-a06c-62cda3e8b385"
version: 2
---
# season — the recurring climate window that bounds growth

A **season** is a recurring, climate-bounded window in the annual cycle during which a [[crop]] can grow and be harvested — the **time-axis [[bottleneck]]** of [[agriculture]] (land × season is the binding [[capacity]]). Its outer bound is the **[[frost|frost-free period]]**: the days between the last spring frost and the first fall frost. Frost dates are **probabilistic, not fixed** — derived per weather station at a confidence level — so the relevant date is the *local* one; a copied or state-average calendar misfires.

The season splits crops two ways, and a week-of-year × crop matrix makes the split visible as **harvest waves**:
- **cool-season** (greens, roots, brassicas, peas) — tolerate frost, run two cycles (a **spring** and a **fall** wave);
- **warm-season** (tomato, corn, cucumber, melon, pepper) — planted only after last frost, one **summer** wave.

**Heat, not the calendar, drives maturity.** Crops accumulate development by **[[degreeday|growing degree days]]** — `GDD = (Tmax + Tmin)/2 − Tbase`, with a base near 10 °C for warm-season crops and a cap near 30 °C. A warm spring advances the first [[harvest]] week; a cool one delays it — which is why a fixed-week calendar **drifts** year to year and is only ever a *projection*. **Season extension** ([[tunnel|row cover, high tunnel, greenhouse]]) widens the window weeks at each end, the structural complement to a crop's biological [[hardiness]].

As a cyclical ring keyed to the year, the season is a [[horo]]-style band over the accounting [[period]] / [[time]] axis — the same recurrence law, climate-phased rather than fiscal. It is what [[planting]] staggers against and what every [[crop]]'s harvest window is cut from.

## Standards
- NC State Extension — Average First and Last Frost Dates (probabilistic, station-specific); USDA Plant Hardiness Zone Map (2023)
- Penn State Extension — cool-/warm-season classification & season extension
- Ohio State AGF-101 — growing degree days (86/50 method); phenology references
- Southeastern U.S. Vegetable Crop Handbook (regional planting/harvest windows)

## Common mistakes
- Scheduling by calendar week while ignoring weather/GDD — a cold spring pushes the first harvest later than the matrix predicts.
- Treating a regional calendar as universal — frost dates and windows are station-specific.
- Forgetting season extension — row cover/tunnel adds weeks the bare frost-free period understates.

Composes [[agriculture]] · [[crop]] · [[harvest]] · [[planting]] · [[frost]] · [[degreeday]] · [[tunnel]] · [[hardiness]] · [[bottleneck]] · [[capacity]] · [[period]] · [[time]] · [[horo]] · [[schedule]].

**Law — [[law]]: the season is the time-axis [[bottleneck]] of [[agriculture]] (land × season caps how much can be grown), set by the probabilistic frost-free window and heat accumulation — regional and never a copied calendar.**
