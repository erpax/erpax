---
name: arithmetic
description: "Use when performing mathematical operations on horo digits — digital roots, composition, ratios, void mechanics, inverse orbits, and affine transformations. All functions are pure and side-effect-free."
atomPath: "horo/arithmetic"
coordinate: "horo/arithmetic · 1/base · 1b62fe79"
contentUuid: "9bcce253-8781-547b-aa97-a79c650a86e1"
diamondUuid: "13c9eb59-760f-8938-88a0-5f6e12dc86a4"
uuid: "1b62fe79-848c-8d6d-b451-0a56b28a2001"
horo: 1
typography:
  partition: horo
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "31e53171-485b-8589-8e5b-b9c41ff72e18"
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
      stageUuid: "7ddac73a-bbbe-8908-ac14-c04ebc9c26d3"
    - stage: seal
      stageUuid: "e792981c-dee8-8faf-8523-e97d6f5d8e5b"
    - stage: uuid
      stageUuid: "f1990d31-590d-843d-9a9c-5a15ee6eb335"
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
