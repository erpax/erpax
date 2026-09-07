---
name: separation
description: "Use when checking the separation of powers — that no single actor holds two of the legislative, executive, or judicial branches; the anti-corruption segregation-of-duties invariant applied at the scale of the state."
atomPath: separation
coordinate: "separation · 7/descent · cde88958"
contentUuid: "4a213e6c-7243-536a-95e2-f96ae96ab050"
diamondUuid: "83ca3748-14be-85ce-97fd-74e2a111b544"
uuid: "cde88958-de76-8f51-a178-03fac3bf986a"
horo: 7
typography:
  partition: separation
  bondDegree: 29
standards:
  - "Montesquieu separation-of-powers (legislative · executive · judicial)"
  - "SOX §404 segregation-of-duties (the same invariant, public-office scale)"
bindings: []
signatures:
  computationUuid: "814e4da9-7454-8c4e-967b-e1eb8ab5cb36"
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
      stageUuid: "adfb0f42-d60e-8158-a50f-60bdb847d711"
    - stage: seal
      stageUuid: "ce33e633-06c7-84dc-8ca6-43b258fb8381"
    - stage: uuid
      stageUuid: "ab06e49b-96f4-87fc-8fd8-57814223fe12"
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
