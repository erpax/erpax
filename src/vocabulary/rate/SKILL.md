---
name: rate
description: "Use when a value is a ratio of two dimensions pinned at a point in time — exchange rate, VAT/tax rate, interest rate, unit price (currency per quantity), wage (currency per hour), throughput/capacity (quantity per hour), run-time-per-unit. The RateConcern; a rate is value-per-unit, pinned at a point; blanks route to the no-op identity (cascade-resolved), never a magic literal."
atomPath: "vocabulary/rate"
coordinate: "vocabulary/rate · 4/weave · 99353225"
contentUuid: "0e71958b-c2f3-57d7-9ce6-429b526fda55"
diamondUuid: "aca07ca3-a7d5-8edf-b2e5-df1ec51fc768"
uuid: "99353225-3162-8883-b169-c4b57c13df0a"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 114
standards: []
bindings: []
signatures:
  computationUuid: "32dde5e6-e77a-8539-8fa4-fe317383823d"
  stages:
    - stage: path
      stageUuid: "1af333b5-5c66-8c5c-bfcd-9a049f406852"
    - stage: trinity
      stageUuid: "5b7bb722-1ba5-89de-b6f5-fa77535a2290"
    - stage: boundary
      stageUuid: "bd7c550c-026d-849a-a8ed-a7fa393e2044"
    - stage: links
      stageUuid: "911d3551-0cb7-80b8-9948-d567235c615e"
    - stage: horo
      stageUuid: "8fb0eb8a-ccfe-82ce-8fa2-d08d761eaa54"
    - stage: seal
      stageUuid: "7aa441f3-7271-825d-a239-7a64a8cf5cbb"
    - stage: uuid
      stageUuid: "e3e4ec5d-1b9d-8602-819b-7102b420c578"
version: 2
---
# rate — a value per unit, pinned at a point in time

`rate` completes the value-quantification trio with [[currency]] (value-of-trade) and [[measure]] (value-of-substance): a **rate is one of those per a unit of the other** — a ratio. Exchange ([[currency]]/[[currency]]), unit price ([[currency]] per [[measure]] unit), wage ([[currency]] per time-unit `HUR`), throughput/capacity ([[measure]] per `HUR`), run-time-per-unit (time per [[measure]]), tax/discount/interest (per-hundred). Sequence position **1** ([[field]]).

A rate is **always pinned at a point in time** ([[versions]]) — the БНБ→ECB exchange rate on the invoice date, the standard VAT rate resolved for the period, the standard-costing rate — never a frozen scalar. A blank rate routes to its **no-op identity element** ([[identity]]): `×1` for a conversion, `+0%` for a charge, otherwise the value resolved along the jurisdiction cascade. An ad-hoc literal default (`?? 0.21`, `?? '21.1'`) is impure antimatter — instance detail smuggled into the default ([[duality]] containment-is-purity) — and breaks the fractal; resolve it, never bake it.

Pervasive across both twins: [[currency]] `exchangeRate`, [[measure]] conversion factors, the [[manufacturing]] per-minute rates (`costPerMinute`·`pricePerMinute`·`payPerHour`·`capacityPerHour`·`runTimePerUnit`), VAT/tax rates, [[calculate]] present-value/depreciation/standard-costing variances. Where a [[hooks]] hook resolves the rate at write-time, the read needs no fallback at all.

Composes: [[currency]] · [[measure]] (the two dimensions a rate relates), [[number]], [[calculate]] (rates drive PV/variances), [[versions]] (point-in-time), [[identity]] (no-op element + cascade fallback), [[standard]], [[field]] · [[currency/rates]] · value.

## Common mistakes
- A magic-literal rate default (`?? 0.21`) — resolve via the cascade; blank routes to the no-op identity (`×1` / `+0%`).
- A rate stored without its point-in-time ([[versions]]) — yesterday's exchange/VAT rate silently reprices history.
- Storing a derived rate that should be computed from value ÷ quantity at read.

**Law — [[law]]: a rate is value-per-unit pinned to a point in time; a blank rate resolves to its no-op identity (×1 / +0%) along the jurisdiction cascade, never to a hardcoded literal.**
