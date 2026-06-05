---
name: phases
description: Use when modeling a routing step — one sort-ordered position in a lot's phase chain that crosses to the work-phases catalog, carrying per-step time and unit counters with derived (never stored) state.
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

Matter-twin: `src/lot/work/phases/index.ts`. Composes [[coordinate]] · [[sequence]] · [[accounting]] · [[merge]] · [[lots]] · [[work/phases]] · [[lot/variants]].
