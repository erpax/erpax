---
name: variants
description: Use when modeling a lot's per-variant line — the size/colour option breakdown whose total IS the sum of its options (100% data-verified), monotonic through the ordered→delivered funnel.
---

# lot/variants — the option roll-up (the variant total IS the sum of its parts)

A [[lots|lot]] splits into variants (one product-variant each); each variant splits into up to 12 **options** (the size/colour columns of the source). This atom carries the per-variant counters and the option breakdown as a **balanced roll-up** — one materialization of [[accounting]]'s double-entry: the variant total is the *sum* of its option postings ([[balance]]).

## The iron law the data proves exactly
In 20 years of etrima production (N=67 865):

- `units = Σ option_N_units` holds **100.00%** (67 865/67 865).
- `units_produced = Σ option_N_units_produced` holds **100.00%**.

So the 12 bespoke `option_N_*` column-families fold into ONE context-keyed `options[]` array ([[fields|discriminator]] — many columns ⇒ one array), and the totals are **DERIVED from the options** by `rollUpLotVariantOptions` (beforeChange): when `options[]` is supplied, `units`/`unitsProduced` are computed as the sum, so they can never silently drift from their parts (computed-not-stored).

## The invariants (data-verified, encoded as `@invariant` + hook)
- **roll-up** — `units = Σ options[].units` AND `unitsProduced = Σ options[].produced` (100.00% in etrima). `rollUpLotVariantOptions`.
- **funnel** — `ordered ≥ units ≥ produced ≥ packed ≥ shipped ≥ delivered` (monotonic): produced≤units 100%, delivered≤shipped 100%, packed≥shipped 100% where both present (55 748/55 748).
- `status` was **100% NULL** — a dead column. A variant carries only counters; its state is the lot's derived state. Dropped.

## The coordinate cross
`lot`→[[lots]] (the parent funnel head, the axis) ⊕ `productVariant`→`items` (the catalog) ⊕ `workPhase`→[[lot/work/phases]] (the routing step it currently sits at). The variant rolls UP into the lot and rides ALONG the routing chain.

Matter-twin: `src/lot/variants/index.ts`. Composes [[accounting]] · [[balance]] · [[fields|discriminator]] · [[coordinate]] · [[lots]] · [[lot/work/phases]].
