---
name: width
description: "Use when reasoning about width — One div, one style. means *half the form*, not fifty pixels — the value is a **percentage**, because a form field's width is meaningful only relative to the form it sits in, and a…"
atomPath: "blocks/form/width"
coordinate: "blocks/form/width · 1/base · 97c5f38c"
contentUuid: "4b8ff47e-61c7-5eae-a83b-b1f4bd10f1c5"
diamondUuid: "565b01a8-6b9d-87fb-9ef6-27975edc10a8"
uuid: "97c5f38c-1edb-8b67-9812-47dcbb9f5f36"
horo: 1
typography:
  partition: blocks
  bondDegree: 8
standards: []
bindings: []
signatures:
  computationUuid: "1408f03e-c54a-82e9-be4d-96599fe6ed82"
  stages:
    - stage: path
      stageUuid: "e3d3e4fc-9e79-80d2-97d2-1338e94c2770"
    - stage: trinity
      stageUuid: "dc8ec59b-0aa1-8e7a-bb9c-17652b06a6fa"
    - stage: boundary
      stageUuid: "de893563-4d3b-87f0-a83e-880e269cb254"
    - stage: links
      stageUuid: "41bc829a-3065-89c7-807e-2bfcaa4a173e"
    - stage: horo
      stageUuid: "db7c3f9c-c1d7-8b9d-b6a1-68fd5e460048"
    - stage: seal
      stageUuid: "bc2a9333-c5cf-8852-af93-08769352c311"
    - stage: uuid
      stageUuid: "e394893d-1f53-8fda-bce5-f852361482ec"
version: 2
---
# blocks/form/width — a field's width is a share of the form, and absent is not zero

One div, one style. `width={50}` means *half the form*, not fifty pixels — the value is a
**percentage**, because a form field's width is meaningful only relative to the form it sits in, and
a pixel width breaks the moment the container changes.

The interesting case is the missing one. `width` is optional, and the wrong reading of an absent
value is `0%` — a field rendered invisible with no error anywhere. So absent must produce **no
constraint at all**, and that is what the proof beside this pins: `maxWidth` is simply not set.

**Honest boundary.** This proves the style attribute carries the percentage and that an absent width
constrains nothing. It says nothing about whether the resulting layout is *good*, and nothing about
how the browser resolves a percentage inside a flex or grid parent.

**Law — [[law]]: an optional dimension defaults to unconstrained, never to zero. A field with no
width fills its container; a field with `width={0}` would vanish, and the difference between those
two readings is a form nobody can fill in.**

## Standards

- **CSS Box Model Level 3** — `max-width` as a percentage of the containing block.

Composes: [[blocks]] · [[law]].
