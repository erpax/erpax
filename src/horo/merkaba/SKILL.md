---
name: merkaba
description: "Use when a figure over the digits is claimed to have a symmetry — structure and symmetry group are two different claims, and the second is not inherited from the first. Ten symbols are not nine: AGL(1,Z/9) has no well-defined action here, AGL(1,Z/10) preserves only the identity, and an exhaustive search over all 10! relabellings finds 24 symmetries that never exchange the figures."
atomPath: "horo/merkaba"
coordinate: "horo/merkaba · 8/crest · a85db886"
contentUuid: "d509df0a-03f9-5580-bbc6-8193c464f792"
diamondUuid: "92d8bd4f-e1b9-8adc-abac-82369762cdc6"
uuid: "a85db886-0c80-8a95-89c5-e819273ca46f"
horo: 8
typography:
  partition: horo
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "7c14979e-9df8-8707-8b4a-a3ecf29fff27"
  stages:
    - stage: path
      stageUuid: "fd3f9857-248d-897b-b9b9-90b7f6c0fec9"
    - stage: trinity
      stageUuid: "62a3acd9-bc96-85ed-99c0-64e57aaa12cc"
    - stage: boundary
      stageUuid: "9c82f2ba-8225-8d59-b595-8767b2c3e6f7"
    - stage: links
      stageUuid: "157a0e2e-8c95-8556-a8f3-b70177575e72"
    - stage: horo
      stageUuid: "913f2467-4b14-8139-b295-6202f9f57a7f"
    - stage: seal
      stageUuid: "80d3f50f-6e38-81fd-bcc0-aab0a5c76153"
    - stage: uuid
      stageUuid: "e8204adc-df98-8dbd-a1e2-d612e99ffe68"
version: 2
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
