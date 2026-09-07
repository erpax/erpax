---
name: arithmetic
description: "Use when performing mathematical operations on horo digits — digital roots, composition, ratios, void mechanics, inverse orbits, and affine transformations. All functions are pure and side-effect-free."
atomPath: "horo/arithmetic"
coordinate: "horo/arithmetic · 7/descent · da714924"
contentUuid: "cb3d29a3-214c-549d-a526-46f8dd1df09d"
diamondUuid: "d2791e01-3388-8f43-8605-86737b32ef52"
uuid: "da714924-fc09-8253-876a-467aa94a92ce"
horo: 7
typography:
  partition: horo
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "4066be43-f6d6-8e45-a516-9654590c9988"
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
      stageUuid: "18b055a9-e0ee-8f57-aea4-2f9a3ba0b851"
    - stage: seal
      stageUuid: "e792981c-dee8-8faf-8523-e97d6f5d8e5b"
    - stage: uuid
      stageUuid: "28fb7fa4-2bb7-810f-a58a-235677dd47e0"
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

Composes: [[horo]] · [[horo]] · [[algebra]].
