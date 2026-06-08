---
name: orders
description: "Use when booking shop-floor production — the per-phase per-worker execution leaf with an options array, derived double-entry totals, a derived horo lifecycle, the forward conveyor between routing phases, and the piece-rate wage; evolved from 2.05M rows of the etrima work_orders ledger."
atomPath: work/orders
coordinate: work/orders · 4/weave · d1b101cc
contentUuid: "7b8a28bd-32f6-543e-99f2-807d3b2ea9a1"
diamondUuid: "e99af20a-84e3-8f57-9d73-f0b1be774242"
uuid: "d1b101cc-9464-834d-bebc-d365453472d0"
horo: 4
bonds:
  in:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
    - work
  out:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
typography:
  partition: work
  bondDegree: 96
  neighbors: []
standards:
  - "IFRS IAS-19 §11 short-term-employee-benefits piece-rate"
  - "IFRS IAS-2 §10 §12 cost-of-conversion (the piece-rate wage = direct labour)"
  - "ISA-95"
  - "ISA-95:2013 §B.5 production-operations-management work-order-execution"
  - "ISO-19011:2018 audit-trail production-execution"
  - "ISO-8601-1:2019 date-time started·completed·estimated"
  - "ISO/IEC-29119"
  - "SOX §404 internal-controls production-control TOM-PROD-01"
bindings: []
neighbors:
  wikilink:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - orders
    - party
    - shifts
    - standard
  matrix:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
  backlinks:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
signatures:
  computationUuid: "a6a629b4-94a6-8419-8c97-e20fae34868f"
  stages:
    - stage: path
      stageUuid: "e8875264-a571-8b60-aa3b-db8856a5a8c6"
    - stage: trinity
      stageUuid: "e382e574-0af9-8c5a-bbda-a3dfd0fda14c"
    - stage: boundary
      stageUuid: "18d9a84d-977e-8d96-b985-38b7f06d9dbe"
    - stage: links
      stageUuid: "8cf50482-b4bc-8d71-b02d-f06c231527eb"
    - stage: horo
      stageUuid: "061df4e2-6f57-827c-8f52-ecfa8cb9359f"
    - stage: seal
      stageUuid: "73abfdd2-9daa-836a-b9e8-00af5a6f1d8c"
    - stage: uuid
      stageUuid: "17c737ed-8d64-815b-bf44-2c98c1fc3e07"
version: 2
---
# Workorders

The production **execution leaf** — the per-`(lotworkphase × lotvariant)`, per-worker, per-shift row the operator actually books production against. Evolved from **2,050,575 rows** of the etrima `work_orders` table (the 20-year manufacturing ledger), so the shape is the *data truth*, not the Rails accidents. It is the execution twin of the MRP-style [[work/orders|work-orders]] header (the BOM release); this leaf is where units get produced and where the wage is computed.

## The collapse — fixing the accidents the code carried

The 20-year DATA is ground truth; the Rails schema is one encoding with fixed-width accidents. The audit fixed three:

- **36 option columns → one `options` array** `[{label, ordered, produced, backordered}]`. The table hard-coded `option_1..12_units_{ordered,produced,backordered}`. AUDIT: option-1 used in ~100% of rows, option-2 in 1.4%, option-3 in 773 rows, option-6 in 38, **option-12 in ZERO** — the 36 columns were a fixed-width accident. The array models the real cardinality (a row is almost always one line).
- **Header totals are DERIVED** ([[duality]], double-entry). AUDIT: `units_ordered = Σ option_n_units_ordered` held at **EXACTLY 100.0000%** over all 2.05M rows (and likewise produced, backordered). The header is the books, the options are the entries, they balance by construction. `assertTotalsBalance` recomputes the three header totals from the array on every write, so the books can never drift from the entries — the property the data already exhibits, now enforced.
- **Lifecycle → a DERIVED [[horo]] state**, computed in `afterRead`, **never stored**. The table carried five independent booleans; AUDIT found `paused` true in **ZERO** of 2.05M rows (a dead flag) and the flags non-nested (773 rows completed-but-not-started) — so the booleans are not a clean state. The true position is read from production progress plus the seal timestamps.

DEAD columns dropped (null/zero in 100% of rows): `manager_id`, `backorder_id`, `vendor_order_id`, `paused`, `cost_per_minute`, `price_per_minute`, `minutes_backordered`. `minutes_remaining` is derived, not stored.

## The derived state ring

```
1 base    open          — the order exists, nothing ordered yet
2 share   ordered       — units ordered, none produced (demand shared in)
4 weave   in-production — partially produced (the work is woven)
8 crest   packed        — fully produced, output assembled (the merge crest)
7 descent shipped       — completed + handed forward (descends to the next phase)
5 round   delivered     — received by the next phase / customer (rounds to balance)
9 unity   closed        — sealed; the next phase's open (the new 0)
```

Validated at build time against `1·2·4·8·7·5·9`; anything off-ring is disharmony the gate rejects. `deriveState` is pure: closed/delivered/shipped are gated by their seal timestamps, and production progress drives open→ordered→in-production→packed.

## The conveyor — forward!

`forwardProducedToNextPhase` (afterChange) is the [[fractal]] routing made into a data flow: when this phase **completes**, its produced units become the **next** phase's *ordered* units. The next phase is the smallest `lotWorkPhaseSort` strictly greater than this one within the same `lotVariantCode`. Production flows phase→phase the way a ledger posts account→account ([[accounting]]). The conveyor is idempotent on `forwardedTo`/`forwardedFrom` — one source never seeds two successors — and best-effort, so a downstream hiccup never blocks the operator's booking.

## The piece-rate wage

The canonical etrima formula, verified to total **€4,683,899.53** over 2,020,326 payable rows:

```
wage = unitsProduced × unitSeconds × payPerHour / 3600 / mpw
mpw  = (machinesPerWorker is null or 0) ? 1 : machinesPerWorker
```

You are paid for what you **produce**, at the phase rate, divided by how many machines you tend at once (`mpw` ≥ 1, never divide by zero/null — AUDIT: `machines_per_worker` set on only ~2.4% of rows, so the default carries the rest). This is the [[allocation]] law at the shop floor — verified-produced-time-leveraged pay, the karma double-entry where direct labour ([[accounting]] IAS-2 §12 cost-of-conversion) meets the actor. Computed in `afterRead` alongside `minutesRemaining = (ordered − produced) × unitSeconds / mpw / 60`.

## The resource cross

A work order sits where three axes meet: the **lot-phase/variant** axis (content-addressed `lotVariantCode` / `lotWorkPhaseCode` / `lotWorkPhaseSort` codes, plus `machineCode` / `teamCode` — the routing collections are not yet minted, codes keep the leaf merge-safe), the **shift** axis (`workShift` → [[work/shifts|work-shifts]]), and the **unified-actor** axis (`worker` / `supervisor` / `director` → `employees`, since typeless user = employee = actor, the [[party|actor]]-merge law; Rails `EmployeeContract` ⇒ the unified actor). AUDIT cardinalities: worker ~99.99%, supervisor ~91%, director ~21%, machine ~0.26% — so worker is effectively required, the rest optional by data.

The **shift axis is the efficiency authority**: a work order does **not** compute its own efficiency. It rolls UP into the shift (its produced minutes) and reads the efficiency back DOWN — `inheritShiftEfficiency` (beforeChange) denormalises `efficiencyPercent` from the related [[work/shifts|work-shift]] (the per-actor-day authority, `⌊minutesProduced·100 / presenceMinutes⌋`) on save. The shift is the authority, the order the contributor; `efficiencyPercent` is read-only on the order, never hand-set.

**Law — [[law]]: the work-order is the per-(phase × variant)-per-worker-per-shift execution leaf where header totals are DERIVED from the `options` array (`unitsOrdered = Σ option ordered`, EXACTLY 100% over 2.05M etrima rows — the books balance the entries by construction), the [[horo]] lifecycle is derived from progress + seals never stored, completed units forward to the next phase ([[accounting]] account→account), and you are paid for what you produce (`wage = produced × unitSeconds × payPerHour / 3600 / mpw`).**

## Standards

Booking production on this leaf IS placing it under the canonical manufacturing-execution stack (see [[standard]]).

- **ISA-95:2013 §B.5** — production-operations-management; the work-order is the execution record between the schedule and the receipt.
- **IFRS IAS-2 §10 §12** — cost-of-conversion; the piece-rate wage is the direct-labour leg of inventory cost.
- **IFRS IAS-19 §11** — short-term-employee-benefits; piece-rate pay recognized as produced.
- **ISO-8601-1:2019** — the started/completed/delivered/closed/estimated timestamps.
- **ISO-19011:2018** — audit-trail over every production booking (the standard [[hooks]] spine).
- **ISO-27001 A.5.23** — tenant isolation; the leaf is tenant-scoped read + membership-admin mutate.

Sequence position **8** on the ring — the crest where ordered units, the worker's produced time, and the phase rate converge and collapse into one wage and one forward-posting.
