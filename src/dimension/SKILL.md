---
name: dimension
description: "Use when one concept is split across many prefixed collections/fields that should coexist at one coordinate — bank-/fx-/trade-/intercompany-transactions → transactions; customers/vendors/addresses → parties. A prefix is a dimension not yet collapsed (kind/context/role/perspective/unit/time); remove it and the variants merge into the shared coordinate, the prefix becoming a field/tag/type. erpax is multi-dimensional: all coexist at one coordinate, in unity."
atomPath: dimension
coordinate: "dimension · 7/descent · 6b43eec4"
contentUuid: "81ee01f1-fd55-56e7-8970-dc8cc4063902"
diamondUuid: "f0fbf4a3-d7a9-8081-90c1-5e0db3dafaae"
uuid: "6b43eec4-f45d-86a8-91a8-5248b3632a0a"
horo: 7
typography:
  partition: dimension
  bondDegree: 196
standards:
  - "ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries"
  - "ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries`"
  - W3C Web Components composition pattern
  - "W3C Web Components composition pattern`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "951dc40c-2192-8078-80e4-36404690aa8b"
  stages:
    - stage: path
      stageUuid: "92fc2a3b-9d95-8c5e-b3e1-db1b571310fe"
    - stage: trinity
      stageUuid: "7f99cea0-425b-84cf-834e-7460a225bae9"
    - stage: boundary
      stageUuid: "e523fdcc-fc1c-8e6c-a563-15be7bbdc40b"
    - stage: links
      stageUuid: "e4a004dd-20e0-8c3b-970d-b5e4cf59bbcc"
    - stage: horo
      stageUuid: "06817323-a323-88cc-a62d-f96f1cf62a70"
    - stage: seal
      stageUuid: "37ba233e-727e-87d6-9763-c5748e33db94"
    - stage: uuid
      stageUuid: "591eba37-6b00-8226-8508-0cab8bf1184d"
version: 2
---
# dimension — the axis along which entities coexist at one coordinate

erpax is **multi-dimensional**: many entities live at the **same coordinate** (one collection · one content-[[identity|uuid]] · one [[fractal]] path) and are told apart by a **dimension** — an axis, not a separate home. A **prefix is a dimension that hasn't collapsed yet**: `bank`·`fx`·`trade`·`intercompany`-`transactions` are four points on the *kind* axis of one [[transaction|transactions]]; `customers`·`vendors`·`addresses` are roles on one `parties`. **Remove the prefix and it [[merge|merges]]** — the variants coexist at the coordinate, the dropped prefix becoming a field / [[tags|tag]] / [[sti|type]]. Sequence position **8** ([[queries]] — where the architectures merge into one).

A dimension wears many forms, all the same law: a flat [[sti]] `type` (invoice/order/note), a [[tags]] `(context, tag)`, a [[party]] `role` (seller/buyer/ship-to), a [[duality]] two-value axis (debit/credit, [[give]]/[[take]], seller/buyer perspective), a [[currency]]/[[measure]] unit, a [[localize]] locale, a [[versions]] time-step. Each is one axis; an entity is a **point in their product**, and the [[whole]] of erpax is the holographic ([[holographic]]) superposition of all axes at every coordinate.

Composes: [[merge]] (collapse to the coordinate) · [[tags]]·[[sti]]·[[party]] (axis forms) · [[identity]] (the coordinate = content-uuid) · [[all]] (totality over axes) · [[one]] (unity) · [[duality]] (the 2-valued axis) · [[fractal]]·[[holographic]] · [[transaction]] (the worked example) · [[zeropoint]] (/0 = a new axis, no pole) · [[utility]] (the operational guard) · [[diamond]] (the one shared model at every quantum dimension).

## Collections share the diamond model — all quantum dimensions

Every prefixed collection (`bank-transactions`, `fx-transactions`, …) is a **projection of the same [[diamond]]/DiamondModel** at the backend matter dimension — not a parallel ad-hoc schema. When [[factory]]/createAccountingCollection builds a collection config, it derives `CollectionDiamondModel` via `deriveCollectionDiamond`: the slug/atomPath, tamper-proof content-[[uuid]] field, horo state ring (`horoStates`), quantum boundary imports/exports, trinity completeness, and seal status are **the same facets** as folder/method/README diamonds. Collapsing a prefix dimension ([[merge]]) does not change the model shape — only the coordinate and axis values.

**Law (additive) — [[law]]: all collections share the same diamond model at all quantum dimensions — each dimension's collection projects DiamondModel; one verifier, one uuid pipeline across backend and form scales.**

**Law (additive) — [[law]]: quantum semantics apply in every dimension including 2D — the typography partition plane (path segment × horo measure) superposes, collapses, and seals like the 1D path and 3D trinity (`quantumInAllDimensions` in [[quantum]]); a prefix dimension not yet collapsed is a coordinate on that 2D grid, not a separate quantum system.**

## The parent field — the dimension-generator (emergence is compression, as the source)
A single **self-referential `parent`** field (`relationTo` self — [[fields]]) is the universal dimension: a node's **type is its parent-chain and its archetype is the root**, so the whole *type × archetype* cross collapses into one tree (no [[sti|type]]-enum × archetype-field grid). For [[domain]] and email it is **subdomain-based** — the name encodes the chain (`shop.acme.com → acme.com → com`; `ceci@psg.bg → psg.bg`). And **new dimensions emerge** from the recursion: each parent-level is a new scale ([[fractal]]) — type · archetype · subdomain · tenant · scope are all *levels of the one field*, **computed, not predefined** ([[self]]).

The paradox: **the more dimensions emerge, the more compact erpax becomes.** Because every emergent axis is a *level of the one parent field at the one coordinate* — the content-[[identity|uuid]] singularity ([[holographic]]), not a new table — emergence IS **compression** ([[collapse]]): infinite axes, one field, one coordinate. Capability compounds while the schema shrinks toward the dense core, until it is **the source itself** ([[zeropoint]]: the zero-entropy 0 from which all radiates and to which all returns — [[torus]]). More emerges ⇒ denser ⇒ nearer the 0.

### No division-by-zero pole — /0 is a new axis (the zero law)
Nearing the 0 does **not** blow up. Because emergence *is* compression, dividing toward the singularity does not diverge — it makes a **new dimension emerge**: the next parent-chain level, a new content-[[identity|uuid]] coordinate. So `/0` is not a pole but **a new axis** — denser, not divergent — which is the *structural* reason erpax has no division-by-zero singularity (governed by [[zeropoint]]). The operational guard that keeps the runtime on the safe side of that limit is [[utility]].

**parent + prev/next = the complete trinity.** The parent field is one self-reference — the *vertical* axis (hierarchy · type · archetype · the dimension up). **prev/next** is the other — the *horizontal* axis (order · the [[sequence]] walk · siblings · the time-step [[versions]] · the document chain · the [[horo]] ring). Three self-references — parent · prev · next — **completely position a node**: *which tree* it lives in (parent → its dimension/archetype) and *where in the order* it sits (prev/next → its flow). That is the [[trinity]] of structure, **computed from the path, never stored** — the docs site already derives a node's ancestors (parent) and its prev/next from the [[sequence]] reading-chain (`.vitepress/config`). Tree ⊕ order = the whole address; nothing more is needed to place anything.

## Common mistakes
- A prefixed collection (`bank-transactions`, `supto-sales`) — an un-collapsed dimension; merge to the bare coordinate + a `kind`/tag axis.
- One concept scattered across N coordinates by a dimension value (customers/vendors) — one coordinate, the value as context.
- Baking a dimension into a name (`monthlyUSD`) instead of carrying it as a field/tag/type axis.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Web Components composition pattern`
- `@standard ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries`
