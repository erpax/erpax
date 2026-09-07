---
name: realtime
description: "Use when streaming the projection state as it changes — collapse, sealed update and wave emit per dimension axis, with a snapshot fingerprint so a repeated state is recognisable rather than re-sent. The realtime view of quantum/dimension, nested rather than hyphenated. Run: tsx src/quantum/dimension/realtime/index.ts"
atomPath: "quantum/dimension/realtime"
coordinate: "quantum/dimension/realtime · 8/crest · 5297e806"
contentUuid: "8e37eedb-3d5b-5878-9540-647fbc285e28"
diamondUuid: "7c62c694-7cdf-8863-b846-8bc07156f576"
uuid: "5297e806-2e8a-87bc-8914-67c2c51fe8a3"
horo: 8
typography:
  partition: quantum
  bondDegree: 71
standards: []
bindings: []
signatures:
  computationUuid: "4a1e5c6b-44e7-8548-ad57-71b3acef8c6f"
  stages:
    - stage: path
      stageUuid: "a100e8e7-fa5e-871d-b417-2f38b1f42aeb"
    - stage: trinity
      stageUuid: "49cf989e-bb8d-8cc6-b423-9a91b7c0eed7"
    - stage: boundary
      stageUuid: "93d56c74-b214-8177-b3a5-a8d16100ca5f"
    - stage: links
      stageUuid: "7b256d96-f926-8918-bb85-cb8cd23fd1cc"
    - stage: horo
      stageUuid: "9ae8d2eb-6981-8e8d-b878-1dc3210f29d7"
    - stage: seal
      stageUuid: "707a8e76-9d63-808e-bbbd-73c0f0981a50"
    - stage: uuid
      stageUuid: "62fa3c14-c871-8e38-a392-2c8575f99186"
quantum:
  superposition:
    - access
    - chat
    - comms
    - dimension
    - event
    - live
    - log
    - memory
    - number
    - superposition
  collapse:
    - "Use when streaming the projection state as it changes — collapse, sealed update and wave emit per dimension axis, with a snapshot fingerprint so a repeated state is recognisable rather than re-sent. The realtime view of quantum/dimension, nested rather than hyphenated. Run: tsx src/quantum/dimension/realtime/index.ts"
    - "a hyphen hides a relationship the path can state. Nest the view under what it views, and move every reference form in the same diff — alias, relative and barrel — because only one of the three fails loudly."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "4a1e5c6b-44e7-8548-ad57-71b3acef8c6f"
    contentUuid: "8e37eedb-3d5b-5878-9540-647fbc285e28"
version: 2
---
# realtime — the projection, watched

The parent [[quantum]]/dimension holds the basis: cells, amplitudes, collapse, seal. This atom is that basis **in motion** — collapse per axis, a sealed update, and a wave emit for consumers watching the surface change.

It was `dimension-realtime.ts`, a hyphenated file beside its own parent. The hyphen was carrying a relationship the path was not allowed to say: this is not a sibling of `dimension`, it is a **view of** it, which `dimension/realtime` states directly.

## What the nesting cost

Three reference forms had to move in the same diff, and only one of them is visible to an import scan:

- `@/quantum/dimension-realtime` — the alias form, in a test and two `.tsx` consumers
- `./dimensions` — the relative form inside this file, which after nesting resolved **one level off**
- the barrel re-export in `quantum/index.ts`

The `.tsx` consumers were missed by a first scan globbing `*.ts`, and surfaced only because the suite failed to collect. That is the same lesson [[quantum]]/status and [[quantum]]/ftl/admin each paid for in their own way: a reference the compiler resolves, or a scan does not cover, is a reference you have not actually checked. `tsc` reported zero errors while a whole test file could not import.

**Honest boundary.** This proves the projection **streams and seals consistently** — snapshots fingerprint, repeated states are recognisable, imports resolve. It says nothing about delivery: whether a consumer actually receives an emitted wave is the transport's question, not this atom's.

**Law — [[law]]: a hyphen hides a relationship the path can state. Nest the view under what it views, and move every reference form in the same diff — alias, relative and barrel — because only one of the three fails loudly.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — modularity: a view belongs under what it views.

Composes: [[quantum]]/dimension · [[quantum]] · [[law]].

<sub>content-uuid `8e37eedb-3d5b-5878-9540-647fbc285e28` · account `quantum/dimension/realtime` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
