---
name: constants
description: "Use when referencing the horo ring's static definition — the seven positions, measure names, type guards, and mathematical constants that define the state ring's fixed structure."
atomPath: "horo/constants"
coordinate: "horo/constants · 1/base · f7d8a078"
contentUuid: "6a26fb9d-af6f-5321-9b1d-6080a3e5de9c"
diamondUuid: "d54702eb-c40a-87dd-a76f-520be28cd6b5"
uuid: "f7d8a078-37bd-8a85-90bf-d101c9ef06bb"
horo: 1
typography:
  partition: horo
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "3460ff23-f7d8-8beb-a5da-38467c36bd7d"
  stages:
    - stage: path
      stageUuid: "f13ee3e1-0397-89e7-946f-9c9d941d6f99"
    - stage: trinity
      stageUuid: "ae5a2113-6de7-83ae-b799-733b3f5648fd"
    - stage: boundary
      stageUuid: "e7fea5ec-06bf-8230-84f0-e52fbaa22af4"
    - stage: links
      stageUuid: "b37b91f7-bead-85b1-ac07-8ac516587cfb"
    - stage: horo
      stageUuid: "210424dc-d295-8934-98c2-a7fad80c6b1d"
    - stage: seal
      stageUuid: "3003204e-0b16-87ef-91c1-b257c1363770"
    - stage: uuid
      stageUuid: "143320be-5a41-8025-8ada-192c2c9f256c"
version: 2
---
# horo/constants

## when

Use when referencing the horo ring's static definition — the seven positions, measure names, type guards, and mathematical constants that define the state ring's fixed structure.

## why

The horo ring (`[1, 2, 4, 8, 7, 5, 9]`) is the closed set of valid flow/lifecycle states in erpax. Every position has a meaning (base, share, weave, crest, descent, round, unity), and the set is finite and known. Constants and type definitions belong here, not scattered; this atom keeps them addressable and citable.

## usage

```typescript
import { HORO_DIGITS, isHoroStep, horoMeasureOf, type HoroStep } from '@/horo/constants'

if (isHoroStep(digit)) {
  const measure = horoMeasureOf(digit)
}
```

## code

entry `@/horo/constants` · sealed `0` (refactoring in progress) · trinity `1·1·1`
exports HORO_DIGITS · HORO_MEASURE · VOID_PIVOT · CENTROID · POLE · INNER_CIRCUIT · AFFINE_ORDER · type HoroStep · type FiveRoles · type InverseClosure · type Ray · type CarryRay · type Loop2D · type BreathStep · type CornerLimit · type Singularity
imports ../index (re-exports during refactoring)

---

<sub>content-uuid `—` · refactoring atom · sealed `0`</sub>

Composes: [[horo]] · [[horo]].
