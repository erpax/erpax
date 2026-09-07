---
name: arithmetic
description: "Use when performing mathematical operations on horo digits — digital roots, composition, ratios, void mechanics, inverse orbits, and affine transformations. All functions are pure and side-effect-free."
atomPath: "horo/arithmetic"
coordinate: "horo/arithmetic · 5/round · aee1dcf2"
contentUuid: "6d5f28d5-b47e-5123-a8c8-40fcc74c7ea2"
diamondUuid: "8aa1d719-0987-88f5-8241-d9911c35e75f"
uuid: "aee1dcf2-6727-819b-9d77-cc09cd23a8bf"
horo: 5
typography:
  partition: horo
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "21c2ed80-7c25-8df7-88a9-accac44c31e8"
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
      stageUuid: "0543f063-3a6f-8b59-a58c-d22d8b3c76f8"
    - stage: seal
      stageUuid: "e792981c-dee8-8faf-8523-e97d6f5d8e5b"
    - stage: uuid
      stageUuid: "3d7c8f71-af0d-84b4-9ba5-f95ba047022b"
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
