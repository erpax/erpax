---
name: sti
description: Single Table Inheritance in Payload — one collection, a flat `type` discriminator, typed in TS as a discriminated union. Read when a collection holds several behavioral subtypes (invoice↔bill↔credit_note, payment kinds, party kinds).
---

# sti — single table inheritance (one collection · `type` · TS discriminated union)

Payload has no class inheritance. The STI analog is **one [[collections]] collection + a flat `type` discriminator** (Rails' `inheritance_column` default) — `relationTo:[…]` is the polymorphic-*association* analog, blocks the heterogeneous-*embed* analog; STI is the *one-entity-many-subtypes* analog. The invoice↔bill↔credit_note set is the canonical case: **one `invoices` collection, `type` decides AR/bill/note** — which is exactly why a single aggregate hook and a single `partyRoleAccess` cover every subtype (see the duality in [[sequence]]).

## The trinity (runtime mirror ↔ compile-time type, one source)
1. **Discriminator** — a top-level `type` select [[fields]]. **Flat, never nested** (`doc.type`, not `doc.typeStatus.invoiceType`) so the *address-law* holds: every hook/access/query/agent finds the discriminator at the same path. Keep `type` (behavior) distinct from any standards code field (e.g. EN-16931 `invoiceTypeCode` BT-3 — wire format, not branching).
2. **Subtype fields** — per-variant [[fields]] gated by `admin.condition: ({ type }) => type === 'bill'`. The runtime mirror of the union arms.
3. **Typed union** — `src/types/sti.ts`: `Sti<Base, Variants>` builds the discriminated union; `narrowSti(doc)` casts the wide generated doc → union *once* at the read boundary (sound — `type` is always present); `matchStiType(doc, handlers)` is **exhaustive** subtype dispatch (omit a variant ⇒ TS error), the typed replacement for Rails STI subclass methods; `isStiType`/`StiVariant` for guards. Payload codegen emits one *wide* interface, so the union is this thin overlay — author `Base`+`Variants` once.

## Per-type behavior (what Rails STI subclasses did)
Branch on `doc.type` in [[hooks]]/[[access]] — `matchStiType` for exhaustive dispatch (status maps, posting rules, party direction). The role NAME, not a separate column, carries direction when paired with resource-scoped roles (see [[access]]: seller=AR, buyer=AP on one document).

## Common mistakes
- **Nesting the discriminator** — breaks the address-law and clean narrowing; keep `type` top-level.
- Forgetting `admin.condition` — the union arms exist in TS but the UI shows every field for every type (runtime/compile drift).
- Conflating `type` (branching) with the standards/wire code (export).
- Non-exhaustive branching — use `matchStiType`, not a `switch` with a silent default, so a new subtype can't fall through.
- Expecting a subclass *scope* — a query returns all types unless you filter `where:{ type:{ equals } }` (wrap in a query preset / thin finder).

## Composition
`config`→[[collections]] (the one table) · [[fields]] (`type` + conditional fields) · [[types]] (the union overlay) · [[hooks]]/[[access]] (per-type behavior) · [[identity]] (content-uuid still spans subtypes) · ported from Rails STI via [[port]].

**Law — [[schema]]** architecture collapses multiword schema patterns into single-word atoms. STI is not merely a Rails port but a fractal cell: the discriminated union (type + subtype-fields + narrowing) replicates at every level — [[collections]], [[hooks]], [[access]], [[types]] — each encoding the same schema-free branching logic without a `schema` prefix. This is why schema.org's type hierarchies dissolve into [[harmony]] here: one concept → one atom, typed at [[fractal]] depth.
