---
name: measure
description: "Use when a value carries a physical quantity — a number + a unit of measure (UN/CEFACT Rec 20: KGM/MTR/LTR/HUR/H87…), UoM-aware rounding, unit conversion, BOM/stock/production/line quantities. The MeasureConcern/quantity field-factory; a quantity is value+unit, never a unit-baked field name — the substance twin of currency (value+ISO-4217)."
atomPath: "vocabulary/measure"
coordinate: "vocabulary/measure · 5/round · 8e6742eb"
contentUuid: "65a48cab-3ba6-52ea-b822-4f7b6739d5dc"
diamondUuid: "0203dada-59e0-881d-84fc-1bd1358c8777"
uuid: "8e6742eb-7010-8ed8-af32-f92c95772ea3"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 156
standards: []
bindings: []
signatures:
  computationUuid: "351edd11-35a4-8329-b938-21a386f6d446"
  stages:
    - stage: path
      stageUuid: "d4c065a9-c7e7-8fb3-93ba-2b2822c9dba2"
    - stage: trinity
      stageUuid: "e3f5b6d5-fd87-8c28-9c68-c962deb565bd"
    - stage: boundary
      stageUuid: "09e8b063-1bdd-8ab5-8bc2-44f52b7d1a25"
    - stage: links
      stageUuid: "c34320b2-dc1b-8bd9-8ab4-ad7fccc02c8a"
    - stage: horo
      stageUuid: "89840180-9e7d-8369-87c2-8fd521b03c6b"
    - stage: seal
      stageUuid: "6ae3f999-d337-82d9-a780-ef2ebb491e33"
    - stage: uuid
      stageUuid: "0b11e1ab-14a5-817f-b839-8fb1d63652c7"
version: 2
---
# measure — a quantity is value + unit of measure (never baked into the name)

`measure` is the quantity field-factory atom — the physical-substance twin of [[currency]] (value-of-trade). Sequence position **1** ([[field]]). Law: a measured quantity is a **`value` (number) + a `unit` of measure** (UN/CEFACT Recommendation No. 20 common code — `KGM`·`MTR`·`LTR`·`HUR`·`H87` (piece)) — NEVER a unit-baked name (`weightKg` → `quantity` + `unit`; `hours` → `value` + `unit:HUR`), exactly as money is amount+ISO-4217, never `priceUSD`.

Rounding is **UoM-class-aware** (the etrima rule via [[port]]): discrete/piece-like (`H87`/box/`nr`) → ceil to integer; continuous/process (`KGM`/`LTR`/`MTR`) → round(3). A blank unit routes to its identity element — the dimensionless count `C62` ("one") — never an ad-hoc `?? 'pcs'` ([[identity]] categorical element, the [[currency]]-`XXX` twin). Quantities sum only **within a dimension**; cross-dimension needs a conversion [[rate]] (kg↔g, m↔cm) applied *at a point* ([[versions]]) — the [[currency]] `exchangeRate` twin.

Pervasive across the substance surface: BOM `unitConsumption`, stock/inventory levels, production-order make-quantity, work-shift labor-minutes, invoice/order line `quantity` (etrima `item.unit`, erpax `invoice_line.set_unit`/`billing_unit`). One UoM-aware quantity everywhere — the [[manufacturing]] "Unit of Measure everywhere" lever and the [[commerce]] line `qty`.

Composes: [[currency]] (sibling — value-of-trade ↔ value-of-substance), [[number]], [[calculate]] (EOQ/variances are quantity math), [[manufacturing]] (BOM/routing/production), [[commerce]] (line quantities/inventory), [[field]], [[standard]] (UN/CEFACT Rec 20 common code), [[identity]] (`C62` element) · [[value]] · [[agriculture]] (produce sale units — bunch/head/quart — the mixed-unit CSA box) · [[crop]].

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
