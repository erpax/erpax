---
name: variants
description: "Use when modeling a lot's per-variant line — the size/colour option breakdown whose total IS the sum of its options (100% data-verified), monotonic through the ordered→delivered funnel."
atomPath: lot/variants
coordinate: lot/variants · 1/base · 57677362
contentUuid: "5433f148-0b35-5b50-9e73-9fe94c9fd9c7"
diamondUuid: "3cd1e596-c7bc-8829-865e-55321c8dd760"
uuid: "57677362-6a01-814a-9ae0-6124ceed76a5"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - coordinate
    - fields
    - items
    - law
    - lot
    - lots
    - phases
  out:
    - accounting
    - balance
    - coordinate
    - fields
    - items
    - law
    - lots
    - phases
typography:
  partition: lot
  bondDegree: 26
  neighbors: []
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 material-lot sublot"
  - "ISO-19011:2018 audit-trail variant-counter-changes"
  - "UBL-2.1"
  - "double-entry — every counter is a balanced number; the variant"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - coordinate
    - fields
    - law
    - lots
    - phases
  matrix:
    - accounting
    - balance
    - coordinate
    - fields
    - items
    - law
    - lots
    - phases
  backlinks:
    - accounting
    - balance
    - coordinate
    - fields
    - items
    - law
    - lots
    - phases
signatures:
  computationUuid: "e5e5a303-ab2f-85f7-aa67-ce3ef6783346"
  stages:
    - stage: path
      stageUuid: "36078a37-8df6-8282-b320-004655785d78"
    - stage: trinity
      stageUuid: "6c03c5b5-b126-8d9d-8640-d0c15acaadd9"
    - stage: boundary
      stageUuid: "f3b99942-8b64-8456-a805-4af3efebbf9c"
    - stage: links
      stageUuid: "bf9799bf-0222-8a14-a441-3e522d337d69"
    - stage: horo
      stageUuid: "245d0f02-4098-84ab-b3ff-e70cb8c49076"
    - stage: seal
      stageUuid: "147b92a6-7bf3-8c14-a835-f323b5d0ae52"
    - stage: uuid
      stageUuid: "640ab836-9496-8001-a372-ac87a9f8c459"
version: 2
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

**Law — [[law]]: a variant total IS the [[balance|sum]] of its option postings — `units = Σ options[].units` and `unitsProduced = Σ options[].produced` (100.00% over 67 865 etrima rows), computed-not-stored so the roll-up can never drift from its parts, monotonic down the ordered≥produced≥…≥delivered funnel.**

Matter-twin: `src/lot/variants/index.ts`. Composes [[accounting]] · [[balance]] · [[fields|discriminator]] · [[coordinate]] · [[lots]] · [[lot/work/phases]].
