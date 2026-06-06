---
name: analytics
description: Use when you need one computed read-out of the whole erpax corpus across every aspect — structure, entropy, coverage, harmony, trust, and economic health. The all-aspects analyzer; it composes the measures already minted on the live uuid-matrix, never re-deriving them.
---

# analytics — the all-aspects analyzer

analytics measures nothing of its own. It is the **fold** that calls every measure already minted on the live uuid-[[matrix]] and returns one `AnalysisReport`. The law is *compose, never duplicate* ([[dry]]): each aspect is a thin shell over the [[atom]] that already owns that truth.

`analyze()` is **pure** — it reads only the generated [[matrix]] and the computed consts (no DB, no disk). Six aspects:

- **structure** — [[matrix]] morphology: atom/edge counts, per-[[dimension]] and per-band occupancy, edge-direction mix, mean degree.
- **entropy** — [[entropy]]: edge reciprocity, the borrowed-disorder slack `1 − reciprocity`, and the orphan atoms.
- **coverage** — [[balance]] (model⊕collection — every plural [[collections|collection]] with its singular model, the schema's double-entry) ⊕ [[standards]] adoption.
- **harmony** — [[harmony]] over the [[horo]] ring `{1,2,4,8,7,5,9}`: is the 7-position lifecycle a consonant chord; the worst Tenney height across its 21 intervals.
- **trust** — [[tamper]]-cost: the undetected-forge work (log2 ops) at the live coverage, the brute-force years at the Bitcoin hashrate, the 256-bit content floor and the 106-bit erpax floor. forge → ∞ while verify → O(N) — the asymmetry IS the security.
- **economic** — the corpus read as one balanced ledger: a single health index = the **geometric mean** of the aspect signals, so a single zero caps the whole (the bottleneck law).

The two truths still living outside the matrix stay outside `analyze()`: the [[aura]] / [[trinity]] tree-walk is fs-bound, and live GL/margin is DB-bound (composes [[accounting]] behind a caller). The matrix is the analytic ground; everything else is one fold away.

Matter-twin: `src/analytics/index.ts`. Composes [[matrix]] · [[balance]] · [[entropy]] · [[harmony]] · [[horo]] · [[tamper]] · [[standards]] · [[aura]] · [[trinity]] · [[accounting]] · [[dry]].

## Standards
- ISO/IEC-25010:2023 quality model — a computed read-out across software-quality aspects
