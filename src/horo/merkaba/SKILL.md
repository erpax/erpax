---
name: merkaba
description: "Use when a figure over the digits is claimed to have a symmetry — structure and symmetry group are two different claims, and the second is not inherited from the first. Ten symbols are not nine: AGL(1,Z/9) has no well-defined action here, AGL(1,Z/10) preserves only the identity, and an exhaustive search over all 10! relabellings finds 24 symmetries that never exchange the figures."
---

# merkaba — the figure was right, the group was wrong

Three interlocked-tetrahedra figures over the ten digits were named by hand, and every
structural claim made for them **holds exactly**: `merkabaShape` counts union `8`,
centre `2`, cover `10`, tetrahedra disjoint, centre disjoint from the union — for all
three, with nothing adjusted to make it so.

The claim that did **not** survive was mine, not the figure's.

## What the arithmetic refused

The corpus already owns an affine group: [[horo]] proves `⟨doubling, mirror⟩` **is**
`AGL(1,ℤ/9)`, order 54. Reaching for it here was the obvious move and it is not
available — **in ℤ/9, `9 ≡ 0`**, so `[0,1,2,9]` collapses to three residues and the
union-8 property that defines the figure is destroyed before any group acts. Two of the
three figures die on that step. Ten symbols are not nine.

So the group must be `AGL(1,ℤ/10)` — `affineMaps(10)` computes order **40**. And
`affineSymmetries(10)` returns **exactly the identity**: not one non-trivial affine map
of the digits carries the set of figures into itself. The counting says the same thing
before the search does — **3 ∤ 40**, so an orbit of size three cannot exist in a group
of order forty, whatever the figures had been.

## Rigid was also wrong

Having lost the affine reading, I argued by hand that the configuration must be rigid.
`digitSymmetries` searches **all 3,628,800 relabellings** of the ten digits and finds
**24**. A complete search is a theorem; the hand argument was a guess, and it was wrong
in the direction I did not check.

But `inducedActions` returns a single element: **every one of the 24 fixes each figure**.
They relabel digits *inside* the figures and never exchange them. Orbit-stabiliser closes
it — three orbits of size 1, stabiliser 24 apiece, `1 × 24 = 24`.

## Why no group could have exchanged them

`sharedTetrahedra` names the reason, and it is not a symmetry argument at all:

| figures | share |
| --- | --- |
| m0 · m1 | `[0,1,2,9]` |
| m0 · m2 | `[3,5,6,7]` |
| m1 · m2 | — nothing |

**Four distinct tetrahedra fill six slots.** The incidence is a **path** with `m0` as its
hinge, not a triangle — and no relabelling carries an endpoint onto the hinge. The
centres confirm the asymmetry: `4` is the centre of both `m0` and `m1`, so the three
centres are not even pairwise disjoint.

**Honest boundary.** `MERKABAS` is **declared** — a human named these three, and this
atom proves things *about* them, never that they are the only three, nor that the
choice is canonical. `digitSymmetries` is exhaustive over relabellings of the ten
digits, so it is complete for that question and silent about every other transformation
(no geometry, no embedding, no rotation in space is modelled here). And the negative
result is about **this** triple: a different triple could easily be an orbit.

**Law — [[law]]: a figure's structure and its symmetry group are two different claims,
and the second is not inherited from the first. Count the group before naming it — ten
symbols are not nine, and a complete search is the only argument that a symmetry is
absent.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: an exhaustive search is refutable; a hand argument is not.

Composes: [[horo]] · [[algebra]] · [[rules]]/refutable · [[law]].
