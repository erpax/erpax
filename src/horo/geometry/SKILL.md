---
name: geometry
description: "Use when generating visual representations, sequences, and spatial mechanics from the horo ring — loops (circles, lemniscates), breath sequences, turning numbers, corner limits, carry closures, and state validation."
atomPath: "horo/geometry"
coordinate: "horo/geometry · 1/base · 568ef18c"
contentUuid: "b0593e86-737c-5b2b-84b0-4114398caca1"
diamondUuid: "de22b3c0-83d0-82da-b4fb-cedf63a21ec9"
uuid: "568ef18c-a805-897f-b29d-8b63fa1eff0c"
horo: 1
typography:
  partition: horo
  bondDegree: 8
standards: []
bindings: []
signatures:
  computationUuid: "381632a8-459d-82ca-a20f-ee77ad74fd54"
  stages:
    - stage: path
      stageUuid: "660bcd1e-652e-8972-b6ad-e2924b58b078"
    - stage: trinity
      stageUuid: "d1c86d69-8d85-8760-af3c-f17f311134ae"
    - stage: boundary
      stageUuid: "210e63b7-c6c3-8660-ab22-45e07781ca30"
    - stage: links
      stageUuid: "835a4a2e-4b30-87b2-9b7b-f3fa7e885d81"
    - stage: horo
      stageUuid: "3c0ba4d3-8cdb-8275-8171-e7d328769c32"
    - stage: seal
      stageUuid: "55c60c27-93f9-88b3-970d-7d5d3573e5e0"
    - stage: uuid
      stageUuid: "2d243e4a-939a-85b2-b9c6-fa6ec2410b86"
version: 2
---
# horo/geometry

## when

Use when generating visual representations, sequences, and spatial mechanics from the horo ring — loops (circles, lemniscates), breath sequences, turning numbers, corner limits, carry closures, and state validation.

## why

The horo ring exists in two worlds: the algebraic (composition, doubling, orbit) and the geometric (the double torus, counter-rotating lobes, the fold at the void). Geometry functions live here because they are pure generation — they consume the ring's structure and produce visual/spatial outputs without state.

## usage

```typescript
import { circleLoop, lemniscate, turningNumber, fullBreath, isMergePoint } from '@/horo/geometry'

const pt = circleLoop(Math.PI / 2) // { x: 0, y: 1 }
const lem = lemniscate(Math.PI / 4) // { x: cos(π/4), y: sin(π/2) / 2 }
const turn = turningNumber(circleLoop, 1000) // 1
const breath = fullBreath() // [...]
const isClose = isMergePoint(9, 1) // true
```

## code

entry `@/horo/geometry` · sealed `0` (refactoring in progress) · trinity `1·1·1`
exports circleLoop · lemniscate · atVoid · turningNumber · fullBreath · sequenceForward · sequenceReflected · renderSequenceSection · reflectNumeral · cornerLimit · cornerSweep · pivotSingularities · carryClosure · isMergePoint · horoStateField · validateHoroStates · horoStateBeforeChange · type Loop2D · type BreathStep · type CornerLimit · type Singularity · type HoroState
imports @/algebra (algebraCos, algebraSin, algebraAtan2, algebraSqrt, PI) · @/horo/constants (re-exported from parent during refactoring)

---

<sub>content-uuid `—` · refactoring atom · sealed `0`</sub>
