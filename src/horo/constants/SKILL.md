---
name: constants
description: "Use when referencing the horo ring's static definition — the seven positions, measure names, type guards, and mathematical constants that define the state ring's fixed structure."
atomPath: "horo/constants"
coordinate: "horo/constants · 5/round · 09995355"
contentUuid: "6ec23a9e-ec73-5a41-8eca-cc455a40b315"
diamondUuid: "c024c267-5cfb-84c2-ab05-4d3d00b89573"
uuid: "09995355-8f60-8e6e-8459-cd60671e9cb3"
horo: 5
typography:
  partition: horo
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "a426eaff-5375-86a5-836a-8e6283659613"
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
      stageUuid: "88b830ae-4775-8006-a773-3b7ad62c030c"
    - stage: seal
      stageUuid: "3003204e-0b16-87ef-91c1-b257c1363770"
    - stage: uuid
      stageUuid: "0185cddc-9653-8fbf-9211-e7a23b5d13f9"
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
