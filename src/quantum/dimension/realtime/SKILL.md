---
name: realtime
description: "Use when streaming the projection state as it changes — collapse, sealed update and wave emit per dimension axis, with a snapshot fingerprint so a repeated state is recognisable rather than re-sent. The realtime view of quantum/dimension, nested rather than hyphenated. Run: tsx src/quantum/dimension/realtime/index.ts"
atomPath: "quantum/dimension/realtime"
coordinate: "quantum/dimension/realtime · 8/crest · 0b3389cc"
contentUuid: "59e909a1-d632-51bd-8360-d6c81c1f4ad3"
diamondUuid: "682fb69c-6271-852c-80c3-a453f525ebc3"
uuid: "0b3389cc-77fe-8b70-bae3-a05b41bcbbb6"
horo: 8
typography:
  partition: quantum
  bondDegree: 71
standards: []
bindings: []
signatures:
  computationUuid: "99b058b4-2de1-8fb4-9d61-76f2cbbd49a9"
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
      stageUuid: "a102773a-0536-8bca-8541-fd2ff5877c95"
    - stage: seal
      stageUuid: "707a8e76-9d63-808e-bbbd-73c0f0981a50"
    - stage: uuid
      stageUuid: "c0913010-dbb6-85a2-8af2-aa8afb38fc43"
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
    computationUuid: "99b058b4-2de1-8fb4-9d61-76f2cbbd49a9"
    contentUuid: "59e909a1-d632-51bd-8360-d6c81c1f4ad3"
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

<sub>content-uuid `59e909a1-d632-51bd-8360-d6c81c1f4ad3` · account `quantum/dimension/realtime` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
