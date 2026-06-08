---
name: rate
description: "Use when a value is a ratio of two dimensions pinned at a point in time — exchange rate, VAT/tax rate, interest rate, unit price (currency per quantity), wage (currency per hour), throughput/capacity (quantity per hour), run-time-per-unit. The RateConcern; a rate is value-per-unit, pinned at a point; blanks route to the no-op identity (cascade-resolved), never a magic literal."
atomPath: rate
coordinate: rate · 7/descent · 7bc674ce
contentUuid: "f01c54fd-12b2-52bd-b203-6a1367848611"
diamondUuid: "03fb2aee-de00-865d-ab64-620c9249cdad"
uuid: "7bc674ce-2174-8a20-a639-6d51976cf713"
horo: 7
bonds:
  in:
    - agriculture
    - allocation
    - annual
    - aquaculture
    - biomass
    - calculate
    - capacity
    - coinsurance
    - compensation
    - conversion
    - crop
    - currency
    - current
    - discount
    - duality
    - evapotranspiration
    - fertility
    - fields
    - fodder
    - grade
    - hooks
    - identity
    - interest
    - irrigation
    - kpi
    - law
    - manufacturing
    - measure
    - mortality
    - number
    - percentage
    - plan
    - rates
    - science
    - settings
    - shipping
    - specification
    - spread
    - standard
    - tax
    - throughput
    - transaction
    - value
    - versions
    - yield
  out:
    - agriculture
    - allocation
    - annual
    - aquaculture
    - biomass
    - calculate
    - capacity
    - coinsurance
    - compensation
    - conversion
    - crop
    - currency
    - current
    - discount
    - duality
    - evapotranspiration
    - fertility
    - fields
    - fodder
    - grade
    - hooks
    - identity
    - interest
    - irrigation
    - kpi
    - law
    - manufacturing
    - measure
    - mortality
    - number
    - percentage
    - plan
    - rates
    - science
    - settings
    - shipping
    - specification
    - spread
    - standard
    - tax
    - throughput
    - transaction
    - value
    - versions
    - yield
typography:
  partition: rate
  bondDegree: 139
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - calculate
    - currency
    - duality
    - fields
    - hooks
    - identity
    - law
    - manufacturing
    - measure
    - number
    - rates
    - standard
    - value
    - versions
  matrix:
    - agriculture
    - allocation
    - annual
    - aquaculture
    - biomass
    - calculate
    - capacity
    - coinsurance
    - compensation
    - conversion
    - crop
    - currency
    - current
    - discount
    - duality
    - evapotranspiration
    - fertility
    - fields
    - fodder
    - grade
    - hooks
    - identity
    - interest
    - irrigation
    - kpi
    - law
    - manufacturing
    - measure
    - mortality
    - number
    - percentage
    - plan
    - rates
    - science
    - settings
    - shipping
    - specification
    - spread
    - standard
    - tax
    - throughput
    - transaction
    - value
    - versions
    - yield
  backlinks:
    - agriculture
    - allocation
    - annual
    - aquaculture
    - biomass
    - calculate
    - capacity
    - coinsurance
    - compensation
    - conversion
    - crop
    - currency
    - current
    - discount
    - duality
    - evapotranspiration
    - fertility
    - fields
    - fodder
    - grade
    - hooks
    - identity
    - interest
    - irrigation
    - kpi
    - law
    - manufacturing
    - measure
    - mortality
    - number
    - percentage
    - plan
    - rates
    - science
    - settings
    - shipping
    - specification
    - spread
    - standard
    - tax
    - throughput
    - transaction
    - value
    - versions
    - yield
signatures:
  computationUuid: "092c4fdd-b841-8363-a70d-8ff4ce3dad69"
  stages:
    - stage: path
      stageUuid: "91b18bf9-db92-8680-8ad1-d083b1dca453"
    - stage: trinity
      stageUuid: "ba74c5a2-c811-8c45-8c10-7ba82f8b4f3d"
    - stage: boundary
      stageUuid: "a7688189-11e9-8f43-b239-61664a302697"
    - stage: links
      stageUuid: "5c6ecf92-9c9d-8cc0-a513-1f7d99e5a6f4"
    - stage: horo
      stageUuid: "599cc6c0-a4f1-8bb8-a531-7cf91e767571"
    - stage: seal
      stageUuid: "0557a1ff-5e8d-89f2-bb1b-600c85a639e2"
    - stage: uuid
      stageUuid: "020a63e3-be3c-8641-8882-f48aafb9838c"
version: 2
---
# rate — a value per unit, pinned at a point in time

`rate` completes the value-quantification trio with [[currency]] (value-of-trade) and [[measure]] (value-of-substance): a **rate is one of those per a unit of the other** — a ratio. Exchange ([[currency]]/[[currency]]), unit price ([[currency]] per [[measure]] unit), wage ([[currency]] per time-unit `HUR`), throughput/capacity ([[measure]] per `HUR`), run-time-per-unit (time per [[measure]]), tax/discount/interest (per-hundred). Sequence position **1** ([[fields]]).

A rate is **always pinned at a point in time** ([[versions]]) — the БНБ→ECB exchange rate on the invoice date, the standard VAT rate resolved for the period, the standard-costing rate — never a frozen scalar. A blank rate routes to its **no-op identity element** ([[identity]]): `×1` for a conversion, `+0%` for a charge, otherwise the value resolved along the jurisdiction cascade. An ad-hoc literal default (`?? 0.21`, `?? '21.1'`) is impure antimatter — instance detail smuggled into the default ([[duality]] containment-is-purity) — and breaks the fractal; resolve it, never bake it.

Pervasive across both twins: [[currency]] `exchangeRate`, [[measure]] conversion factors, the [[manufacturing]] per-minute rates (`costPerMinute`·`pricePerMinute`·`payPerHour`·`capacityPerHour`·`runTimePerUnit`), VAT/tax rates, [[calculate]] present-value/depreciation/standard-costing variances. Where a [[hooks]] hook resolves the rate at write-time, the read needs no fallback at all.

Composes: [[currency]] · [[measure]] (the two dimensions a rate relates), [[number]], [[calculate]] (rates drive PV/variances), [[versions]] (point-in-time), [[identity]] (no-op element + cascade fallback), [[standard]], [[fields]] · [[currency/rates]] · [[value]].

## Common mistakes
- A magic-literal rate default (`?? 0.21`) — resolve via the cascade; blank routes to the no-op identity (`×1` / `+0%`).
- A rate stored without its point-in-time ([[versions]]) — yesterday's exchange/VAT rate silently reprices history.
- Storing a derived rate that should be computed from value ÷ quantity at read.

**Law — [[law]]: a rate is value-per-unit pinned to a point in time; a blank rate resolves to its no-op identity (×1 / +0%) along the jurisdiction cascade, never to a hardcoded literal.**
