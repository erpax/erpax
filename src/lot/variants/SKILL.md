---
name: variants
description: "Use when modeling a lot's per-variant line — the size/colour option breakdown whose total IS the sum of its options (100% data-verified), monotonic through the ordered→delivered funnel."
atomPath: "lot/variants"
coordinate: "lot/variants · 2/share · 72068aa1"
contentUuid: "e7548bef-5735-576b-959b-6ad4c5b7d661"
diamondUuid: "965fd5e3-26d4-8622-91be-80c21f5057ee"
uuid: "72068aa1-a04e-825f-950f-73caec8ba263"
horo: 2
typography:
  partition: lot
  bondDegree: 19
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 material-lot sublot"
  - "double-entry — every counter is a balanced number; the variant"
bindings: []
signatures:
  computationUuid: "c360426f-d03a-86de-8784-e3d4da0b73c5"
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
      stageUuid: "5991b6ed-308c-8064-8065-3a92493f7093"
    - stage: seal
      stageUuid: "9f8b1ca3-e546-81b9-8ed9-1392fc02a8aa"
    - stage: uuid
      stageUuid: "9f858286-456b-86d5-b0d6-9691258684e0"
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
