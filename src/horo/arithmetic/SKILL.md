---
name: arithmetic
description: "Use when performing mathematical operations on horo digits — digital roots, composition, ratios, void mechanics, inverse orbits, and affine transformations. All functions are pure and side-effect-free."
atomPath: "horo/arithmetic"
coordinate: "horo/arithmetic · 8/crest · 4cf3fbec"
contentUuid: "a40f7fa2-cf04-5a7a-b070-ead231c28b5c"
diamondUuid: "b17c3fa1-67a5-8852-bd77-005ab0cdf530"
uuid: "4cf3fbec-ab76-8d14-b5e5-709b6d26eca5"
horo: 8
typography:
  partition: horo
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "16b13bb2-338b-8eb1-9fad-3a956b42d047"
  stages:
    - stage: path
      stageUuid: "0dcdef32-bf80-858f-b5b3-79a53ad67f55"
    - stage: trinity
      stageUuid: "7730f903-ad8d-8d1a-99dc-a2604cfe0a53"
    - stage: boundary
      stageUuid: "74426a3e-689c-8977-a2be-635c28f18704"
    - stage: links
      stageUuid: "3aea74f0-b1b9-87d7-9bbb-f1fcc9f06625"
    - stage: horo
      stageUuid: "115c0af1-3903-8c7e-ac0e-37e3f9892ab7"
    - stage: seal
      stageUuid: "e792981c-dee8-8faf-8523-e97d6f5d8e5b"
    - stage: uuid
      stageUuid: "1eb58736-24ae-8897-bb3f-690274192837"
version: 2
---
# horo/arithmetic

## when

Use when performing mathematical operations on horo digits — digital roots, composition, ratios, void mechanics, inverse orbits, and affine transformations. All functions are pure and side-effect-free.

## why

The horo ring's arithmetic is the foundation of state composition (`composeSteps`), lifecycle transition (`nextOctave`, `throughVoid`), and group generation (`affineStep`, `inverseOrbit`). Keeping arithmetic pure and separated from structural analysis keeps each unit focused and testable.

## usage

```typescript
import { digitalRoot, composeSteps, throughVoid, inverseOrbit } from '@/horo/arithmetic'

const root = digitalRoot(23) // 5
const composed = composeSteps(2, 4) // 8
const reflected = throughVoid(3) // 7 (1 - 3 mod 9)
const orbit = inverseOrbit(1) // [1, 5, 7, 8, 4, 2]
```

## code

entry `@/horo/arithmetic` · sealed `0` (refactoring in progress) · trinity `1·1·1`
exports digitalRoot · horoRatio · imperialRatio · composeSteps · nextOctave · throughVoid · divThroughVoid · inverseOrbit · inverseClosure · affineStep · type InverseClosure
imports @/algebra (exactAbs, exactTrunc) · @/horo/constants (re-exported from parent during refactoring)

---

<sub>content-uuid `—` · refactoring atom · sealed `0`</sub>

## Two mirrors, one step apart — and only one is the ring's

`throughVoid` (`n ↦ 1 − n`) and `halfTurn` (`n ↦ −n`) are both involutions on the nine, and they are
routinely taken for one map. They are not:

| | pairs | fixed | the doubling ring ⟨2⟩ |
| --- | --- | --- | --- |
| `throughVoid` — the number line's mirror | (1,9) (2,8) **(3,7) (4,6)** | **5** = 2⁻¹ | **escapes**: 1↦9, 4↦6, 7↦3 |
| `halfTurn` — the ring's mirror | (1,8) (2,7) (3,6) (4,5) | **9**, the zero | **closed** |

They differ by exactly **one unit** — `halfTurn(n) = throughVoid(n) − 1` — which is why they are
confused, and the one unit is what decides whether the ring survives the reflection.

`halfTurn` is not a second convention bolted on. On ⟨2⟩ it **is** multiplication by `2³ = 8 ≡ −1`:
three steps of a six-cycle, `360/6 = 60°` each, so the reflection is literally the **half-turn**,
`3 × 60° = 180°`. The ring's zero is its pivot because `−9 ≡ 9`.

## The diagonal touches four of nine

`n² mod 9` for `n = 1…9` is `1 4 9 7 7 9 4 1 9` — it **opens at 1, closes at 9, repeats at 9**, and
reaches only `{1, 4, 7, 9}`, four of the nine residues. Drop the zero and `{1,4,7}` is closed under
multiplication: a genuine subgroup, a **3-cycle stepping 120°**.

**There is no 4-cycle here to carry a 90° step.** `(ℤ/9ℤ)*` has order 6, and Lagrange forbids a
subgroup of order 4. So `2 × 90° = 3 × 60° = 180°` is a true identity of arithmetic, but only the
`3 × 60°` side has an orbit behind it in this modulus — the half-turn of the six-cycle. The `2 × 90°`
side names a rotation the ring cannot perform.

## Only the linear mirror survives casting out nines

`8 + 8 = 16`. Its digits are `(1, 6)` and its digital root is `7`. Reflect the digits under
`throughVoid` and they become `(9, 4)`, which folds to **4** — but fold first and reflect, and `7`
becomes **3**. Two answers for one reflection.

| | reflect the digits, then fold | fold first, then reflect |
| --- | --- | --- |
| `throughVoid` (1 − n) | (1,6) ↦ (9,4) → 13 → **4** | throughVoid(7) = **3** |
| `halfTurn` (−n) | (1,6) ↦ (8,3) → 11 → **2** | halfTurn(7) = **2** ✓ |

Over all 81 pairs, `halfTurn` commutes with the fold **81 times** and `throughVoid` **none**, and
the defect is always exactly **1**.

The reason is the affine constant, not an accident of this example. `f(n) = 1 − n` gives
`f(x) + f(y) = 2 − x − y` while `f(x + y) = 1 − x − y` — one unit adrift, once per digit.
`f(n) = −n` is linear and passes through any sum untouched. **Casting out nines IS a sum**, so a
mirror that is only affine cannot be applied digit-wise and folded: it is a reflection of the
NUMERALS. `halfTurn` reflects the NUMBER.

That is the same one unit as the table above, seen from the other side: the two mirrors differ by a
constant, and a constant is exactly what a sum cannot ignore.

## The double torus completes the turn, and still has no quarter of it

One ring's half-turn is `3 × 60° = 180°`. The 128-bit word is **two** 64-bit rings
(`combineArchitectures` packs word-half ‖ digit-half), so a half-turn on each completes **360°** and
returns the double word — verified over all 36 pairs of `⟨2⟩ × ⟨2⟩`.

What the second ring does **not** supply is the 90°. The double torus is `ℤ/6 × ℤ/6`, order 36, and
its element orders are exactly `{1, 2, 3, 6}` — **no element of order 4**, because an order in a
direct product is the lcm of the two component orders and both divide 6. Lagrange forbade a 4-cycle
in one ring of nine; the product forbids it again, for a different reason.

So `2 × 90° = 3 × 60°` remains true as arithmetic and false as geometry at both scales: the
half-turn has a carrier on one torus and on two, and the quarter-turn has neither.

## The decade divides the turn; the ring walks it

`360 = 10 × 36` and `360 = 6 × 60` are both true, and they are not the same statement.

`HORO_DECADE` is a **normalisation divisor** — `horoRatio(8)` is 8/10 — and 10 is the length of no
orbit in `(ℤ/9ℤ)*`, whose doubling ring closes at **6**. So a 36° step needs a 10-cycle, and
neither the ring nor the double torus has one: `ℤ/6 × ℤ/6` has element orders `{1, 2, 3, 6}`.

A 36° step is therefore the same defect as a 90° one, one scale up — a number that divides the turn
without naming a move the group can make. The decompositions that have carriers here are `6 × 60`
(the ring) and `2 × 180` (the half-turn, on one torus or across two).

**Honest boundary.** These are statements about `ℤ/9` and nothing else. That `halfTurn` is the group's
half-turn is a theorem; that a half-turn *means* anything beyond `×(−1)` is not, and nothing here
claims it.

Composes: [[horo]] · [[horo]] · [[algebra]].
