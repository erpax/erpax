---
name: maturity
description: "Use when deciding a crop is ready to harvest — days-to-maturity (DTM, the scheduling constant from sow/transplant to first pick), the maturity index (color, firmness, size, °Brix sugar) that signals harvest readiness, and the harvest window before over-maturity. Harvest maturity (pick-point) differs from eating ripeness; DTM lengthens as daylight wanes."
atomPath: "vocabulary/maturity"
coordinate: "vocabulary/maturity · 4/weave · 0e02d6fd"
contentUuid: "e723274d-9b3a-5779-ae45-b9a1262f4ee6"
diamondUuid: "5e6e0d22-238a-8956-8b55-fd8ef12574e6"
uuid: "0e02d6fd-89dd-82c2-96cd-c19353bb1d0f"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "5cdd90df-f1f6-8554-8f08-ed426b4ea7de"
  stages:
    - stage: path
      stageUuid: "448c4738-a1af-80c2-b978-c2cc84b1f8eb"
    - stage: trinity
      stageUuid: "e8a8a6dd-c4cc-8238-9c19-3040df3c92fe"
    - stage: boundary
      stageUuid: "c36416db-07b7-8cfa-8b41-10557df6b43a"
    - stage: links
      stageUuid: "19aa5974-715a-8443-9050-10c85800d1b2"
    - stage: horo
      stageUuid: "988a9d88-6b00-81e8-8a4a-f8338d00fd6c"
    - stage: seal
      stageUuid: "66ef16de-e936-86c6-8759-4d9ca26660ee"
    - stage: uuid
      stageUuid: "8d3c96fc-64e8-8b22-98ee-2242e807deef"
version: 2
---
# maturity — when the crop is ready (the harvest-readiness signal)

**maturity** is the crop's readiness to [[harvest]], with two faces. As **timing**: **days-to-maturity (DTM)** is the scheduling constant — average days from sow/transplant to first pick — from which sow, transplant, and target-harvest dates are back-calculated ([[planting]]); it *lengthens as daylight wanes*, so a fall crop's DTM exceeds its spring DTM. As **state**: the **maturity index** is the measurable signal to pick — color, firmness, size, and **°Brix** (refractometer sugar / soluble-solids, also a [[grade]] threshold) — over a **harvest window** before quality declines into over-maturity.

Harvest maturity (the pick-point — e.g. a breaker / mature-green tomato) often differs from eating ripeness. Maturity is the [[measure]] that triggers the [[harvest]] event and feeds the [[grade]] decision; it paces against the heat the crop accumulates ([[degreeday]]) through its season.

## Standards
- UC Davis Postharvest Technology Center — maturity indices; *Knott's Handbook* — commercial/horticultural maturity
- Johnny's Selected Seeds — days-to-maturity charts; OSU Ohioline — °Brix as a quality indicator

Composes [[agriculture]] · [[crop]] · [[harvest]] · [[grade]] · [[degreeday]] · season · [[planting]] · transplant · [[measure]].
