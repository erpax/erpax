---
name: calculate
description: "Use when reasoning about calculate — is the computation atom: ceccec/erpax's ~25 are **form-objects** (ActiveModel, ) — validate inputs → compute a standards-cited formula → format; **no persistence, no collection**."
atomPath: "vocabulary/calculate"
coordinate: "vocabulary/calculate · 4/weave · b4f68bcc"
contentUuid: "c1b104a6-a369-509e-9ef6-8950553d5a0b"
diamondUuid: "739d0933-af13-86a9-af52-aa39a84e82e0"
uuid: "b4f68bcc-5a42-83ea-9c16-3a221447efe0"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "e82f8bb6-ef68-8f3a-b68c-db9294653cfd"
  stages:
    - stage: path
      stageUuid: "aec199a3-7cd7-837a-9cc2-a7fd58d2c123"
    - stage: trinity
      stageUuid: "4dda365a-c1c1-88fa-a134-3bc212d97770"
    - stage: boundary
      stageUuid: "9c21aa05-5911-85ab-b40e-9fb87aa798d2"
    - stage: links
      stageUuid: "c9b27d1c-40b4-8cf1-9dde-4d334879e780"
    - stage: horo
      stageUuid: "8802245c-18dd-88ec-8f33-d84cbf2e80ba"
    - stage: seal
      stageUuid: "b1a648b1-dc55-8a42-9899-98937450f455"
    - stage: uuid
      stageUuid: "64a3a7c6-458a-8f72-beb8-4eee16b6d149"
version: 2
---
# calculate — pure compute (matter copies verbatim), no persistence

`calculate` is the computation atom: ceccec/erpax's ~25 `Calculators::*` are **form-objects** (ActiveModel, `CalculatorConcern`) — validate inputs → compute a standards-cited formula → format; **no persistence, no collection**. This is exactly the DB/domain-logic that ports **verbatim** (see [[port]]: matter copies, scaffolding reimplements — the math is the math). In Payload they are pure TS functions / a custom [[api]] endpoint, never collections; inputs validated at the boundary, money as amount + [[currency]], quantities as value + [[measure]], each output cited to the standard it implements (the `@standard` banner is the matter-twin's compliance face). Sequence position **7** ([[api]]) — a compute surface over [[accounting]] data.

Nested leaves (the fractal set, each a one-word path carrying its formula + standard): [[depreciate]], [[amortize]], [[ebitda]], … (break-even, EOQ, present-value, ratios, standard-costing variances derive the same way).

**Law — [[law]]: a calculator is a pure form-object (validate → standards-cited formula → format) with no persistence and no collection; the DB math ports verbatim from Rails ([[port]]), persist only its result in [[accounting]], and every output is cited to the standard it implements.**

## Common mistakes
- Making a calculator a collection — it's a pure function (no state); persist only its *result* in [[accounting]].
- Re-deriving a formula instead of porting the Rails one verbatim (matter copies).
- An uncited formula — carry the `@standard` it implements.
