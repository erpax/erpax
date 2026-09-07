---
name: conversion
description: "Use when a measured thing is re-expressed on another basis through a rate — unit conversion (kg↔g, acre↔decare), currency conversion (USD↔BGN↔EUR), and funnel-stage conversion (lead→deal) are one atom: a change of basis via a rate, pinned at a point, that conserves substance and accounts by double-entry. Automatic, never the spreadsheet's hand-typed 2.00 лв text that breaks the arithmetic."
atomPath: "vocabulary/conversion"
coordinate: "vocabulary/conversion · 4/weave · b461870d"
contentUuid: "fbabcdb7-0b71-55d2-92ac-d90f869afc61"
diamondUuid: "4aee6576-3543-8fe9-94bc-5591347d84a3"
uuid: "b461870d-e2df-8654-b308-f9009d0e8f50"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 81
standards: []
bindings: []
signatures:
  computationUuid: "7803b172-b69c-833b-9230-6de72227cb12"
  stages:
    - stage: path
      stageUuid: "959c2df7-b6c4-8982-b04a-d48b9c0272a9"
    - stage: trinity
      stageUuid: "28018b41-67df-8965-8a85-0cf463fd2e92"
    - stage: boundary
      stageUuid: "afd45b98-3fd4-8fa9-84bd-9df8efa4234b"
    - stage: links
      stageUuid: "ab280a77-ec3b-8077-8eb9-a37ef301ba79"
    - stage: horo
      stageUuid: "c1de6007-fc90-8332-b27f-1e42e5a03093"
    - stage: seal
      stageUuid: "0f5591f0-1d3a-8e5d-89e3-878da7353aa2"
    - stage: uuid
      stageUuid: "e934ae2d-de8a-836d-855d-d6dc199a3f6a"
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
