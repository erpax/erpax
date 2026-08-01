---
name: rate
description: "Use when a value is a ratio of two dimensions pinned at a point in time — exchange rate, VAT/tax rate, interest rate, unit price (currency per quantity), wage (currency per hour), throughput/capacity (quantity per hour), run-time-per-unit. The RateConcern; a rate is value-per-unit, pinned at a point; blanks route to the no-op identity (cascade-resolved), never a magic literal."
atomPath: "vocabulary/rate"
coordinate: "vocabulary/rate · 2/share · d8c00e3e"
contentUuid: "fa948ecd-b280-5f2d-a892-9be015a3b015"
diamondUuid: "d220991d-4be6-86c2-98cf-1210ca20f61e"
uuid: "d8c00e3e-6a89-8fff-86e9-ab1a4cbb37be"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 135
standards: []
bindings: []
signatures:
  computationUuid: "655de72c-bfd2-82b5-8c67-3f9a06cbc299"
  stages:
    - stage: path
      stageUuid: "1af333b5-5c66-8c5c-bfcd-9a049f406852"
    - stage: trinity
      stageUuid: "5b7bb722-1ba5-89de-b6f5-fa77535a2290"
    - stage: boundary
      stageUuid: "4ca90706-d2d4-89d4-aab5-762fe4b96032"
    - stage: links
      stageUuid: "a18fb429-02b5-8bbb-902d-ff5fb18bf4c4"
    - stage: horo
      stageUuid: "4a218f65-dd56-8c27-830c-a9c70c4c5e03"
    - stage: seal
      stageUuid: "5546fddf-0d5d-8565-a969-0043dfed22fb"
    - stage: uuid
      stageUuid: "d179cc3f-657c-81ea-b726-02696d3521fe"
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
