---
name: manufacturing
description: Use when designing or porting the erpax manufacturing domain to Payload — production orders, routings/operations, work centers, BOMs, work shifts/labor, or modelling product variants without a fixed option grid. The all-industries `@erpax/plugin-manufacturing` pattern.
---

# manufacturing — the all-industries production plugin

Generalizes the etrima (garment) production engine into an industry-agnostic, self-sufficient `@erpax/plugin-manufacturing` (textile, food, pharma, electronics, furniture, job-shop, process). Built from two universal primitives — **BOM + Routing** — composed of reusable field-objects (see [[fields]],[[collections]]), referencing OUT polymorphically so [[accounting]]/audit attach without inward deps (see [[plugins]]). Ordered by the [[sequence]].

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

## Universal levers (why it fits every industry)
- **Unit of Measure everywhere** → process/continuous, not just piece-count.
- **Composable dimensions** → any variation scheme.
- **BOM + Routing** = the two primitives every industry shares ("consume materials through process steps at capacity").
- **Polymorphic outward refs**; accounting/audit consume wage/efficiency/events via `relationTo:[...]`.

## Common mistakes
- Fixed option/size columns (the etrima flaw) — use composable `dimensions` + generated `variants`.
- Integer-only units — carry `unitOfMeasure` (kills process-industry support).
- A non-manufacturing collection holding a field pointing INTO manufacturing — keep refs outward/polymorphic.
