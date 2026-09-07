---
name: collapse
description: "Use when asking which collections can honestly become one — content-addresses every booted collection's shape and reports identical tables (0) and provable subsets (4). Read the boundary before acting: fitting is not sameness, and no theorem decides what two tables MEAN. Run: tsx src/rules/collapse/index.ts"
atomPath: "rules/collapse"
coordinate: "rules/collapse · 5/round · 32b38bd7"
contentUuid: "2d78aa93-6a79-5026-8411-3a274b93d14b"
diamondUuid: "b0d44b20-5f26-806d-abc3-c63bc95f076f"
uuid: "32b38bd7-6ee5-8c3d-82b0-ad9abe8c04f9"
horo: 5
typography:
  partition: rules
  bondDegree: 4331
standards:
  - "RFC 9562 §5.8 — content-address (same content, same address)"
bindings: []
signatures:
  computationUuid: "03dcce06-3c40-831f-8d97-df9dd9d738e5"
  stages:
    - stage: path
      stageUuid: "ef3d005e-66ae-88eb-8061-ac54f1cc57d1"
    - stage: trinity
      stageUuid: "9f3357d9-39ab-8062-89f5-9b339a1c96b4"
    - stage: boundary
      stageUuid: "ec746093-b9fe-882c-b4ec-31eec67247e5"
    - stage: links
      stageUuid: "a0a729f1-f8b8-8921-86c0-a57cd6473dc2"
    - stage: horo
      stageUuid: "e440b3aa-dd6e-8d3e-b5b6-29a39dc85b5d"
    - stage: seal
      stageUuid: "e72d5eb3-a563-8c63-b1da-33f76f55eb5d"
    - stage: uuid
      stageUuid: "81d02d99-43b5-81bd-9ae3-e3f6479e92fc"
version: 2
---
# collapse — the telos, measured

> *"Collapse ~200 collections to a dense core."*

The measurement **refuses it**:

| | |
| --- | ---: |
| collections booted | **231** (210 erpax hand-writes + 21 from plugins/Payload internals) |
| **IDENTICAL shapes** | **0** — no two are the same table |
| provable **subsets** | 4 — of which **three are semantic noise** |
| **the one real merge** | **1** |

```
customers ⊂ vendors  — differs by 1: bank
```

Not *"similar"*. Not *"both are parties"*. **One field.** That is the typeless-actor merge the corpus already believes in, and it is the only one anything can prove.

**Structural compression headroom is ~0.** The shapes are genuinely distinct, so the collapse everyone wants is a **re-modelling** — deciding that a customer and a vendor are both *parties* — and **no theorem makes that decision.**

## Where "trust only theorems" stops

Set inclusion is **decidable**, and it decides the **wrong question**:

```
payload-migrations ⊂ lot-variants   — 22 fields apart. Structurally true. Absurd.
redirects ⊂ connections             — plugin-redirects'. Not erpax's to collapse.
```

**Fitting is not sameness** — a small table fits inside almost anything. A theorem tells you what you cannot trust; it cannot tell you what two tables *mean*. This names **candidates for a human**; it never decides a merge. The real one sorts first, because fewest-extra-fields is the closest thing to sameness that arithmetic can offer.

## Two instruments, and their disagreement is the information

`payload-types.ts` is generated **by Payload from the live config** — the shapes it actually booted, parsed via [[syntax]]. `@/collections` is what erpax **hand-writes**. They differ by **21**, and those 21 are plugin + internal tables (`payload-migrations`, `carts`, `variants`, `forms`, `search`…).

Measuring against the generated types **alone** proposed compressing **Payload's own migration table**. **A collection erpax does not own is not erpax's to collapse.** One instrument gave a confident number; two instruments gave the truth.

That delta is also [[rules]]/canonical paying off: ecommerce, forms, search, redirects and import-export come *from packages* rather than being hand-rolled — visible only because the two counts disagreed.

## Not the rosetta signature

`collectionSignature` scores a collection against a hand-picked marker list (`money: ['amount','debit',…]`). It clusters 231 → **30** signatures — an alluring *87% compression* — and **47 collections match no marker at all**. A basis typed once is a **frozen rosetta**: it reports what its author remembered, not what the corpus has. A moving rosetta derives its poles from the incidence itself (the concept lattice); until that exists, this measures the **shapes**, which need no basis.

## The inverse-polarity lens — a conjecture, measured

Held as a conjecture (*"the collections fold in inverted pairs — one concept at opposite polarity, foldable to one atom + a counterparty sign through [[party]]/[[perspective]]"*), then answered by the config. `inversePairs()` takes a **declared** map of antonym pairs — a human MEANING judgement written in the open so it can be argued with, never inferred (the same split [[rules]]/audience makes) — and computes each pair's real shape overlap:

| declared pair | jaccard | verdict |
| --- | ---: | --- |
| `customers ↔ vendors` | 0.92 | **theorem** — the shapes collapse |
| `quotes ↔ vendor-quotes` | 0.33 | meaning — a re-modelling a human decides |
| `payments ↔ receipts` | 0.04 | distinct — two tables that only rhyme |
| `sales ↔ returns` | 0.12 | distinct |

**The theorem refutes the eye, not only the dream.** A conjecture named the fold a *"cube of 21 crosses"*; reality says **6 declared pairs, exactly 1 shape-provable** — the same `customers ↔ vendors`. And the antonyms I was *sure* were inverse pairs (`payments`/`receipts`, `sales`/`returns`) share almost no fields — naming a pair by meaning is the harmonic over-reach, and the shapes say no. The dream made contact and was answered: a handful, one real, far from 21 — a conjecture that pointed *approximately*, credited with nothing.

**Honest boundary.** Proves shapes are **distinct**, never that they *should* be. It reads `payload-types`, so a collection absent from the generated types is invisible; and it compares **field names + types**, so two tables meaning the same thing under different names are invisible to it — which is exactly the `customers`/`vendors` case, caught only because they already agree on 12 field names. The polarity map is **declared**, so it proves shape overlap for the pairs a human named — never that the named pairs are the only ones, nor that a `theorem` verdict *should* be merged.

**Law — [[law]]: a merge is proven by shape and decided by meaning. Content-addressing finds the candidates; nothing but a human decides that a customer and a vendor are one party.**

Composes: [[syntax]] · [[merge]] · [[rules]] · [[law]].
