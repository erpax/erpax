---
name: maturity
description: "Use when deciding a crop is ready to harvest — days-to-maturity (DTM, the scheduling constant from sow/transplant to first pick), the maturity index (color, firmness, size, °Brix sugar) that signals harvest readiness, and the harvest window before over-maturity. Harvest maturity (pick-point) differs from eating ripeness; DTM lengthens as daylight wanes."
atomPath: maturity
coordinate: maturity · 4/weave · 5b076993
contentUuid: "d2b0e577-d568-5b2e-a2b4-50a813230c90"
diamondUuid: "acea07aa-3500-8e2b-97ab-4191173cbec0"
uuid: "5b076993-efc6-8111-becc-fec548d2519f"
horo: 4
bonds:
  in:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - crop
    - degreeday
    - dormancy
    - evapotranspiration
    - grade
    - harvest
    - measure
    - perennial
    - planting
    - pollination
    - rootstock
    - scion
    - season
    - transplant
    - tunnel
    - variant
  out:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - crop
    - degreeday
    - dormancy
    - evapotranspiration
    - grade
    - harvest
    - measure
    - perennial
    - planting
    - pollination
    - rootstock
    - scion
    - season
    - transplant
    - tunnel
    - variant
typography:
  partition: maturity
  bondDegree: 61
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - crop
    - degreeday
    - grade
    - harvest
    - measure
    - planting
    - season
    - transplant
  matrix:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - crop
    - degreeday
    - dormancy
    - evapotranspiration
    - grade
    - harvest
    - measure
    - perennial
    - planting
    - pollination
    - rootstock
    - scion
    - season
    - transplant
    - tunnel
    - variant
  backlinks:
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - crop
    - degreeday
    - dormancy
    - evapotranspiration
    - grade
    - harvest
    - measure
    - perennial
    - planting
    - pollination
    - rootstock
    - scion
    - season
    - transplant
    - tunnel
    - variant
signatures:
  computationUuid: "a6ab305b-1e61-8967-82d9-637802880d12"
  stages:
    - stage: path
      stageUuid: "723ac26d-3fc9-87e2-8bde-4eeb37d012e1"
    - stage: trinity
      stageUuid: "953e6d75-4d9e-88fb-8f66-956a741de1c0"
    - stage: boundary
      stageUuid: "2e2e54af-6ba9-8fd6-a370-3145adb1adbb"
    - stage: links
      stageUuid: "9572f18a-c730-8b28-949e-04339948abaa"
    - stage: horo
      stageUuid: "a378247d-1baf-80c3-8be3-dab94aed53d6"
    - stage: seal
      stageUuid: "7c2ce6b1-3457-89bd-94ea-65576119e9e1"
    - stage: uuid
      stageUuid: "2c5167e5-d2e1-8eb6-855b-5a5ef7e1bc0f"
version: 2
---
# maturity — when the crop is ready (the harvest-readiness signal)

**maturity** is the crop's readiness to [[harvest]], with two faces. As **timing**: **days-to-maturity (DTM)** is the scheduling constant — average days from sow/[[transplant]] to first pick — from which sow, transplant, and target-harvest dates are back-calculated ([[planting]]); it *lengthens as daylight wanes*, so a fall crop's DTM exceeds its spring DTM. As **state**: the **maturity index** is the measurable signal to pick — color, firmness, size, and **°Brix** (refractometer sugar / soluble-solids, also a [[grade]] threshold) — over a **harvest window** before quality declines into over-maturity.

Harvest maturity (the pick-point — e.g. a breaker / mature-green tomato) often differs from eating ripeness. Maturity is the [[measure]] that triggers the [[harvest]] event and feeds the [[grade]] decision; it paces against the heat the crop accumulates ([[degreeday]]) through its [[season]].

## Standards
- UC Davis Postharvest Technology Center — maturity indices; *Knott's Handbook* — commercial/horticultural maturity
- Johnny's Selected Seeds — days-to-maturity charts; OSU Ohioline — °Brix as a quality indicator

Composes [[agriculture]] · [[crop]] · [[harvest]] · [[grade]] · [[degreeday]] · [[season]] · [[planting]] · [[transplant]] · [[measure]].
