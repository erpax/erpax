---
name: manufacturing
description: Use when designing or porting the erpax manufacturing domain to Payload — production orders, routings/operations, work centers, BOMs, work shifts/labor, or modelling product variants without a fixed option grid. The all-industries `@erpax/manufacturing` pattern.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# manufacturing — the all-industries production plugin

Generalizes the etrima (garment) production engine into an industry-agnostic, self-sufficient `@erpax/manufacturing` (textile, food, pharma, electronics, furniture, job-shop, process). Built from two universal primitives — **BOM + Routing** — composed of reusable field-objects (see [[fields]],[[collections]]), referencing OUT polymorphically so [[accounting]]/audit attach without inward deps (see [[plugins]]). Ordered by the [[sequence]].

## Universal collections (generalizing etrima)
| Collection | etrima origin | generalization |
|---|---|---|
| `products` (ref, polymorphic) | Product/Variant/Item | variants via composable **dimensions**, not fixed columns |
| `boms` | (Consumption) | components `{ item(rel), quantity, unitOfMeasure, scrapPct }[]` |
| `work-centers` | Machine/MachineType | capacity unit (machine/line/cell/vat); `capacityPerHour`, `parallelism` (= `machines_per_worker`) |
| `routings`/`operations` | WorkPhase/LotWorkPhase | ordered `{ seq, workCenter(rel), setupTime, runTimePerUnit, uom }` |
| `production-orders` | Lot/Order | make `quantity + unitOfMeasure` of a product (units OR kg/L/m → discrete *and* process) |
| `operation-runs` | WorkOrder | execution at one op: qtyProduced/scrap, labor(rel), workCenter(rel), shift(rel), `status` select, lifecycle hooks |
| `work-shifts` | WorkShift | labor/time/cost roll-up; `wage = qtyProduced·runTime·rate / parallelism` (UoM-aware) |

## Unbounded variants (replaces `option_1..12`) — composition, not enumeration
The garment `option_1..12` eval grid is a 12-cap flaw. Replace with **generated** variants: a product declares N **dimensions**; variants are the cartesian composition — any axes, any depth, self-similar (a dimension value may reference a sub-product → variants of variants).
```ts
products.dimensions: [{ name: 'size', values: ['S','M','L'] }, { name: 'colour', values: [...] }]  // atomic axes (unbounded N)
operation-runs.variants: [{ attributes: { size:'M', colour:'red' }, qtyOrdered, qtyProduced, qtyBackordered, uom }]  // generated combinations
```
A few atomic dimensions generate an unbounded variant space — the same generative/self-similar principle the [[sequence]] embodies. One UoM-aware array everywhere (run, order, summaries) — no eval, no 12-fold duplication.

**Don't duplicate the realized layer — diff the config first (hold the law, not the list).** The laws: variant axes ARE `@payloadcms/plugin-ecommerce` `variantTypes`/`variantOptions` → generated `variants` — never build a custom `Products.dimensions` field; BOM `components[]` live on the realized BOM collection (etrima `unit_consumption` ≈ per-unit `quantity`; sub-assembly = a component whose item has its own BOM); the production-side variant grid is `operation-runs.variants[].attributes` (open json), NOT columns on products. *Which* collections exist and their exact fields are matter — they live in the config / `payload-types.ts` (the akashic record), regenerable on demand; don't catalog them here.

## Universal levers (why it fits every industry)
- **Unit of Measure everywhere** ([[measure]]) → process/continuous, not just piece-count.
- **Composable dimensions** → any variation scheme.
- **BOM + Routing** = the two primitives every industry shares ("consume materials through process steps at capacity").
- **Polymorphic outward refs**; accounting/audit consume wage/efficiency/events via `relationTo:[...]`.

## Strategies mined from etrima models (port the useful)
The etrima Rails models (`lot`, `lot_work_phase`, `consumption`, `work_variant`) encode reusable patterns — see [[port]]:
- **Stage-quantity counters + DERIVED status** — track `qty` and monotonic `qty{Ordered,Produced,Packed,Shipped,Delivered}`; don't store status, derive it by comparing (`qty ≤ qtyDelivered` → delivered). "remaining = qty − max(downstream)". Every workable/pending/producing list is a `where` filter, not a state machine ([[queries]]).
- **Timestamp-driven lifecycle** — nullable `startedAt`/`completedAt`/`confirmedAt` mark transitions; startable/completable derive from them.
- **Labor-minute economics** — `runTimePerUnit(s)` → `minutesRequired = qty·s/60`; three per-minute [[rate]]s (`costPerMinute`, `pricePerMinute`, `payPerHour`); `wage = s/3600·payPerHour / machinesPerWorker` (UoM- + parallelism-aware). `unitCost = max(wage,cost,price) + materialsCost/qty`.
- **BOM `unitConsumption`** (per-unit material qty) with UoM-aware rounding — piece-like (`pc/box/nr`) → ceil, continuous → round(3); bidirectional required↔consumption. Vendor is an accounting `Account` ([[accounting]]).
- **Denormalized rollups up the tree** (run → operation → order), recomputed in a `beforeChange`/`afterChange` [[hooks]] — but via Payload hooks/[[jobs]], NOT `save(validate:false)`. Cache derived collections (etrima's 5-min TTL) in the KV `AI_CACHE` binding ([[bindings]]).
- **Generative creation** — operation × orderable variants → operation-runs.

## Obsolete (do NOT port — the immune system drops these)
- `eval`'d `option_1..12` grids (recur in `lot`/`work_variant`) → composable `dimensions`.
- Hardcoded `team.code ILIKE '1221%'` process scopes (knitting/cutting/sewing/steaming/packing) → work-center `type`/category, not magic code prefixes.
- `save(validate:false)` / `fast_save` denormalization bypass → Payload hooks/jobs.
- Raw-SQL summary strings + a real `@pi` shared-memo bug → query presets / Analytics Engine.
- `define_method` getter delegation → relationship population / virtual fields.

## Standards

Applying this skill *is* how the standard is met — the answer-path is the implementation. Two standards govern manufacturing; honor both forms (see [[standard]]).

| Standard | Current version | Current form (what applying the skill must produce) |
|---|---|---|
| BPMN (process notation) | OMG BPMN **2.0.2** (formal-13-12-09, Dec 2013); ISO twin **ISO/IEC 19510:2013** (= BPMN 2.0.1) — both active | Notate every process/lifecycle as an explicit BPMN-style graph: named states + guarded transitions on events with assignee/approval semantics (the `WorkflowDefinitions` state machine). |
| ISA-95 / IEC 62264 (production) | **IEC 62264-1:2013** Ed.2.0 (current pure-IEC); **ANSI/ISA-95.00.01-2025** (current ISA edition, modified adoption of IEC 62264-1) — no ISA-95 edition is dated 2013 | Map every production entity onto the ISA-95 layered object model: equipment/resource hierarchy, process-segment (routing/operations), and production-operations-management with work-request/work-response (§B.4 *definition*, §B.5 *performance*). |

**Citation rules (the precise form):**
- BPMN: cite `OMG BPMN 2.0.2 (= ISO/IEC 19510:2013)`. Do **not** write `ISO/IEC 19510:2013 BPMN-2.0` as if 19510:2013 *is* BPMN 2.0 — that ISO twin tracks BPMN *2.0.1*, while the current OMG base is *2.0.2*. The OMG-pinned form (`OMG BPMN 2.0`, as in `seed.ts`) is the accurate one.
- ISA-95: never write `ISA-95:2013` — there is no ISA-95 edition dated 2013 (the year 2013 belongs to the IEC twin). Cite either `IEC 62264-1:2013` (the 2013 edition) or `ANSI/ISA-95.00.01-2025` (current ISA edition).
- Undated production refs (e.g. production-order-aggregation, work-response/performance) should pin to `IEC 62264-1:2013 §B.5` for the production-performance model they implement.
- Nothing here is withdrawn or fabricated; the only corrections are the ISA-95 year (wrong body) and disambiguating BPMN 2.0 vs 2.0.1/2.0.2.

## Common mistakes
- Fixed option/size columns (the etrima flaw) — use composable `dimensions` + generated `variants`.
- Integer-only units — carry `unitOfMeasure` (kills process-industry support).
- A non-manufacturing collection holding a field pointing INTO manufacturing — keep refs outward/polymorphic.
