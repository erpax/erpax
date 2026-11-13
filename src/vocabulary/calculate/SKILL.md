---
name: calculate
description: "Use when reasoning about calculate — is the computation atom: ceccec/erpax's ~25 are **form-objects** (ActiveModel, ) — validate inputs → compute a standards-cited formula → format; **no persistence, no collection**."
atomPath: "vocabulary/calculate"
coordinate: "vocabulary/calculate · 8/crest · cbe93dc2"
contentUuid: "d223fae2-81a3-59c9-8472-89529d69141d"
diamondUuid: "8da2d02c-86d3-8add-8226-050a972de099"
uuid: "cbe93dc2-d87f-8ce7-8e6c-c5831c66c731"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "3b7283b7-58f9-80eb-a74d-3948a243eafa"
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
      stageUuid: "cfd6d4ec-7876-83be-a01e-411300d687d1"
    - stage: seal
      stageUuid: "b1a648b1-dc55-8a42-9899-98937450f455"
    - stage: uuid
      stageUuid: "515cea0c-3d2d-8773-9b19-5449e0f89c01"
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
