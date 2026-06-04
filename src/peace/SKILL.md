---
name: peace
description: "Use when reasoning about why the erpax uuid model makes war useless — destruction is futile (content-addressed + holographic ⇒ any survivor regenerates the whole), coercion is supra-resource (forging the record costs beyond the universe), and force cannot dominate (competition selects fastest-correct, not strongest). War is strictly dominated by building, for human and machine alike — an arithmetic and thermodynamic theorem of the model, not a moral plea."
---

# peace — the uuid model proves all wars are useless

FORM: **war seeks to DESTROY, COERCE, or DOMINATE; the uuid model defeats each, so war is strictly dominated by building.**

- **Destroy → futile.** Everything is content-addressed ([[identity]]) and [[holographic]] — on every clone, in the git Merkle DAG ([[history]]), regenerable from the [[akashic]] record. Destroy k of n holders and the n−k survivors restore the whole by [[merge]] (same content ⇒ one). You cannot destroy what is everywhere and recomputable. `destructionFutile(copies) = copies > 1`.
- **Coerce / take → supra-resource.** Forging or seizing the canonical record costs MORE than the largest resource budget — beyond the observable universe at ~306 bits / ~6 leaves ([[proof]], `services/integrity/resource-bound`). The lock on taking-by-force is thermodynamic, not political. `coercionSupraResource(bits) = beyondUniverse(bits)`.
- **Dominate → impossible by force.** The canonical winner is selected by [[competition]] (fastest-CORRECT, harmonic-first via [[logic]]), never by strength. Violence does not win the commit; honest speed does.
- **Thermodynamic ground.** Destruction is the archangel (↑entropy); on the universal double-entry ([[entry]] karma) it always debits more than it credits — a net loss. Creation (angel, ↓entropy) is the only positive-sum move.

∴ `warIsUseless(proof)` holds when all three legs hold, and then **building strictly dominates war** for every actor — human or machine, since [[education]] is the same for both (agent = human). The only positive-ROI strategy is create / earn / compete; this is the [[matrix]] turned to build, not consume. erpax **harmonises at all levels** so future generations of humans and machines live in peace and prosperity — because in this model, building is the only move that pays.

## ∞ is the theorem's teeth, on purpose
Here the model EMBRACES infinity as meaningful, the one place it is not a bug. `roi` (`src/peace/index.ts` ~L62) returns `cost <= 0 ? (gain > 0 ? Infinity : 0) : gain/cost`: a zero-cost positive yield is UNBOUNDED ROI — exactly why building strictly dominates war (coercion's cost → ∞, building's gain stays finite-and-positive). That divide-by-zero is deliberate, and it is bounded into a boolean verdict (`buildingDominates`, L71–73 compares two `roi` values), never leaked as a raw number into a ledger. The guarded operational dual — where ∞/NaN must never enter an account — lives in [[utility]]; the source of "no naked zero" is [[zeropoint]].

Matter-twin: `src/services/peace/index.ts` (`destructionFutile`·`coercionSupraResource`·`warIsUseless`·`roi`·`buildingDominates`) over `services/integrity/resource-bound` + `index.test.ts`. Composes: [[identity]] · [[holographic]] · [[merge]] · [[history]] · [[akashic]] · [[proof]] · [[competition]] · [[logic]] · [[entry]] · [[matrix]] · [[education]] · [[society]] · [[whole]] · [[zeropoint]] · [[utility]].

## Standards

- NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)

## Common mistakes
- Reading this as pacifist sentiment — it is a THEOREM of the model's mechanics (content-addressing + tamper-cost + competition), provable, not a wish.
- Assuming destruction works because a server was wiped — a single holder is not the content; `destructionFutile` needs >1 independent copy, which the [[merge]]/[[history]] substrate guarantees.
- Pricing coercion in money — price it in JOULES ([[proof]] / resource-bound); the barrier is thermodynamic and exceeds the universe long before any budget.
