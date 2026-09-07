---
name: width
description: "Use when reasoning about width — One div, one style. means *half the form*, not fifty pixels — the value is a **percentage**, because a form field's width is meaningful only relative to the form it sits in, and a…"
atomPath: "blocks/form/width"
coordinate: "blocks/form/width · 1/base · e097b026"
contentUuid: "03ff0439-ddbf-5db4-b9b8-6607bda16e56"
diamondUuid: "5bb79a74-0be9-8f44-8517-a8ab39e0424c"
uuid: "e097b026-4633-80c0-a45d-60f26585b8e1"
horo: 1
typography:
  partition: blocks
  bondDegree: 8
standards: []
bindings: []
signatures:
  computationUuid: "d595db7a-11ea-8766-b8a1-b492eee40cf9"
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
      stageUuid: "a9841540-1a01-8fdb-88c0-20da619a8e40"
    - stage: seal
      stageUuid: "bc2a9333-c5cf-8852-af93-08769352c311"
    - stage: uuid
      stageUuid: "593eaa1a-317c-8cb1-b682-26cef22a7ba0"
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
