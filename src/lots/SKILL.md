---
name: lots
description: "Use when modeling a production order (a lot) — the manufacturing funnel head whose state is DERIVED from lifecycle watermarks on the horo ring, fanning into lot-variants and a lot-work-phases routing chain."
atomPath: lots
coordinate: lots · 7/descent · 6dede112
contentUuid: "0d37768f-91b2-5a8f-86b7-a06da2824ca1"
diamondUuid: "86825f31-224b-8a55-895e-ea472fbc57bb"
uuid: "6dede112-23a6-8fce-b361-99ba209c4593"
horo: 7
bonds:
  in:
    - accounting
    - balance
    - certification
    - coordinate
    - entry
    - grade
    - herd
    - horo
    - law
    - lineage
    - lot
    - organic
    - packs
    - phases
    - variants
  out:
    - accounting
    - balance
    - certification
    - coordinate
    - entry
    - grade
    - herd
    - horo
    - law
    - lineage
    - lot
    - organic
    - packs
    - phases
    - variants
typography:
  partition: lots
  bondDegree: 50
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.3 production-schedule production-order"
  - "ISO-19011:2018 audit-trail lot-lifecycle confirmed·started·finished·closed"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations throughput"
  - "SOX §404 internal-controls production-control"
  - "double-entry — the lot total IS the sum of its variant postings;"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - coordinate
    - entry
    - horo
    - law
    - phases
    - variants
  matrix:
    - accounting
    - balance
    - certification
    - coordinate
    - entry
    - grade
    - herd
    - horo
    - law
    - lineage
    - lot
    - organic
    - packs
    - phases
    - variants
  backlinks:
    - accounting
    - balance
    - certification
    - coordinate
    - entry
    - grade
    - herd
    - horo
    - law
    - lineage
    - lot
    - organic
    - packs
    - phases
    - variants
signatures:
  computationUuid: "7dd9cfac-8b1d-8acd-ba2d-9ad5d530c14a"
  stages:
    - stage: path
      stageUuid: "be1ef1f2-590a-83fa-a1d3-498285b60554"
    - stage: trinity
      stageUuid: "db9b4f1e-62eb-8b4f-99ff-f3e906d3bae4"
    - stage: boundary
      stageUuid: "0d8a8b6f-ccc5-8372-9eeb-351b46dc8396"
    - stage: links
      stageUuid: "5db61009-ae9e-8118-bf90-7c0764d34a6f"
    - stage: horo
      stageUuid: "da2be9e0-4e0a-8ede-8731-e588850ae6fe"
    - stage: seal
      stageUuid: "456aba67-2fe7-838f-b01f-d9b2e3408bb9"
    - stage: uuid
      stageUuid: "19ca4280-0dfc-8f93-8bcf-5c0d3e49717e"
version: 2
---
# lots — the production order (the funnel head, derived-state on the horo ring)

A `lot` is a production run against a sales `order` for a `product`. It is the **containing axis** of the routing graph ([[coordinate]]): it fans out into [[lot/variants]] (the size/colour roll-up) and is produced through an ordered chain of [[lot/work/phases]] (the routing) that cross to the [[work/phases]] catalog. The lot is one materialization of the universal [[entry]] law — its unit funnel is a chain of balanced counters (give·take at each stage), and its total IS the sum of its variants ([[accounting]] double-entry, [[balance]]).

## The state is DERIVED, never stored (the data-truth)
In 20 years of etrima production (N=11 759) the `status` column is **100% NULL**. State was always *computed* from lifecycle watermark high-water marks. So `status` is a **derived `horoStateField`** ([[horo]]) — `deriveLotState` (beforeChange) reads the furthest watermark reached and writes the band:

| ring | band | code | watermark | etrima coverage |
|---|---|---|---|---|
| 1 base | opened | `opened` | (created) | 100% |
| 2 share | confirmed | `confirmed` | `confirmedAt` | 21.5% (2 530) |
| 4 weave | producing | `producing` | `startedAt` | 1.0% (112) |
| 8 crest | finished | `finished` | `finishedAt` | 9.0% (1 053) |
| 7 descent | shipped | `shipped` | `unitsShipped > 0` | — |
| 5 round | delivered | `delivered` | `unitsDelivered > 0` | — |
| 9 unity | closed | `closed` | `closedAt` | **89.3% (10 497)** — the dominant terminal |

`canceled` (`canceledAt`, 1.2%) is the **off-ring** terminal — an escape from the ring, recorded as its own watermark, never a horo band. `tech_confirmed_at` was **0/11 759** — a dead column, dropped.

## The invariants (data-verified, encoded as `@invariant` + hooks)
- **derived-state** — `status` is computed from watermarks, never stored (100% NULL in etrima). `deriveLotState`.
- **roll-up** — `units = Σ variant.units` (100%, 11 636/11 636); likewise `unitsProduced`. The lot IS the sum of its parts ([[balance]]).
- **funnel** — `ordered ≥ units ≥ produced ≥ packed ≥ shipped ≥ delivered ≥ invoiced` (monotonic). Kept as double-entry [[accounting]] numbers.

## The coordinate cross
`lot` = the axis; `order`→`sales-orders` (demand) ⊕ `product`→`items` (catalog) are the up-references; the [[lot/variants]] and [[lot/work/phases]] children are the down-references. The whole routing graph folds to the lot. `kind` is the free product/programme code (`SHIMA_07`, `CONF_21`) — open text, 20 yrs of real codes, never a closed enum (generic-naming law).

**Law — [[law]]: a lot's state is DERIVED from lifecycle watermarks on the [[horo]] ring, never stored (100% NULL in 20yr etrima), and its totals ARE the sum of its [[lot/variants]] through a monotonic funnel ([[balance]], double-entry).**

Matter-twin: `src/lots/index.ts`. Composes [[horo]] · [[coordinate]] · [[accounting]] · [[balance]] · [[lot/variants]] · [[lot/work/phases]] · [[work/phases]].
