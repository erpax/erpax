---
name: mortality
description: "Use when living stock dies and the asset is written down — mortality, the death-loss rate/event across a herd, fish stock, forest stand, or bee colony. The negative biological transformation (IAS-41 P&L decrement, distinct from price change); the loss twin of yield, shared across every living-production domain."
atomPath: mortality
coordinate: mortality · 7/descent · 690a0396
contentUuid: "1fcb068d-485a-5064-ad98-e840b5d89acb"
diamondUuid: "fea8ac72-5d48-8408-b29f-2038deba2c2f"
uuid: "690a0396-dcdc-87a3-b449-beddd6409ec4"
horo: 7
bonds:
  in:
    - animal
    - apiculture
    - aquaculture
    - assets
    - biomass
    - entry
    - forestry
    - health
    - herd
    - law
    - livestock
    - rate
    - risk
    - scouting
    - yield
  out:
    - animal
    - apiculture
    - aquaculture
    - assets
    - biomass
    - entry
    - forestry
    - health
    - herd
    - law
    - livestock
    - rate
    - risk
    - scouting
    - yield
typography:
  partition: mortality
  bondDegree: 51
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - animal
    - apiculture
    - aquaculture
    - assets
    - biomass
    - entry
    - forestry
    - health
    - law
    - livestock
    - rate
    - risk
    - scouting
    - yield
  matrix:
    - animal
    - apiculture
    - aquaculture
    - assets
    - biomass
    - entry
    - forestry
    - health
    - herd
    - law
    - livestock
    - rate
    - risk
    - scouting
    - yield
  backlinks:
    - animal
    - apiculture
    - aquaculture
    - assets
    - biomass
    - entry
    - forestry
    - health
    - herd
    - law
    - livestock
    - rate
    - risk
    - scouting
    - yield
signatures:
  computationUuid: "c7e3126b-0ae8-82db-b5d9-87f6f8a7411c"
  stages:
    - stage: path
      stageUuid: "f451b4d7-2522-8f46-953e-6128eb45fe16"
    - stage: trinity
      stageUuid: "79ca4e0e-6c8b-82f7-b358-972748707833"
    - stage: boundary
      stageUuid: "694d0f10-05e6-827f-99be-384adbc58ba7"
    - stage: links
      stageUuid: "e1b700b9-bf61-8d53-bd89-b7596f7d050b"
    - stage: horo
      stageUuid: "5e5aaf8c-6a5f-8451-9c92-86473db74d45"
    - stage: seal
      stageUuid: "2abc6c59-10cc-8f3d-b816-208e6fc590db"
    - stage: uuid
      stageUuid: "2f4e9e46-423b-80d8-b72a-a80b300842fb"
version: 2
---
# mortality — death-loss of living stock; the negative biological transformation

**mortality** is the death-loss of living stock — the rate and the event by which [[animal]]s, fish, trees, or bee colonies die. It is the **negative [[biological/assets|biological transformation]]**: under IAS-41 it writes the biological asset down through P&L, kept distinct from price change. It is shared across every living-production domain — [[livestock]] death loss, [[aquaculture]] pen mortality, [[forestry]] tree mortality, [[apiculture]] colony loss (overwinter) — one atom, the loss twin of [[yield]].

Mortality is the living-asset form of shrink/[[risk]]: planned-for as a buffer (the overplant/overstock margin), measured as a [[rate]], and de-recognized via an [[entry]] (the asset removed, the loss posted). Its causes route to [[health]] (disease/[[scouting]]) and the environment.

## Standards
- IFRS IAS-41 (death as biological transformation, P&L decrement); WOAH (mortality/morbidity)
- FAO (aquaculture/livestock mortality); forest mortality & MAI models

Composes [[biological/assets]] · [[animal]] · [[livestock]] · [[aquaculture]] · [[forestry]] · [[apiculture]] · [[biomass]] · [[yield]] · [[risk]] · [[rate]] · [[entry]] · [[health]].

**Law — [[law]]: death-loss is the negative biological transformation — it writes the living asset down through P&L (distinct from price change) and de-recognizes it via a balanced [[entry]]; the loss twin of [[yield]], one atom across every living-production domain.**
