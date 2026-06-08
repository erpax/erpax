---
name: phases
description: "Use when modeling the reusable work-phase (operation) catalog — the routing vocabulary (sewing/cutting/buttonholes/steaming/embroidery/dyeing/finishing) a lot is produced through, a self-referential tree with standard time."
atomPath: work/phases
coordinate: work/phases · 1/base · 61769793
contentUuid: "efa1da12-2317-50ce-80c5-7ed1dbd5b915"
diamondUuid: "3758be15-ca60-85a8-b1ef-ce8051582a87"
uuid: "61769793-1677-8138-b623-ecbd9c122c0b"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
    - work
  out:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
typography:
  partition: work
  bondDegree: 36
  neighbors: []
standards:
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment"
  - "ISO-19011:2018 audit-trail work-phase-definition-changes"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs standard-time"
  - "SOX §404 internal-controls production-control"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
  matrix:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
  backlinks:
    - accounting
    - balance
    - coordinate
    - law
    - lots
    - merge
    - operations
    - phases
signatures:
  computationUuid: "1b3b5e00-fb3c-80a8-a007-6d087382257e"
  stages:
    - stage: path
      stageUuid: "d0a34978-9410-83f8-b715-d52a1a5f9daa"
    - stage: trinity
      stageUuid: "36da06ac-981d-8305-bb26-d64b3449d925"
    - stage: boundary
      stageUuid: "46e326f7-cfe7-812d-972b-b62b7d7dd10a"
    - stage: links
      stageUuid: "7b4cd3a4-faa6-8a58-a4ac-bbc427eb65a0"
    - stage: horo
      stageUuid: "694afaca-0319-8e49-b621-001dcb5d668b"
    - stage: seal
      stageUuid: "e3520ddd-cac7-854e-8bb6-d51de9ed7294"
    - stage: uuid
      stageUuid: "a75373a3-26ad-8639-ab66-165f64d7b61e"
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
