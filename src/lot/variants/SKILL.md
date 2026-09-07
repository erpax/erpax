---
name: variants
description: "Use when modeling a lot's per-variant line — the size/colour option breakdown whose total IS the sum of its options (100% data-verified), monotonic through the ordered→delivered funnel."
atomPath: "lot/variants"
coordinate: "lot/variants · 5/round · 48b8927b"
contentUuid: "e044ec9d-9eff-5529-b846-4ba6b2323a64"
diamondUuid: "e1ab64fe-8e67-8de7-ab48-9923c715819b"
uuid: "48b8927b-7cbf-860f-9091-6e22ad4cf15b"
horo: 5
typography:
  partition: lot
  bondDegree: 26
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 material-lot sublot"
  - "UBL-2.1"
  - "double-entry — every counter is a balanced number; the variant"
bindings: []
signatures:
  computationUuid: "d608b193-01fc-8e83-a9f1-8a43ed971895"
  stages:
    - stage: path
      stageUuid: "36078a37-8df6-8282-b320-004655785d78"
    - stage: trinity
      stageUuid: "6c03c5b5-b126-8d9d-8640-d0c15acaadd9"
    - stage: boundary
      stageUuid: "f3b99942-8b64-8456-a805-4af3efebbf9c"
    - stage: links
      stageUuid: "34899d22-f5b3-801c-bb0e-20399e7a6dd6"
    - stage: horo
      stageUuid: "12f92622-bf86-805f-82c0-30578ffdde11"
    - stage: seal
      stageUuid: "9f8b1ca3-e546-81b9-8ed9-1392fc02a8aa"
    - stage: uuid
      stageUuid: "cfa6947f-386b-80f4-a81d-77f8b9bb83c3"
version: 2
---
# lot/variants — the option roll-up (the variant total IS the sum of its parts)

A [[lots|lot]] splits into variants (one product-variant each); each variant splits into up to 12 **options** (the size/colour columns of the source). This atom carries the per-variant counters and the option breakdown as a **balanced roll-up** — one materialization of [[accounting]]'s double-entry: the variant total is the *sum* of its option postings ([[balance]]).

## The iron law the data proves exactly
In 20 years of etrima production (N=67 865):

- `units = Σ option_N_units` holds **100.00%** (67 865/67 865).
- `units_produced = Σ option_N_units_produced` holds **100.00%**.

So the 12 bespoke `option_N_*` column-families fold into ONE context-keyed `options[]` array ([[field|discriminator]] — many columns ⇒ one array), and the totals are **DERIVED from the options** by `rollUpLotVariantOptions` (beforeChange): when `options[]` is supplied, `units`/`unitsProduced` are computed as the sum, so they can never silently drift from their parts (computed-not-stored).

## The invariants (data-verified, encoded as `@invariant` + hook)
- **roll-up** — `units = Σ options[].units` AND `unitsProduced = Σ options[].produced` (100.00% in etrima). `rollUpLotVariantOptions`.
- **funnel** — `ordered ≥ units ≥ produced ≥ packed ≥ shipped ≥ delivered` (monotonic): produced≤units 100%, delivered≤shipped 100%, packed≥shipped 100% where both present (55 748/55 748).
- `status` was **100% NULL** — a dead column. A variant carries only counters; its state is the lot's derived state. Dropped.

## The coordinate cross
`lot`→[[lots]] (the parent funnel head, the axis) ⊕ `productVariant`→`items` (the catalog) ⊕ `workPhase`→[[lot/work/phases]] (the routing step it currently sits at). The variant rolls UP into the lot and rides ALONG the routing chain.

**Law — [[law]]: a variant total IS the [[balance|sum]] of its option postings — `units = Σ options[].units` and `unitsProduced = Σ options[].produced` (100.00% over 67 865 etrima rows), computed-not-stored so the roll-up can never drift from its parts, monotonic down the ordered≥produced≥…≥delivered funnel.**

Matter-twin: `src/lot/variants/index.ts`. Composes [[accounting]] · [[balance]] · [[field|discriminator]] · [[coordinate]] · [[lots]] · [[lot/work/phases]].
