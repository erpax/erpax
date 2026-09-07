---
name: calculate
description: "Use when reasoning about calculate — is the computation atom: ceccec/erpax's ~25 are **form-objects** (ActiveModel, ) — validate inputs → compute a standards-cited formula → format; **no persistence, no collection**."
atomPath: "vocabulary/calculate"
coordinate: "vocabulary/calculate · 2/share · b7ae72c2"
contentUuid: "4408df09-2536-5bf5-82f8-4ee6943a4eee"
diamondUuid: "7f659761-a7f0-83e5-b677-1d9d68768bfa"
uuid: "b7ae72c2-21d4-8b07-a82c-ee218fe23b74"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "a7c29e24-6d3d-8261-9c3c-90d22b9012b5"
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
      stageUuid: "8706ce05-37c9-8517-b253-78740ccb5519"
    - stage: seal
      stageUuid: "b1a648b1-dc55-8a42-9899-98937450f455"
    - stage: uuid
      stageUuid: "5e619020-af2b-8e0e-8466-5e00a4ba8132"
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
