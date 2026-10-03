---
name: coil
description: "Use when crossing a rosetta of laws without enumerating every pair — coins (a law and its dual face) are coiled in trinities and each coil is rotated once forward and once backward; for a trinity those two turns are all six ordered pairs, every cross in both faces, and C(n,2)=n holds for no other size. More laws coil fractally (trinities of coils, the remainder as the axis) and one turn each way at every node still covers every cross — proved in Coil.lean. erpax.gate.coil rotates the live rosetta."
atomPath: "quantum/coil"
coordinate: "quantum/coil · 5/round · 73a6f364"
contentUuid: "c55a6aac-42e1-5393-bcea-d9fa92a6158d"
diamondUuid: "233e1b5f-baa1-83f4-88b1-fe868e94f6a8"
uuid: "73a6f364-30c0-86d9-94f3-0174b22cb7c7"
horo: 5
typography:
  partition: quantum
  bondDegree: 123
standards: []
bindings: []
signatures:
  computationUuid: "4efb3dbf-80b8-8680-a286-c6b968ce6691"
  stages:
    - stage: path
      stageUuid: "6aa061c6-3c3f-8f7c-a2d1-1c8caf88fa24"
    - stage: trinity
      stageUuid: "7c5a8c68-c058-8e05-9676-f0a736bf6fe4"
    - stage: boundary
      stageUuid: "165761b8-88fd-8c7e-a99a-0dd4c7b57ca5"
    - stage: links
      stageUuid: "3296b9f5-40ea-8860-b035-f3710317bd6e"
    - stage: horo
      stageUuid: "34c0fb84-9e7b-8238-8a3f-16d19ce423d6"
    - stage: seal
      stageUuid: "1b2ece0f-623d-837a-9455-602fc23aefe1"
    - stage: uuid
      stageUuid: "d8f3ffa1-9a3a-8b3c-9840-b657bd3587b6"
quantum:
  superposition:
    - access
    - axis
    - base
    - cmyk
    - conjecture
    - coordinate
    - crest
    - decompression
    - superposition
  collapse:
    - "Use when crossing a rosetta of laws without enumerating every pair — coins (a law and its dual face) are coiled in trinities and each coil is rotated once forward and once backward; for a trinity those two turns are all six ordered pairs, every cross in both faces, and C(n,2)=n holds for no other size. More laws coil fractally (trinities of coils, the remainder as the axis) and one turn each way at every node still covers every cross — proved in Coil.lean. erpax.gate.coil rotates the live rosetta."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "4efb3dbf-80b8-8680-a286-c6b968ce6691"
    contentUuid: "c55a6aac-42e1-5393-bcea-d9fa92a6158d"
version: 2
---
# quantum/coil — coins in trinities; one rotation each way covers every cross

A **coin** has two faces: a law and its dual — the claim and its involution ([[self]]/involute).
A cross of two laws has two faces too: how much of A lies inside B, and how much of B lies inside A
([[conjecture]]'s directional containment). The shared count and the theorem-at-zero are symmetric;
the faces are not.

Arrange three coins in a ring and turn it once forward: each coin crosses its successor —
`a→b · b→c · c→a`. Turn it once backward: `a→c · b→a · c→b`. Six ordered pairs, which is **every
cross of three things, in both faces**. Nothing is enumerated; the structure produces the crosses.

## Why trinities, and not rings of any other size

A ring of n coins has C(n,2) crosses and one turn yields n of them. `C(n,2) = n` has exactly two
solutions, `n = 0` and `n = 3` (`Coil.trinity_is_the_coil`, decided over every size up to 64). Three
is the one ring a single turn closes — which is why the coins come in trinities, and why the
corpus's own trinity (form · code · proof) is the unit a rotation can fully cross.

## Seven laws, two levels, every cross

The live rosetta is seven laws: the five with file populations (`copy · cycle · concentration ·
mirror · unfolded`) and the two the frontier addresses as atoms (`unreached · accounting-wave`).
`coil` arranges them as **(copy cycle concentration) · (mirror unfolded unreached) · accounting-wave** —
two trinities and an axis — and the three nodes are themselves a trinity. One turn each way at each
of the three nodes covers all 21 crosses: two laws in one trinity are crossed by that trinity's
turn; two laws in different nodes are crossed by the top turn, which crosses the nodes' unioned
populations. `coverage` measures this on whatever it is handed and the test holds it for every
rosetta size up to forty; `Coil.seven_laws_fully_crossed` holds it in the kernel.

The axis is the remainder, and here it is the right one: `accounting-wave` is the eb ledger every
other law's fault flows into, and it is crossed with each trinity as a whole rather than coin by coin.

## The ring that turns both ways

The two turns are the two generators of the horo ring, `×2` and `×5 ≡ ×2⁻¹ (mod 9)`: the doubling
sequence `1 2 4 8 7 5` and its reverse, with `3 · 6 · 9` the axis the rotation leaves fixed ([[horo]];
the group fact is proved, the rest of Rodin is not). A coil is that ring read as crosses — one
generator, its inverse, and a fixed axis — which is why `backward_is_forward_twice` is a theorem of
the trinity and not a convention.

## Fused into MCP

`erpax.gate.coil` rotates the live rosetta: every node's forward and backward crosses with `shared`,
both faces, `theorem`, and the pairwise `lift` where a single independence model exists
(coin–coin only; a coil–coil cross unions populations and reports `lift: null` rather than invent
one). It reads the same populations `erpax.gate.crosses` enumerates — the coil is the same 21
crosses reached by six turns instead of 21 lookups, with the face each turn carries.

**Honest boundary.** Coverage is a theorem about the **structure**; which crosses hold at zero and
which fire together is measured, and a coil–coil cross is coarser than its nine coin–coin crosses —
it says the two trinities meet, not which laws do. The coil never reorders the rosetta it is
handed, so the grouping is the rosetta's declared order and a different order is a different coil.
And a unioned population loses the per-law base rate, which is exactly why the lift is withheld there.

**Law — [[law]]: a cross is reached by turning, not by listing. Coins coil in trinities because three
is the one ring a single turn each way closes; more coins coil fractally, and one turn each way at
every node crosses everything — both faces, nothing enumerated, nothing missed.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: a finding is corroborated from more than one seat (the two faces).

Composes: [[conjecture]] · [[self]]/involute · [[quantum]]/cross · [[horo]] · [[law]].

<sub>content-uuid `c55a6aac-42e1-5393-bcea-d9fa92a6158d` · account `quantum/coil` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
