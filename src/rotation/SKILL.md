---
name: rotation
description: "Use when reasoning about rotation — A merkaba is two interpenetrating tetrahedra turning opposite ways. Projected along the shared axis it is a **hexagram**: two equilateral triangles, offset by 60°."
atomPath: rotation
coordinate: "rotation · 1/base · cd4bf784"
contentUuid: "3ac10230-2b2d-5867-9ebd-82ad544e3144"
diamondUuid: "e78222fb-774e-8236-8a25-10c4b597779c"
uuid: "cd4bf784-9dc4-82d7-9c69-f5cd063ffea5"
horo: 1
typography:
  partition: rotation
  bondDegree: 51
standards:
  - "ISO 1151-1 — flight dynamics, body axes and sign conventions"
bindings: []
signatures:
  computationUuid: "61b27f30-4bf4-883e-b6a8-16424204a7b9"
  stages:
    - stage: path
      stageUuid: "d64a2026-51c1-89d4-9ee7-e3848de8ceb9"
    - stage: trinity
      stageUuid: "b337af78-36df-8d2d-85f2-e8e3386f7520"
    - stage: boundary
      stageUuid: "079afe7c-1d59-8df8-984c-abc08765d613"
    - stage: links
      stageUuid: "b7fe222c-9970-82a3-b393-f02633f47b5f"
    - stage: horo
      stageUuid: "24197431-1f06-850e-9e02-6dee8c01a7dd"
    - stage: seal
      stageUuid: "b2f93fae-e86c-8b30-95b5-879039594c64"
    - stage: uuid
      stageUuid: "500e881a-f87f-8cbc-9b86-08af223013c1"
version: 2
---
# rotation — the hexagram is not a metaphor for a hexacopter, it is one

A merkaba is two interpenetrating tetrahedra turning opposite ways. Projected along the shared
axis it is a **hexagram**: two equilateral triangles, offset by 60°.

A hexacopter has six arms at 60° spacing with spin alternating around the ring. The three
counter-clockwise motors sit at **30° · 150° · 270°** and the three clockwise ones at
**90° · 210° · 330°** — two equilateral triangles, interpenetrating, counter-rotating. Computed,
not asserted: `figure(6)` returns both triads and `isRegular` reads the spacing back out of the
angles rather than trusting the construction.

## The one thing the geometry buys

**The reaction torques cancel if and only if the rotor count is even.**

| ring | net torque | why it matters |
| ---: | ---: | --- |
| 4 · 6 · 8 · 12 | **0** | heading holds with no yaw input |
| 3 · 5 · 7 · 9 | **±1** | a tricopter needs a tilting tail servo; a pentacopter needs canted motors |

That is a fact about **parity**, not about lift. Each figure is a regular polygon with `n/2`
vertices — a hexacopter gets two triangles, an octocopter two squares offset by 45°, a quadcopter
two opposed pairs. The quad's figures are degenerate (two points are not a polygon) and it balances
anyway, because balance needs only that the spins pair off.

## What this atom is careful not to claim

The parent [[horo]]/merkaba exists to **refuse** an over-claimed symmetry group over the digits —
ten symbols are not nine, and an exhaustive search found symmetries that never exchange the
figures. This child makes the weaker claim on purpose: **rotation geometry and torque parity, and
nothing else.**

There is no claim here about energy, fields, consciousness, or anything a hexagram is said to do.
The hexagram is the axial projection of a stellated octahedron; a hexacopter's spin classes have
that shape; their torques cancel because six is even. Each of those is checkable, and together they
are the whole content.

**Honest boundary.** This models an **idealised ring**: every rotor at the same radius, the same
thrust, the same torque constant, spinning in a plane. A real airframe has arm-length tolerance,
motor-to-motor variation, prop wash between arms, and a centre of gravity that is never exactly on
the axis — so a balanced ring still needs a controller trimming yaw continuously. Cancellation here
is a property of the **geometry**, never a claim about a built aircraft. And it assumes alternating
spin: a ring wired with two adjacent motors turning the same way has the right shape and the wrong
torque, which `netTorque` reports and the shape test does not.

**Law — [[law]]: counter-rotation cancels when the count is even, and never otherwise. The figure
is what makes the craft hold heading without being told to — and an odd ring cannot be fixed by
spacing, only by tilting something.**

## Standards

- **ISO 1151-1** — flight dynamics: body axes and sign conventions.

Composes: [[horo]]/merkaba · [[horo]] · [[law]].
