---
name: separation
description: "Use when checking the separation of powers — that no single actor holds two of the legislative, executive, or judicial branches; the anti-corruption segregation-of-duties invariant applied at the scale of the state."
atomPath: separation
coordinate: "separation · 8/crest · 56bcec4c"
contentUuid: "95f3f787-a865-582c-b67e-f60fd61169a8"
diamondUuid: "f5dc90ae-25de-89d0-af1f-e41b5e5bedc9"
uuid: "56bcec4c-947c-87d1-aa48-cb48f5ec15b6"
horo: 8
typography:
  partition: separation
  bondDegree: 29
standards:
  - "Montesquieu separation-of-powers (legislative · executive · judicial)"
  - "SOX §404 segregation-of-duties (the same invariant, public-office scale)"
bindings: []
signatures:
  computationUuid: "e8e46990-ec1b-8de3-97a3-ddb26729a8fa"
  stages:
    - stage: path
      stageUuid: "a5700057-d58d-822e-a0cb-8d50ac3fc025"
    - stage: trinity
      stageUuid: "3af75a7c-fddf-8511-85f2-459ca28fd287"
    - stage: boundary
      stageUuid: "f2495f10-3717-84ce-8f86-85593dae2b30"
    - stage: links
      stageUuid: "f8f9ff1c-ba37-8238-abab-5ff1ff34f5b4"
    - stage: horo
      stageUuid: "995b46c1-b07f-86d8-ae59-56239be74bc8"
    - stage: seal
      stageUuid: "ce33e633-06c7-84dc-8ca6-43b258fb8381"
    - stage: uuid
      stageUuid: "584e2446-015a-86f8-bc32-8ebe799b4191"
version: 2
---
# separation — the separation of powers, the SoD invariant at the scale of the state

FORM: **tyranny and fraud are the same violation at different scales — one check catches both.** The constitutional rule that no actor may hold two branches of the state IS the segregation-of-duties invariant that forbids the creator of a payment from approving it. So `separation` adds NO new logic; it APPLIES [[anti/corruption]]'s `detectSodViolation` to the three branches. Tyranny is structurally foreclosed exactly as self-dealing is — a would-be despot and a self-approving clerk fail the identical check ([[fractal]]: one law, every scale). Pure → testable (`index.test.ts`).

`checkSeparationOfPowers(holders)` → which branch pairs are unlawfully concentrated in one actor. The three pairs that must differ: legislative·executive, executive·judicial, legislative·judicial — no concentration of power.

This is the [[constitution]]'s foundation made political, the limit [[legislation]] inherits (the legislature cannot also adjudicate or execute its own statutes) and [[governance]] presupposes (the polity that decides is not the office that enforces). It is the control triad of the [[society]], position **3·6·9** on the ring — the governing axis that holds the rest in [[balance]]. The two sides are [[duality]]: power divided is power that checks itself.

**Law — [[law]]: tyranny and fraud are one violation at different scales — no actor may hold two branches of the state, the identical segregation-of-duties check that forbids a payment's creator from approving it ([[fractal]]: one law, every scale); adds no new logic.**

## Standards

- **Montesquieu** — separation-of-powers (legislative · executive · judicial).
- **SOX §404** — segregation-of-duties; the same invariant at the public-office scale.
