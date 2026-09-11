---
name: lots
description: "Use when modeling a production order (a lot) — the manufacturing funnel head whose state is DERIVED from lifecycle watermarks on the horo ring, fanning into lot-variants and a lot-work-phases routing chain."
atomPath: lots
coordinate: "lots · 4/weave · 0ed71af8"
contentUuid: "3b394a86-df41-5ec3-901f-d9f7ae1fc42a"
diamondUuid: "507cafbf-4b53-820c-afa1-9b2cb9a500b5"
uuid: "0ed71af8-ea50-85d2-aa60-65445e358bad"
horo: 4
typography:
  partition: lots
  bondDegree: 53
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.3 production-schedule production-order"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations throughput"
  - "ISO-22400-2:2014 manufacturing-operations throughput`"
  - "SOX §404 internal-controls production-control"
  - "double-entry — the lot total IS the sum of its variant postings;"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e6249097-949b-8b4b-b9bc-bfdb3383143d"
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
      stageUuid: "f749bc37-9c16-8514-90b4-24a86832ab2f"
    - stage: seal
      stageUuid: "8dd29a52-6490-8c98-b3e1-660e72ea3347"
    - stage: uuid
      stageUuid: "e97a09a2-9e3f-8c4e-af51-8a79c081b066"
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

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations throughput`
