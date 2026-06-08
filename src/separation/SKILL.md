---
name: separation
description: "Use when checking the separation of powers — that no single actor holds two of the legislative, executive, or judicial branches; the anti-corruption segregation-of-duties invariant applied at the scale of the state."
atomPath: separation
coordinate: separation · 4/weave · 3e4cfb9d
contentUuid: "6eb59748-e3f5-56a3-bed8-ed9bac217f73"
diamondUuid: "c0cf4212-e779-8230-a842-d2993e050df2"
uuid: "3e4cfb9d-8f31-8991-8eb7-dc32d88f4175"
horo: 4
bonds:
  in:
    - balance
    - constitution
    - corruption
    - duality
    - fractal
    - governance
    - law
    - legislation
    - society
  out:
    - balance
    - constitution
    - corruption
    - duality
    - fractal
    - governance
    - law
    - legislation
    - society
typography:
  partition: separation
  bondDegree: 29
  neighbors: []
standards:
  - "Montesquieu separation-of-powers (legislative · executive · judicial)"
  - "SOX §404 segregation-of-duties (the same invariant, public-office scale)"
bindings: []
neighbors:
  wikilink:
    - balance
    - constitution
    - corruption
    - duality
    - fractal
    - governance
    - law
    - legislation
    - society
  matrix:
    - balance
    - constitution
    - corruption
    - duality
    - fractal
    - governance
    - law
    - legislation
    - society
  backlinks:
    - balance
    - constitution
    - corruption
    - duality
    - fractal
    - governance
    - law
    - legislation
    - society
signatures:
  computationUuid: "4f057a1b-2150-8e11-92b4-668270ac5bb2"
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
      stageUuid: "8b75850b-9f40-896c-ace8-63c5a71d1381"
    - stage: seal
      stageUuid: "9c3a5892-a42e-870e-bc86-96d342d957aa"
    - stage: uuid
      stageUuid: "1b2b5ba0-6947-80e2-a4e4-4f20f32d77fa"
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
