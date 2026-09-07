---
name: phases
description: "Use when modeling a routing step — one sort-ordered position in a lot's phase chain that crosses to the work-phases catalog, carrying per-step time and unit counters with derived (never stored) state."
atomPath: "lot/work/phases"
coordinate: "lot/work/phases · 1/base · 99e121e1"
contentUuid: "0e55bd2f-e2e1-5587-b4f3-b221e29f8ef5"
diamondUuid: "5982bac1-b55e-863b-bef8-f8149ae87051"
uuid: "99e121e1-50f4-88fa-8ff8-a61806c0987b"
horo: 1
typography:
  partition: lot
  bondDegree: 43
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing-step"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations efficiency throughput"
  - "ISO-22400-2:2014 manufacturing-operations efficiency throughput`"
  - "SOX §404 internal-controls production-control"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e19f57e3-85c8-8824-a377-9638a4dc277f"
  stages:
    - stage: path
      stageUuid: "f0779abd-e603-888b-a27c-9443eb0e36cf"
    - stage: trinity
      stageUuid: "a51b2917-2e96-8397-b054-fdd161c660f7"
    - stage: boundary
      stageUuid: "8bd5bbaa-a9f3-836d-ac50-d1f267c68e27"
    - stage: links
      stageUuid: "6715758f-0394-876b-b578-730b2e48c8a1"
    - stage: horo
      stageUuid: "f0231d48-9167-8c48-8c91-808726c581d6"
    - stage: seal
      stageUuid: "7664e4d8-0478-8685-b4d9-a5e2e1471643"
    - stage: uuid
      stageUuid: "da986d1d-b87c-8939-8ba8-77460b86516b"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations efficiency throughput`

Composes: [[wave]].
