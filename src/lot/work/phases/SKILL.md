---
name: phases
description: "Use when modeling a routing step — one sort-ordered position in a lot's phase chain that crosses to the work-phases catalog, carrying per-step time and unit counters with derived (never stored) state."
atomPath: lot/work/phases
coordinate: lot/work/phases · 4/weave · 3b89cf16
contentUuid: "4a074620-fed6-5381-8db2-dafe85ab2c63"
diamondUuid: "fbfa8cfa-6af1-8894-9a86-afd2701ca071"
uuid: "3b89cf16-da9c-86b6-912b-fc2543d4decf"
horo: 4
bonds:
  in:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
    - work
  out:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
typography:
  partition: lot
  bondDegree: 36
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing-step"
  - "ISO-19011:2018 audit-trail routing-step-changes"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations efficiency throughput"
  - "SOX §404 internal-controls production-control"
bindings: []
neighbors:
  wikilink:
    - accounting
    - coordinate
    - law
    - lots
    - merge
    - phases
    - sequence
    - variants
  matrix:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
  backlinks:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
signatures:
  computationUuid: "e5b2b227-a53f-8483-b158-bb2f593b5be4"
  stages:
    - stage: path
      stageUuid: "f0779abd-e603-888b-a27c-9443eb0e36cf"
    - stage: trinity
      stageUuid: "a51b2917-2e96-8397-b054-fdd161c660f7"
    - stage: boundary
      stageUuid: "8bd5bbaa-a9f3-836d-ac50-d1f267c68e27"
    - stage: links
      stageUuid: "c65f1ddb-f47e-85d4-b387-294137df57b2"
    - stage: horo
      stageUuid: "ceabb485-ab0e-876c-876c-823e1cc7bc9c"
    - stage: seal
      stageUuid: "7664e4d8-0478-8685-b4d9-a5e2e1471643"
    - stage: uuid
      stageUuid: "c3065548-256c-80a0-8102-d73dafb6403d"
version: 2
---
# lot/work/phases — the routing step (the sort-ordered cross to the catalog)

This is where a [[lots|lot]] meets its production route. A lot is produced through an **ordered sequence** of these steps; each binds the lot to one [[work/phases]] catalog phase, the team that runs it, and the per-step time + unit counters. It is the [[coordinate]] cross of the routing graph made concrete: `lot` (the containing axis) ⊕ `workPhase` (the catalog) ⊕ `sort` (the prev/next sequence on the chain).

## The data-truth (etrima `lot_work_phases`, N=291 011)
- **The routing cross is TOTAL** — `work_phase_id` resolves into the catalog **100%** (291 011/291 011). A routing step always names a real phase ([[merge]]: same phase ⇒ same catalog id).
- **A deep ordered chain** — `sort` ranges 0..127 (avg 13.3); a lot carries 1..95 steps (median 23, avg 25.2). Reading `sort` order IS the route (the [[sequence]] axis — the digit is the position).
- **State is DERIVED, never stored** — there is NO `status` column. The step's state ladders from its watermarks (`startedAt` → `completedAt` → `confirmedAt`), exactly as the [[lots|lot]]'s does.
- **The funnel** — `units_ordered ≥ units_produced` holds 290 816/291 011 = **99.93%**; the residue is real shop-floor over-run.
- `efficiency_percent`/`price_per_minute` are ~100% populated; `pay_per_hour` ~80%; `cost_per_minute` is **100% NULL** — a dead column, dropped.

## The invariants (data-verified, encoded as `@invariant` + hook)
- **routing cross total** — `workPhase` always resolves (100% in 20 yrs).
- **funnel** — `unitsProduced ≤ unitsOrdered` (99.93%). `warnLotWorkPhaseFunnel` WARNS on over-run (never blocks) — the history stays admissible while the disharmony surfaces.

## Time is the rate anchor
Per-step `seconds`/`minutes`/`payPerHour`/`pricePerMinute` feed the allocation ladder ([[accounting]] — pay = anchor × verified time; ISO-22400-2 efficiency). The catalog phase carries the *standard* time; this step carries the *realized* time. The cross to [[work/phases]] is the rate's source.

**Law — [[law]]: a routing step is one sort-ordered position in a [[lots|lot]]'s phase chain whose `workPhase` always resolves into the [[work/phases]] catalog (100% over 291 011 etrima rows); `sort`-order IS the route ([[sequence]]), state is DERIVED from watermarks never stored, and over-run is WARNED not blocked.**

Matter-twin: `src/lot/work/phases/index.ts`. Composes [[coordinate]] · [[sequence]] · [[accounting]] · [[merge]] · [[lots]] · [[work/phases]] · [[lot/variants]].
