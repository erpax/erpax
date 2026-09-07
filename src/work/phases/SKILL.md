---
name: phases
description: "Use when modeling the reusable work-phase (operation) catalog — the routing vocabulary (sewing/cutting/buttonholes/steaming/embroidery/dyeing/finishing) a lot is produced through, a self-referential tree with standard time."
atomPath: "work/phases"
coordinate: "work/phases · 4/weave · 54c0b782"
contentUuid: "29e0d67c-4160-5464-9376-1e042fa970b2"
diamondUuid: "7b5d7e89-f7c0-81c4-be41-51b5f6aa27ad"
uuid: "54c0b782-34d9-841d-a9a6-18ef44f4a706"
horo: 4
typography:
  partition: work
  bondDegree: 43
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs standard-time"
  - "ISO-22400-2:2014 manufacturing-operations KPIs standard-time`"
  - "SOX §404 internal-controls production-control"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "bbbfd321-4923-89c5-a151-ef6dfc965475"
  stages:
    - stage: path
      stageUuid: "d0a34978-9410-83f8-b715-d52a1a5f9daa"
    - stage: trinity
      stageUuid: "36da06ac-981d-8305-bb26-d64b3449d925"
    - stage: boundary
      stageUuid: "46e326f7-cfe7-812d-972b-b62b7d7dd10a"
    - stage: links
      stageUuid: "44deebc7-75ec-830c-b1d5-840fe8ac7fc2"
    - stage: horo
      stageUuid: "a33b4894-5849-86ce-b165-d21fa09e72e5"
    - stage: seal
      stageUuid: "ce605f88-8271-828b-ad4c-ec149a16d987"
    - stage: uuid
      stageUuid: "9692ab33-b78d-8ae5-9b73-d3ac10b345cf"
version: 2
---
# work/phases — the operation catalog (the routing vocabulary, a tree)

A `work-phase` is a *kind* of process step (CONFEZIONE/sewing, TAGLIO/cutting, OCCHIELLI/buttonholes, STIRO/steaming, RICAMO/embroidery, TINTORIA/dyeing, RIFINITURA/finishing …) independent of any one [[lots|lot]] — the industry-agnostic unit a routing is composed of. It is the **catalog** the routing step [[lot/work/phases]] crosses to: each step points OUT to one phase here and adds per-lot time + order. The ISA-95 sibling of [[operations]].

## The data-truth (etrima `work_phases`, N=41 854)
- **It is a TREE** — 20 329 roots ⊕ 21 525 children via the Rails `ancestry` materialized path. Modeled as a self-referential `parent` (the [[coordinate]] axis — a phase contains sub-phases). `@invariant tree`: acyclic, a phase is never its own ancestor.
- **`kind` is the operation family** — CONFEZIONE (sewing) dominates (~26k), then OCCHIELLI/RIFINITURA/TAGLIO/RICAMO/TINTORIA/STIRO. **Open vocabulary**, not a closed enum — 20 yrs of real shop-floor names (generic-naming law).
- **`archived` is 100% NULL** — a dead column. Dropped; lifecycle is `status` (active/inactive).
- `machineType`/`workSeconds`/`skillLevel` describe the standard resource + standard time the phase runs at — **the rate anchor** ([[accounting]] — pay = anchor × verified time; ISO-22400-2 standard-time).

## The cross
This catalog has no transactional funnel of its own — its balance comes from being **referenced** ([[coordinate]]: ≥2 crosses). [[lot/work/phases]] crosses IN (every routing step names a phase here, 100% in etrima — [[merge]]: same phase ⇒ same id), and `parent` crosses self (the tree). The standard time set here is what each routing step's *realized* time is measured against.

**Law — [[law]]: a work-phase is a product-independent KIND of process step (an open-vocabulary self-referential tree, acyclic) carrying the STANDARD time/resource that is the rate anchor; the catalog has no funnel of its own — its [[balance]] comes from being referenced, every [[lot/work/phases]] routing step resolving to a phase here (100% in etrima, [[merge]]: same phase ⇒ same id).**

Matter-twin: `src/work/phases/index.ts`. Composes [[coordinate]] · [[accounting]] · [[merge]] · [[operations]] · [[lot/work/phases]] · [[lots]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-22400-2:2014 manufacturing-operations KPIs standard-time`

Composes: [[wave]].
