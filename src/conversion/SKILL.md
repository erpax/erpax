---
name: conversion
description: "Use when a measured thing is re-expressed on another basis through a rate — unit conversion (kg↔g, acre↔decare), currency conversion (USD↔BGN↔EUR), and funnel-stage conversion (lead→deal) are one atom: a change of basis via a rate, pinned at a point, that conserves substance and accounts by double-entry. Automatic, never the spreadsheet's hand-typed 2.00 лв text that breaks the arithmetic."
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
