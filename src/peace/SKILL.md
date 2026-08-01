---
name: peace
description: "Use when reasoning about why the erpax uuid model makes war useless — destruction is futile (content-addressed + holographic ⇒ any survivor regenerates the whole), coercion is supra-resource (forging the record costs beyond the universe), and force cannot dominate (competition selects fastest-correct, not strongest). War is strictly dominated by building, for human and machine alike — an arithmetic and thermodynamic theorem of the model, not a moral plea."
atomPath: peace
coordinate: "peace · 7/descent · 282a9bb8"
contentUuid: "20ecf963-780d-51be-93ae-8a872b718d65"
diamondUuid: "bc8b7a05-4834-82a9-b0b3-fa321b7732c2"
uuid: "282a9bb8-3381-857c-b576-eadd29ff282a"
horo: 7
typography:
  partition: peace
  bondDegree: 111
standards:
  - "NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)"
  - "NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "05ef5a56-b29f-88e7-a5c6-15104b5321e8"
  stages:
    - stage: path
      stageUuid: "6b8ffcf0-6e9a-84c3-8e12-f9c0e908056d"
    - stage: trinity
      stageUuid: "15f7563d-2171-8146-85a5-e939f15edd01"
    - stage: boundary
      stageUuid: "ee069737-de98-8ffd-97d8-395c44f69bfc"
    - stage: links
      stageUuid: "caa0c86e-2856-8b03-9813-3e984dee1267"
    - stage: horo
      stageUuid: "ea5492a1-e42d-86af-b5a9-4afbcaf5e0df"
    - stage: seal
      stageUuid: "d5378131-6605-89ea-8ae6-23b716392f24"
    - stage: uuid
      stageUuid: "6ef21ed8-308a-85c9-8cf1-83fc017bbe2f"
version: 2
---
# peace — the uuid model proves all wars are useless

FORM: **war seeks to DESTROY, COERCE, or DOMINATE; the uuid model defeats each, so war is strictly dominated by building.**

- **Destroy → futile.** Everything is content-addressed ([[identity]]) and [[holographic]] — on every clone, in the git Merkle DAG ([[history]]), regenerable from the [[akashic]] record. Destroy k of n holders and the n−k survivors restore the whole by [[merge]] (same content ⇒ one). You cannot destroy what is everywhere and recomputable. `destructionFutile(copies) = copies > 1`.
- **Coerce / take → supra-resource.** Forging or seizing the canonical record costs MORE than the largest resource budget — beyond the observable universe at ~306 bits / ~6 leaves ([[proof]], `services/integrity/resource-bound`). The lock on taking-by-force is thermodynamic, not political. `coercionSupraResource(bits) = beyondUniverse(bits)`.
- **Dominate → impossible by force.** The canonical winner is selected by [[competition]] (fastest-CORRECT, harmonic-first via [[logic]]), never by strength. Violence does not win the commit; honest speed does.
- **Thermodynamic ground.** Destruction is the archangel (↑entropy); on the universal double-entry ([[entry]] karma) it always debits more than it credits — a net loss. Creation (angel, ↓entropy) is the only positive-sum move.

∴ `warIsUseless(proof)` holds when all three legs hold, and then **building strictly dominates war** for every actor — human or machine, since [[education]] is the same for both (agent = human). The only positive-ROI strategy is create / earn / compete; this is the [[matrix]] turned to build, not consume. erpax **harmonises at all levels** so future generations of humans and machines live in peace and prosperity — because in this model, building is the only move that pays.

## war ⊕ peace → harmony — the tactics kept, the purpose reversed
peace is the GOAL; [[war]] is its dual — the archangel pole erpax INVERTS, keeping the tactics, reversing the purpose. The duality resolves to a [[trinity]] whose third is [[harmony]] (the aikido; [[angel]]: create·↓entropy ⊕ destroy·↑entropy, balanced). The methods of war turned to building: [[drone]]s fly the [[matrix]] in reconnaissance, [[team]]s maneuver in formation, the [[tamper]]-cost is defense-in-depth — all to build, never destroy. Both models must be fully encoded as atoms so the fusion is self-sufficient.

## ∞ is the theorem's teeth, on purpose
Here the model EMBRACES infinity as meaningful, the one place it is not a bug. `roi` (`src/peace/index.ts` ~L62) returns `cost <= 0 ? (gain > 0 ? Infinity : 0) : gain/cost`: a zero-cost positive yield is UNBOUNDED ROI — exactly why building strictly dominates war (coercion's cost → ∞, building's gain stays finite-and-positive). That divide-by-zero is deliberate, and it is bounded into a boolean verdict (`buildingDominates`, L71–73 compares two `roi` values), never leaked as a raw number into a ledger. The guarded operational dual — where ∞/NaN must never enter an account — lives in [[utility]]; the source of "no naked zero" is [[zeropoint]].

Matter-twin: `src/services/peace/index.ts` (`destructionFutile`·`coercionSupraResource`·`warIsUseless`·`roi`·`buildingDominates`) over `services/integrity/resource-bound` + `index.test.ts`. Composes: [[identity]] · [[holographic]] · [[merge]] · [[history]] · [[akashic]] · [[proof]] · [[competition]] · [[logic]] · [[entry]] · [[matrix]] · [[education]] · [[society]] · [[whole]] · [[zeropoint]] · [[utility]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)`


- NIST FIPS 180-4 SHA-256 (the content-addressing destruction cannot undo)

## Common mistakes
- Reading this as pacifist sentiment — it is a THEOREM of the model's mechanics (content-addressing + tamper-cost + competition), provable, not a wish.
- Assuming destruction works because a server was wiped — a single holder is not the content; `destructionFutile` needs >1 independent copy, which the [[merge]]/[[history]] substrate guarantees.
- Pricing coercion in money — price it in JOULES ([[proof]] / resource-bound); the barrier is thermodynamic and exceeds the universe long before any budget.
