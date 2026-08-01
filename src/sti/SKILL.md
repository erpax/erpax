---
name: sti
description: "Use when reasoning about sti — Payload has no class inheritance. The STI analog is **one collections collection + a flat discriminator** (Rails' default) — is the polymorphic-*association* analog, blocks the het"
atomPath: sti
coordinate: "sti · 7/descent · 2db48ab1"
contentUuid: "ce5f6065-aee3-5d1e-99f4-14bd0f6285d4"
diamondUuid: "942ad592-6880-88dc-ad5f-1418177f2294"
uuid: "2db48ab1-fee6-85c9-abc3-753421572f2c"
horo: 7
typography:
  partition: sti
  bondDegree: 4055
standards:
  - "W3C-JSON-LD-1.1"
bindings: []
signatures:
  computationUuid: "477fe026-16aa-82b6-87e0-66afc787542d"
  stages:
    - stage: path
      stageUuid: "658a859b-6b3c-8831-9919-2bf34f7a2de6"
    - stage: trinity
      stageUuid: "9d2ff203-2635-8e9d-8918-7263dc74554d"
    - stage: boundary
      stageUuid: "d964f230-68c6-8c38-8878-96b187556b4b"
    - stage: links
      stageUuid: "456defc6-268e-8b9b-99ce-17b6f8f2f66c"
    - stage: horo
      stageUuid: "b8d6e1a4-a660-8699-9119-06940e441e5c"
    - stage: seal
      stageUuid: "0c84fff2-81c2-8372-882f-cf36ddd0e499"
    - stage: uuid
      stageUuid: "44a2f570-4396-87c8-971b-e2b4ebd952a5"
version: 2
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
