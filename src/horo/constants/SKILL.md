---
name: constants
description: "Use when referencing the horo ring's static definition — the seven positions, measure names, type guards, and mathematical constants that define the state ring's fixed structure."
atomPath: "horo/constants"
coordinate: "horo/constants · 2/share · ac221c63"
contentUuid: "b2df7349-7620-5bdc-9e2b-9b0677a274c7"
diamondUuid: "83599643-44f9-8964-be71-510f8b65bc1c"
uuid: "ac221c63-6944-853c-9822-078c2cd5c4a6"
horo: 2
typography:
  partition: horo
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "a234b977-8d84-8b9c-84dc-980eb5b6e826"
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
      stageUuid: "93a4b555-e2af-8083-b903-0f039440d536"
    - stage: seal
      stageUuid: "3003204e-0b16-87ef-91c1-b257c1363770"
    - stage: uuid
      stageUuid: "7e6250ea-426e-8400-a541-ae9d9cceeefc"
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
