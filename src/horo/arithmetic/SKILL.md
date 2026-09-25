---
name: arithmetic
description: "Use when performing mathematical operations on horo digits — digital roots, composition, ratios, void mechanics, inverse orbits, and affine transformations. All functions are pure and side-effect-free."
atomPath: "horo/arithmetic"
coordinate: "horo/arithmetic · 4/weave · 440f4ec4"
contentUuid: "bd0450f5-d5cc-54e3-9dad-dfe70135ef57"
diamondUuid: "af1ca524-2304-84e1-a2ba-7b3b02eb1b60"
uuid: "440f4ec4-0c6c-875d-ac0a-0f14e73a9c33"
horo: 4
typography:
  partition: horo
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "19776691-b208-8780-a37a-c4b83745e89a"
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
      stageUuid: "5f8edf79-b094-81ce-bb71-31d49b3b836a"
    - stage: seal
      stageUuid: "e792981c-dee8-8faf-8523-e97d6f5d8e5b"
    - stage: uuid
      stageUuid: "17db52f3-160b-8719-8cd3-a57fa944867b"
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

**Honest boundary.** These are statements about `ℤ/9` and nothing else. That `halfTurn` is the group's
half-turn is a theorem; that a half-turn *means* anything beyond `×(−1)` is not, and nothing here
claims it.

Composes: [[horo]] · [[horo]] · [[algebra]].
