---
name: constants
description: "Use when referencing the horo ring's static definition — the seven positions, measure names, type guards, and mathematical constants that define the state ring's fixed structure."
atomPath: "horo/constants"
coordinate: "horo/constants · 4/weave · 6d277e94"
contentUuid: "aeffba94-5880-5430-92d6-abe401454473"
diamondUuid: "a988aff5-0f65-8905-92fb-cd87f7151804"
uuid: "6d277e94-66cb-86f4-9db7-bcddd1350301"
horo: 4
typography:
  partition: horo
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "0f5ef11c-e7fe-8fe8-b8e6-677fae2e9c57"
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
      stageUuid: "af028d43-5dbf-89c5-9666-fe926ef64563"
    - stage: seal
      stageUuid: "3003204e-0b16-87ef-91c1-b257c1363770"
    - stage: uuid
      stageUuid: "cb2f9893-e392-8a07-a25e-ae4bb72f3e52"
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
