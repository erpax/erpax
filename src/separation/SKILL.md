---
name: separation
description: "Use when checking the separation of powers — that no single actor holds two of the legislative, executive, or judicial branches; the anti-corruption segregation-of-duties invariant applied at the scale of the state."
atomPath: separation
coordinate: "separation · 7/descent · c97d2b3a"
contentUuid: "f84d462f-13f9-575b-ad7f-449df8a75b6a"
diamondUuid: "41b1c9a4-9b5d-80f6-8cda-83c6a464952a"
uuid: "c97d2b3a-b065-80b8-852c-a25a03c8db39"
horo: 7
typography:
  partition: separation
  bondDegree: 29
standards:
  - "Montesquieu separation-of-powers (legislative · executive · judicial)"
  - "SOX §404 segregation-of-duties (the same invariant, public-office scale)"
bindings: []
signatures:
  computationUuid: "cddcc0da-76d1-8b26-a8c8-0b7cf934eb5d"
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
      stageUuid: "3ae727d5-a78e-882e-81ca-f541ce98361e"
    - stage: seal
      stageUuid: "ce33e633-06c7-84dc-8ca6-43b258fb8381"
    - stage: uuid
      stageUuid: "1609896d-5c58-88ae-9d22-ac897f8c1770"
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
