---
name: measure
description: "Use when a value carries a physical quantity — a number + a unit of measure (UN/CEFACT Rec 20: KGM/MTR/LTR/HUR/H87…), UoM-aware rounding, unit conversion, BOM/stock/production/line quantities. The MeasureConcern/quantity field-factory; a quantity is value+unit, never a unit-baked field name — the substance twin of currency (value+ISO-4217)."
atomPath: measure
coordinate: measure · 5/round · cea570cd
contentUuid: "a15f4041-e3d6-54e5-8848-45fde30d4530"
diamondUuid: "38827192-3ca3-88bd-a97e-a7711a39863f"
uuid: "cea570cd-4148-8c8e-b92a-9d7396687f4c"
horo: 5
bonds:
  in:
    - agriculture
    - baseline
    - biofield
    - biomagnetism
    - biomass
    - biophoton
    - calculate
    - capacity
    - cohort
    - commerce
    - conversion
    - crop
    - currency
    - degreeday
    - dimension
    - empirical
    - evapotranspiration
    - fertility
    - field
    - fields
    - grade
    - grazing
    - herd
    - identity
    - items
    - kpi
    - lactation
    - law
    - manufacturing
    - maturity
    - metric
    - number
    - port
    - postharvest
    - rate
    - salinity
    - science
    - scouting
    - seed
    - spacing
    - standard
    - throughput
    - time
    - total
    - trend
    - value
    - versions
    - wellbeing
    - yield
  out:
    - agriculture
    - baseline
    - biofield
    - biomagnetism
    - biomass
    - biophoton
    - calculate
    - capacity
    - cohort
    - commerce
    - conversion
    - crop
    - currency
    - degreeday
    - dimension
    - empirical
    - evapotranspiration
    - fertility
    - field
    - fields
    - grade
    - grazing
    - herd
    - identity
    - items
    - kpi
    - lactation
    - law
    - manufacturing
    - maturity
    - metric
    - number
    - port
    - postharvest
    - rate
    - salinity
    - science
    - scouting
    - seed
    - spacing
    - standard
    - throughput
    - time
    - total
    - trend
    - value
    - versions
    - wellbeing
    - yield
typography:
  partition: measure
  bondDegree: 156
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - calculate
    - commerce
    - crop
    - currency
    - dimension
    - fields
    - identity
    - law
    - manufacturing
    - number
    - port
    - rate
    - standard
    - value
    - versions
  matrix:
    - agriculture
    - baseline
    - biofield
    - biomagnetism
    - biomass
    - biophoton
    - calculate
    - capacity
    - cohort
    - commerce
    - conversion
    - crop
    - currency
    - degreeday
    - dimension
    - empirical
    - evapotranspiration
    - fertility
    - field
    - fields
    - grade
    - grazing
    - herd
    - identity
    - items
    - kpi
    - lactation
    - law
    - manufacturing
    - maturity
    - metric
    - number
    - port
    - postharvest
    - rate
    - salinity
    - science
    - scouting
    - seed
    - spacing
    - standard
    - throughput
    - time
    - total
    - trend
    - value
    - versions
    - wellbeing
    - yield
  backlinks:
    - agriculture
    - baseline
    - biofield
    - biomagnetism
    - biomass
    - biophoton
    - calculate
    - capacity
    - cohort
    - commerce
    - conversion
    - crop
    - currency
    - degreeday
    - dimension
    - empirical
    - evapotranspiration
    - fertility
    - field
    - fields
    - grade
    - grazing
    - herd
    - identity
    - items
    - kpi
    - lactation
    - law
    - manufacturing
    - maturity
    - metric
    - number
    - port
    - postharvest
    - rate
    - salinity
    - science
    - scouting
    - seed
    - spacing
    - standard
    - throughput
    - time
    - total
    - trend
    - value
    - versions
    - wellbeing
    - yield
signatures:
  computationUuid: "72b0c2e3-3865-8c1b-ac3d-b5eaa3e04929"
  stages:
    - stage: path
      stageUuid: "a5ea6277-6b22-895c-80f9-714a6df55104"
    - stage: trinity
      stageUuid: "a731b210-87b4-8f33-a41e-6afc9bb4534b"
    - stage: boundary
      stageUuid: "fe2d767d-942d-85a4-b1ee-033d2ecf673e"
    - stage: links
      stageUuid: "c8863625-cc31-87ec-aee0-c1d7cc895d81"
    - stage: horo
      stageUuid: "7459bbc7-e6ba-8504-89d4-5d502b70c24d"
    - stage: seal
      stageUuid: "0313e973-6eb0-84d3-bc23-f36a433ca908"
    - stage: uuid
      stageUuid: "028bd1dd-691d-832a-a069-12f1e81afe31"
version: 2
---
# measure — a quantity is value + unit of measure (never baked into the name)

`measure` is the quantity field-factory atom — the physical-substance twin of [[currency]] (value-of-trade). Sequence position **1** ([[fields]]). Law: a measured quantity is a **`value` (number) + a `unit` of measure** (UN/CEFACT Recommendation No. 20 common code — `KGM`·`MTR`·`LTR`·`HUR`·`H87` (piece)) — NEVER a unit-baked name (`weightKg` → `quantity` + `unit`; `hours` → `value` + `unit:HUR`), exactly as money is amount+ISO-4217, never `priceUSD`.

Rounding is **UoM-class-aware** (the etrima rule via [[port]]): discrete/piece-like (`H87`/box/`nr`) → ceil to integer; continuous/process (`KGM`/`LTR`/`MTR`) → round(3). A blank unit routes to its identity element — the dimensionless count `C62` ("one") — never an ad-hoc `?? 'pcs'` ([[identity]] categorical element, the [[currency]]-`XXX` twin). Quantities sum only **within a dimension**; cross-dimension needs a conversion [[rate]] (kg↔g, m↔cm) applied *at a point* ([[versions]]) — the [[currency]] `exchangeRate` twin.

Pervasive across the substance surface: BOM `unitConsumption`, stock/inventory levels, production-order make-quantity, work-shift labor-minutes, invoice/order line `quantity` (etrima `item.unit`, erpax `invoice_line.set_unit`/`billing_unit`). One UoM-aware quantity everywhere — the [[manufacturing]] "Unit of Measure everywhere" lever and the [[commerce]] line `qty`.

Composes: [[currency]] (sibling — value-of-trade ↔ value-of-substance), [[number]], [[calculate]] (EOQ/variances are quantity math), [[manufacturing]] (BOM/routing/production), [[commerce]] (line quantities/inventory), [[fields]], [[standard]] (UN/CEFACT Rec 20 common code), [[identity]] (`C62` element) · [[value]] · [[agriculture]] (produce sale units — bunch/head/quart — the mixed-unit CSA box) · [[crop]].

**Law — [[law]]: a measured quantity is a `value` + a Rec-20 `unit` of measure, NEVER a unit-baked field name — blanks route to the `C62` identity element ([[identity]]) and quantities sum only within a [[dimension]]; the substance twin of [[currency]].**

## Standards

Applying this skill **is** implementing the standard (the answer-path: a `value` + Rec-20 common-code `unit`, never a unit-baked name, is the standard satisfied).

- **UN/CEFACT Recommendation No. 20 — Codes for Units of Measure Used in International Trade.** Recommendation edition **Rev. 6 (2009)** (`ECE/TRADE/C/CEFACT/2009/24/Rev.`); the common-code annex (Annexes I/II/III) is maintained on a rolling basis by the UN/CEFACT ICG — track the *current annex revision*, not a frozen year. **Current form:** every quantity is `value` + Rec-20 **common code** (`KGM`·`MTR`·`LTR`·`HUR`·`H87` piece·`C62` one), never a unit-baked field name. `@standard` banners cite the edition — "UN/CEFACT Recommendation No. 20 (Rev. 6, 2009), common-code annex" — never a bare "Rec 20".

Note: the unit-of-measure codes are Rec **20 only**. UN/CEFACT Recommendation No. 21 (Codes for Types of Cargo, Packages and Packaging Materials) is a *different* standard and is cited only where package/cargo *type* is modelled — never as the source of a unit-of-measure code.

## Common mistakes
- Unit baked into a field name (`weightKg`, `qtyPcs`, `hours`) — split into `quantity` + `unit`.
- Integer-only quantities — kills process/continuous industries; carry the unit and round per UoM class.
- An ad-hoc default unit (`?? 'pcs'`) — route blanks to the `C62` identity element.
- Summing across dimensions (kg + L) — only sum within a unit dimension; convert at a point otherwise.
