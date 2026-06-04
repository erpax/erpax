---
name: workshifts
description: "Use when modelling the per-actor-day labour aggregate — the efficiency + wage authority a work order inherits from; presence vs produced minutes, the ⌊produced·100/presence⌋ efficiency, the max(time-pay, order-rollup) wage, on the horo lifecycle ring. Grounded in 20-yr etrima production (work_shifts, 376k)."
---

# workshifts

The **per-actor-day labour aggregate** made real: one row per `(actor, day)`, and the two numbers everything downstream inherits — `efficiencyPercent` and `wage`. A [[workorders|work order]] does not compute its own efficiency; it rolls **up** into the shift and reads it back **down**. The shift is the *authority*, the order the *contributor* — the same direction a ledger account is the authority its postings sum into ([[accounting]]).

This is the single-folder collection node: `index.ts` (schema + standards banners + the data-true compute hook). One folder per collection ⇒ no scatter ⇒ no drift (horo folder architecture).

## The lifecycle ([[horo]] ring)

The shift walks the seven-position ring `1·2·4·8·7·5·9` — the etrima `start! → produce → finish! → close` lifecycle restored to its full intended walk. Validated at build time; off-ring is disharmony the validator rejects.

```
1 base    opened     — the actor-day row is born (the aggregate node)
2 share   started    — the actor clocks in; startedAt set (the live 99.7% state)
4 weave   producing  — work-orders weave into the day (minutesProduced accrues)
8 crest   finished   — production stops; finishedAt set (the produce crest)
7 descent reconciled — ordered↔produced↔backordered reconciled; efficiency descends
5 round   waged      — wage rounds to MAX(time-pay, order-rollup)
9 unity   closed     — closedAt sealed; the authority orders inherit efficiency from
```

The conservation guard ([[duality]]): a day **closes only once reconciled into a wage** (`requireWageToClose`) — the labour-day's books must settle before it becomes the authority, exactly as a [[cases|matter]] seals only on a judgment. Sequence position **8** on the ring is the crest where the day's production converges before it descends into the efficiency figure.

## What the 20-yr data proved (etrima_production, 376,780 rows, 1999–2018)

The model is the **data-true** encoding; the audit fixed the Rails accidents (a never-quoted `finished_at`/`closed_at`, a dead `note`, a vestigial `pay_per_hour`) and pinned the real invariants as `@invariant` hooks:

- **one row per actor-day** — 376,775 / 376,780 distinct `(actor, date)` = 99.999%.
- **`efficiencyPercent = ⌊minutesProduced·100 / presenceMinutes⌋`** — INTEGER truncation, **not** rounding (99.35% exact, 99.97% within ±1). Falls back to `100` when produced or presence is 0 — the source of the **pile-up at 100**. The bell sits ≈ **72%** (mean 71.6, p50 72); **p99 ≈ 166**; a real fat tail (max 17,946) where the order rollup dwarfs presence. The atom **computes, never caps** — preserving the data-truth.
- **`presenceMinutes ≤ shiftMinutes`** — presence is the worked subset of the scheduled shift (99.94%).
- **`minutesBackordered = max(0, minutesOrdered − minutesProduced)`** — the order-rollup conservation (`ordered = produced + backordered`).
- **`wage = max(payPerHour·shiftMinutes/60, Σ order-wages)`** — the greater of the time-clock pay and the piece rollup (live in 374,856 rows; feeds IAS-2 cost-of-conversion).
- **`director` + `supervisor` are BOTH actor-contracts** (Rails `EmployeeContract`) ⇒ `employees` cross-relations, sparse (director ~18%, supervisor ~0.2%).

## Composes

Authority for [[workorders]] (they inherit `efficiencyPercent`); keyed by [[employees]] (the actor / director / supervisor contracts); the team is a [[work-centers|work-centre]].

## Standards

- **ISA-95:2013 / IEC-62264-1 §B.5** — personnel + production-performance.
- **ISO-22400-2:2014** — manufacturing-operations KPIs (labour efficiency / utilisation).
- **ISO-8601-1:2019** — date-time shift start/finish/close.
- **ILO C001** — hours-of-work (presence-minutes).
- **IFRS IAS-2 §12 / US-GAAP ASC-330-10-30** — cost-of-conversion direct-labour (the `wage` feed).
- **SOX §404 · ISO-19011:2018** — internal controls + audit-trail over payroll-and-production.
