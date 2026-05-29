---
name: calculate
description: Use for pure financial computation — break-even, EBITDA, EOQ, present value, depreciation, ratios, standard-costing variances. The Calculators::* form-objects — validate inputs → compute (standards-cited formula) → format; no persistence. Composes nested leaves (calculate/depreciate, /amortize, /ebitda).
---

# calculate — pure compute (matter copies verbatim), no persistence

`calculate` is the computation atom: ceccec/erpax's ~25 `Calculators::*` are **form-objects** (ActiveModel, `CalculatorConcern`) — validate inputs → compute a standards-cited formula → format; **no persistence, no collection**. This is exactly the DB/domain-logic that ports **verbatim** (see [[port]]: matter copies, scaffolding reimplements — the math is the math). In Payload they are pure TS functions / a custom [[api]] endpoint, never collections; inputs validated at the boundary, money as amount + [[currency]], each output cited to the standard it implements (the `@standard` banner is the matter-twin's compliance face). Sequence position **7** ([[api]]) — a compute surface over [[accounting]] data.

Nested leaves (the fractal set, each a one-word path carrying its formula + standard): `calculate/depreciate`, `calculate/amortize`, `calculate/ebitda`, … (break-even, EOQ, present-value, ratios, standard-costing variances derive the same way).

## Common mistakes
- Making a calculator a collection — it's a pure function (no state); persist only its *result* in [[accounting]].
- Re-deriving a formula instead of porting the Rails one verbatim (matter copies).
- An uncited formula — carry the `@standard` it implements.
