---
name: maturity
description: "Use when deciding a crop is ready to harvest — days-to-maturity (DTM, the scheduling constant from sow/transplant to first pick), the maturity index (color, firmness, size, °Brix sugar) that signals harvest readiness, and the harvest window before over-maturity. Harvest maturity (pick-point) differs from eating ripeness; DTM lengthens as daylight wanes."
atomPath: "vocabulary/maturity"
coordinate: "vocabulary/maturity · 1/base · e70b771d"
contentUuid: "ae4c8c50-8557-56a2-946a-82475520776d"
diamondUuid: "1c863973-3efe-84d5-8980-5697c9e14c59"
uuid: "e70b771d-93bc-82fa-beca-c375f7aa3468"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 61
standards: []
bindings: []
signatures:
  computationUuid: "825e2021-41e2-8c86-9dcd-efd11bf3f5e5"
  stages:
    - stage: path
      stageUuid: "448c4738-a1af-80c2-b978-c2cc84b1f8eb"
    - stage: trinity
      stageUuid: "e8a8a6dd-c4cc-8238-9c19-3040df3c92fe"
    - stage: boundary
      stageUuid: "b79b5261-e581-8e1d-bf88-da178be0c169"
    - stage: links
      stageUuid: "7affcfb4-3538-8673-85b2-0cab69690c0b"
    - stage: horo
      stageUuid: "d0accfe8-e05a-8e77-98a5-cef943be4065"
    - stage: seal
      stageUuid: "66ef16de-e936-86c6-8759-4d9ca26660ee"
    - stage: uuid
      stageUuid: "ef761fd6-7f97-8bbf-80ab-995f3cad1261"
version: 2
---
# maturity — when the crop is ready (the harvest-readiness signal)

**maturity** is the crop's readiness to [[harvest]], with two faces. As **timing**: **days-to-maturity (DTM)** is the scheduling constant — average days from sow/[[transplant]] to first pick — from which sow, transplant, and target-harvest dates are back-calculated ([[planting]]); it *lengthens as daylight wanes*, so a fall crop's DTM exceeds its spring DTM. As **state**: the **maturity index** is the measurable signal to pick — color, firmness, size, and **°Brix** (refractometer sugar / soluble-solids, also a [[grade]] threshold) — over a **harvest window** before quality declines into over-maturity.

Harvest maturity (the pick-point — e.g. a breaker / mature-green tomato) often differs from eating ripeness. Maturity is the [[measure]] that triggers the [[harvest]] event and feeds the [[grade]] decision; it paces against the heat the crop accumulates ([[degreeday]]) through its [[season]].

## Standards
- UC Davis Postharvest Technology Center — maturity indices; *Knott's Handbook* — commercial/horticultural maturity
- Johnny's Selected Seeds — days-to-maturity charts; OSU Ohioline — °Brix as a quality indicator

Composes [[agriculture]] · [[crop]] · [[harvest]] · [[grade]] · [[degreeday]] · [[season]] · [[planting]] · [[transplant]] · [[measure]].
