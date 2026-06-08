---
name: lactation
description: "Use when modelling the dairy production phase — lactation, the milk-producing interval of a dairy female between parturition and dry-off, with its yield curve, parity (lactation number), and the dry period before the next cycle. The per-animal dairy season; milk is the agricultural produce realized at each milking (harvest)."
atomPath: lactation
coordinate: lactation · 1/base · fef24a1f
contentUuid: "de27eb85-e704-5ded-b932-b7926e4c79c1"
diamondUuid: "9aa752bf-0453-8bcf-b278-8ace073ea85c"
uuid: "fef24a1f-88ed-8874-abbb-bce06bc9a6ce"
horo: 1
bonds:
  in:
    - animal
    - assets
    - breed
    - grade
    - harvest
    - items
    - law
    - livestock
    - measure
    - season
    - withdrawal
    - yield
  out:
    - animal
    - assets
    - breed
    - grade
    - harvest
    - items
    - law
    - livestock
    - measure
    - season
    - withdrawal
    - yield
typography:
  partition: lactation
  bondDegree: 39
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - animal
    - assets
    - breed
    - grade
    - harvest
    - items
    - law
    - livestock
    - measure
    - season
    - withdrawal
    - yield
  matrix:
    - animal
    - assets
    - breed
    - grade
    - harvest
    - items
    - law
    - livestock
    - measure
    - season
    - withdrawal
    - yield
  backlinks:
    - animal
    - assets
    - breed
    - grade
    - harvest
    - items
    - law
    - livestock
    - measure
    - season
    - withdrawal
    - yield
signatures:
  computationUuid: "4d69b8a8-652a-87f3-81b2-80ec95d6a3e8"
  stages:
    - stage: path
      stageUuid: "4780032c-5a36-847f-a8ff-9d8d5c7674fb"
    - stage: trinity
      stageUuid: "c8507e25-8983-8e6e-b273-53024e3abfaf"
    - stage: boundary
      stageUuid: "22022086-66d3-8af7-a5bf-0b5647ef6ffd"
    - stage: links
      stageUuid: "c2c17468-725a-89f7-937e-4cfb553b3f79"
    - stage: horo
      stageUuid: "e1230588-cac6-88cf-bfac-62045c4d70d8"
    - stage: seal
      stageUuid: "29014fcb-71af-841b-95c7-e7a5eca2c19f"
    - stage: uuid
      stageUuid: "42c1ba71-f112-8de1-8a2d-968054a0eb86"
version: 2
---
# lactation — the dairy production phase

**lactation** is the milk-producing phase of a dairy [[animal]] between parturition and dry-off — a *per-animal* production cycle (not the calendar [[season]]), with a characteristic **yield curve** ([[yield]]), a **parity** (lactation number, a [[measure]]), and a **dry period** (the ~8-week rest before the next cycle). **Colostrum** (antibody-rich first milk) and milk quality (somatic cell count → [[grade]]) gate what is saleable, alongside the drug [[withdrawal]] embargo.

Milk is the **agricultural produce** realized at each milking — the IAS-41 [[harvest]] event, measured at fair-value-less-costs-to-sell then moving to [[items|inventory]]. Lactation is the dairy twin of the meat animal's finishing phase; both are the production stage between [[breed|breeding]] and [[harvest]].

## Standards
- Land-grant dairy extension (lactation curve, DHIA milk recording, dry-period management)
- IFRS IAS-41 (milk as agricultural produce at harvest); milk-quality grading (somatic cell count)

Composes [[animal]] · [[livestock]] · [[yield]] · [[harvest]] · [[grade]] · [[withdrawal]] · [[items]] · [[measure]] · [[breed]] · [[season]] · [[biological/assets]].

**Law — [[law]]: lactation is the per-animal dairy production phase between parturition and dry-off, and milk is the agricultural produce realized at each milking — the IAS-41 [[harvest]] event measured at fair-value-less-costs-to-sell.**
