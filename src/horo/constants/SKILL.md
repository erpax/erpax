---
name: constants
description: "Use when referencing the horo ring's static definition — the seven positions, measure names, type guards, and mathematical constants that define the state ring's fixed structure."
atomPath: "horo/constants"
coordinate: "horo/constants · 7/descent · 50b2f318"
contentUuid: "44b09e3c-079c-5701-b7c9-7d853d7554cd"
diamondUuid: "35d46a4f-b96b-8a64-b7d3-b3a962bc17d2"
uuid: "50b2f318-037b-85aa-a112-f28a140fc709"
horo: 7
typography:
  partition: horo
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "319be2d7-932b-8c37-bfbb-f749bc0e1f82"
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
      stageUuid: "ea71d419-040b-8a90-8470-1cd0d66379b0"
    - stage: seal
      stageUuid: "3003204e-0b16-87ef-91c1-b257c1363770"
    - stage: uuid
      stageUuid: "7d3af1a1-78ea-867b-9961-b61fe773d42b"
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
