---
name: conversion
description: "Use when a measured thing is re-expressed on another basis through a rate — unit conversion (kg↔g, acre↔decare), currency conversion (USD↔BGN↔EUR), and funnel-stage conversion (lead→deal) are one atom: a change of basis via a rate, pinned at a point, that conserves substance and accounts by double-entry. Automatic, never the spreadsheet's hand-typed 2.00 лв text that breaks the arithmetic."
atomPath: conversion
coordinate: conversion · 8/crest · 670658d7
contentUuid: "d8dd7964-d181-54e9-8d88-cfba20fc2298"
diamondUuid: "6f6c83e0-5dad-839c-b542-d6547d59d43c"
uuid: "670658d7-5f84-8c82-be66-f4f7579f0702"
horo: 8
bonds:
  in:
    - accounting
    - agriculture
    - amount
    - aquaculture
    - attribution
    - balance
    - crop
    - currency
    - dimension
    - entry
    - fertility
    - fodder
    - friction
    - funnel
    - give
    - hooks
    - identity
    - law
    - localize
    - measure
    - orders
    - organic
    - rate
    - service
    - take
    - versions
    - yield
  out:
    - accounting
    - agriculture
    - amount
    - aquaculture
    - attribution
    - balance
    - crop
    - currency
    - dimension
    - entry
    - fertility
    - fodder
    - friction
    - funnel
    - give
    - hooks
    - identity
    - law
    - localize
    - measure
    - orders
    - organic
    - rate
    - service
    - take
    - versions
    - yield
typography:
  partition: conversion
  bondDegree: 83
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - amount
    - attribution
    - balance
    - currency
    - dimension
    - entry
    - funnel
    - give
    - hooks
    - identity
    - law
    - localize
    - measure
    - orders
    - rate
    - take
    - versions
  matrix:
    - accounting
    - agriculture
    - amount
    - aquaculture
    - attribution
    - balance
    - crop
    - currency
    - dimension
    - entry
    - fertility
    - fodder
    - friction
    - funnel
    - give
    - hooks
    - identity
    - law
    - localize
    - measure
    - orders
    - organic
    - rate
    - service
    - take
    - versions
    - yield
  backlinks:
    - accounting
    - agriculture
    - amount
    - aquaculture
    - attribution
    - balance
    - crop
    - currency
    - dimension
    - entry
    - fertility
    - fodder
    - friction
    - funnel
    - give
    - hooks
    - identity
    - law
    - localize
    - measure
    - orders
    - organic
    - rate
    - service
    - take
    - versions
    - yield
signatures:
  computationUuid: "9854b0fd-6a36-8ac4-9b20-29164741061c"
  stages:
    - stage: path
      stageUuid: "8153fff8-d5cb-8cc9-a069-a48cabc4f404"
    - stage: trinity
      stageUuid: "f98ee95e-2bf4-8a89-b48c-d008550de4e1"
    - stage: boundary
      stageUuid: "8fde0d14-480b-8b26-9c85-5cbd8b7a9bce"
    - stage: links
      stageUuid: "5ad986f9-6a06-857f-9215-731792fb3ef1"
    - stage: horo
      stageUuid: "9dd77bf7-c9c7-8106-bf1d-a3c4a2f51df9"
    - stage: seal
      stageUuid: "238282ff-992e-8d36-b328-d20f4c3785a9"
    - stage: uuid
      stageUuid: "63941812-414d-8096-9cad-5eaceabdd191"
version: 2
---
# conversion — re-expressing a quantity on another basis, automatically and accounted

A **conversion** re-expresses a measured thing on another **basis** through a [[rate]], at a point in time ([[versions]]). Three faces, one atom:

- **unit conversion** — a [[measure]] across units of one dimension: kg↔g, m↔row-feet, **acre↔hectare↔decare** (1 decare = 1000 m² = 0.1 ha), lbs/acre↔kg/ha (×1.121). Quantities sum **only within a [[dimension]]**; crossing one needs the factor.
- **currency conversion** — a [[currency]] [[amount]] across money units: USD↔**BGN/лв**↔EUR via an `exchangeRate` resolved along the **БНБ → ECB** cascade on the transaction date.
- **stage conversion** — a population across funnel stages: click→lead→opportunity→deal→renewal ([[funnel]] · [[attribution]]) — the *rate* is the step-completion ratio.

**The law the source artifact breaks.** The CSA spreadsheet stores a price as the text `2.00 лв` and a yield in a separate imperial sheet — so totals throw `#VALUE!` and the two unit systems drift. The atom's fix: a quantity is **value + unit** ([[measure]]) and money is **amount + ISO-4217** ([[currency]]), **never a unit-/currency-baked string**; conversion is then **automatic** — applied by a [[hooks|hook]] at write or computed at read, blanks routing to the no-op identity (`×1`), one canonical substance beneath the locale's preferred unit ([[localize]]).

**Conversion accounts by double-entry.** A change of basis must **[[balance]]** ([[entry]]): a unit conversion *conserves substance* (the same physical quantity, two labels — content-[[identity|identical]]); a currency conversion at a moved [[rate]] **books an FX gain/loss** to keep the ledger balanced ([[accounting]]). So "convert" is never a lossy display trick — it is a posted, reversible, content-addressed operation: the [[give]] / [[take]] of one basis for another that nets to zero in substance and reconciles in value.

## Standards
- UN/CEFACT Rec 20 (unit codes & dimensions); ISO 4217:2015 (currency codes, minor units)
- БНБ (Bulgarian National Bank) → ECB reference-rate cascade; decare = 1000 m² (Balkan land unit)
- lbs/acre → kg/ha ×1.12085; P₂O₅→P ×0.44, K₂O→K ×0.83 (fertilizer oxide conversions)
- IFRS — foreign-exchange gain/loss recognition on conversion

## Common mistakes
- A unit-/currency-baked string (`2.00 лв`, `weightKg`) — split into [[measure]] / [[currency]] so conversion is automatic, never typed.
- Summing across dimensions (kg + L, USD + BGN) — convert through a [[rate]] at a point first; only sum within a [[dimension]].
- A conversion that loses value silently — at a moved rate it must book an FX gain/loss to [[balance]]; substance is conserved, value reconciled.

Composes [[rate]] · [[measure]] · [[currency]] · [[amount]] · [[dimension]] · [[balance]] · [[entry]] · [[accounting]] · [[identity]] · [[versions]] · [[hooks]] · [[localize]] · [[give]] · [[take]] · [[funnel]] · [[attribution]] · [[customers/sales/orders]].

**Law — [[law]]: a conversion re-expresses a quantity on another basis through a [[rate]] pinned at a point — automatic, never a unit-baked string — conserving substance and accounting by double-entry ([[balance]]) so it nets to zero in substance and reconciles in value.**
