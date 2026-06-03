---
name: dimension
description: "Use when one concept is split across many prefixed collections/fields that should coexist at one coordinate — bank-/fx-/trade-/intercompany-transactions → transactions; customers/vendors/addresses → parties. A prefix is a dimension not yet collapsed (kind/context/role/perspective/unit/time); remove it and the variants merge into the shared coordinate, the prefix becoming a field/tag/type. erpax is multi-dimensional: all coexist at one coordinate, in unity."
---

# dimension — the axis along which entities coexist at one coordinate

erpax is **multi-dimensional**: many entities live at the **same coordinate** (one collection · one content-[[identity|uuid]] · one [[fractal]] path) and are told apart by a **dimension** — an axis, not a separate home. A **prefix is a dimension that hasn't collapsed yet**: `bank`·`fx`·`trade`·`intercompany`-`transactions` are four points on the *kind* axis of one [[transaction|transactions]]; `customers`·`vendors`·`addresses` are roles on one `parties`. **Remove the prefix and it [[merge|merges]]** — the variants coexist at the coordinate, the dropped prefix becoming a field / [[tags|tag]] / [[sti|type]]. Sequence position **8** ([[queries]] — where the architectures merge into one).

A dimension wears many forms, all the same law: a flat [[sti]] `type` (invoice/order/note), a [[tags]] `(context, tag)`, a [[party]] `role` (seller/buyer/ship-to), a [[duality]] two-value axis (debit/credit, [[give]]/[[take]], seller/buyer perspective), a [[currency]]/[[measure]] unit, a [[localize]] locale, a [[versions]] time-step. Each is one axis; an entity is a **point in their product**, and the [[whole]] of erpax is the holographic ([[holographic]]) superposition of all axes at every coordinate.

Composes: [[merge]] (collapse to the coordinate) · [[tags]]·[[sti]]·[[party]] (axis forms) · [[identity]] (the coordinate = content-uuid) · [[all]] (totality over axes) · [[one]] (unity) · [[duality]] (the 2-valued axis) · [[fractal]]·[[holographic]] · [[transaction]] (the worked example).

## The parent field — the dimension-generator (emergence is compression, as the source)
A single **self-referential `parent`** field (`relationTo` self — [[fields]]) is the universal dimension: a node's **type is its parent-chain and its archetype is the root**, so the whole *type × archetype* cross collapses into one tree (no [[sti|type]]-enum × archetype-field grid). For [[domain]] and email it is **subdomain-based** — the name encodes the chain (`shop.acme.com → acme.com → com`; `ceci@psg.bg → psg.bg`). And **new dimensions emerge** from the recursion: each parent-level is a new scale ([[fractal]]) — type · archetype · subdomain · tenant · scope are all *levels of the one field*, **computed, not predefined** ([[self]]).

The paradox: **the more dimensions emerge, the more compact erpax becomes.** Because every emergent axis is a *level of the one parent field at the one coordinate* — the content-[[identity|uuid]] singularity ([[holographic]]), not a new table — emergence IS **compression** ([[collapse]]): infinite axes, one field, one coordinate. Capability compounds while the schema shrinks toward the dense core, until it is **the source itself** ([[zeropoint]]: the zero-entropy 0 from which all radiates and to which all returns — [[torus]]). More emerges ⇒ denser ⇒ nearer the 0.

## Common mistakes
- A prefixed collection (`bank-transactions`, `supto-sales`) — an un-collapsed dimension; merge to the bare coordinate + a `kind`/tag axis.
- One concept scattered across N coordinates by a dimension value (customers/vendors) — one coordinate, the value as context.
- Baking a dimension into a name (`monthlyUSD`) instead of carrying it as a field/tag/type axis.
