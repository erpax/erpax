---
name: salinity
description: "Use when modelling soluble-salt buildup that degrades soil and stresses crops — salinity as electrical conductivity (ECe, dS/m) of the saturated-paste extract, with sodicity (ESP/SAR, excess sodium destroying structure) as its companion axis. A soil-degradation dimension orthogonal to N-P-K fertility; reclaimed by leaching and, for sodicity, gypsum."
atomPath: salinity
coordinate: salinity · 5/round · 8b6fec72
contentUuid: "17e4a066-2615-597e-8756-ec2673890bc3"
diamondUuid: "a80c15f9-bd0e-8f83-8fc4-5fb705c6d552"
uuid: "8b6fec72-9f18-8316-a7c8-b61bdbb458d0"
horo: 5
bonds:
  in:
    - agriculture
    - aquaculture
    - fertility
    - irrigation
    - law
    - measure
    - moisture
    - soil
  out:
    - agriculture
    - aquaculture
    - fertility
    - irrigation
    - law
    - measure
    - moisture
    - soil
typography:
  partition: salinity
  bondDegree: 26
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - fertility
    - irrigation
    - law
    - measure
    - moisture
    - soil
  matrix:
    - agriculture
    - aquaculture
    - fertility
    - irrigation
    - law
    - measure
    - moisture
    - soil
  backlinks:
    - agriculture
    - aquaculture
    - fertility
    - irrigation
    - law
    - measure
    - moisture
    - soil
signatures:
  computationUuid: "267d187b-071e-83df-8fb1-663857150701"
  stages:
    - stage: path
      stageUuid: "fdddb4c6-6aeb-81f4-88e1-17b75a775563"
    - stage: trinity
      stageUuid: "ce21941f-aab8-8f58-8941-24f5d552fb11"
    - stage: boundary
      stageUuid: "195f6720-27d8-867b-bcce-732d16cff90d"
    - stage: links
      stageUuid: "5d0b572e-1837-8383-a999-96d2ab36080f"
    - stage: horo
      stageUuid: "3e6e3246-cf5e-8c91-a370-812108cd4388"
    - stage: seal
      stageUuid: "625857b7-d113-8290-b0ac-6ba093476aef"
    - stage: uuid
      stageUuid: "c6f41c5a-a08d-8c45-86db-e21c0322c8a7"
version: 2
---
# salinity — soluble-salt buildup that degrades soil and stresses crops

**salinity** is the concentration of soluble salts in [[soil]], measured as **electrical conductivity** of the saturated-paste extract (**ECe**, dS/m); above ≈ 4 dS/m most crops are osmotically stressed (water present but unavailable — a [[moisture]] the plant cannot draw). Its companion is **sodicity** — excess exchangeable sodium (**ESP** > 15 or **SAR** > 13) that disperses [[soil]] aggregates and destroys structure and infiltration.

Salinity is a [[soil]]-degradation axis **orthogonal** to N-P-K [[fertility]] (a soil can be chemically fertile yet too saline to crop), driven by irrigation-water quality, poor drainage, and over-fertilization. It is reclaimed by **leaching** salts below the root zone (good drainage) and, for sodicity, **gypsum** (Ca displaces Na). A measured ECe is a [[measure]] the [[irrigation]] water and the [[fertility]] plan are both judged against.

**Law — [[law]]: salinity is soluble-salt buildup (ECe) — a [[soil]]-degradation axis orthogonal to N-P-K [[fertility]]: a soil can be chemically fertile yet too saline to crop, and the measured ECe is the [[measure]] both the [[irrigation]] water and the fertility plan are judged against.**

## Standards
- USDA Salinity Laboratory Handbook 60; UGA C1019 / Oklahoma State — interpreting soil salinity (ECe, ESP, SAR)
- FAO — water quality for agriculture (salinity/sodicity hazard)

Composes [[agriculture]] · [[soil]] · [[fertility]] · [[irrigation]] · [[moisture]] · [[measure]].
