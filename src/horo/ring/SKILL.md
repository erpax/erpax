---
name: ring
description: "Use when analyzing the ring's structure — which elements compose to what, which orbits exist, how trinities move under doubling, where each digit lives (ring / axis / void), and the split between balance (5) and attraction (9)."
atomPath: "horo/ring"
coordinate: "horo/ring · 5/round · 8e454baa"
contentUuid: "1d523eb7-a4bf-5383-ab4e-6748bdd38efe"
diamondUuid: "24bdc0f7-e9a9-8e97-985a-c0279231a389"
uuid: "8e454baa-f14d-8f74-9d7e-1ab457bc43a3"
horo: 5
typography:
  partition: horo
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "ab23d067-f8ca-8522-b2f1-4484bb2c104f"
  stages:
    - stage: path
      stageUuid: "ac5c5170-6c62-8b8d-bde6-1c99554f1458"
    - stage: trinity
      stageUuid: "12edfc5d-fdfb-8715-9c63-44f2951cfed4"
    - stage: boundary
      stageUuid: "e7489c6c-4a7c-8a34-8eb9-1ee2aff22f0b"
    - stage: links
      stageUuid: "25da7233-d005-8127-94df-c2061b74709c"
    - stage: horo
      stageUuid: "2d0f0404-df3c-8b33-a676-269f04f186cb"
    - stage: seal
      stageUuid: "e8404b29-e84a-89f8-894a-17b579613063"
    - stage: uuid
      stageUuid: "3f4f4134-0b20-8be1-973b-deea58d7fd9d"
version: 2
---
# horo/ring

## when

Use when analyzing the ring's structure — which elements compose to what, which orbits exist, how trinities move under doubling, where each digit lives (ring / axis / void), and the split between balance (5) and attraction (9).

## why

The horo ring is not arbitrary; it is structured by the doubling map and the void mirror. Understanding which steps stay in which orbit, how the flow trinities swap while the axis holds, and where the fixed points are — this is foundational to reasoning about state transitions, carry mechanics, and the geometry of the double torus.

## usage

```typescript
import { doublingOrbits, trinities, orbitOf, rayOf, antimatter, fiveRoles } from '@/horo/ring'

const orbits = doublingOrbits() // [[9], [3, 6], [1, 2, 4, 8, 7, 5]]
const tri = trinities() // {flowEast: [1, 4, 7], flowWest: [2, 5, 8], axis: [3, 6, 9]}
const orbit1 = orbitOf(1) // [1, 2, 4, 8, 7, 5]
const ray = rayOf(3) // 'axis'
const pair = antimatter(2) // 5 (because 2 × 5 ≡ 10 ≡ 1, and we need 9)
```

## code

entry `@/horo/ring` · sealed `0` (refactoring in progress) · trinity `1·1·1`
exports doublingOrbits · trinities · orbitOf · rayOf · antimatter · fiveRoles · carryRays · straddlingSteps · type FiveRoles · type CarryRay
imports @/horo/arithmetic (throughVoid) · @/horo/constants (type guards, constants)

---

<sub>content-uuid `—` · refactoring atom · sealed `0`</sub>

Composes: [[horo]] · [[horo]] · [[wave]].
